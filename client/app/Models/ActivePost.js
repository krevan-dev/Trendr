export class ActivePost {
    constructor(data) {
        this.postId = data.postId
        this.imgUrl = data.imgUrl
        this.title = data.title
        this.likes = data.likes
        this.dislikes = data.dislikes
        // this.time = ....
    }
    get ATemplate() {
        return `
        <div class="card p-4 border border-primary border-5">
            <div class="d-flex justify-content-center align-items-center">
              <button class="btn btn-primary mdi mdi-arrow-left-circle"></button>
              <img src="${this.imgUrl}" alt="${this.title}" class="mx-3 align-items-center" width="60%">
              <div class="d-flex flex-column justify-content-between">
                <button class="btn btn-success mdi mdi-thumb-up"></button>
                <p>${this.likes}</p>
                <button class="btn btn-primary mdi mdi-arrow-right-circle"></button>
                <button class="btn btn-danger mdi mdi-thumb-down"></button>
                <p>${this.dislikes}</p>
              </div>
            </div>
            <div class="d-flex justify-content-center align-items-center card-body">
              <div class="row">
                <div class="col-12">
                  <p class="mx-3"><b>${this.profile}:</b> ${this.title}</p>
                </div>
              </div>
            </div>
            <div class="row card-footer">
              <div class="mx-3 p-3 justify-content-between col-12 d-flex">${this.time} <button
                  class="btn btn-primary mx-5">COMMENTS</button>
              </div>
            </div>
          </div>
        `
    }
}