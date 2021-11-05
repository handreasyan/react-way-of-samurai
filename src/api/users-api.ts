import {GetItemsType, instance,ApiResponseType} from "./api";



export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10,term = ''){
    return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`)
      .then((response) => {
        return response.data
      });
  },
  unFollow(id:number){
    return instance.delete(`follow/${id}`).then(res => res.data ) as Promise<ApiResponseType>
  },
  follow(id:number){
    return instance.post<ApiResponseType>(`follow/${id}`).then(res => res.data)
  }
}
