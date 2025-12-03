import Navbar from "./components/Navbar/page";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <Navbar />
      <main className="flex items-center justify-center px-4 py-10">
        <div className="max-w-xl w-full bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 text-center shadow-xl">
          <h2 className="text-2xl font-semibold mb-3">
            Order Management Dashboard
          </h2>
          <p className="text-zinc-400 mb-6 text-sm">
            Add new orders, view all orders, check order details and update
            status using the menu above.
          </p>
          <p className="text-xs text-zinc-500">
            Backend: Express + MySQL • Frontend: Next.js + Tailwind
          </p>
        </div>
      </main>
    </div>
  );
}
