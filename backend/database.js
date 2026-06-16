const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

let prisma;
let useFallback = false;

// In-Memory/JSON database structure for fallback
const MOCK_DB_PATH = path.join(__dirname, 'mock_db.json');

const initialMockData = {
  users: [],
  companies: [],
  jobs: [],
  applications: [],
  messages: [],
  notifications: [],
  interviews: [],
  savedJobs: [],
  resumes: [],
  reviews: []
};

// Seed initial mockup data if it doesn't exist
if (!fs.existsSync(MOCK_DB_PATH)) {
  fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(initialMockData, null, 2));
}

function loadMockData() {
  try {
    return JSON.parse(fs.readFileSync(MOCK_DB_PATH, 'utf-8'));
  } catch (err) {
    return initialMockData;
  }
}

function saveMockData(data) {
  try {
    fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Failed to save mock DB data:', err);
  }
}

// Check database connection
async function initDB() {
  try {
    prisma = new PrismaClient();
    await prisma.$connect();
    console.log('Successfully connected to PostgreSQL database using Prisma.');
  } catch (err) {
    console.warn('PostgreSQL connection failed. JobConnect Pro is starting with Local JSON Database Fallback.');
    useFallback = true;
  }
}

module.exports = {
  initDB,
  getPrisma: () => (useFallback ? null : prisma),
  isFallback: () => useFallback,
  
  // Custom ORM methods that dynamically route to Prisma or JSON mock
  users: {
    findUnique: async (args) => {
      if (!useFallback) return prisma.user.findUnique(args);
      const data = loadMockData();
      if (args.where.email) {
        return data.users.find(u => u.email === args.where.email) || null;
      }
      if (args.where.id) {
        return data.users.find(u => u.id === args.where.id) || null;
      }
      return null;
    },
    create: async (args) => {
      if (!useFallback) return prisma.user.create(args);
      const data = loadMockData();
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isBanned: false,
        ...args.data
      };
      data.users.push(newUser);
      saveMockData(data);
      return newUser;
    },
    update: async (args) => {
      if (!useFallback) return prisma.user.update(args);
      const data = loadMockData();
      const userIdx = data.users.findIndex(u => u.id === args.where.id);
      if (userIdx === -1) throw new Error('User not found');
      data.users[userIdx] = { ...data.users[userIdx], ...args.data, updatedAt: new Date().toISOString() };
      saveMockData(data);
      return data.users[userIdx];
    },
    findMany: async (args) => {
      if (!useFallback) return prisma.user.findMany(args);
      const data = loadMockData();
      return data.users;
    }
  },
  
  companies: {
    findMany: async (args) => {
      if (!useFallback) return prisma.company.findMany(args);
      const data = loadMockData();
      return data.companies;
    },
    findUnique: async (args) => {
      if (!useFallback) return prisma.company.findUnique(args);
      const data = loadMockData();
      return data.companies.find(c => c.id === args.where.id || c.name === args.where.name) || null;
    },
    create: async (args) => {
      if (!useFallback) return prisma.company.create(args);
      const data = loadMockData();
      const newCompany = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...args.data
      };
      data.companies.push(newCompany);
      saveMockData(data);
      return newCompany;
    }
  },
  
  jobs: {
    findMany: async (args) => {
      if (!useFallback) {
        // Build prisma query with filters
        return prisma.job.findMany({
          include: { company: true },
          orderBy: { createdAt: 'desc' },
          ...args
        });
      }
      const data = loadMockData();
      let filtered = [...data.jobs];
      
      // Basic simulation of filters if specified
      if (args && args.where) {
        const w = args.where;
        if (w.status) filtered = filtered.filter(j => j.status === w.status);
        if (w.category) filtered = filtered.filter(j => j.category === w.category);
        if (w.experience) filtered = filtered.filter(j => j.experience === w.experience);
        if (w.type) filtered = filtered.filter(j => j.type === w.type);
        if (w.title && w.title.contains) {
          const q = w.title.contains.toLowerCase();
          filtered = filtered.filter(j => j.title.toLowerCase().includes(q) || j.description.toLowerCase().includes(q));
        }
      }
      
      // Inject company relationships in mock
      return filtered.map(job => ({
        ...job,
        company: data.companies.find(c => c.id === job.companyId) || { name: 'Unknown Company' }
      }));
    },
    findUnique: async (args) => {
      if (!useFallback) return prisma.job.findUnique({ ...args, include: { company: true } });
      const data = loadMockData();
      const job = data.jobs.find(j => j.id === args.where.id);
      if (!job) return null;
      return {
        ...job,
        company: data.companies.find(c => c.id === job.companyId) || null
      };
    },
    create: async (args) => {
      if (!useFallback) return prisma.job.create(args);
      const data = loadMockData();
      const newJob = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'ACTIVE',
        ...args.data
      };
      data.jobs.push(newJob);
      saveMockData(data);
      return newJob;
    },
    update: async (args) => {
      if (!useFallback) return prisma.job.update(args);
      const data = loadMockData();
      const idx = data.jobs.findIndex(j => j.id === args.where.id);
      if (idx === -1) throw new Error('Job not found');
      data.jobs[idx] = { ...data.jobs[idx], ...args.data, updatedAt: new Date().toISOString() };
      saveMockData(data);
      return data.jobs[idx];
    }
  },

  applications: {
    findMany: async (args) => {
      if (!useFallback) return prisma.application.findMany({ ...args, include: { job: { include: { company: true } } } });
      const data = loadMockData();
      let filtered = [...data.applications];
      if (args && args.where) {
        if (args.where.candidateId) filtered = filtered.filter(a => a.candidateId === args.where.candidateId);
        if (args.where.jobId) filtered = filtered.filter(a => a.jobId === args.where.jobId);
      }
      return filtered.map(app => {
        const job = data.jobs.find(j => j.id === app.jobId) || {};
        const company = data.companies.find(c => c.id === job.companyId) || {};
        return {
          ...app,
          job: { ...job, company }
        };
      });
    },
    findUnique: async (args) => {
      if (!useFallback) return prisma.application.findUnique(args);
      const data = loadMockData();
      return data.applications.find(a => a.id === args.where.id) || null;
    },
    create: async (args) => {
      if (!useFallback) return prisma.application.create(args);
      const data = loadMockData();
      const newApp = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'PENDING',
        ...args.data
      };
      data.applications.push(newApp);
      saveMockData(data);
      return newApp;
    },
    update: async (args) => {
      if (!useFallback) return prisma.application.update(args);
      const data = loadMockData();
      const idx = data.applications.findIndex(a => a.id === args.where.id);
      if (idx === -1) throw new Error('Application not found');
      data.applications[idx] = { ...data.applications[idx], ...args.data, updatedAt: new Date().toISOString() };
      saveMockData(data);
      return data.applications[idx];
    }
  },

  candidateProfiles: {
    findUnique: async (args) => {
      if (!useFallback) return prisma.candidateProfile.findUnique(args);
      const data = loadMockData();
      if (args.where.userId) {
        return data.resumes.find(r => r.userId === args.where.userId) || { userId: args.where.userId, skills: [], resumeUrl: null };
      }
      return null;
    },
    upsert: async (args) => {
      if (!useFallback) return prisma.candidateProfile.upsert(args);
      const data = loadMockData();
      // Handle simple create or update
      let profile = data.resumes.find(r => r.userId === args.where.userId);
      if (!profile) {
        profile = { id: Math.random().toString(36).substr(2, 9), userId: args.where.userId, ...args.create };
        data.resumes.push(profile);
      } else {
        Object.assign(profile, args.update);
      }
      saveMockData(data);
      return profile;
    }
  },

  messages: {
    findMany: async (args) => {
      if (!useFallback) return prisma.message.findMany(args);
      const data = loadMockData();
      const { senderId, receiverId } = args.where.OR ? { senderId: args.where.OR[0].senderId, receiverId: args.where.OR[0].receiverId } : args.where;
      return data.messages.filter(m => 
        (m.senderId === senderId && m.receiverId === receiverId) ||
        (m.senderId === receiverId && m.receiverId === senderId)
      );
    },
    create: async (args) => {
      if (!useFallback) return prisma.message.create(args);
      const data = loadMockData();
      const newMessage = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        isRead: false,
        ...args.data
      };
      data.messages.push(newMessage);
      saveMockData(data);
      return newMessage;
    }
  },

  notifications: {
    findMany: async (args) => {
      if (!useFallback) return prisma.notification.findMany(args);
      const data = loadMockData();
      return data.notifications.filter(n => n.userId === args.where.userId);
    },
    create: async (args) => {
      if (!useFallback) return prisma.notification.create(args);
      const data = loadMockData();
      const newNotif = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        isRead: false,
        ...args.data
      };
      data.notifications.push(newNotif);
      saveMockData(data);
      return newNotif;
    }
  },

  interviews: {
    findMany: async (args) => {
      if (!useFallback) return prisma.interview.findMany({ ...args, include: { application: { include: { job: { include: { company: true } } } } } });
      const data = loadMockData();
      return data.interviews.map(i => {
        const app = data.applications.find(a => a.id === i.applicationId) || {};
        const job = data.jobs.find(j => j.id === app.jobId) || {};
        const company = data.companies.find(c => c.id === job.companyId) || {};
        return {
          ...i,
          application: { ...app, job: { ...job, company } }
        };
      });
    },
    create: async (args) => {
      if (!useFallback) return prisma.interview.create(args);
      const data = loadMockData();
      const newInt = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        status: 'SCHEDULED',
        ...args.data
      };
      data.interviews.push(newInt);
      saveMockData(data);
      return newInt;
    }
  },

  savedJobs: {
    findMany: async (args) => {
      if (!useFallback) return prisma.savedJob.findMany({ ...args, include: { job: { include: { company: true } } } });
      const data = loadMockData();
      const saved = data.savedJobs.filter(s => s.userId === args.where.userId);
      return saved.map(s => {
        const job = data.jobs.find(j => j.id === s.jobId) || {};
        const company = data.companies.find(c => c.id === job.companyId) || {};
        return {
          ...s,
          job: { ...job, company }
        };
      });
    },
    create: async (args) => {
      if (!useFallback) return prisma.savedJob.create(args);
      const data = loadMockData();
      const newSave = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        ...args.data
      };
      data.savedJobs.push(newSave);
      saveMockData(data);
      return newSave;
    },
    deleteMany: async (args) => {
      if (!useFallback) return prisma.savedJob.deleteMany(args);
      const data = loadMockData();
      data.savedJobs = data.savedJobs.filter(s => !(s.userId === args.where.userId && s.jobId === args.where.jobId));
      saveMockData(data);
      return { count: 1 };
    }
  }
};
