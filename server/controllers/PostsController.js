import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import { postsService } from "../services/PostsService";
import BaseController from "../utils/BaseController";

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      // get by relationship
      .get('/:id/comments', this.getCommentsByPostId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .put('/:id/like', this.like)
      .put('/:id/dislike', this.dislike)
      .delete('/:id', this.remove)

  }
  async getAll(req, res, next) {
    try {
      const posts = await postsService.getAll()
      return res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const post = await postsService.getById(req.params.id)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByPostId(req, res, next) {
    try {
      const comments = await commentsService.getAll({ postId: req.params.id })
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const post = await postsService.create(req.body)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const updated = await postsService.edit(req.body)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await postsService.remove(req.params.id, req.userInfo.id)
      return res.send('Post hath been deleteth')
    } catch (error) {
      next(error)
    }
  }

  async like(req, res, next) {
    try {
      const updated = await postsService.like(req.params.id, req.userInfo.id)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }

  async dislike(req, res, next) {
    try {
      req.body = req.userInfo.id
      req.body.id = req.params.id
      const updated = await postsService.edit(req.body)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }

}