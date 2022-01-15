import { ProxyState } from "../AppState.js";
import { activePostService } from "../Services/ActivePostService.js";


function drawActivePost() {
    let template = ''
    ProxyState.activePost.forEach(p => { template += p.ATemplate })
    document.getElementById('acpost').innerHTML = template
}

export class ActivePostsController {
    constructor() {
        ProxyState.on('activePost', drawActivePost)
        activePostService.getPosts()
    }

    async addPost(postId) {
        try {
            const addedPost = await activePostService.addPost(postId)
            // TODO sweet alert added post
        } catch (error) {
            console.log(error)
        }
    }

    async removePost(postId) {
        try {
            const removedPost = await activePostService.removePost(postId)
            // TODO SWEET ALERT
        } catch (error) {
            console.log(error)
        }
    }
}
