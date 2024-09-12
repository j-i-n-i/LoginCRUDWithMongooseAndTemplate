const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Ensure this path is correct

// Show all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.render('students/index', { students: students, message: [] });
    } catch (error) {
        res.render('students/index', { students: [], message: [error.message] });
    }
});

// Show form to create new student
router.get('/new', (req, res) => {
    res.render('students/new', { message: [] });
});

// Create a new student
router.post('/', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.redirect('/students');
    } catch (error) {
        res.render('students/new', { message: [error.message] });
    }
});

// Show form to edit a student
router.get('/:id/edit', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            res.redirect('/students');
        } else {
            res.render('students/edit', { student: student, message: [] });
        }
    } catch (error) {
        res.redirect('/students');
    }
});

// Update a student
router.put('/:id', async (req, res) => {
    try {
        await Student.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/students');
    } catch (error) {
        res.render('students/edit', { student: req.body, message: [error.message] });
    }
});

// Show details of a student
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            res.redirect('/students');
        } else {
            res.render('students/show', { student: student, message: [] });
        }
    } catch (error) {
        res.redirect('/students');
    }
});

// Delete a student
router.delete('/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.redirect('/students');
    } catch (error) {
        res.redirect('/students');
    }
});

module.exports = router;
