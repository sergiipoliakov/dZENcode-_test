import axios from 'axios';

const $host = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/'
})
  console.log('🚀 ~ index.ts:6 ~ import.meta.env.VITE_API_URL:', import.meta.env.VITE_API_URL)

export {
  $host
}