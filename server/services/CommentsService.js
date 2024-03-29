import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getAll(query = {}) {
    const comment = await dbContext.Comments.find(query).populate('creator')
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
    original.gifUrl = updated.gifUrl || original.gifUrl
    await original.save()
    return original
  }

  async remove(commentId, userId) {
    const original = await this.getById(commentId)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('Dis no workee')
    }
    await dbContext.Posts.findOneAndRemove({ _id: commentId })
  }

}

export const commentsService = new CommentsService()