import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux_store";

interface IProps {
  isAuth:boolean,
}

const mstp = (state:AppStateType) => ({isAuth: state.auth.isAuth})

export function WithAuthRedirect<WCP>(WrappedComponent:React.ComponentType<WCP>){
  const RedirectComponent:React.FC<IProps & {}> = (props) => {

    let {isAuth,...restProps} = props

    if (!props.isAuth) return <Redirect to={'/login'}/>

    return <WrappedComponent {...restProps as WCP}/>
  }


  // @ts-ignore
  let ConnectedAuthRedirectComponent = connect<IProps,{},WCP,AppStateType>(mstp)(RedirectComponent)

  return ConnectedAuthRedirectComponent
};

