const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

// Helper to generate JWT Token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '7d' });
};

// Seed test accounts if database is empty
async function ensureTestUsers() {
  const users = await db.users.findMany();
  if (users.length === 0) {
    console.log('Seeding initial test users for Candidate, Employer, and Admin roles...');
    
    // Hash passwords
    const candidatePassword = await bcrypt.hash('candidate123', 10);
    const employerPassword = await bcrypt.hash('employer123', 10);
    const adminPassword = await bcrypt.hash('admin123', 10);

    // Create companies
    let company;
    try {
      company = await db.companies.create({
        data: {
          name: 'TechCorp Solutions',
          website: 'https://techcorp.example.com',
          location: 'San Francisco, CA',
          description: 'A global leader in SaaS and Enterprise solutions.',
          industry: 'Software Engineering',
          size: '500-1000'
        }
      });
    } catch(e) {
      console.log('Company seeding failed/skipped');
    }

    // Create Candidate
    const candidate = await db.users.create({
      data: {
        email: 'candidate@jobconnect.com',
        password: candidatePassword,
        role: 'CANDIDATE',
        firstName: 'Alex',
        lastName: 'Developer',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      }
    });

    // Create candidate profile
    await db.candidateProfiles.upsert({
      where: { userId: candidate.id },
      update: {},
      create: {
        title: 'Full Stack Engineer',
        bio: 'Passionate MERN developer with 3 years of build experience.',
        skills: ['React', 'Node.js', 'Express', 'JavaScript', 'PostgreSQL', 'Tailwind CSS'],
        experience: '3 Years',
        education: 'B.S. in Computer Science'
      }
    });

    // Create Employer
    const employer = await db.users.create({
      data: {
        email: 'employer@jobconnect.com',
        password: employerPassword,
        role: 'EMPLOYER',
        firstName: 'Sarah',
        lastName: 'Recruiter',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
      }
    });

    // Create Admin
    await db.users.create({
      data: {
        email: 'admin@jobconnect.com',
        password: adminPassword,
        role: 'ADMIN',
        firstName: 'Super',
        lastName: 'Administrator',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
      }
    });

    // Seed dummy jobs
    if (company) {
      await db.jobs.create({
        data: {
          title: 'Senior React Developer',
          description: 'We are seeking a Senior React Developer to join our core SaaS application team. You will lead UI component architecture, state management, and visual optimization.',
          requirements: ['5+ years UI experience', 'Strong state management skills', 'Responsive UI expertise'],
          skills: ['React', 'JavaScript', 'Tailwind CSS', 'Redux'],
          category: 'Software Engineering',
          location: 'San Francisco, CA',
          type: 'Full-time',
          salaryMin: 120000,
          salaryMax: 160000,
          experience: 'Senior',
          companyId: company.id
        }
      });

      await db.jobs.create({
        data: {
          title: 'Full-Stack JavaScript Engineer',
          description: 'Join our team as a Full-Stack Engineer working with Node.js and React. Responsible for back-end APIs, clean databases, and smooth animations.',
          requirements: ['3+ years Experience', 'Node.js expertise', 'Postgres/MongoDB proficiency'],
          skills: ['React', 'Node.js', 'PostgreSQL', 'Express'],
          category: 'Software Engineering',
          location: 'Remote',
          type: 'Remote',
          salaryMin: 90000,
          salaryMax: 130000,
          experience: 'Mid',
          companyId: company.id
        }
      });
    }
  }
}

const register = async (req, res) => {
  try {
    const { email, password, role, firstName, lastName, companyName } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Email, password, and role are required' });
    }

    const existingUser = await db.users.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.users.create({
      data: {
        email,
        password: hashedPassword,
        role,
        firstName,
        lastName
      }
    });

    // Handle profile creation depending on role
    if (role === 'CANDIDATE') {
      await db.candidateProfiles.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          title: '',
          bio: '',
          skills: [],
          experience: '',
          education: ''
        }
      });
    } else if (role === 'EMPLOYER' && companyName) {
      let company = await db.companies.findUnique({ where: { name: companyName } });
      if (!company) {
        company = await db.companies.create({
          data: {
            name: companyName,
            location: 'Default HQ'
          }
        });
      }
      // Note: Employer profiles link to companies
    }

    const token = generateToken(user.id, user.role);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await db.users.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.isBanned) {
      return res.status(403).json({ error: 'This account has been suspended by system administrator' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.role);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await db.users.findUnique({ where: { id: req.user.userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    let profile = null;
    if (user.role === 'CANDIDATE') {
      profile = await db.candidateProfiles.findUnique({ where: { userId: user.id } });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl,
        profile
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
};

module.exports = {
  register,
  login,
  getMe,
  ensureTestUsers
};
