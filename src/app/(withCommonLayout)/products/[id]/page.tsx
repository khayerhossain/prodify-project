"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import LoadingPage from "@/app/loading";

type Product = {
    id: string;
    name: string;
    price: number;
    description: string;
    model: string;
    brand: string;
    performance: string;
    country: string;
    image: string;
};

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);


    if (loading) return <LoadingPage />;
    if (!product) return <p className="text-center mt-20 text-white">Product not found</p>;

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 text-white">
            {/* Product Title */}
            <h1 className="text-4xl ml-0 lg:ml-20 font-bold mb-6">{product.name}</h1>

            <div className="flex flex-col md:flex-row gap-10">
                {/* Image Section */}
                <div className="md:w-1/2 flex justify-center">
                    <div className="bg-gray-800 p-4 rounded-xl shadow-lg w-full max-w-sm">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={350}
                            height={240}
                            className="rounded-lg object-cover w-full h-[240px]"
                        />
                    </div>
                </div>

                {/* Details Section */}
                <div className="md:w-1/2">
                    <p className="text-xl font-semibold mb-2">Price: ${product.price}</p>
                    <p className="mb-4">{product.description}</p>
                    <ul className="space-y-2">
                        <li><strong>Brand:</strong> {product.brand}</li>
                        <li><strong>Model:</strong> {product.model}</li>
                        <li><strong>Performance:</strong> {product.performance}</li>
                        <li><strong>Country:</strong> {product.country}</li>
                    </ul>

                    {/* Back Button - Details*/}
                    <div className="mt-6">
                        <Link
                            href="/"
                            className="inline-block px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            ⬅ Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
