import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class PostsService {
  async getAll() {
    const posts = await dbContext.Posts.find().populate('creator')
    return posts
  }
  
  async getById(id) {
    const post = await dbContext.Posts.findById(id).populate('creator')
    if (!post) {
      throw new BadRequest('Invalid Post Id')
    }
    return post
  }
  
  async create(body) {
    const post = await dbContext.Posts.create(body)
    return body
  }
  
  async edit(updated) {
    const original = await this.getById(updated.id)
    if (original.creatorId.toString() !== updated.creatorId) {
      throw new BadRequest('Unable to edit')
    }
    original.title = updated.title || original.title
    await original.save()
    return original
  }
  
  async remove(postId, userId) {
    const original = await this.getById(postId)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('Dis no possible')
    }
    await dbContext.Posts.findOneAndRemove({ _id: postId })
  }
}






export const postsService = new PostsService