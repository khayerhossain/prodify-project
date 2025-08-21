import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import Image from "next/image";
import Link from "next/link";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center">
        {/* Profile Image */}
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt="user image"
            width={100}
            height={100}
            className="rounded-full mx-auto border-4 border-purple-500 shadow-lg"
          />
        ) : (
          <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-3xl font-bold text-white">
            {session?.user?.name?.[0] || "?"}
          </div>
        )}

        {/* Greeting */}
        <h1 className="text-3xl font-bold text-gray-800 mt-4">
          Welcome, {session?.user?.name || "Guest"} 👋
        </h1>
        <p className="text-gray-600 mt-2">
          We’re glad to have you here. Explore your dashboard and manage your
          journey with us!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
          <Link
            href="/"
            className="px-5 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
          >
            Back Home
          </Link>
         
          <Link
            href="/api/auth/signout"
            className="px-5 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
