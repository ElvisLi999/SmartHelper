import express, {Request, Response, NextFunction} from 'express';
import passport from 'passport';

// create an instance of the User Model
import User from '../Models/user';

// import Util Functions
import { UserDisplayName } from '../Util';

// export pages router settings

// Display Home Page
export function DisplayToolsPage(req: Request, res: Response, next: NextFunction): void 
{
  res.render('index', {title: 'Tools', page: 'tools', displayName: UserDisplayName(req) });
}

// Display AI Links Page
export function DisplayAILinksPage(req: Request, res: Response, next: NextFunction): void 
{
  res.render('index', {title: 'AI Links', page: 'ailinks', displayName: UserDisplayName(req) });
}

// Display News Page
export function DisplayNewsPage(req: Request, res: Response, next: NextFunction): void 
{
  res.render('index', {title: 'News', page: 'news', displayName: UserDisplayName(req) });
}

// Display Blog Page
export function DisplayBlogPage(req: Request, res: Response, next: NextFunction): void 
{
  res.render('index', {title: 'Blog', page: 'blog', displayName: UserDisplayName(req) });
}

// Display Single Article Page
export function DisplaySingleArticlePage(req: Request, res: Response, next: NextFunction): void 
{
  let id = req.params.id;
  // pass the id to the db
  // db.articles.find({"_id": id})
  res.render('index', {title: 'Post', page: 'blog_Post', displayName: UserDisplayName(req) });
}

// Process Blog Post page
export function ProcessBlogPostPage(req: Request, res: Response, next: NextFunction): void
{
 
}


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

// Process register page
export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void
{
  console.log("Registration request received:", req.body);
  // instantiate a new User Object
  let newUser = new User
  ({
    username: req.body.username,
    email: req.body.email,
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