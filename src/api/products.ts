import { api } from "./client";
import type { Product } from "../types";

// JSONPlaceholder отдаёт /posts с полями { id, userId, title, body }
// Мапим на наш Product
interface PostDTO {
    id: number;
    userId: number;
    title: string;
    body: string;
}

const PRICES = [54990, 8990, 12490, 38990, 7490, 12990, 3490, 23990];

function toProduct(post: PostDTO): Product {
    return {
        id: post.id,
        title: post.title.charAt(0).toUpperCase() + post.title.slice(1),
        price: PRICES[(post.id - 1) % PRICES.length],
        inStock: post.id % 2 === 1,
    };
}

export const productsApi = {
    list: async () => {
        const posts = await api.get<PostDTO[]>("/posts");
        return posts.slice(0, 8).map(toProduct);
    },
    create: (data: Omit<Product, "id">) =>
        api.post<PostDTO>("/posts", {
            title: data.title,
            body: String(data.price),
            userId: data.inStock ? 1 : 0,
        }),
    update: (id: number, data: Partial<Product>) =>
        api.put<PostDTO>(`/posts/${id}`, {
            title: data.title,
            body: String(data.price),
        }),
    remove: (id: number) => api.delete<Record<string, never>>(`/posts/${id}`),
};