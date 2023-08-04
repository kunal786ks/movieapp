import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../api-helpers/api-helper'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store'

const Auth = () => {
  const dispatch=useDispatch();
  const onResreceived=(data)=>{
    console.log(data);
    dispatch(userActions.login())
    localStorage.setItem("userId",data.id);
  }
    const getData=(data)=>{
        console.log(data)
        sendUserAuthRequest(data.inputs,data.signup)
        .then(onResreceived)
        .catch(err=>console.log(err))
    }
  return (
    <div>
     <AuthForm onSubmit={getData} isAdmin={false}/>
    </div>
  )
}

export default Auth
