"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
/* Get a reference to Util Functions */
const Util_1 = require("../Util");
/* Get Page Controllers */
const index_1 = require("../Controllers/index");
/* GET tools page. */
router.get('/', index_1.DisplayToolsPage);
/* GET tools page. */
router.get('/tools', index_1.DisplayToolsPage);
/* GET AI Toolkit page. */
router.get('/ailinks', index_1.DisplayAILinksPage);
/* GET News page. */
router.get('/news', index_1.DisplayNewsPage);
/* GET Blog page. */
router.get('/blog', index_1.DisplayBlogPage);
/* GET - single article page. */
router.get('/article/:id', index_1.DisplayArticleById);
/* GET - user dashboard page. */
router.get('/dashboard', Util_1.AuthGuard, index_1.DisplayDashboardPage);
/* GET user management page */
router.get('/userManagement', Util_1.AuthGuard, index_1.DisplayUsersListPage);
/* GET - display /userManagement/update/:id page. */
router.get('/userManagement/update/:id', Util_1.AuthGuard, index_1.DisplayUpdateUserInfoByIdPage);
/* POST - process /userManagement/update/:id page. */
router.post('/userManagement/update/:id', Util_1.AuthGuard, index_1.ProcessUpdateUserInfoByIdPage);
/* GET - process /userManagement/delete/:id. */
//router.get('/userManagement/delete/:id',AuthGuard, ProcessDeleteUserByIdPage)
/* GET - display login page. */
router.get('/login', index_1.DisplayLoginPage);
/* Post  - process login page*/
router.post('/login', index_1.ProcessLoginPage);
/* Get register page */
router.get('/register', index_1.DisplayRegisterPage);
/* Post  - process register page*/
router.post('/register', index_1.ProcessRegisterPage);
/* Get  - process logout page*/
router.get('/logout', index_1.ProcessLogoutPage);
//# sourceMappingURL=index.js.map