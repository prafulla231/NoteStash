const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')

//Route 1 : Get all the notes using GET "api/notes/fetchallnotes".Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })//fetching all notes
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

//Route 2 : Adding new notes using POST "api/notes/addnote".LOgin required
router.post('/addnote', fetchuser, [
    //validation array to validate details
    body('title', 'Enter atleast 5 characters').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 3 })], async (req, res) => {
        try {
            const { title, description, tag } = req.body;//destructuring
            //If there are errors ,return bad request and errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            //To add a new note
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();
            res.json(savedNote)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error occured");
        }

        // res.json(notes)
    })

//Route 3 :Update a existing notes using PUT "api/notes/updatenote".LOgin required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create a newnote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find a note to be updated and update it
        //By using this fuction we can directly find the note and update it but it can be vunrable to hackers and they can change from inspect network tab findByIdAndUpdate ...so we have firstly found a note then updated it through this function
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        //If the loggefd in user is tryng update note of another id or login..for that this is the checkpoint
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not allowed");
        }
        //req.params.id is the id we will give in url
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

//Route 4 : Delete a note using DELETE "api/notes/deletenote".Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        //Allow deletion only if user owns this Note
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not allowed");
        }
        //req.params.id is the id we will give in url
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted ", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})



module.exports = router