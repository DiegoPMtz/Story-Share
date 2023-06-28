const {Router} = require('express')
const router = Router()
const path = require('path');
const { renderNoteFrom, createNewNote, renderNote, renderNoteEditFrom, updateNote, deleteNote, renderPublicNote} = require('../controllers/notes.controllers');
const {isAuthenticated} = require('../helpers/validate'); 


router.get('/notes/add',isAuthenticated, renderNoteFrom);

router.post('/notes/new-note', createNewNote);

router.get('/notes',isAuthenticated, renderNote);

router.get('/notes/edit/:id',isAuthenticated, renderNoteEditFrom)

router.put('/notes/edit/:id',isAuthenticated, updateNote)

router.delete('/notes/delete/:id',isAuthenticated, deleteNote)

router.get('/notes/public/:id',isAuthenticated, renderPublicNote);



router.get(['/notes/edit/js/particles.js','/notes/js/particles.js','/notes/public/js/particles.js'], (req, res) => {
    res.sendFile(path.join(__dirname, '../public/js/particles.js'));
});

router.get(['/notes/edit/js/view-particles.js','/notes/js/view-particles.js','/notes/public/js/view-particles.js'], (req, res) => {
    res.sendFile(path.join(__dirname, '../public/js/view-particles.js'));
});

module.exports = router