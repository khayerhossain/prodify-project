/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("ProdifyDB");
        const usersCollection = db.collection("users");

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await usersCollection.insertOne({
            name: username,
            email,
            password: hashedPassword,
            image: "https://i.ibb.co/default-profile.png", // default image
            createdAt: new Date(),
            provider: "credentials",
        });


        return NextResponse.json({ message: "User registered successfully", userId: result.insertedId }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: "Error registering user", error: error.message }, { status: 500 });
    }
}
