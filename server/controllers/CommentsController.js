import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { commentsService } from "../services/CommentsService"



export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }



  async getAll(req, res, next) {
    try {
      const comments = await commentsService.getAll()
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const comments = await commentsService.getById(req.params.id)
      return res.send(comments)
    } catch (error) {
      next(error)
    }

  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.create(req.body)
      return res.send(comment)

    } catch (error) {
      next(error)

    }

  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const updated = await commentsService.edit(req.body)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      await commentsService.remove(req.params.id, req.userInfo.id)
      return res.send('Comment hath been deleteth')
    } catch (error) {
      next(error)
    }
  }
}