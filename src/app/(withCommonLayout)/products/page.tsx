"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

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

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products"); // relative URL works in client component
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded"
            />
            <div className="mt-2">
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-gray-600 text-sm">
                {product.brand} | {product.model}
              </p>
              <p className="font-bold mt-1">${product.price}</p>
            </div>
            <Link
              href={`/products/${product._id}`}
              className="mt-4 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
