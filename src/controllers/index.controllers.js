const indexCtrl={};
const Note = require('../models/Note');


indexCtrl.renderIndex = (req, res) => {
    res.render('index')
};

indexCtrl.renderAbout = (req, res) => {
    res.render('About')
};

indexCtrl.renderTrabajos= async (req, res) => {
    try {
      const notes = await Note.find({ visibility: 'public' }).lean();
      res.render('Trabajos', { notes });
    } catch (error) {
      console.log(error);
      req.flash('error_msg', 'Error retrieving notes');
      res.redirect('index');
    }
  };
  
module.exports = indexCtrl;