import axios from 'axios'

export const getAllMovies=async()=>{
    const res=await axios
    .get("/movie")
    .catch((err)=>console.log(err))
    

    if(res.status !==200){
        console.log("No Data")
    }
    const data=await res.data;
    return data;
};

export const sendUserAuthRequest=async(data,signup)=>{
    const res=await axios.post(`/user/${signup ? "signup":"login"}`,{
        name:signup?data.name:'',
        email:data.email,
        password:data.password
    }).catch(err=>console.log(err));

    if(res.status!==200 && res.status !==201){
        console.log('Unexpected error occured');
    }
    const resData=await res.data;
    return resData;
}

export const sendAdminLoginReq=async(data)=>{
    const res=await axios.post("/admin/login",{
        email:data.email,
        password:data.password,
    }).catch(err=>console.log(err))

    if(res.status !==200){
        console.log('Unexpected error')
    }

    const resData=await res.data;
    return resData;
}