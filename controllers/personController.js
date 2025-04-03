// controllers/personController.js
const Person = require('../models/person');

// Get all people
exports.getAllPeople = async (req, res) => {
  try {
    const people = await Person.find();
    res.render('list', { people });
  } catch (error) {
    res.status(500).render('error', { message: 'Error fetching people', error });
  }
};

// Show create form
exports.showCreateForm = (req, res) => {
  res.render('create');
};

// Create a new person
exports.createPerson = async (req, res) => {
  try {
    const { name, age, gender, mobileNumber } = req.body;
    const newPerson = new Person({
      name,
      age,
      gender,
      mobileNumber
    });
    
    await newPerson.save();
    res.redirect('/person');
  } catch (error) {
    res.status(400).render('create', { error: error.message });
  }
};

// Show edit form
exports.showEditForm = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).render('error', { message: 'Person not found' });
    }
    res.render('edit', { person });
  } catch (error) {
    res.status(500).render('error', { message: 'Error fetching person', error });
  }
};

// Update a person
exports.updatePerson = async (req, res) => {
  try {
    const { name, age, gender, mobileNumber } = req.body;
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { name, age, gender, mobileNumber },
      { new: true, runValidators: true }
    );
    
    if (!updatedPerson) {
      return res.status(404).render('error', { message: 'Person not found' });
    }
    
    res.redirect('/person');
  } catch (error) {
    res.status(400).render('edit', { 
      person: { _id: req.params.id, ...req.body },
      error: error.message
    });
  }
};

// Show delete confirmation
exports.showDeleteForm = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).render('error', { message: 'Person not found' });
    }
    res.render('delete', { person });
  } catch (error) {
    res.status(500).render('error', { message: 'Error fetching person', error });
  }
};

// Delete a person
exports.deletePerson = async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson) {
      return res.status(404).render('error', { message: 'Person not found' });
    }
    res.redirect('/person');
  } catch (error) {
    res.status(500).render('error', { message: 'Error deleting person', error });
  }
};
