import Navbar from "../../Navbar/page";

const API_BASE = "https://brimag-assisment.onrender.com";

interface Order {
  id: number;
  PRODUCTNAME: string;
  QUANTITY: number;
  STATUS: string;
  CREATEDAT: string;
}

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;

  let order: Order | null = null;
  let message = "";

  try {
    const res = await fetch(`${API_BASE}/orders/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      message = "Order not found";
    } else {
      const data = await res.json();
      const row = Array.isArray(data) ? data[0] : data;
      order = row ?? null;
      if (!order) message = "Order not found";
    }
  } catch (err) {
    console.error(err);
    message = "Order not found";
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <main className="px-4 py-10 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold text-center mb-4">Order Detail</h2>

        {message || !order ? (
          <p className="text-sm text-zinc-400 text-center">{message}</p>
        ) : (
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
        )}
      </main>
    </div>
  );
}
