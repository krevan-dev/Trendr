import { ProxyState } from "../AppState.js";
import { Comment } from "../Models/Comment.js";
import { postApi } from "./AxiosService.js";

class CommentsService {
    async getPostComments() {
        const res = await postApi('comments')
        ProxyState.comments = res.data.map(c => new Comment(c))
        console.log('ProxyState.getcomment', ProxyState.comments)
    }

    async addComment(postId) {
        const foundComment = ProxyState.comments.find(c => c.postId === postId)
        const res = await postApi.post('comments', foundComment)
        ProxyState.comments = [...ProxyState.comments, new Comment(res.data)]
        console.log('ProxyState.addcomments', ProxyState.comments)
        return new Comment(res.data)
    }

    async removeComment(postId) {
        const res = await postApi.delete(`comments/${postId}`)
        console.log(res.data)
        ProxyState.comments = ProxyState.comments.filter(c => c.Id !== Id)
        return new Comment(res.data)
    }


}
export const commentsService = new CommentsService()