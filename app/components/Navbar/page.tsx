"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-zinc-900 text-white px-6 py-3 flex items-center justify-between shadow-md">
      <h1 className="text-xl font-semibold tracking-wide">Brimag Orders</h1>

      <div className="flex gap-4 text-sm">
        <Link href="/" className="hover:text-zinc-300">
          Home
        </Link>
        <Link href="/components/Add-order" className="hover:text-zinc-300">
          Add Order
        </Link>
        <Link href="/components/orderlist" className="hover:text-zinc-300">
          Order List
        </Link>

        <Link href="/components/orderupadate" className="hover:text-zinc-300">
          Update Order
        </Link>
      </div>
    </nav>
  );
}
