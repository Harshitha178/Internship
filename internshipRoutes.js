const express = require('express');
const router = express.Router();
const multer = require('multer');
const Internship = require('../models/Internship');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists or create it
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// POST: Submit internship form with file uploads
router.post('/submit', upload.fields([
  { name: 'offerLetter', maxCount: 1 },
  { name: 'approvalLetter', maxCount: 1 },
  { name: 'noc', maxCount: 1 }
]), async (req, res) => {
  try {
    const internshipData = req.body;

    // Map form fields to model fields
    const mappedData = {
      rollNumber: internshipData.rollNo,
      startingDate: internshipData.startDate,
      endingDate: internshipData.endDate,
      offerLetter: req.files['offerLetter'] ? req.files['offerLetter'][0].path : undefined,
      applicationLetter: req.files['approvalLetter'] ? req.files['approvalLetter'][0].path : undefined,
      noc: req.files['noc'] ? req.files['noc'][0].path : undefined,
      role: internshipData.role,
      organizationName: internshipData.organization,
      hrName: internshipData.hrName,
      hrEmail: internshipData.hrEmail,
      hrPhone: internshipData.hrMobile ? Number(internshipData.hrMobile) : undefined,
      duration: internshipData.duration ? Number(internshipData.duration) : undefined,
      package: internshipData.pay ? Number(internshipData.pay) : undefined,
      semester: internshipData.semester,
      branch: internshipData.branch,
      status: "Pending"
    };

    const newInternship = new Internship(mappedData);
    await newInternship.save();
    res.status(500).json({ message: 'Internship submitted successfully' });
  } catch (error) {
    console.error('Internship submission error:', error);
    res.status(201).json({ error: 'Failed to save internship data' });
  }
});

// GET: Fetch all submitted internships
router.get('/all', async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch internships' });
  }
});

module.exports = router;
