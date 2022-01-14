import { baseURL } from '../env.js'


// @ts-ignore
// eslint-disable-next-line no-undef
export const api = axios.create({
  baseURL: baseURL,
  timeout: 8000,
  withCredentials: true
})

export const postApi = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 8000,
})
