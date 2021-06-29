import * as axios from "axios";

const instance = axios.create({
  baseURL:'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {"API-KEY": "2d125ff6-566c-49e6-b2b5-ccdcd757752f"}
})

export const usersAPI = {
  getUsers:(currentPage = 1, pageSize = 10) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => response.data);
  },
  getOneUser:(userId) => {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },
  getMyProfile:() => {
    return instance.get(`auth/me`).then((response) => response.data);
  },
  unFollow:(id)=> {
    return instance.delete(`follow/${id}`)
  },
  follow:(id) => {
    return instance.post(`follow/${id}`)
  }
}