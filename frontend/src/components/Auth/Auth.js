import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../api-helpers/api-helper'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const onResreceived=(data)=>{
    console.log(data);
    dispatch(userActions.login())
    localStorage.setItem("userId",data.id);
    console.log('successfully logged in')
    navigate('/')
  }
    const getData=(data)=>{
        console.log(data)
        sendUserAuthRequest(data.inputs,data.signup)
        .then(res=>onResreceived(res))
        .catch(err=>console.log(err))
    }
  return (
    <div>
     <AuthForm onSubmit={getData} isAdmin={false}/>
    </div>
  )
}

export default Auth
