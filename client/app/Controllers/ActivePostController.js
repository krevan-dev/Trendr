import { ProxyState } from "../AppState.js";
import { activePostService } from "../Services/ActivePostService.js";


function drawActivePost() {
    let template = ''
    ProxyState.activePost.forEach(p => { template += p.ATemplate })
    document.getElementById('activePost').innerHTML = template
}

export class ActivePostsController {
    constructor() {
        ProxyState.on('activePost', drawActivePost)
    }

    async addPost(postId) {
        try {
            const addedPost = await activePostService.addPost(postId)
        } catch (error) {
            console.log(error)
        }
    }

    async removePost(postId) {
        try {
            const removedPost = await activePostService.removePost(postId)
        } catch (error) {
            console.log(error)
        }
    }
}
