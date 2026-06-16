const db = require('../database');

const getDashboardStats = async (req, res) => {
  try {
    const allUsers = await db.users.findMany();
    const allJobs = await db.jobs.findMany();
    const allApplications = await db.applications.findMany();

    const candidatesCount = allUsers.filter(u => u.role === 'CANDIDATE').length;
    const employersCount = allUsers.filter(u => u.role === 'EMPLOYER').length;
    const activeJobsCount = allJobs.filter(j => j.status === 'ACTIVE').length;

    // Simulate revenue analytics from employer packages / premium listings
    const revenueStats = {
      totalRevenue: employersCount * 99 + activeJobsCount * 49,
      monthlyRecurring: employersCount * 99,
      salesGraph: [
        { month: 'Jan', sales: 1200 },
        { month: 'Feb', sales: 1900 },
        { month: 'Mar', sales: 2400 },
        { month: 'Apr', sales: 3200 },
        { month: 'May', sales: 4800 },
        { month: 'Jun', sales: 6100 }
      ]
    };

    res.json({
      totalUsers: allUsers.length,
      candidatesCount,
      employersCount,
      totalJobs: allJobs.length,
      activeJobsCount,
      totalApplications: allApplications.length,
      revenueStats
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve stats' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await db.users.findMany();
    // Exclude passwords
    const sanitized = users.map(u => {
      const { password, ...rest } = u;
      return rest;
    });
    res.json(sanitized);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

const banUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { isBanned } = req.body;

    const updated = await db.users.update({
      where: { id },
      data: { isBanned }
    });

    res.json({ message: `User status updated successfully`, user: { id: updated.id, isBanned: updated.isBanned } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to ban/unban user' });
  }
};

const approveOrRejectJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // ACTIVE or INACTIVE/CLOSED

    const updated = await db.jobs.update({
      where: { id },
      data: { status }
    });

    res.json({ message: `Job status updated to ${status}`, job: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update job status' });
  }
};

module.exports = {
  getDashboardStats,
  getUsers,
  banUser,
  approveOrRejectJob
};
