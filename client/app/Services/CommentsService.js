import { ProxyState } from "../AppState.js";
import { Comment } from "../Models/Comment.js";
import { api } from "./AxiosService.js";

class CommentsService {
    async getPostComments() {
        const res = await api.get('comments')
        ProxyState.comments = res.data.map(c => new Comment(c))
        console.log('ProxyState.getcomment', ProxyState.comments)
    }

    async addComment(postId) {
        const foundComment = ProxyState.comments.find(c => c.postId === postId)
        const res = await api.post('comments', foundComment)
        ProxyState.comments = [...ProxyState.comments, new Comment(res.data)]
        console.log('ProxyState.addcomments', ProxyState.comments)
        return new Comment(res.data)
    }

    async removeComment(postId) {
        const res = await api.delete(`comments/${postId}`)
        console.log(res.data)
        ProxyState.comments = ProxyState.comments.filter(c => c.Id !== Id)
        return new Comment(res.data)
    }


}
export const commentsService = new CommentsService()