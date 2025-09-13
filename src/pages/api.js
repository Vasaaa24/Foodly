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
