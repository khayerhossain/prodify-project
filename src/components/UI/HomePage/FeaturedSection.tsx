"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  model: string;
  brand: string;
  performance: string;
  country: string;
  image: string;
};

const FeaturedSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data.slice(0, 8));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-10">Loading Featured...</p>;

  return (
    <section className="bg-gray-900 text-white py-20 px-6">
      <div className="max-w-6xl px-6 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 shadow-lg rounded-2xl overflow-hidden border border-gray-700 hover:scale-105 transform transition"
            >
              <Image
                src={product.image.trim()}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-300 mb-4">${product.price}</p>
                <Link
                  href={`/products/${product._id}`}
                  className="text-blue-400 font-medium hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
