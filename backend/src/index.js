require('dotenv').config();
const express = require('express');
const app = express();
const listsRouter = require('./lists');
const { OAuth2Client } = require('google-auth-library');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Rayovi backend API!' });
});

app.use('/api/lists', listsRouter);
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID);

app.post('/api/auth/google', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: 'Missing idToken' });
  try {
    const ticket = await oAuth2Client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub, email, name } = payload;
    // Upsert user in DB
    const user = await prisma.user.upsert({
      where: { id: sub },
      update: { email, name },
      create: { id: sub, email, name },
    });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid Google ID token' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 