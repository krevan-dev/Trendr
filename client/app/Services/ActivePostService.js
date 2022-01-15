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

    async getPosts() {
        try {
            const localData = JSON.parse(localStorage.getItem('postData'))
            if (localData) {
                ProxyState.posts = localData.posts.map(p => new Post(p))
            } else {
                const res = await postApi.get('posts')
                localStorage.setItem('postData', JSON.stringify({
                    posts: res.data.body.posts
                }))
                ProxyState.posts = res.data.body.map(p => new Post(p))
            }
            console.log('Posts array after localstorage', ProxyState.posts)
        } catch (error) {
            console.log(error)
        }
    }

}

export const activePostService = new ActivePostsService()

