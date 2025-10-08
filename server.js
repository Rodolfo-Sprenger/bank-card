const express = require('express');
const next = require('next');
const cors = require('cors');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = './db.json';

// Função para ler os cartões do ficheiro JSON
function lerDaBD() {
  if (!fs.existsSync(DB_FILE)) return { cards: [] };
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  return data.cards ? data : { cards: [] };
}

// Função para guardar os cartões no ficheiro JSON
function guardarNaBD(cards) {
  const data = { cards };
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ===== ROTAS DA API REST PARA CARTÕES =====

// GET /api/cards - Listar todos os cartões
app.get('/api/cards', (req, res) => {
  const db = lerDaBD();
  res.json(db.cards);
});

// GET /api/cards/:id - Obter cartão por ID
app.get('/api/cards/:id', (req, res) => {
  const db = lerDaBD();
  const card = db.cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ erro: 'Cartão não encontrado' });
  res.json(card);
});

// POST /api/cards - Criar novo cartão
app.post('/api/cards', (req, res) => {
  const db = lerDaBD();
  const { nome, numero, validade, cor } = req.body;

  if (!nome || !numero || !validade) {
    return res.status(400).json({ erro: 'Campos obrigatórios em falta' });
  }

  const novoCard = {
    id: db.cards.length ? db.cards[db.cards.length - 1].id + 1 : 1,
    nome,
    numero,
    validade,
    cor: cor || 'from-indigo-500 to-blue-700'
  };

  db.cards.push(novoCard);
  guardarNaBD(db.cards);

  res.status(201).json(novoCard);
});

// PUT /api/cards/:id - Atualizar cartão existente
app.put('/api/cards/:id', (req, res) => {
  const db = lerDaBD();
  const index = db.cards.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ erro: 'Cartão não encontrado' });

  db.cards[index] = { ...db.cards[index], ...req.body };
  guardarNaBD(db.cards);

  res.json(db.cards[index]);
});

// DELETE /api/cards/:id - Eliminar cartão
app.delete('/api/cards/:id', (req, res) => {
  const db = lerDaBD();
  const index = db.cards.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ erro: 'Cartão não encontrado' });

  const removido = db.cards.splice(index, 1)[0];
  guardarNaBD(db.cards);

  res.json({ mensagem: 'Cartão eliminado com sucesso', removido });
});

// ===== INTEGRAÇÃO NEXT.JS + EXPRESS =====
app.use((req, res) => handle(req, res));

// ===== INICIALIZAÇÃO DO SERVIDOR =====
const PORT = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor Next.js + Express a correr em http://localhost:${PORT}`);
    console.log(`💳 API de cartões disponível em http://localhost:${PORT}/api/cards`);
  });
});
