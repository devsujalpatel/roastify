import { Navbar } from "@/components/navbar";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-start w-screen">
      <Navbar />
      <div className="p-8 w-full h-160 flex items-center justify-center">
        <h1 className="text-3xl font-semibold">
          Welcome to Roastify! Your go-to platform for coffee enthusiasts.
        </h1>
      </div>
    </div>
  );
}
