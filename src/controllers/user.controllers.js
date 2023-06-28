const usersCtrl= {};
const passport = require('passport') 
const user = require('../models/User')

usersCtrl.renderSingUpFrom = (req,res) =>{
    res.render('users/signup');

};

usersCtrl.signup =  async (req, res)=>{
    const{name, email, password, confirm_password} = req.body;
    const errors=[];
    if (password != confirm_password){
        errors.push({
            text: 'passwords do not maach'
        })
    }
    if (password.length < 8) {
        errors.push({
          text: 'Passwords must be at least 4 characters'
        });
      }
      
      if (!/[a-z]/.test(password)) {
        errors.push({
          text: 'Passwords must contain at least one lowercase letter'
        });
      }
      
      if (!/[A-Z]/.test(password)) {
        errors.push({
          text: 'Passwords must contain at least one uppercase letter'
        });
      }
      
      if (!/\d/.test(password)) {
        errors.push({
          text: 'Passwords must contain at least one digit'
        });
      }
      
      if (!/[!@#$%^&*]/.test(password)) {
        errors.push({
          text: 'Passwords must contain at least one special character (!@#$%^&*)'
        });
      }
      
    if (errors.length > 0){
        res.render(
            'users/signup',{
                errors,
                name,email
            })
    }else{
        const emailUser= await user.findOne({email: email})
        if(emailUser){
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/users/signup');
        }else{
            const newUSer =new user({name,email,password});
            newUSer.password= await newUSer.encryptPasswords(password);
            req.flash('success-msg', 'you are registered')
            await newUSer.save();
            res.redirect('/users/signin');
        }
    }

};

usersCtrl.renderSingInFrom = (req,res) =>{
    res.render('users/signin');

};

usersCtrl.signin = passport.authenticate('local',{
  failureRedirect: '/users/signin',
  successRedirect: '/notes',
  failureFlash : true
})

usersCtrl.logout = (req, res) => {
    
  req.logout( (err) => {

      if (err) { return next(err); }
      req.flash( "success_msg" , "Session cerrada" );
      res.redirect( "/users/signin" );

  });
}

module.exports = usersCtrl;