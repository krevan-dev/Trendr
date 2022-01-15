import { postApi } from "./AxiosService.js";
import { activePostService } from "./ActivePostService.js";
import { ProxyState } from "../AppState";

class ButtonsService {

    async likes(like) {
        if (ProxyState.activePost == null) {
            window.alert('Please sign in first')
        }
        let activeLike = ProxyState.activePost.likes
    }

}

export const buttonsService = new ButtonsService()