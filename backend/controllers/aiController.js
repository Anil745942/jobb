const db = require('../database');

// Simulated AI Career Advice / Pathing recommendations based on skill sets
const getCareerSuggestions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profile = await db.candidateProfiles.findUnique({ where: { userId } });
    
    if (!profile || !profile.skills || profile.skills.length === 0) {
      return res.json({
        suggestions: [
          'Add skills to your profile to get personalized AI career recommendations.',
          'Start by learning JavaScript, HTML, and CSS if you want to pursue web development.',
          'Build personal projects and upload them to GitHub to show employers.'
        ],
        targetRoles: ['Junior Web Developer', 'Associate QA Engineer'],
        learningPaths: ['Modern Web Design Foundations']
      });
    }

    const candidateSkills = profile.skills.map(s => s.toLowerCase());
    const suggestions = [];
    const targetRoles = [];
    const learningPaths = [];

    // Analyze skills
    if (candidateSkills.includes('react') || candidateSkills.includes('angular') || candidateSkills.includes('vue')) {
      targetRoles.push('Senior Frontend Engineer', 'UI/UX Developer');
      if (!candidateSkills.includes('typescript')) {
        suggestions.push('Consider learning TypeScript to level up your Frontend capabilities.');
        learningPaths.push('TypeScript: Complete Guide');
      }
      if (!candidateSkills.includes('next.js')) {
        suggestions.push('Learn Next.js to build production-grade server-side rendered React apps.');
        learningPaths.push('Advanced Next.js App Router Masterclass');
      }
    }

    if (candidateSkills.includes('node.js') || candidateSkills.includes('python') || candidateSkills.includes('java')) {
      targetRoles.push('Backend Engineer', 'API Platform Developer');
      if (!candidateSkills.includes('docker') && !candidateSkills.includes('kubernetes')) {
        suggestions.push('Learn Docker to make containerizing microservices easier.');
        learningPaths.push('Docker & Kubernetes for Cloud Architects');
      }
      if (!candidateSkills.includes('postgresql') && !candidateSkills.includes('mongodb')) {
        suggestions.push('Master PostgreSQL or SQL databases for solid transactional data storage.');
        learningPaths.push('Relational Database Design with SQL');
      }
    }

    if (targetRoles.length === 0) {
      targetRoles.push('Full Stack Developer', 'Software Engineer');
    }

    suggestions.push('Contribute to Open Source projects to gain experience collaborating on larger codebases.');
    suggestions.push('Participate in local developer meetups to build connections with tech hiring managers.');

    res.json({
      suggestions,
      targetRoles,
      learningPaths
    });
  } catch (error) {
    console.error('AI Career Suggestions error:', error);
    res.status(500).json({ error: 'Failed to process career analysis' });
  }
};

// AI Skill matching: calculate compatibility percentage between user profile and a specific job
const matchJobSkills = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.userId;

    const job = await db.jobs.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const profile = await db.candidateProfiles.findUnique({ where: { userId } });
    if (!profile) return res.json({ matchPercentage: 0, missingSkills: job.skills });

    const jobSkills = job.skills.map(s => s.toLowerCase());
    const candidateSkills = profile.skills.map(s => s.toLowerCase());

    const matched = jobSkills.filter(s => candidateSkills.includes(s));
    const missing = jobSkills.filter(s => !candidateSkills.includes(s));

    const matchPercentage = jobSkills.length > 0 
      ? Math.round((matched.length / jobSkills.length) * 100) 
      : 100;

    res.json({
      matchPercentage,
      matchedSkills: matched,
      missingSkills: missing,
      feedback: matchPercentage > 70 
        ? 'Excellent fit! Your skills match over 70% of the job requirements.' 
        : 'Good potential. Upskilling in missing technologies will significantly boost your application response rate.'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate skill matching' });
  }
};

// AI Job recommendations: recommend jobs with best skill match percentages
const getAiJobRecommendations = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profile = await db.candidateProfiles.findUnique({ where: { userId } });
    const allJobs = await db.jobs.findMany({ where: { status: 'ACTIVE' } });

    if (!profile || !profile.skills || profile.skills.length === 0) {
      // Return latest jobs with 50% mock match if no skills
      const results = allJobs.slice(0, 5).map(job => ({
        ...job,
        matchPercentage: 60,
        matchingFeedback: 'Complete your profile skills to get precise recommendations.'
      }));
      return res.json(results);
    }

    const candidateSkills = profile.skills.map(s => s.toLowerCase());

    const scoredJobs = allJobs.map(job => {
      const jobSkills = job.skills.map(s => s.toLowerCase());
      if (jobSkills.length === 0) return { ...job, matchPercentage: 50 };

      const matched = jobSkills.filter(s => candidateSkills.includes(s));
      const matchPercentage = Math.round((matched.length / jobSkills.length) * 100);

      return {
        ...job,
        matchPercentage
      };
    });

    // Sort by match percentage desc
    scoredJobs.sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json(scoredJobs.slice(0, 6));
  } catch (error) {
    console.error('AI Job Recommendations error:', error);
    res.status(500).json({ error: 'Failed to process AI recommendations' });
  }
};

// AI Resume Parser & Analyzer
const analyzeResume = async (req, res) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text or contents required for analysis' });
    }

    // Common technology dictionary for parsing
    const dictionary = [
      'React', 'Vue', 'Angular', 'Node.js', 'Express', 'JavaScript', 'TypeScript', 'Python', 'Django',
      'Java', 'Spring', 'PostgreSQL', 'MySQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'HTML', 'CSS',
      'SaaS', 'Tailwind', 'Redux', 'GraphQL', 'Next.js', 'Rust', 'Go', 'PHP', 'Laravel'
    ];

    const lowerText = resumeText.toLowerCase();
    const foundSkills = dictionary.filter(skill => lowerText.includes(skill.toLowerCase()));

    // Scoring engine logic
    let score = 40; // Base score
    if (foundSkills.length > 3) score += 20;
    if (foundSkills.length > 7) score += 20;
    if (lowerText.includes('experience') || lowerText.includes('work')) score += 10;
    if (lowerText.includes('education') || lowerText.includes('degree')) score += 10;
    if (score > 100) score = 100;

    // Generate feedback notes
    const improveAdvice = [];
    if (foundSkills.length < 5) {
      improveAdvice.push('Add more industry-specific technical keywords and tool certifications.');
    }
    if (!lowerText.includes('project') && !lowerText.includes('portfolio')) {
      improveAdvice.push('Include a dedicated projects or portfolio section displaying your deployed works.');
    }
    if (!lowerText.includes('achievement') && !lowerText.includes('led') && !lowerText.includes('managed')) {
      improveAdvice.push('Use action verbs (e.g. Optimized, Automated, Built) to quantify your work achievements.');
    }

    res.json({
      score,
      detectedSkills: foundSkills,
      strengths: foundSkills.slice(0, 4),
      improvements: improveAdvice.length > 0 ? improveAdvice : ['Your resume is highly optimized for ATS!']
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
};

module.exports = {
  getCareerSuggestions,
  matchJobSkills,
  getAiJobRecommendations,
  analyzeResume
};
