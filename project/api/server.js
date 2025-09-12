
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;
// Middlewares ANTES de cualquier ruta o static
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// --- USUARIOS/AGENTES ---
const USERS_PATH = path.join(__dirname, 'users.json');
const ACTIVITIES_PATH = path.join(__dirname, 'activities.json');


function readUsers() {
  if (!fs.existsSync(USERS_PATH)) return [];
  return JSON.parse(fs.readFileSync(USERS_PATH, 'utf8'));
}
function writeUsers(data) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(data, null, 2));
}




// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
  addActivity({
    type: 'login',
    message: `Acceso al panel admin: ${user.username}`,
    userId: user.id
  });
  // Para demo, solo regresa el usuario (sin token)
  res.json({ id: user.id, username: user.username, name: user.name, role: user.role });
});

// Obtener todos los usuarios (solo admin)
app.get('/users', (req, res) => {
  res.json(readUsers());
});

// Crear usuario
app.post('/users', (req, res) => {
  const users = readUsers();
  const newUser = {
    ...req.body,
    id: Date.now().toString(),
    role: req.body.role || 'agent'
  };
  users.push(newUser);
  writeUsers(users);
  addActivity({
    type: 'new_user',
    message: `Nuevo agente creado: ${newUser.username}`,
    userId: newUser.id
  });
  res.status(201).json(newUser);
});

// Editar usuario
app.put('/users/:id', (req, res) => {
  let users = readUsers();
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  users[idx] = { ...users[idx], ...req.body };
  writeUsers(users);
  addActivity({
    type: 'edit_user',
    message: `Agente editado: ${users[idx].username}`,
    userId: req.params.id
  });
  res.json(users[idx]);
});

// Eliminar usuario
app.delete('/users/:id', (req, res) => {
  let users = readUsers();
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  const deleted = users.splice(idx, 1);
  writeUsers(users);
  addActivity({
    type: 'delete_user',
    message: `Agente eliminado: ${deleted[0].username}`,
    userId: req.params.id
  });
  res.json(deleted[0]);
});


function readActivities() {
  if (!fs.existsSync(ACTIVITIES_PATH)) return [];
  return JSON.parse(fs.readFileSync(ACTIVITIES_PATH, 'utf8'));
}
function writeActivities(data) {
  fs.writeFileSync(ACTIVITIES_PATH, JSON.stringify(data, null, 2));
}
function addActivity(activity) {
  const activities = readActivities();
  activities.unshift({ ...activity, timestamp: new Date().toISOString() });
  writeActivities(activities.slice(0, 50)); // Solo las 50 más recientes
}

// Middlewares ANTES de cualquier ruta o static
app.use(cors());
app.use(express.json());

// Servir archivos estáticos de uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoint para subir imágenes
const uploadRouter = require('./upload');
app.use('/upload', uploadRouter);

const DATA_PATH = path.join(__dirname, 'properties.json');

// Helper to read/write JSON
function readProperties() {
  if (!fs.existsSync(DATA_PATH)) return [];
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
}
function writeProperties(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}


// Get all properties
app.get('/properties', (req, res) => {
  // Al leer, aseguramos que todas tengan createdAt
  let properties = readProperties();
  let changed = false;
  properties = properties.map(p => {
    if (!p.createdAt) {
      changed = true;
      return { ...p, createdAt: new Date().toISOString() };
    }
    return p;
  });
  if (changed) writeProperties(properties);
  res.json(properties);
});

// Get property by ID
app.get('/properties/:id', (req, res) => {
  const properties = readProperties();
  const idx = properties.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  // Incrementar vistas
  properties[idx].views = (properties[idx].views || 0) + 1;
  writeProperties(properties);
  addActivity({
    type: 'view_property',
    message: `Propiedad vista: ${properties[idx].title}`,
    propertyId: req.params.id
  });
  res.json(properties[idx]);
});

// Add property
app.post('/properties', (req, res) => {
  const properties = readProperties();
  const newProperty = {
    ...req.body,
    id: Date.now().toString(),
    createdAt: req.body.createdAt || new Date().toISOString(),
    views: 0
  };
  properties.push(newProperty);
  writeProperties(properties);
  addActivity({
    type: 'new_property',
    message: `Nueva propiedad agregada: ${newProperty.title}`,
    propertyId: newProperty.id
  });
  res.status(201).json(newProperty);
});

// Edit property
app.put('/properties/:id', (req, res) => {
  let properties = readProperties();
  const idx = properties.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  properties[idx] = { ...properties[idx], ...req.body };
  writeProperties(properties);
  addActivity({
    type: 'edit_property',
    message: `Propiedad editada: ${properties[idx].title}`,
    propertyId: req.params.id
  });
  res.json(properties[idx]);
});

// Delete property
app.delete('/properties/:id', (req, res) => {
  let properties = readProperties();
  const idx = properties.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = properties.splice(idx, 1);
  writeProperties(properties);
  addActivity({
    type: 'delete_property',
    message: `Propiedad eliminada: ${deleted[0].title}`,
    propertyId: req.params.id
  });
  res.json(deleted[0]);
});
// Obtener actividades recientes
app.get('/activities', (req, res) => {
  res.json(readActivities());
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
