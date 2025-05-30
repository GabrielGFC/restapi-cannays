import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/health', (_, res) => res.json({ status: 'hr-service ok' }));
app.listen(PORT, () => console.log('hr-service running on', PORT));
