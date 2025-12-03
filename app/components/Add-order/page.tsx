"use client";

import { useState } from "react";
import Navbar from "../Navbar/page";
import { useRouter } from "next/navigation";

const API_BASE = "https://brimag-assisment.onrender.com";

export default function AddOrderPage() {
  const [productname, setProductname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("Pending");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/addingorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productname: productname,
          quantity: Number(quantity),
          status: status,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setMessage("✅ Order added successfully");
      setTimeout(() => {
        router.push("/components/orderlist");
      }, 800);
      setProductname("");
      setQuantity("");
      setStatus("Pending");
    } catch (err) {
      console.log(err);
      setMessage("❌ Failed to add order");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <main className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl"
        >
          <h2 className="text-xl font-semibold text-center">Add New Order</h2>

          <div className="space-y-1 text-sm">
            <label className="block text-zinc-300">Product Name</label>
            <input
              value={productname}
              onChange={(e) => setProductname(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm outline-none focus:border-zinc-400"
              placeholder="Ex: Laptop"
              required
            />
          </div>

          <div className="space-y-1 text-sm">
            <label className="block text-zinc-300">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm outline-none focus:border-zinc-400"
              placeholder="Ex: 2"
              min={1}
              required
            />
          </div>

          <div className="space-y-1 text-sm">
            <label className="block text-zinc-300">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm outline-none focus:border-zinc-400"
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-2 rounded-lg bg-zinc-100 text-zinc-900 py-2 text-sm font-semibold hover:bg-white transition"
          >
            Add Order
          </button>

          {message && (
            <p className="text-xs text-center mt-2 text-zinc-300">{message}</p>
          )}
        </form>
      </main>
    </div>
  );
}
