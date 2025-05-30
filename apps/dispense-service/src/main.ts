import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/health', (_, res) => res.json({ status: 'dispense-service ok' }));
app.listen(PORT, () => console.log('dispense-service running on', PORT));
