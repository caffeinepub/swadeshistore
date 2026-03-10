import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Bool "mo:core/Bool";
import Array "mo:core/Array";
import Nat64 "mo:core/Nat64";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import List "mo:core/List";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  module Product {
    public type Price = {
      original : Nat64;
      discounted : ?Nat64;
    };

    public type Review = {
      user : Principal;
      rating : Nat;
      content : Text;
    };

    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.id, product2.id);
    };
  };

  type Product = {
    id : Text;
    name : Text;
    category : Text;
    price : Product.Price;
    emoji : Text;
    seller : Text;
    location : Text;
    rating : ?Nat;
    reviews : [Product.Review];
    badge : ?Text;
    savings : ?Nat64;
    createdBy : Principal;
  };

  module Cart {
    public type Item = {
      productId : Text;
      quantity : Nat;
    };
  };

  module Wishlist {
    public func compare(wishlist1 : Wishlist, wishlist2 : Wishlist) : Order.Order {
      switch (wishlist1.userId.compare(wishlist2.userId)) {
        case (#equal) {
          let products1 = wishlist1.products;
          let products2 = wishlist2.products;
          let minLength = if (products1.size() < products2.size()) {
            products1.size();
          } else {
            products2.size();
          };
          var i = 0;
          while (i < minLength) {
            switch (products1.at(i).compare(products2.at(i))) {
              case (#equal) { i += 1 };
              case (order) { return order };
            };
          };
          Nat.compare(products1.size(), products2.size());
        };
        case (order) { order };
      };
    };
  };

  type Wishlist = {
    userId : Principal;
    products : List.List<Text>;
  };

  type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  let products = Map.empty<Text, Product>();
  let carts = Map.empty<Principal, Map.Map<Text, Nat>>();
  let wishlists = Map.empty<Principal, List.List<Text>>();
  let newsletterSubscriptions = Map.empty<Text, Bool>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  //
  // User Profile Functions
  //

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  //
  // Product Management Functions
  //

  public shared ({ caller }) func createProduct(
    id : Text,
    name : Text,
    category : Text,
    price : Product.Price,
    emoji : Text,
    seller : Text,
    location : Text,
    rating : ?Nat,
    reviews : [Product.Review],
    badge : ?Text,
    savings : ?Nat64
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };

    if (products.get(id) != null) {
      Runtime.trap("Product with this ID already exists");
    };

    let product : Product = {
      id;
      name;
      category;
      price;
      emoji;
      seller;
      location;
      rating;
      reviews;
      badge;
      savings;
      createdBy = caller;
    };

    products.add(id, product);
  };

  public shared ({ caller }) func updateProduct(
    id : Text,
    name : Text,
    category : Text,
    price : Product.Price,
    emoji : Text,
    seller : Text,
    location : Text,
    rating : ?Nat,
    reviews : [Product.Review],
    badge : ?Text,
    savings : ?Nat64
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    switch (products.get(id)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?existingProduct) {
        let updatedProduct : Product = {
          id;
          name;
          category;
          price;
          emoji;
          seller;
          location;
          rating;
          reviews;
          badge;
          savings;
          createdBy = existingProduct.createdBy;
        };
        products.add(id, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };

    switch (products.get(id)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?_) { products.remove(id) };
    };
  };

  public query func getProduct(id : Text) : async ?Product {
    products.get(id);
  };

  public query func getAllProducts() : async [Product] {
    products.toArray().map(func(entry : (Text, Product)) : Product { entry.1 });
  };

  public query func getProductsByCategory(category : Text) : async [Product] {
    products.toArray()
      .filter(func(entry : (Text, Product)) : Bool { entry.1.category == category })
      .map(func(entry : (Text, Product)) : Product { entry.1 });
  };

  //
  // Cart Functions
  //

  public shared ({ caller }) func addToCart(productId : Text, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Must be logged in to add to cart");
    };

    let product = products.get(productId);
    if (product == null) { Runtime.trap("Product does not exist") };

    let cart = switch (carts.get(caller)) {
      case (?existing) { existing };
      case (null) { Map.empty<Text, Nat>() };
    };

    switch (cart.get(productId)) {
      case (?existingQuantity) {
        cart.add(productId, existingQuantity + quantity);
      };
      case (null) { cart.add(productId, quantity) };
    };

    carts.add(caller, cart);
  };

  public shared ({ caller }) func removeFromCart(productId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Must be logged in to remove from cart");
    };

    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart does not exist") };
      case (?cart) {
        if (cart.get(productId) == null) {
          Runtime.trap("Product not in cart");
        };
        cart.remove(productId);
        carts.add(caller, cart);
      };
    };
  };

  public shared ({ caller }) func updateCartQuantity(productId : Text, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Must be logged in to update cart");
    };

    if (quantity == 0) {
      Runtime.trap("Quantity must be greater than 0. Use removeFromCart to remove items.");
    };

    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart does not exist") };
      case (?cart) {
        if (cart.get(productId) == null) {
          Runtime.trap("Product not in cart");
        };
        cart.add(productId, quantity);
        carts.add(caller, cart);
      };
    };
  };

  public query ({ caller }) func getCart() : async [(Text, Nat)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Must be logged in to view cart");
    };
    switch (carts.get(caller)) {
      case (?cart) { cart.toArray() };
      case (null) { [] };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Must be logged in to clear cart");
    };
    carts.remove(caller);
  };

  //
  // Wishlist Functions
  //

  public shared ({ caller }) func addToWishlist(productId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Must be logged in to add to wishlist");
    };

    let product = products.get(productId);
    if (product == null) { Runtime.trap("Product does not exist") };

    let wishlist = switch (wishlists.get(caller)) {
      case (?w) { w };
      case (null) { List.empty<Text>() };
    };

    let exists = wishlist.find(func(id) { id == productId });
    if (exists != null) { Runtime.trap("Product already in wishlist") };

    wishlist.add(productId);
    wishlists.add(caller, wishlist);
  };

  public shared ({ caller }) func removeFromWishlist(productId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Must be logged in to remove from wishlist");
    };

    switch (wishlists.get(caller)) {
      case (null) { Runtime.trap("Wishlist does not exist") };
      case (?wishlist) {
        switch (wishlist.find(func(id) { id == productId })) {
          case (null) { Runtime.trap("Product not in wishlist") };
          case (?_) {
            let newWishlist = wishlist.filter(func(id) { id != productId });
            wishlists.add(caller, newWishlist);
          };
        };
      };
    };
  };

  public query ({ caller }) func getWishlist() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Must be logged in to view wishlist");
    };
    switch (wishlists.get(caller)) {
      case (?wishlist) { wishlist.toArray() };
      case (null) { [] };
    };
  };

  //
  // Newsletter Functions
  //

  public shared func subscribeNewsletter(email : Text) : async () {
    // No authorization check - anyone including guests can subscribe
    newsletterSubscriptions.add(email, true);
  };

  public query ({ caller }) func getNewsletterSubscriptions() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view newsletter subscriptions");
    };
    newsletterSubscriptions.toArray().map(func(entry : (Text, Bool)) : Text { entry.0 });
  };
};
