const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { initDB } = require('./database');
const authController = require('./controllers/authController');
const jobController = require('./controllers/jobController');
const applicationController = require('./controllers/applicationController');
const aiController = require('./controllers/aiController');
const adminController = require('./controllers/adminController');
const messageController = require('./controllers/messageController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://jobconnect-frontend.onrender.com',
  process.env.FRONTEND_URL, // optional custom domain
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Role Access Control Middleware
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access forbidden: unauthorized role permissions' });
    }
    next();
  };
};

// --- ROUTES ---

// 1. Auth routes
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.get('/api/auth/me', authenticateToken, authController.getMe);

// 2. Job routes
app.get('/api/jobs', jobController.getJobs);
app.get('/api/jobs/:id', jobController.getJobById);
app.post('/api/jobs', authenticateToken, requireRole(['EMPLOYER', 'ADMIN']), jobController.createJob);
app.put('/api/jobs/:id', authenticateToken, requireRole(['EMPLOYER', 'ADMIN']), jobController.updateJob);
app.post('/api/jobs/save', authenticateToken, jobController.saveJob);
app.get('/api/jobs/saved/all', authenticateToken, jobController.getSavedJobs);
app.delete('/api/jobs/save/:id', authenticateToken, jobController.unsaveJob);

// 3. Application routes
app.post('/api/applications/apply', authenticateToken, requireRole(['CANDIDATE']), applicationController.applyToJob);
app.get('/api/applications', authenticateToken, applicationController.getApplications);
app.put('/api/applications/:id/status', authenticateToken, requireRole(['EMPLOYER', 'ADMIN']), applicationController.updateApplicationStatus);
app.post('/api/applications/schedule-interview', authenticateToken, requireRole(['EMPLOYER', 'ADMIN']), applicationController.scheduleInterview);
app.get('/api/interviews', authenticateToken, applicationController.getInterviews);

// 4. AI Routes
app.get('/api/ai/career-suggestions', authenticateToken, aiController.getCareerSuggestions);
app.get('/api/ai/match-job/:jobId', authenticateToken, aiController.matchJobSkills);
app.get('/api/ai/job-recommendations', authenticateToken, aiController.getAiJobRecommendations);
app.post('/api/ai/analyze-resume', authenticateToken, aiController.analyzeResume);

// 5. Admin routes
app.get('/api/admin/stats', authenticateToken, requireRole(['ADMIN']), adminController.getDashboardStats);
app.get('/api/admin/users', authenticateToken, requireRole(['ADMIN']), adminController.getUsers);
app.put('/api/admin/users/:id/ban', authenticateToken, requireRole(['ADMIN']), adminController.banUser);
app.put('/api/admin/jobs/:id/status', authenticateToken, requireRole(['ADMIN']), adminController.approveOrRejectJob);

// 6. Messaging routes
app.post('/api/messages/send', authenticateToken, messageController.sendMessage);
app.get('/api/messages/history/:partnerId', authenticateToken, messageController.getChatHistory);
app.get('/api/notifications', authenticateToken, messageController.getNotifications);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong inside the server' });
});

// Initialization
async function startServer() {
  await initDB();
  await authController.ensureTestUsers();
  
  app.listen(PORT, () => {
    console.log(`JobConnect Pro API Server running on port ${PORT}`);
  });
}

startServer();
