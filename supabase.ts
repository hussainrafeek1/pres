import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-[500px]">
        <h1 className="text-4xl font-bold mb-4">
          Prescription AI
        </h1>

        <p className="text-gray-500 mb-8">
          Handwritten prescription digitization system.
        </p>

        <Link
          href="/upload"
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Upload Prescription
        </Link>
      </div>
    </main>
  );
}
