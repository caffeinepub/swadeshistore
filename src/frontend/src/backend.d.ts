import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: string;
    reviews: Array<Review>;
    name: string;
    createdBy: Principal;
    seller: string;
    emoji: string;
    category: string;
    badge?: string;
    savings?: bigint;
    rating?: bigint;
    price: Price;
    location: string;
}
export interface Price {
    discounted?: bigint;
    original: bigint;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export interface Review {
    content: string;
    user: Principal;
    rating: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addToCart(productId: string, quantity: bigint): Promise<void>;
    addToWishlist(productId: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    createProduct(id: string, name: string, category: string, price: Price, emoji: string, seller: string, location: string, rating: bigint | null, reviews: Array<Review>, badge: string | null, savings: bigint | null): Promise<void>;
    deleteProduct(id: string): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<[string, bigint]>>;
    getNewsletterSubscriptions(): Promise<Array<string>>;
    getProduct(id: string): Promise<Product | null>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWishlist(): Promise<Array<string>>;
    isCallerAdmin(): Promise<boolean>;
    removeFromCart(productId: string): Promise<void>;
    removeFromWishlist(productId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    subscribeNewsletter(email: string): Promise<void>;
    updateCartQuantity(productId: string, quantity: bigint): Promise<void>;
    updateProduct(id: string, name: string, category: string, price: Price, emoji: string, seller: string, location: string, rating: bigint | null, reviews: Array<Review>, badge: string | null, savings: bigint | null): Promise<void>;
}
