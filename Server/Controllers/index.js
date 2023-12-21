"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessLogoutPage = exports.ProcessRegisterPage = exports.DisplayRegisterPage = exports.ProcessLoginPage = exports.DisplayLoginPage = exports.ProcessBlogPostPage = exports.DisplayArticleById = exports.DisplayBlogPage = exports.DisplayNewsPage = exports.DisplayAILinksPage = exports.DisplayToolsPage = void 0;
const passport_1 = __importDefault(require("passport"));
// create instances of the Models
const user_1 = __importDefault(require("../Models/user"));
const category_1 = __importDefault(require("../Models/category"));
const tag_1 = __importDefault(require("../Models/tag"));
const comment_1 = __importDefault(require("../Models/comment"));
console.log(category_1.default, tag_1.default, comment_1.default); // avoid unused error, these models should be read before Article model
const article_1 = __importDefault(require("../Models/article"));
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
    res.render('index', { title: 'AI Links', page: 'ailinks', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayAILinksPage = DisplayAILinksPage;
// Display News Page
function DisplayNewsPage(req, res, next) {
    res.render('index', { title: 'News', page: 'news', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayNewsPage = DisplayNewsPage;
// Display Blog Page
function DisplayBlogPage(req, res, next) {
    res.render('index', { title: 'Blog', page: 'blog', displayName: (0, Util_1.UserDisplayName)(req) });
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