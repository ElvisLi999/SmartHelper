
import express from 'express';
import { UserDisplayName } from '../Util';
const router = express.Router();
export default router;

/* Get a reference to Util Functions */
import { AuthGuard } from '../Util';

/* Get Page Controllers */
import { DisplayToolsPage, DisplayAILinksPage, DisplayNewsPage, DisplayBlogPage, DisplaySingleArticlePage, DisplayLoginPage, ProcessLoginPage,DisplayRegisterPage, ProcessRegisterPage, ProcessLogoutPage} from '../Controllers/index';


/* GET tools page. */
router.get('/', DisplayToolsPage);

/* GET tools page. */
router.get('/tools', DisplayToolsPage);

/* GET AI Toolkit page. */
router.get('/ailinks', DisplayAILinksPage);

/* GET News page. */
router.get('/news', DisplayNewsPage);

/* GET Blog page. */
router.get('/blog', DisplayBlogPage);

/* GET - single article page. */
router.get('/article/:id', DisplaySingleArticlePage);

/* GET - display login page. */
router.get('/login', DisplayLoginPage);

/* Post  - process login page*/
router.post('/login', ProcessLoginPage);

/* Get register page */
router.get('/register', DisplayRegisterPage);

/* Post  - process register page*/
router.post('/register', ProcessRegisterPage);

/* Get  - process logout page*/
router.get('/logout', ProcessLogoutPage);
