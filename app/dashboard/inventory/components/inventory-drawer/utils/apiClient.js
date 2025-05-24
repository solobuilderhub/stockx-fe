"use client";

// Mock API client for development and static data
export const apiClient = {
    get: (url, mockData) => {
        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: mockData });
            }, 300);
        });
    },

    post: (url, data, mockResponse) => {
        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: mockResponse || { success: true } });
            }, 300);
        });
    },

    put: (url, data, mockResponse) => {
        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: mockResponse || { success: true } });
            }, 300);
        });
    },

    delete: (url, mockResponse) => {
        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: mockResponse || { success: true } });
            }, 300);
        });
    },
};
