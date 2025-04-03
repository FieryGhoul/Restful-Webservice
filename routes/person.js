// routes/person.js
const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

// GET all people
router.get('/', personController.getAllPeople);

// Show create form and handle form submission
router.get('/create', personController.showCreateForm);
router.post('/', personController.createPerson);

// Show edit form and handle form submission
router.get('/edit/:id', personController.showEditForm);
router.post('/update/:id', personController.updatePerson);

// Show delete confirmation and handle deletion
router.get('/delete/:id', personController.showDeleteForm);
router.post('/delete/:id', personController.deletePerson);

module.exports = router;
