import { ProxyState } from "../AppState.js";
import { activePostService } from "../Services/ActivePostService.js";
import { buttonsService } from "../Services/ButtonsService.js";


function drawActivePost() {
    let template = ''
    ProxyState.activePost.forEach(p => { template += p.ATemplate })
    document.getElementById('acpost').innerHTML = template
}

function likes() {
    let template = ''
    likes++
    document.getElementById('')
}

export class ActivePostsController {
    constructor() {
        ProxyState.on('activePost', drawActivePost)
        activePostService.getPost()
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

    async likes(like) {
        try {
            const like = await buttonsService.likes(like)
        } catch (error) {
            console.log(error)
        }
    }

}
