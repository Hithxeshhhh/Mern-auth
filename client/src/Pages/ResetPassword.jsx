import "react-toastify/dist/ReactToastify.css";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";

const ResetPassword = ()=>{


  const {backendUrl} = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [newPassword,setNewPassword] = useState('');
  const [isEmailSent,setIsEmailSent] = useState('');
  const [otp,setOtp] = useState(0);
  const [isOtpSubmitted,setIsOtpSubmitted] = useState(false);



const inputRefs = React.useRef([])

  const handleInput = (e,index) => {
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index + 1].focus()
    }
  }

  const handlekeyDown = (e,index) => {
    if(e.key === "Backspace" && e.target.value === '' &&index > 0){
      inputRefs.current[index - 1].focus()
  }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char,index) => {
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp',{email})
      console.log(data);
      
        data.success ? toast.success(data.message) : toast.error(data.message)
        data.success && setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message)
    }
  }

const onSubmitOtp = async (e) => {
  e.preventDefault();
  const otpArray = inputRefs.current.map(e => e.value)
  setOtp(otpArray.join(''))
  setIsOtpSubmitted(true)
}


  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl + '/api/auth/reset-password',{email,otp,newPassword})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate('/login')
    
    } catch (error) {
      toast.error(data.message)
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen 
    bg-gradient-to-br from-blue-200 to-purple-400">
      <img src={assets.logo} className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer" alt="logo" onClick={()=>navigate('/')}/>


      {!isEmailSent && 
         <form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm " onSubmit={onSubmitEmail}> 
         <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset password Otp</h1>
         <p className="text-center mb-6 text-indigo-300">Enter your registered Email address</p>
         <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full border bg-[#333A5C]">
           <img src={assets.mail_icon} className="w-3 py-2.5"/>
           <input type="email" placeholder="Email" className=" text-white bg-transparent outline-none"
           value={email} onChange={(e)=>setEmail(e.target.value)} required/>
         </div>
         <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900
          text-white rounded-full mt-3">Submit</button>
         </form>
      }
     
{!isOtpSubmitted && isEmailSent && 
  <form onSubmit={onSubmitOtp}  className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm ">
  <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password Otp</h1>
<p className="text-center mb-6 text-indigo-300">Enter the 6-digit code sent to your email id</p>
<div className="flex justify-between mb-8" onPaste={handlePaste}>
  {Array(6).fill(0).map((_,index) => (
    <input key={index} maxLength='1' required type="text" className="w-12 h-12 text-center border border-gray-500 rounded-md" 
     ref={e => inputRefs.current[index] = e}
      onInput={(e)=> handleInput(e,index)} 
      onKeyDown={(e)=>handlekeyDown(e,index)} />
  ))}
</div>
<button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">Submit</button>
  </form>
}

      
    {isOtpSubmitted && isEmailSent && 
      <form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm " onSubmit={onSubmitNewPassword}>
      <h1 className="text-white text-2xl font-semibold text-center mb-4">New Password</h1>
      <p className="text-center mb-6 text-indigo-300">Enter the new Password Below</p>
      <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full border bg-[#333A5C]">
        <img src={assets.lock_icon} className="w-3 py-2.5"/>
        <input type="password" placeholder="Password" className=" text-white bg-transparent outline-none"
        value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
      </div>
      <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900
       text-white rounded-full mt-3">Submit</button>
      </form>
    }

      


    </div>
  )
}

export default ResetPassword