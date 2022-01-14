import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    imgUrl: { type: String, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
    creatorId: { type: ObjectId, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

PostSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})