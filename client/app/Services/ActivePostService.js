import { ProxyState } from "../AppState.js";
import { ActivePost } from "../Models/ActivePost.js";
import { postApi } from "./AxiosService.js";

class ActivePostsService {
    async getActivePost() {
        const res = await postApi.get('posts')
        ProxyState.activePost = res.data.map(p => new ActivePost(p))
        console.log('ProxyState.activePost', ProxyState.activePost)
    }

    async addPost(postId) {
        const foundPost = ProxyState.activePost.find(p => p.postId === postId)
        const res = await postApi.post('posts', foundPost)
        ProxyState.activePost = [...ProxyState.activePost, new ActivePost(res.data)]
        console.log('ProxyState.activePost', ProxyState.activePost)
        return new ActivePost(res.data)
    }

    async removePost(postId) {
        const res = await postApi.delete(`posts/${postId}`)
        console.log(res.data)
        ProxyState.activePost = ProxyState.activePost.filter(p => p.id !== postId)
        return new ActivePost(res.data)
    }

    async getPost() {
        try {
            const res = await postApi.get('posts')
            console.log(res.data)
            ProxyState.activePost = res.data.map(p => new ActivePost(p))
        } catch (error) {
            console.log(error)
        }
    }

    async like() {

    }
}

export const activePostService = new ActivePostsService()

