// Změna stavu objednávky
export async function updateOrderStatus(id, status) {
  const res = await fetch(`${API_URL.replace(/\/orders$/, '')}/orders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  return await res.json();
}
// API helper pro ukládání objednávek
export const API_URL = "https://foodly-0ucr.onrender.com/orders";

export async function createOrder(order) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return await res.json();
}
