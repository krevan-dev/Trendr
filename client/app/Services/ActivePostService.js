import { ProxyState } from "../AppState.js";
import { ActivePost } from "../Models/ActivePost.js";
import { api } from "./AxiosService.js";

class ActivePostsService {
    async getActivePost() {
        const res = await api.get('api/posts')
        ProxyState.activePost = res.data.map(p => new ActivePost(p))
        console.log('ProxyState.activePost', ProxyState.activePost)
    }
    
    async addPost(postId) {
        const foundPost = ProxyState.activePost.find(p => p.postId === postId)
        const res = await api.post('api/posts', foundPost)
        ProxyState.activePost = [...ProxyState.activePost, new ActivePost(res.data)]
        console.log('ProxyState.activePost', ProxyState.activePost)
        return new ActivePost(res.data)
    }
    
    async removePost(postId) {
        const res = await api.delete(`api/posts/${postId}`)
        console.log(res.data)
        ProxyState.activePost = ProxyState.activePost.filter(p => p.id !== postId)
        return new ActivePost(res.data)
    }
    
    async getPost() {
        try {
            const res = await api.get('api/posts')
            console.log(res.data)
            ProxyState.activePost = res.data.map(p => new ActivePost(p))
        } catch (error) {
            console.log(error)
        }
    }
    
    async likes(id) {
        try {
            const res = await api.put(`api/posts/${id}/like`)
            console.log(res)
            let foundPostIndex = ProxyState.activePost.findIndex(p => p.id === id)
            ProxyState.activePost.splice(foundPostIndex, 1, new ActivePost(res.data))
            ProxyState.activePost = ProxyState.activePost
        } catch (error) {
            console.log(error)
        }
    }
}

export const activePostService = new ActivePostsService()

