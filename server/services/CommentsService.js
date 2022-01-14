import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getAll() {
    const comment = await dbContext.Comments.find().populate('creator')
    return comment
  }

  async getById(id) {
    const comment = await dbContext.Comments.findById(id).populate('creator')
    if (!comment) {
      throw new BadRequest('Invalid Comment Id')
    }
    return comment
  }

  async create(body) {
    const comment = await dbContext.Comments.create(body)
    return body
  }

  async edit(updated) {
    const original = await this.getById(updated.id)
    if (original.creatorId.toString() !== updated.creatorId) {
      throw new BadRequest('Unable to edit')
    }
    original.gifUrl
  }
}

export const commentsService = new CommentsService()