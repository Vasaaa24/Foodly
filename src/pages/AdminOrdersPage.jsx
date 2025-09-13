
import { useEffect, useState } from "react";
import { API_URL, updateOrderStatus } from "./api";

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
    <div className="kitchen-orders-table">
      <h2>Kuchyň – Přehled objednávek</h2>
      {loading ? (
        <div className="kitchen-loading">Načítání…</div>
      ) : orders.length === 0 ? (
        <div className="kitchen-empty">Žádné objednávky.</div>
      ) : (
        <div className="kitchen-table-wrapper">
          <table>
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
                  <td className="kitchen-table">{order.table}</td>
                  <td className="kitchen-items">
                    {order.items.map((item, i) => (
                      <div key={i} className="kitchen-item-row">
                        <span className="kitchen-item-name">{item.name}</span>
                        <span className="kitchen-item-qty">x{item.quantity}</span>
                      </div>
                    ))}
                  </td>
                  <td className="kitchen-customer">{order.customerName || "-"}</td>
                  <td className="kitchen-total">{order.total} Kč</td>
                  <td className="kitchen-status">
                    <select
                      value={order.status}
                      onChange={async (e) => {
                        const newStatus = e.target.value;
                        await updateOrderStatus(order.id, newStatus);
                        setOrders((prev) =>
                          prev.map((o) =>
                            o.id === order.id ? { ...o, status: newStatus } : o
                          )
                        );
                      }}
                      className={`status-select status-${order.status}`}
                    >
                      <option value="nová">nová</option>
                      <option value="priprava">v přípravě</option>
                      <option value="hotovo">hotovo</option>
                    </select>
                  </td>
                  <td className="kitchen-time">{new Date(order.createdAt).toLocaleTimeString("cs-CZ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
