import {createSelector} from "reselect";

export const getUsersSel = (state) => {
  return state.usersPage.users
}


export const getPageSizeSel = (state) => {
  return state.usersPage.pageSize
}

export const getTotalUsersCountSel = (state) => {
  return state.usersPage.totalUsersCount
}

export const getCurrentPageSel = (state) => {
  return state.usersPage.currentPage
}

export const getIsFetchingSel = (state) => {
  return state.usersPage.isFetching
}

export const getFollowingInProgressSel = (state) => {
  return state.usersPage.followingInProgress
}

//  getUsersSuperSel_vojmitex chem ogtagorcel bayc tox mna vorpes reselecti orinak ,,,, ete unenq nenc selector vore vor ira mej stateic injvor mi masnik veradarcneluc injvor djvar logica katarum dara hamar ogtagorcumenq reselect liby , vorovhetev mstp_n amen angam erb tenuma vor injvor selectro poxvela inqy taza rendera anum,isk qani es es selectornery functionneren aysinqn amboxj kayqi mej cankcacac mi poqr ban poxveluc mstp_n taza kkanchi es selector fucntionnere u kmtaci te injvor bana poxvel vortex et functionnery veradarcnumen nor mek ayl object u hetevabar taza render kani aranc haskanalu vor vochmi banel cher poxve, dra hamar es reselect liby et harcu lucuma u karoxanuma tarberi iroq ban poxvela es konkret functioni het kapvac te che
export const getUsersSuperSel = createSelector(getUsersSel,getIsFetchingSel,(users,isFetching)=>{
  for(let i=0; i<999999;i++){
    /* do something . . .*/
  }

  const newArr =  users.filter(us=> true /*some logic*/).map(us=>us /*some logic*/).filter(us=> true /*some logic*/)

  return [...newArr,isFetching]
})
