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
        activePostService.getPost()
    }

    async getAll() {
        try {
            await activePostService.getPost()
        } catch (error) {
            console.log(error)
        }
    }

    async addPost() {
        try {
            window.event.preventDefault();
            let form = window.event.target;
            const newPost = {
                title: form.postTitle.value,
                imgUrl: form.postContent.value
            }
            await activePostService.addPost(newPost)
            form.reset()
            console.log("close");
            bootstrap.Modal.getOrCreateInstance(document.getElementById('exampleModal')).hide()
            console.log("close2");
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

    async likes(id) {
        try {
            await activePostService.likes(id)
        } catch (error) {
            console.log(error)
        }
    }

    async dislikes(id) {
        try {
            await activePostService.dislikes(id)
        } catch (error) {
            console.log(error)
        }
    }

}
