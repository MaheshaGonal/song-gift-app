"use client";

import { useEffect, useState } from "react";
import type { Order } from "@/lib/supabase";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deliveryDrafts, setDeliveryDrafts] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_password");
    if (saved) {
      setPassword(saved);
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed) loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  async function loadOrders() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/orders", {
      headers: { "x-admin-password": password },
    });
    if (res.status === 401) {
      setError("Wrong password.");
      setAuthed(false);
      sessionStorage.removeItem("admin_password");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setOrders(data.orders || []);
    setLoading(false);
  }

  function login() {
    sessionStorage.setItem("admin_password", password);
    setAuthed(true);
  }

  async function deliver(orderId: string) {
    const url = deliveryDrafts[orderId];
    if (!url) return;
    await fetch("/api/admin/deliver", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ orderId, deliveryUrl: url, status: "delivered" }),
    });
    loadOrders();
  }

  if (!authed) {
    return (
      <div style={styles.loginWrap}>
        <div style={styles.loginCard}>
          <h1 style={styles.h1}>Admin</h1>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            style={styles.input}
          />
          <button onClick={login} style={styles.button}>
            Enter
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.dashWrap}>
      <div style={styles.dashHeader}>
        <h1 style={styles.h1}>Orders</h1>
        <button onClick={loadOrders} style={styles.buttonSmall}>
          Refresh
        </button>
      </div>
      {loading && <p>Loading…</p>}
      {orders.length === 0 && !loading && <p>No orders yet.</p>}

      <div style={styles.list}>
        {orders.map((o) => (
          <div key={o.id} style={styles.card}>
            <div style={styles.cardTop}>
              <div>
                <strong>{o.names}</strong> — {o.occasion} —{" "}
                {o.package === "song" ? "Song only" : "Song + video"} — ₹
                {o.price_inr}
              </div>
              <div style={statusStyle(o.payment_status)}>
                {o.payment_status}
              </div>
            </div>
            <p style={styles.story}>{o.story}</p>
            <div style={styles.meta}>
              Contact: {o.contact} · Delivery: {o.delivery_status} ·{" "}
              {new Date(o.created_at).toLocaleString()}
            </div>
            {o.delivery_url && (
              <div style={styles.meta}>
                Delivered file:{" "}
                <a href={o.delivery_url} target="_blank" rel="noreferrer">
                  {o.delivery_url}
                </a>
              </div>
            )}
            {o.payment_status === "paid" && o.delivery_status !== "delivered" && (
              <div style={styles.deliverRow}>
                <input
                  type="text"
                  placeholder="Paste finished file link (e.g. Google Drive / Supabase Storage URL)"
                  value={deliveryDrafts[o.id] || ""}
                  onChange={(e) =>
                    setDeliveryDrafts({
                      ...deliveryDrafts,
                      [o.id]: e.target.value,
                    })
                  }
                  style={styles.input}
                />
                <button onClick={() => deliver(o.id)} style={styles.buttonSmall}>
                  Mark delivered
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function statusStyle(status: string): React.CSSProperties {
  const base: React.CSSProperties = {
    fontSize: 12,
    padding: "3px 10px",
    borderRadius: 12,
    fontWeight: 600,
    textTransform: "capitalize" as const,
  };
  if (status === "paid") return { ...base, background: "#dff5df", color: "#1f6b1f" };
  if (status === "failed") return { ...base, background: "#fde2e2", color: "#9c1f1f" };
  return { ...base, background: "#f2ead9", color: "#8a6d1f" };
}

const styles: Record<string, React.CSSProperties> = {
  loginWrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F7F1E4",
    fontFamily: "system-ui, sans-serif",
  },
  loginCard: {
    background: "#fff",
    padding: 32,
    borderRadius: 6,
    width: 320,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  h1: { fontFamily: "Georgia, serif", marginBottom: 16 },
  input: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: 12,
    border: "1px solid #ccc",
    borderRadius: 4,
    fontSize: 14,
  },
  button: {
    width: "100%",
    padding: "10px 12px",
    background: "#AF3A34",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: 600,
  },
  buttonSmall: {
    padding: "8px 14px",
    background: "#AF3A34",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 13,
    whiteSpace: "nowrap",
  },
  error: { color: "#9c1f1f", marginTop: 8, fontSize: 13 },
  dashWrap: {
    minHeight: "100vh",
    background: "#F7F1E4",
    fontFamily: "system-ui, sans-serif",
    padding: "32px 20px",
    maxWidth: 900,
    margin: "0 auto",
  },
  dashHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  list: { display: "flex", flexDirection: "column", gap: 16 },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 6,
    border: "1px solid rgba(0,0,0,0.08)",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  story: { fontStyle: "italic", color: "#5b4c3e", margin: "10px 0" },
  meta: { fontSize: 12, color: "#8a7c70", marginTop: 6 },
  deliverRow: { display: "flex", gap: 8, marginTop: 14 },
};
