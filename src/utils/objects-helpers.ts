import {UserType} from "../types/types";

export const updateObjectInArray = (items:Array<UserType>,itemId:number,objPropsName:string,newObjProps:{followed:boolean}) => {
  return items.map((user) => {
    if (user.id === itemId) {
      return {...user, ...newObjProps};
    }
    return user;
  })
}