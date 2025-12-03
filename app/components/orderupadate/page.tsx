"use client";

import { FormEvent, useEffect, useState } from "react";
import Navbar from "../Navbar/page";

const API_BASE = "http://localhost:4000";

interface Order {
  id: number;
  PRODUCTNAME: string;
  QUANTITY: number;
  STATUS: string;
  CREATEDAT: string;
}

export default function OrderUpdatePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState("Pending");
  const [message, setMessage] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const load = async () => {
      await fetchOrders();
    };
    load();
  }, []);

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setStatus(order.STATUS);
    setMessage("");
  };

  const handleClose = () => {
    setSelectedOrder(null);
    setMessage("");
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      const res = await fetch(`${API_BASE}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedOrder.id, status }),
      });

      if (!res.ok) throw new Error("Failed");

      setMessage("✅ Order status updated");

      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedOrder.id ? { ...o, STATUS: status } : o
        )
      );
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update order");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative">
      <Navbar />

      <main
        className={`px-4 py-8 max-w-6xl mx-auto transition ${
          selectedOrder ? "blur-sm" : ""
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Update Order Status</h2>
          <button
            onClick={fetchOrders}
            className="text-xs px-3 py-1 rounded-lg bg-zinc-800 border border-zinc-700 hover:bg-zinc-700"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-zinc-400">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-zinc-400">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto border border-zinc-800 rounded-2xl">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/80">
                <tr>
                  <th className="px-3 py-2 text-left">ID</th>
                  <th className="px-3 py-2 text-left">Product</th>
                  <th className="px-3 py-2 text-left">Qty</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => handleSelectOrder(o)}
                    className="border-t border-zinc-800 hover:bg-zinc-900/70 cursor-pointer"
                  >
                    <td className="px-3 py-2">{o.id}</td>
                    <td className="px-3 py-2">{o.PRODUCTNAME}</td>
                    <td className="px-3 py-2">{o.QUANTITY}</td>
                    <td className="px-3 py-2">
                      <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs">
                        {o.STATUS}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs text-zinc-400">
                      {new Date(o.CREATEDAT).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {selectedOrder && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <div className="relative z-50 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">
                Update Order #{selectedOrder.id}
              </h3>
              <button
                onClick={handleClose}
                className="text-xs text-zinc-400 hover:text-zinc-200"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400 mb-4">
              {selectedOrder.PRODUCTNAME} • Qty: {selectedOrder.QUANTITY}
            </p>

            <form onSubmit={handleUpdate} className="space-y-4 text-sm">
              <div className="space-y-1">
                <label className="block text-zinc-300">Current Status</label>
                <div className="rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2">
                  {selectedOrder.STATUS}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-zinc-300">New Status</label>
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
                Update Status
              </button>

              {message && (
                <p className="text-xs text-center mt-2 text-zinc-300">
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
