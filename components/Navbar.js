import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthSession } from "../hooks/useAuthSession";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const router = useRouter();
  const session = useAuthSession();

  const isActive = (route) => router.pathname === route;

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
  };

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
          {session ? (
            <button
              onClick={handleSignOut}
              className="bg-white text-blue-500 py-2 px-4 rounded"
            >
              Sign Out
            </button>
          ) : (
            <Link href="/login" passHref>
              <button className="bg-white text-blue-500 py-2 px-4 rounded">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}