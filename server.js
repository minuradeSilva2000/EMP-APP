const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 5000;

// Google OAuth configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '76679338484-tcgot7q5fqnksr4465r58kkk6l7pg6uf.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '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';
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:4173/oauth';

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
let users = [
  { id: 1, username: 'admin', email: 'admin@example.com', password: 'password123' }
];

let employees = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    department: 'Engineering',
    position: 'Senior Developer',
    salary: 85000,
    startDate: '2022-01-15',
    status: 'Active',
    createdBy: 'admin',
    createdAt: '2022-01-15T10:00:00Z',
    updatedAt: '2024-01-10T14:30:00Z'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1234567891',
    department: 'HR',
    position: 'HR Manager',
    salary: 75000,
    startDate: '2021-06-01',
    status: 'Active',
    createdBy: 'admin',
    createdAt: '2021-06-01T09:00:00Z',
    updatedAt: '2024-01-05T11:20:00Z'
  }
];

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Auth Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password
  };
  
  users.push(newUser);
  
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { id: newUser.id, username: newUser.username, email: newUser.email } });
});

app.get('/api/auth', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);
    
    if (user) {
      res.json({ user: { id: user.id, username: user.username, email: user.email } });
    } else {
      res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Employee Routes
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

app.post('/api/employees', (req, res) => {
  const newEmployee = {
    id: (employees.length + 1).toString(),
    ...req.body,
    createdBy: 'current-user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  employees.push(newEmployee);
  res.json(newEmployee);
});

app.put('/api/employees/:id', (req, res) => {
  const index = employees.findIndex(e => e.id === req.params.id);
  if (index !== -1) {
    employees[index] = { 
      ...employees[index], 
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    res.json(employees[index]);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

app.delete('/api/employees/:id', (req, res) => {
  const index = employees.findIndex(e => e.id === req.params.id);
  if (index !== -1) {
    employees.splice(index, 1);
    res.json({ message: 'Employee deleted' });
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// Google OAuth routes
app.get('/api/auth/google', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ];
  
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    redirect_uri: REDIRECT_URI
  });
  
  res.redirect(url);
});

// Google OAuth callback
app.get('/oauth', async (req, res) => {
  const { code } = req.query;
  
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    
    // Get user info
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();
    
    // Check if user exists, if not create one
    let user = users.find(u => u.email === data.email);
    if (!user) {
      user = {
        id: users.length + 1,
        username: data.name || data.email.split('@')[0],
        email: data.email,
        password: 'google-auth' // Placeholder for Google users
      };
      users.push(user);
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    
    // Redirect to frontend OAuth callback with token
    res.redirect(`http://localhost:4173/oauth?token=${token}&user=${encodeURIComponent(JSON.stringify({ id: user.id, username: user.username, email: user.email }))}`);
    
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect('http://localhost:4173/login?error=auth_failed');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
