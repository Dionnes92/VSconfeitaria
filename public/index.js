const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

initializeApp({
  credential: applicationDefault(),
  storageBucket: 'gs://confeitaria-cbfd3.firebasestorage.app' // ex: 'meuapp.appspot.com'
});

const bucket = getStorage().bucket();
const db = getFirestore();

app.post('/upload', upload.single('image'), async (req, res) => {
  const { name, price } = req.body;
  const image = req.file;

  if (!image) return res.status(400).json({ message: 'Imagem ausente' });

  const imageName = uuidv4() + path.extname(image.originalname);

  const file = bucket.file(`produtos/${imageName}`);
  const blobStream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  });

  blobStream.on('error', (err) => res.status(500).json({ message: 'Erro no upload', error: err }));

  blobStream.on('finish', async () => {
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/produtos/${imageName}`;

    await db.collection('produtos').add({
      name,
      price: parseFloat(price),
      imageUrl
    });

    res.status(200).json({ message: 'Produto cadastrado com sucesso!' });
  });

  blobStream.end(image.buffer);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
