import express, {Request, Response, NextFunction} from 'express';
import passport from 'passport';

// create an instance of the User Model
import User from '../Models/user';

// import Util Functions
import { UserDisplayName } from '../Util';


/* Display Login or  authentication page */
export function DisplayLoginPage(req: Request, res: Response, next: NextFunction): void
{
  res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req)  });
}

export function ProcessLoginPage(req: Request, res: Response, next: NextFunction): void
{
  passport.authenticate('local', (err: Error | null, user: UserDocument | false, info: any) =>
  {
    console.log(user);

    // are there any server errors?
    if(err)
    {
      console.error(err);
      return next(err);
    }

    // are there any login errors?
    if(!user)
    {
      req.flash('loginMessage', 'Authentication Error');
      return res.redirect('/login');
    }

    req.login(user, (err) => 
    {
      // are there any db errors?
      if(err)
      {
        console.error(err);
        return next(err);
      }

      console.log("Logged in Successfully");

      return res.redirect('/');
    });
  })(req, res, next);
}


/* Display register page */
export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Register', page: 'register', displayName: UserDisplayName(req)   });
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void
{
  // instantiate a new User Object
  let newUser = new User
  ({
    username: req.body.username,
    emailAddress: req.body.emailAddress,
    displayName: req.body.firstName + " " + req.body.lastName
  });

  User.register(newUser, req.body.password, (err: Error | null) => 
  {
    if(err)
    {
      console.error('Error: Inserting New User');
      if(err.name == "UserExistsError")
      {
        console.error('Error: User Already Exists');
      }
      req.flash('registerMessage', 'Registration Error');

      return res.redirect('/register');
    }

    // after successful registration - let's login the user
    return passport.authenticate('local')(req, res, () =>
    {
      return res.redirect('/');
    });
  });
}

export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction): void
{
  // req.logout(function(err) {
  //   if (err) { return next(err); }
  //   res.redirect('/');
  // });
  req.session.destroy(function (err) {
    res.redirect('/login');; //Inside a callback… bulletproof!
  });
  //res.redirect('/login');
}