const db = require('../database');

const getJobs = async (req, res) => {
  try {
    const { category, location, type, experience, search, salaryMin } = req.query;

    const queryFilters = { status: 'ACTIVE' };

    if (category) queryFilters.category = category;
    if (experience) queryFilters.experience = experience;
    if (type) queryFilters.type = type;

    const list = await db.jobs.findMany({
      where: queryFilters
    });

    let filtered = list;

    // Apply custom criteria search/location in memory if needed or filter query matches
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(j => 
        j.title.toLowerCase().includes(q) || 
        j.description.toLowerCase().includes(q) || 
        j.skills.some(s => s.toLowerCase().includes(q))
      );
    }

    if (location) {
      const loc = location.toLowerCase();
      filtered = filtered.filter(j => j.location.toLowerCase().includes(loc));
    }

    if (salaryMin) {
      const min = parseInt(salaryMin, 10);
      filtered = filtered.filter(j => !j.salaryMin || j.salaryMin >= min);
    }

    res.json(filtered);
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await db.jobs.findUnique({ where: { id: req.params.id } });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job details' });
  }
};

const createJob = async (req, res) => {
  try {
    const { title, description, requirements, skills, category, location, type, salaryMin, salaryMax, experience } = req.body;
    
    // Find or create a company for the employer
    let company = await db.companies.findUnique({ where: { name: 'TechCorp Solutions' } });
    if (!company) {
      company = await db.companies.create({
        data: {
          name: 'TechCorp Solutions',
          website: 'https://techcorp.example.com',
          location: 'San Francisco, CA'
        }
      });
    }

    const newJob = await db.jobs.create({
      data: {
        title,
        description,
        requirements: Array.isArray(requirements) ? requirements : [requirements],
        skills: Array.isArray(skills) ? skills : [skills],
        category,
        location,
        type,
        salaryMin: salaryMin ? parseInt(salaryMin) : null,
        salaryMax: salaryMax ? parseInt(salaryMax) : null,
        experience,
        companyId: company.id
      }
    });

    res.status(201).json(newJob);
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ error: 'Failed to create job posting' });
  }
};

const updateJob = async (req, res) => {
  try {
    const updated = await db.jobs.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update job' });
  }
};

const saveJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user.userId;

    const saved = await db.savedJobs.create({
      data: {
        userId,
        jobId
      }
    });
    res.status(201).json({ message: 'Job saved successfully', saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save job' });
  }
};

const getSavedJobs = async (req, res) => {
  try {
    const saved = await db.savedJobs.findMany({
      where: { userId: req.user.userId }
    });
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get saved jobs' });
  }
};

const unsaveJob = async (req, res) => {
  try {
    await db.savedJobs.deleteMany({
      where: { userId: req.user.userId, jobId: req.params.id }
    });
    res.json({ message: 'Job unsaved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to unsave job' });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  saveJob,
  getSavedJobs,
  unsaveJob
};
