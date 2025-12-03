"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../Navbar/page";

const API_BASE = "http://localhost:4000";

interface Order {
  id: number;
  PRODUCTNAME: string;
  QUANTITY: number;
  STATUS: string;
  CREATEDAT: string;
}

export default function OrderDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) {
      setMessage("No order id provided");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API_BASE}/orders/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        const row = Array.isArray(data) ? data[0] : data;
        setOrder(row);
      } catch (err) {
        console.error(err);
        setMessage("Order not found");
      }
      setLoading(false);
    };

    fetchOrder();
  }, [id]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <main className="px-4 py-10 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold text-center mb-4">Order Detail</h2>

        {loading ? (
          <p className="text-sm text-zinc-400 text-center">Loading...</p>
        ) : message ? (
          <p className="text-sm text-zinc-400 text-center">{message}</p>
        ) : order ? (
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 text-sm space-y-3 shadow-xl">
            <div className="flex justify-between">
              <span className="text-zinc-400">ID</span>
              <span>{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Product</span>
              <span>{order.PRODUCTNAME}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Quantity</span>
              <span>{order.QUANTITY}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Status</span>
              <span>{order.STATUS}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Created</span>
              <span className="text-xs">
                {new Date(order.CREATEDAT).toLocaleString()}
              </span>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
