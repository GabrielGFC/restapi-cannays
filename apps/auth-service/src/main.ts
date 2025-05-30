import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/health', (_, res) => res.json({ status: 'auth-service ok' }));
app.listen(PORT, () => console.log('auth-service running on', PORT));
