import { ActivePostsController } from './Controllers/ActivePostController.js';
import { AuthController } from './Controllers/AuthController.js'
import { CommentsController } from './Controllers/CommentController.js';
import { ValuesController } from './Controllers/ValuesController.js'

class App {
  authController = new AuthController();
  valuesController = new ValuesController();
  activePostsController = new ActivePostsController();
  commentsController = new CommentsController();
}

// @ts-ignore
window.app = new App()
