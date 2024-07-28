import {React, useState, useEffect} from 'react'
import{useNavigate} from 'react-router-dom'
import { FaUser} from "react-icons/fa";
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner'
import {useSelector,useDispatch} from 'react-redux'
import{register, reset} from '../features/auth/authSlice'


function Register() {
    const[formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })


const {name, email,password,confirmPassword}=formData


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

    if(password !== confirmPassword){
    toast.error('Passwords do not match')
    }else{
        const userData = {
            name,email,password
        }
        dispatch(register(userData))
    }
}

if(isLoading){
    return <Spinner/>
}
  return (
    <>
      <section className='heading'>
        <h1>   <FaUser />Register </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="text" className="form-control" id="name"
                 value={name} name="name"
                onChange={onChange} placeholder='Enter Your name' required  />
            </div>
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
            <div className="form-group">
                <input type="password" className="form-control" id="confirmPassword"
                 value={confirmPassword} name="confirmPassword"
                onChange={onChange} placeholder='Enter Your confirm Password'  required />
            </div>
            <div className="form-group" >
                <button className="btn btn-block" required>Submit</button>
            </div>
        </form>
      </section>
    </>
  )
}
export default Register
