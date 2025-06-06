const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

// cria pasta de upload se não existir
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
    const form = new formidable.IncomingForm({ uploadDir, keepExtensions: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ message: 'Erro ao fazer upload' }));
        return;
      }

      const nome = fields.name;
      const preco = fields.price;
      const descricao = fields.desc;
      const imagem = files.image;

      console.log('Produto:', nome, preco, descricao);
      console.log('Imagem salva como:', imagem.newFilename);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Produto salvo com sucesso!' }));
    });
  } else {
    res.writeHead(404);
    res.end('Rota não encontrada');
  }
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
