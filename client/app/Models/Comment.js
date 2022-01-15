export class Comment {
    constructor(data) {
        this.gifUrl = data.gifUrl
        this.postId = data.postId
        this.creatorId = data.creatorId
    }

    get CTemplate() {
        return `
        <li>
        <iframe src="${this.gifUrl}" width="480" height="268" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        </li>
        `
    }
}