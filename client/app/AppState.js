import { dev } from './env.js'
import { ActivePost } from './Models/ActivePost.js'
import { EventEmitter } from './Utils/EventEmitter.js'
import { isValidProp } from './Utils/isValidProp.js'

class AppState extends EventEmitter {
  user = {}
  account = {}
  /** @type {import('./Models/Value').Value[]} */
  values = []
  socketData = []
  activePost = []
  comments = {}
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})

if (dev) {
  // @ts-ignore
  window.ProxyState = ProxyState
}
