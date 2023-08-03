import React from 'react'
import AuthForm from '../Auth/AuthForm'
import { sendAdminLoginReq } from '../../api-helpers/api-helper'
import { useDispatch } from 'react-redux'
import { adminActions } from '../../store'

const Admin = () => {
  const dispatch=useDispatch()
  const onResreceived=(data)=>{
    console.log(data)
    dispatch(adminActions.login())
    localStorage.setItem("adminId",data.id);
    localStorage.setItem("token",data.token);
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
