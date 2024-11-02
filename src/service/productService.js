// src/service/productService.js
export const searchProducts = async (queryParams) => {
    const { name, rating, minPrice, maxPrice } = queryParams;
    const query = new URLSearchParams();

    if (name) query.append("name", name);
    if (rating) query.append("rating", rating);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);

    try {
        const response = await fetch(`/api/products/search?${query.toString()}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
