import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/health', (_, res) => res.json({ status: 'api-gateway ok' }));
app.listen(PORT, () => console.log('api-gateway running on', PORT));
