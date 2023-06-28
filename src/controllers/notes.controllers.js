const notesCtrl = {};
const note = require('../models/Note');

notesCtrl.renderNoteFrom = (req, res) => {
    res.render('notes/new-note');
}

notesCtrl.createNewNote = async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        req.flash('error_msg', 'Title are required');
        return res.redirect('/notes/add');
    }
    const newNote = new note({ title, description });
    newNote.user = req.user.id;
    try {
        await newNote.save();
        req.flash('success_msg', 'Note Added Successfully');
        res.redirect('/notes');
    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Error adding note');
        res.redirect('/notes/add');
    }
}

notesCtrl.renderNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await note.find({
      $or: [
        { visibility: 'private', user: userId },
        { visibility: 'public', user: userId }
      ]
    }).lean();
    res.render('notes/all-notes', { notes });
  } catch (error) {
    console.log(error);
    req.flash('error_msg', 'Error retrieving notes');
    res.redirect('/notes');
  }
};


notesCtrl.renderNoteEditFrom = async (req, res) => {
    const notes = await note.findById(req.params.id).lean();
    if (notes.user != req.user.id) {
        req.flash('error_msg', 'not Authorized');
        return res.redirect('/notes');
    }
    res.render('notes/edit-note', { notes });
}

notesCtrl.updateNote = async (req, res) => {
    let { title, description } = req.body;
    const existingNote = await note.findById(req.params.id);
    if (title.trim() === existingNote.title && description === existingNote.description) {
      req.flash('error_msg', 'No changes have been made to the note');
      return res.redirect(`/notes`);
    }
    if (!title.trim()) {
      req.flash('error_msg', 'The title must contain at least one visible character');
      return res.redirect(`/notes`);
    }
  
    await note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Note updated successfully');
    res.redirect('/notes');
  };
  

notesCtrl.deleteNote = async (req, res) => {
    const noteId = req.params.id;
    try {
        const Note = await note.findById(noteId);
        if (!Note) {
            req.flash('error_msg', 'Note not found');
            return res.redirect('/notes');
        }
        if (Note.user != req.user.id) {
            req.flash('error_msg', 'Not Authorized');
            return res.redirect('/notes');
        }
        await note.findByIdAndDelete(noteId);
        req.flash('success_msg', 'Note Deleted Successfully');
    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Error deleting note');
    }
    res.redirect('/notes');
}


notesCtrl.renderPublicNote = async (req, res) => {
    const noteId = req.params.id;
    try {
      const publicNote = await note.findById(noteId).lean();
      if (!publicNote) {
        req.flash('error_msg', 'Note not found');
        return res.redirect('/notes');
      }
  
      if (publicNote.visibility === 'private' && publicNote.user.toString() !== req.user.id) {
        req.flash('error_msg', 'This note is private and cannot be accessed');
        return res.redirect('/notes');
      }
  
      // Actualizamos la propiedad 'visibility' a 'public'
      await note.findByIdAndUpdate(noteId, { visibility: 'public' });
  
      const notes = [publicNote];
  
      res.render('Trabajos', { notes });
    } catch (error) {
      console.log(error);
      req.flash('error_msg', 'Error retrieving note');
      res.redirect('/notes');
    }
  };
  

module.exports = notesCtrl;