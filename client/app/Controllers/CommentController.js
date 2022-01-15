import { ProxyState } from "../AppState.js";
import { commentsService } from "../Services/CommentsService.js";


function drawComments() {
    let template = ''
    ProxyState.comments.forEach(c => { template += c.CTemplate })
    document.getElementById('comms').innerHTML = template
    bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('offcanvasRight')).toggle()
}

export class CommentsController {
    constructor() {
        ProxyState.on('comments', drawComments)
    }

    async addComment(postId) {
        try {
            const addedComment = await commentsService.addComment(postId)
        } catch (error) {
            console.log(error)
        }
    }

    async removeComment(postId) {
        try {
            const removedComment = await commentsService.removeComment(postId)
        } catch (error) {
            console.log(error)
        }
    }

    async getComments(postId) {
        try {
            await commentsService.getPostComments(postId)
        } catch (error) {
            console.log(error)
        }
    }
}