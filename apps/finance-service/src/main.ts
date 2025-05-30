import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/health', (_, res) => res.json({ status: 'finance-service ok' }));
app.listen(PORT, () => console.log('finance-service running on', PORT));
