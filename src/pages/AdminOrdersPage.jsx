
import { useEffect, useState } from "react";
import { API_URL } from "./api";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    // Optional: interval pro auto-refresh
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setOrders(data.reverse()); // nejnovější nahoře
    } catch (e) {
      setOrders([]);
    }
    setLoading(false);
  };

  return (
    <div className="admin-orders-page">
      <h2>Všechny objednávky</h2>
      {loading ? (
        <p>Načítání...</p>
      ) : orders.length === 0 ? (
        <p>Žádné objednávky.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Stůl</th>
              <th>Položky</th>
              <th>Jméno</th>
              <th>Celkem</th>
              <th>Stav</th>
              <th>Čas</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <b>{order.table}</b>
                </td>
                <td>
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.name} x{item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.customerName || "-"}</td>
                <td>{order.total} Kč</td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleString("cs-CZ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrdersPage;
