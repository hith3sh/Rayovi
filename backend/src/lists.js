const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = '240624725627-gpainmsjc1am19pks35ar4erl46ph7s9.apps.googleusercontent.com';
const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Get all lists
router.get('/', async (req, res) => {
  // TODO: Fetch lists from database
  res.json([]);
});

// Get a single list by ID
router.get('/:id', async (req, res) => {
  // TODO: Fetch a single list by ID from database
  res.json({});
});

// Create a new list
router.post('/', async (req, res) => {
  // Authenticate user
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const idToken = authHeader.split(' ')[1];
  let userId;
  try {
    const ticket = await oAuth2Client.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    userId = payload.sub;
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired ID token' });
  }
  const { name, description, tags, visibility, ranked, videos } = req.body;
  if (!name || !Array.isArray(videos) || videos.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    // Upsert videos (create if not exist)
    const videoUpserts = await Promise.all(
      videos.map(async (v) => {
        return prisma.video.upsert({
          where: { youtubeId: v.youtubeId },
          update: { title: v.title, thumbnail: v.thumbnail },
          create: { youtubeId: v.youtubeId, title: v.title, thumbnail: v.thumbnail },
        });
      })
    );
    // Create the list and connect videos with order
    const list = await prisma.list.create({
      data: {
        name,
        description,
        tags,
        visibility,
        ranked,
        user: { connect: { id: userId } },
        videos: {
          create: videos.map((v, idx) => ({
            video: { connect: { youtubeId: v.youtubeId } },
            position: ranked ? (v.position ?? idx + 1) : null,
          })),
        },
      },
      include: {
        videos: { include: { video: true } },
      },
    });
    res.status(201).json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create list' });
  }
});

// Update a list by ID
router.put('/:id', async (req, res) => {
  // TODO: Update a list in the database
  res.json({});
});

// Delete a list by ID
router.delete('/:id', async (req, res) => {
  // TODO: Delete a list from the database
  res.status(204).send();
});

module.exports = router; 