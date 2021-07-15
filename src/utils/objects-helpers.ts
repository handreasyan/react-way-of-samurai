export const updateObjectInArray = (items,itemId,objPropsName,newObjProps) => {
  return items.map((user) => {
    if (user[objPropsName] === itemId) {
      return {...user, ...newObjProps};
    }
    return user;
  })
}