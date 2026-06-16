const db = require('../database');

const applyToJob = async (req, res) => {
  try {
    const { jobId, coverLetter, resumeUrl } = req.body;
    const userId = req.user.userId;

    // Fetch candidate profile
    let profile = await db.candidateProfiles.findUnique({ where: { userId } });
    if (!profile) {
      profile = await db.candidateProfiles.upsert({
        where: { userId },
        update: {},
        create: { title: 'Developer', bio: '', skills: [] }
      });
    }

    const application = await db.applications.create({
      data: {
        jobId,
        candidateId: profile.id,
        coverLetter,
        resumeUrl: resumeUrl || 'https://example.com/demo-resume.pdf'
      }
    });

    // Notify employer (simulated)
    const job = await db.jobs.findUnique({ where: { id: jobId } });
    if (job) {
      // Create notification for job creator/employer
      // In this setup, we notify the candidates and employers
      await db.notifications.create({
        data: {
          userId,
          title: 'Application Submitted',
          message: `Your application for ${job.title} was successfully submitted!`
        }
      });
    }

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    console.error('Apply job error:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
};

const getApplications = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { role } = req.user;

    if (role === 'CANDIDATE') {
      const profile = await db.candidateProfiles.findUnique({ where: { userId } });
      if (!profile) return res.json([]);
      const apps = await db.applications.findMany({
        where: { candidateId: profile.id }
      });
      return res.json(apps);
    } else {
      // Employer / Admin: get all applications
      const apps = await db.applications.findMany();
      return res.json(apps);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve applications' });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const updated = await db.applications.update({
      where: { id },
      data: { status }
    });

    // Notify user of update
    const app = await db.applications.findUnique({ where: { id } });
    // In db fallback layout, users have candidateProfile
    const profile = await db.candidateProfiles.findUnique({ where: { id: updated.candidateId } });
    if (profile) {
      await db.notifications.create({
        data: {
          userId: profile.userId,
          title: 'Application Status Updated',
          message: `Your application has been updated to: ${status}`
        }
      });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update application status' });
  }
};

const scheduleInterview = async (req, res) => {
  try {
    const { applicationId, scheduledTime, duration, meetUrl, notes } = req.body;

    const app = await db.applications.findUnique({ where: { id: applicationId } });
    if (!app) return res.status(404).json({ error: 'Application not found' });

    const interview = await db.interviews.create({
      data: {
        applicationId,
        candidateId: app.candidateId,
        scheduledTime: new Date(scheduledTime),
        duration: parseInt(duration) || 60,
        meetUrl,
        notes
      }
    });

    // Update application status to review/shortlisted
    await db.applications.update({
      where: { id: applicationId },
      data: { status: 'SHORTLISTED' }
    });

    // Send notifications to candidate
    const profile = await db.candidateProfiles.findUnique({ where: { id: app.candidateId } });
    if (profile) {
      await db.notifications.create({
        data: {
          userId: profile.userId,
          title: 'Interview Scheduled',
          message: `You have an interview scheduled on ${new Date(scheduledTime).toLocaleString()}. Meet Link: ${meetUrl}`
        }
      });
    }

    res.status(201).json(interview);
  } catch (error) {
    console.error('Schedule interview error:', error);
    res.status(500).json({ error: 'Failed to schedule interview' });
  }
};

const getInterviews = async (req, res) => {
  try {
    const list = await db.interviews.findMany();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve interviews' });
  }
};

module.exports = {
  applyToJob,
  getApplications,
  updateApplicationStatus,
  scheduleInterview,
  getInterviews
};
