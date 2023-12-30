"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessLogoutPage = exports.ProcessRegisterPage = exports.DisplayRegisterPage = exports.ProcessLoginPage = exports.DisplayLoginPage = exports.ProcessUpdateUserInfoByIdPage = exports.DisplayUpdateUserInfoByIdPage = exports.DisplayUsersListPage = exports.DisplayDashboardPage = exports.ProcessBlogPostPage = exports.DisplayArticleById = exports.DisplayBlogPage = exports.DisplayNewsPage = exports.DisplayAILinksPage = exports.DisplayToolsPage = void 0;
const passport_1 = __importDefault(require("passport"));
// create instances of the Models
const user_1 = __importDefault(require("../Models/user"));
const category_1 = __importDefault(require("../Models/category"));
const tag_1 = __importDefault(require("../Models/tag"));
const comment_1 = __importDefault(require("../Models/comment"));
console.log(category_1.default, tag_1.default, comment_1.default); // avoid unused error, these models should be read before Article model
const article_1 = __importDefault(require("../Models/article"));
const ailink_1 = __importDefault(require("../Models/ailink"));
// import Util Functions
const Util_1 = require("../Util");
// export pages router settings
// Display Home Page
function DisplayToolsPage(req, res, next) {
    res.render('index', { title: 'Tools', page: 'tools', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayToolsPage = DisplayToolsPage;
// Display AI Links Page
function DisplayAILinksPage(req, res, next) {
    ailink_1.default.find({})
        .then((aiLinks) => {
        // categorize the links
        const categorizedLinks = aiLinks.reduce((acc, link) => {
            if (!acc[link.category]) {
                acc[link.category] = [];
            }
            acc[link.category].push(link);
            return acc;
        }, {});
        res.render('index', {
            title: 'AI Tools',
            page: 'ailinks',
            displayName: (0, Util_1.UserDisplayName)(req),
            categorizedLinks: categorizedLinks // pass the categorized links to the view
        });
    })
        .catch((error) => {
        console.error('Error fetching AI Links: ', error);
        next(error);
    });
}
exports.DisplayAILinksPage = DisplayAILinksPage;
// Display AI Link Details Page
/*
export function DisplayAILinkDetails(req: Request, res: Response, next: NextFunction) {
  let aiPageId = req.params.id;
  AILink.findById(aiPageId)
  .then((aiPageToDisplay) => {
    if (!aiPageToDisplay) {
      res.status(404).send('AI Link page not found');
      return;
    }
    // Generate cover image URL
    if (aiPageToDisplay.imageUrl && aiPageToDisplay.imageUrl.length > 0) {
      aiPageToDisplay.imageUrl = '/AILinksImages/' + aiPageToDisplay.imageUrl;
    }
    res.render('index', {
        title: aiPageToDisplay.name,
        page: 'aiLinkPage',
        ailink: aiPageToDisplay
    });
  })
  .catch((err) => {
      console.error('Error fetching AI Link details: ', err);
      next(err);
  });
}
*/
// Display News Page
function DisplayNewsPage(req, res, next) {
    res.render('index', { title: 'News', page: 'news', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayNewsPage = DisplayNewsPage;
// Display Blog Page
function DisplayBlogPage(req, res, next) {
    const page = parseInt(req.query.page) || 1; //get current page number
    const limit = 3; // limit number of articles per page
    const skip = (page - 1) * limit; // calculate the number of articles to skip
    console.log(`Page: ${page}, Skip: ${skip}, Limit: ${limit}`); // 日志输出当前的分页参数
    // get the total number of articles
    article_1.default.countDocuments().exec()
        .then(count => {
        console.log(`Total articles count: ${count}`); // 日志输出文章总数
        // get the articles for the current page
        return article_1.default.find()
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
exports.DisplayBlogPage = DisplayBlogPage;
// Display Single Article Page
function DisplayArticleById(req, res, next) {
    let articleId = req.params.id;
    // use the Article model to query the Articles collection and fill author field
    article_1.default.findById(articleId)
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
exports.DisplayArticleById = DisplayArticleById;
// Process Blog Post page
function ProcessBlogPostPage(req, res, next) {
}
exports.ProcessBlogPostPage = ProcessBlogPostPage;
/* Display Dashboard page */
function DisplayDashboardPage(req, res, next) {
    res.render('index', { title: 'Dashboard', page: 'dashboard', user: req.user });
}
exports.DisplayDashboardPage = DisplayDashboardPage;
//(R)ead users list in CRUD
function DisplayUsersListPage(req, res, next) {
    // db.users.find()
    user_1.default.find().sort({ "username": 1 })
        .then((usersCollection) => {
        res.render('index', { title: 'Users', page: 'userManagement', users: usersCollection, displayName: (0, Util_1.UserDisplayName)(req) });
    })
        .catch((err) => {
        console.error(err);
        res.end(err);
    });
}
exports.DisplayUsersListPage = DisplayUsersListPage;
// Display (U)pdate User Info page
function DisplayUpdateUserInfoByIdPage(req, res, next) {
    let id = req.params.id;
    // pass the id to the db
    // db.users.find({"_id": id})
    user_1.default.findById(id)
        .then((user) => {
        res.render('index', { title: 'Update', page: 'updateUserInfo', user: user, displayName: (0, Util_1.UserDisplayName)(req) });
    })
        .catch((err) => {
        console.error(err);
        res.end(err);
    });
}
exports.DisplayUpdateUserInfoByIdPage = DisplayUpdateUserInfoByIdPage;
// Process (U)pdate User Info page
function ProcessUpdateUserInfoByIdPage(req, res, next) {
    let id = req.params.id;
    // instantiate a new User Item
    let updatedUserItem = new user_1.default({
        "_id": id,
        "username": req.body.username,
        "email": req.body.email,
        "displayName": req.body.displayName,
        "role": req.body.role,
        "bio": req.body.bio,
        "profilePicture": req.body.profilePicture,
        "isActive": req.body.isActive
    });
    // find the user item via db.user.update({"_id":id}) and then update
    user_1.default.updateOne({ _id: id }, updatedUserItem)
        .then(() => {
        res.redirect('/userManagement');
    })
        .catch((err) => {
        console.error(err);
        res.end(err);
    });
}
exports.ProcessUpdateUserInfoByIdPage = ProcessUpdateUserInfoByIdPage;
// Process (D)elete page
// export function ProcessDeleteUserByIdPage(req: Request, res: Response, next: NextFunction): void
// {
//     let id = req.params.id;
//   User.deleteOne({_id: id})
//   .then(() => {
//       res.redirect('/userManagement');
//   })
//   .catch((err: Error) => {
//     console.error(err);
//     res.end(err);
//   });
// }
/* Display Login or  authentication page */
function DisplayLoginPage(req, res, next) {
    res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayLoginPage = DisplayLoginPage;
function ProcessLoginPage(req, res, next) {
    passport_1.default.authenticate('local', (err, user, info) => {
        console.log(user);
        // are there any server errors?
        if (err) {
            console.error(err);
            return next(err);
        }
        // are there any login errors?
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // are there any db errors?
            if (err) {
                console.error(err);
                return next(err);
            }
            console.log("Logged in Successfully");
            return res.redirect('/');
        });
    })(req, res, next);
}
exports.ProcessLoginPage = ProcessLoginPage;
/* Display register page */
function DisplayRegisterPage(req, res, next) {
    res.render('index', { title: 'Register', page: 'register', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayRegisterPage = DisplayRegisterPage;
// Process register page
function ProcessRegisterPage(req, res, next) {
    console.log("Registration request received:", req.body);
    // instantiate a new User Object
    let newUser = new user_1.default({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.firstName + " " + req.body.lastName
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err) {
            console.error('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                console.error('Error: User Already Exists');
            }
            req.flash('registerMessage', 'Registration Error');
            return res.redirect('/register');
        }
        // after successful registration - let's login the user
        return passport_1.default.authenticate('local')(req, res, () => {
            return res.redirect('/');
        });
    });
}
exports.ProcessRegisterPage = ProcessRegisterPage;
function ProcessLogoutPage(req, res, next) {
    // req.logout(function(err) {
    //   if (err) { return next(err); }
    //   res.redirect('/');
    // });
    req.session.destroy(function (err) {
        res.redirect('/login');
        ; //Inside a callback… bulletproof!
    });
    //res.redirect('/login');
}
exports.ProcessLogoutPage = ProcessLogoutPage;
//# sourceMappingURL=index.js.map