export class ActivePost {
  constructor(data) {
    this.profile = data.creator.picture
    this.id = data.id
    this.imgUrl = data.imgUrl
    this.title = data.title
    this.likes = data.likes
    this.dislikes = data.dislikes
    this.createdAt = data.createdAt
  }
  get ATemplate() {
    return `
        <div class="card p-4 border border-primary border-5">
            <div class="d-flex justify-content-center align-items-center">
              <img src="${this.imgUrl}" alt="${this.title}" class="mx-3 align-items-center" width="60%">
              <div class="d-flex flex-column justify-content-between">
                <button class="btn btn-success mdi mdi-thumb-up" onclick="app.activePostsController.likes('${this.id}')"></button>
                <p>${this.likes}</p>
                <button class="btn btn-primary mdi mdi-arrow-right-circle" onclick="app.activePostsController.getAll()"></button>
                <button class="btn btn-danger mdi mdi-thumb-down" onclick="app.activePostsController.dislikes('${this.id}')"></button>
                <p class="text-center">${this.dislikes}</p>
              </div>
            </div>
            <div class="d-flex justify-content-center align-items-center card-body">
              <div class="row">
                <div class="mx-3 p-3 justify-content-between align-items-center col-8 d-flex">
                <img src="${this.profile}" alt"" class="m-2" width="15%"><p>${this.title}</p>
                <button class="btn btn-primary mx-5" onclick="app.commentsController.drawComments()">COMMENTS</button>
                </div>
                <div>
                </div>
              </div>
            </div>
            <div class="row card-footer">
              <div class="mx-3 p-3 justify-content-between col-12 d-flex">${this.Time} 
              <button class="btn btn-primary mx-5" onclick="app.commentsController.getComments('${this.id}')">COMMENTS</button>
              </div>
            </div>
          </div>
        `
  }

  get Time() {
    // @ts-ignore
    return moment(this.createdAt).startOf('hour').fromNow()
  }
}