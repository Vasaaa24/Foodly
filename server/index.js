import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { nanoid } from 'nanoid';

const app = express();
const port = 4000;

const adapter = new JSONFile('orders.json');
const db = new Low(adapter, { orders: [] });

await db.read();
if (!db.data) db.data = { orders: [] };

app.use(cors());
app.use(express.json());

// Získat všechny objednávky
app.get('/orders', async (req, res) => {
  await db.read();
  res.json(db.data.orders);
});

// Přidat novou objednávku
app.post('/orders', async (req, res) => {
  const { table, items, total, customerName } = req.body;
  const order = {
    id: nanoid(),
    table,
    items,
    total,
    customerName,
    status: 'nová',
    createdAt: new Date().toISOString()
  };
  db.data.orders.push(order);
  await db.write();
  res.status(201).json(order);
});

// Změnit stav objednávky
app.patch('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await db.read();
  const order = db.data.orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Objednávka nenalezena' });
  order.status = status;
  await db.write();
  res.json(order);
});

app.listen(port, () => {
  console.log(`Foodly backend běží na http://localhost:${port}`);
});
