export class Comment {
    constructor(data) {
        this.gifUrl = data.gifUrl
        this.postId = data.postId
        this.creatorId = data.creatorId
        this.profile = data.creator.picture
    }

    get CTemplate() {
        return `
        <li>
        <img src="${this.profile}" alt"" class="m-2" width="15%">
        <iframe src="${this.gifUrl}" width="480" height="268" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        </li>
        `
    }
}