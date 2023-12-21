import express, {Request, Response, NextFunction} from 'express';
import passport from 'passport';

// create instances of the Models
import User from '../Models/user';
import Category from '../Models/category';
import Tag from '../Models/tag';
import Comment from '../Models/comment';
console.log(Category, Tag, Comment); // avoid unused error, these models should be read before Article model
import Article from '../Models/article';


// import Util Functions
import { UserDisplayName } from '../Util';
import { AnyKeys } from 'mongoose';



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
  const page = parseInt(req.query.page as string) || 1; //get current page number
  const limit = 3; // limit number of articles per page
  const skip = (page - 1) * limit; // calculate the number of articles to skip

  console.log(`Page: ${page}, Skip: ${skip}, Limit: ${limit}`); // 日志输出当前的分页参数

  // get the total number of articles
  Article.countDocuments().exec()
    .then(count => {
      console.log(`Total articles count: ${count}`); // 日志输出文章总数
      // get the articles for the current page
      return Article.find()
        .sort({ publishedAt: -1 }) // sort by publish date descending
        .skip(skip)
        .limit(limit)
        .select('title author publishedAt summary likes views') // select only needed fields
        .then(articles => ({
          articles,
          count
        }));
    })
    .then(({ articles, count }) => {
      // load the view and pass the data
      res.render('index', {
        title: 'Blog',
        page: 'blog',
        articles: articles,
        currentPage: page,
        totalPages: Math.ceil(count / limit)
      });
    })
    .catch(err => {
      next(err); // 错误处理
    });
}

// Display Single Article Page
export function DisplayArticleById(req: Request, res: Response, next: NextFunction): void {
  let articleId = req.params.id;

    // use the Article model to query the Articles collection and fill author field
    Article.findById(articleId)
        .populate({
            path: 'author',
            select: 'displayName' // only return the User's displayName
        })
        .populate({
            path: 'category',
            select: 'name' 
        })
        .populate({
            path: 'tags',
            select: 'name'
        })
        .exec()
        .then((articleToDisplay) => {
            if (!articleToDisplay) {
                res.status(404).send('Article not found');
                return;
            }
            // Generate cover image URL
            if (articleToDisplay.coverImage && articleToDisplay.coverImage.length > 0) {
                articleToDisplay.coverImage = '/images/' + articleToDisplay.coverImage;
            }

            // find the article, 
            res.render('index', { 
                title: articleToDisplay.title,
                page: 'article', 
                article: articleToDisplay
                // other fields
            });
        })
        .catch((err) => {
            console.error('Error fetching article:', err);
            next(err); 
        });
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