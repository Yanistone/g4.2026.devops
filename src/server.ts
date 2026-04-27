import express, { Request, Response } from 'express';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'TP DevOps ING1 — API Docker',
    version: '1.0.0',
  });
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get('/students', (_req: Request, res: Response) => {
  res.json([
    { id: 1, name: 'Alice', promo: 'ING1' },
    { id: 2, name: 'Bob', promo: 'ING1' },
    { id: 3, name: 'Charlie', promo: 'ING1' },
  ]);
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
