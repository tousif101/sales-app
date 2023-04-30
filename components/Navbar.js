import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;

  return (
    <nav className="bg-blue-500 p-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex">
          <Link href="/" passHref>
          <span className="text-white text-xl font-semibold cursor-pointer">
              Smarter Sales
            </span>
          </Link>
          <Link href="/transcripts" passHref>
            <span
              className={`text-white ml-6 cursor-pointer ${
                isActive("/transcripts") && "underline"
              }`}
            >
              Transcripts
            </span>
          </Link>
          <Link href="/analysis" passHref>
            <span
              className={`text-white ml-6 cursor-pointer ${
                isActive("/analysis") && "underline"
              }`}
            >
              Analysis
            </span>
          </Link>
          <Link href="/upload" passHref>
            <span
              className={`text-white ml-6 cursor-pointer ${
                isActive("/upload") && "underline"
              }`}
            >
              Upload
            </span>
          </Link>
        </div>
        <div>
          <Link href="/login" passHref>
            <button className="bg-white text-blue-500 py-2 px-4 rounded">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
