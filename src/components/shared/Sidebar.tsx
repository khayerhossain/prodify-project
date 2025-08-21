import Link from "next/link";
import { FaHome, FaPlusCircle} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="min-h-screen p-4 rounded-xl bg-gray-900 text-white">
      <ul className="space-y-4">
        <li>
          <Link
            href="/"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700"
          >
            <FaHome className="h-5 w-5" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/addproduct"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700"
          >
            <FaPlusCircle className="h-5 w-5" />
            <span>Add Product</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
