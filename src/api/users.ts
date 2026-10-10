import { api } from "./client";
import type { User } from "../types";

export const usersApi = {
    list: () => api.get<User[]>("/users"),
    get: (id: number) => api.get<User>(`/users/${id}`),
    create: (data: Omit<User, "id">) => api.post<User>("/users", data),
    update: (id: number, data: Partial<User>) =>
        api.put<User>(`/users/${id}`, data),
    remove: (id: number) => api.delete<Record<string, never>>(`/users/${id}`),
};