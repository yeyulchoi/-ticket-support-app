import {React, useState, useEffect} from 'react'
import { FaSignInAlt} from "react-icons/fa";
import { toast } from 'react-toastify';
import{useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'

import {useSelector,useDispatch} from 'react-redux'
import{login,reset} from '../features/auth/authSlice'

function Login() {
    const[formData, setFormData] = useState({
   
        email:'',
        password:'',
        
    })


const {email,password}=formData


const dispatch =useDispatch()
const navigate=useNavigate()
const {user, isLoading,isError,isSuccess, message}=
     useSelector((state)=>state.auth)


useEffect(()=>{
if(isError){
    toast.error(message)
}

//redirect when logged in
if(isSuccess|| user){
    navigate('/')
}
dispatch(reset())

}, [isError,isSuccess,user,message,navigate, dispatch]) 
  
     
const onChange=(e)=>{
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value,
       

    }))
}
const onSubmit=(e)=>{
    e.preventDefault()

    const userData={
      email,
      password
    }
   dispatch(login(userData))

    }
if(isLoading){
  return<Spinner/>
}
  return (
    <>
      <section className='heading'>
        <h1>   <FaSignInAlt />Login</h1>
        <p>Please log in to get Support</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
            
            <div className="form-group">
                <input type="email" className="form-control" id="email"
                 value={email} name="email"
                onChange={onChange} placeholder='Enter Your email' required  />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" id="password"
                 value={password} name="password"
                onChange={onChange} placeholder='Enter Your password' required  />
            </div>
           
            <div className="form-group" >
                <button className="btn btn-block" required>Submit</button>
            </div>
        </form>
      </section>
    </>
  )


}

export default Login
