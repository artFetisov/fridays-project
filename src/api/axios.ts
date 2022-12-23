import axios from 'axios'

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_BACK_LOCAL
      : process.env.REACT_APP_BACK_HEROKU,
  withCredentials: true,
})
