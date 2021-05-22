import axios from 'axios'

const PORT = '8000'
const DOMAIN = document.domain
const HOST = import.meta.env.DEV ? `${DOMAIN}:${PORT}` : document.location.host

export const AxiosInstance = axios.create({
  baseURL: `http://${HOST}`,
  method: 'post',
})

export const webSocket = new WebSocket(`ws://${HOST}`)

export let cryptoData: { [props: string]: Omit<Crypto, 'name'> } = {}

webSocket.onmessage = event => {
  cryptoData = JSON.parse(event.data)
}