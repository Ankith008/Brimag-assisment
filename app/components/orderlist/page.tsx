"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../Navbar/page";

const API_BASE = "https://brimag-assisment.onrender.com";

interface Order {
  id: number;
  PRODUCTNAME: string;
  QUANTITY: number;
  STATUS: string;
  CREATEDAT: string;
}

export default function OrderListPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <main className="px-4 py-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">All Orders</h2>
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
                    onClick={() =>
                      router.push(`/components/orderdetail?id=${o.id}`)
                    }
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
    </div>
  );
}
