import Link from "next/link";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b w-full">
      <Link href="/" className="text-decoration-none">
        <h1 className="text-2xl font-bold">Roastify</h1>
      </Link>
      <nav>
        <Button>
          <Link href="/login">Login</Link>
        </Button>
      </nav>
    </header>
  );
};
