/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ProdifyDB");
    const productsCollection = db.collection("products");

    const products = await productsCollection.find({}).toArray();

    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to fetch products", error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const product = await req.json(); // Form theke data

    const client = await clientPromise;
    const db = client.db("ProdifyDB");
    const productsCollection = db.collection("products");

    const result = await productsCollection.insertOne(product);

    return NextResponse.json(
      { message: "Product added successfully", productId: result.insertedId },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to add product", error: error.message },
      { status: 500 }
    );
  }
}
