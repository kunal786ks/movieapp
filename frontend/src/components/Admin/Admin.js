import React from 'react'
import AuthForm from '../Auth/AuthForm'
import { sendAdminLoginReq } from '../../api-helpers/api-helper'
import { useDispatch } from 'react-redux'
import { adminActions } from '../../store'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const onResreceived=(data)=>{
    console.log(data)
    dispatch(adminActions.login())
    localStorage.setItem("adminId",data.id);
    localStorage.setItem("token",data.token);
    navigate('/')
  }
    const getData=(data)=>{
        console.log("admin",data)
        sendAdminLoginReq(data.inputs)
        .then(onResreceived).catch(err=>console.log(err))
    }
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true}/>
    </div>
  )
}

export default Admin
