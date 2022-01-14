import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema(
  {
    gifUrl: { type: String, required: true },
    creatorId: { type: ObjectId, ref: 'Profile', required: true },
    postId: { type: ObjectId, ref: 'Post', required: true}
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})

CommentSchema.virtual('post', {
  localField: 'postId',
  foreignField: "_id",
  justOne: true,
  ref: 'Post'
})