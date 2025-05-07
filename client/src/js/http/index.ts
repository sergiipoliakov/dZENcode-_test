import axios from 'axios';

const $host = axios.create({
  baseURL: `${process.env.SERVER_URL}${process.env.SERVER_API_PATH}`
})

export {
  $host
}