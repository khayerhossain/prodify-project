"use client";

import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const AddProductPage = () => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        releaseDate: "",
        model: "",
        brand: "",
        performance: "",
        country: "",
        image: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("/api/products", product);
            toast.success("Product added successfully!");
            setProduct({
                name: "",
                price: "",
                description: "",
                releaseDate: "",
                model: "",
                brand: "",
                performance: "",
                country: "",
                image: "",
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to add product.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex justify-center items-center p-3">
            <Toaster position="top-right" />
            <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-lg">
                <h1 className="text-2xl font-semibold mb-4 text-center">Add New Product</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Flex row for large screens, column for small screens */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {Object.keys(product).map((key) => {
                            if (key === "description") return null;
                            return (
                                <div key={key} className="flex flex-col">
                                    <label className="mb-1 text-sm capitalize">{key}</label>
                                    <input
                                        type={key === "price" ? "number" : "text"}
                                        name={key}
                                        value={product[key as keyof typeof product]}
                                        onChange={handleChange}
                                        className="w-full px-2 py-1.5 rounded-md bg-gray-700 text-white text-sm border border-gray-600 focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Description textarea full width */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm capitalize">description</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className="w-full px-2 py-1.5 rounded-md bg-gray-700 text-white text-sm border border-gray-600 focus:outline-none focus:border-blue-500"
                            rows={3}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 px-4 py-2 rounded-md text-sm font-medium shadow"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;
