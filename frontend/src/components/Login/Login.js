import LoginText from "./LoginText"
import LoginItem from "./LoginItem"
import LoginBtn from "./LoginBtn"
import LoginTextP from "./LoginTextP"

import HeroImg from '../../assets/LandingPage/Hero/Hero-Image.png'
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { loginUser } from "../../redux/actions/authActions"
import { Toaster,toast } from 'react-hot-toast';

const Login = () => {

  const success = useSelector(state => state.auth.success)
  const [formErrors,setformErrors]=useState({});
  const errors = useSelector(state => state.errors)
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const navigate = useNavigate()
   
  useEffect(() => {
    if (isAuth) navigate('/dashboard')
  },[isAuth, navigate])

  const [formData, setFormData] = useState({
    signEmail: '',
    signPassword: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const dispatch = useDispatch()

  const onSumitLogin = () => {
  
    dispatch(loginUser(formData, (error, responseData) => {
     
   
     if (error.status == '2') {
      console.log(error.errors.errors);
         setformErrors(error.errors.errors);
        console.log('sdfffffd');
     
       } else {
          setFormData({ // Reset form fields to their initial state
            signEmail: '',
            signPassword: ''
          
          });
 
         setformErrors({ ...formErrors,
          signEmail: '',
          signPassword: '',});
        
         console.log('dssddffsdff');
     
         toast.success('You are login succesfully', {
           duration: 4000, // milliseconds (optional)
           position: 'top-right', // 'top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left' (optional)
         });
 
         
       }
     }));
  }



  return (
    <div className="block md:flex py-[60px]">
      <div className="me-0 md:me-[30px] w-full md:w-1/2 ">
        <LoginText text='Welcome to your personal, professional calendar​ network profile' />
   
        <p className="font-normal text-base md:text-2xl leading-9 py-[25px]">
          Enterprise Solution . My Personal Calendar
        </p>
        <div className="pb-[10px]">
        <div className="mb-[10px]">
        <label className="font-normal text-lg leading-7 text-custom">User name</label>
        </div>
        <div>
        <input className="py-[17px] px-6 w-full outline-1 outline rounded-[10px]" type="email"  onChange={handleInputChange} value={formData.signEmail} name="signEmail"   placeholder="johndoe"  />
        </div>
        {formErrors.signEmail && <span className="text-[#DC3545]">{formErrors.signEmail}</span>}
       </div>
       <div className="pb-[10px]">
        <div className="mb-[10px]">
        <label className="font-normal text-lg leading-7 text-custom">Password</label>
        </div>
        <div>
        <input className="py-[17px] px-6 w-full outline-1 outline rounded-[10px]" type="password"  onChange={handleInputChange} value={formData.signPassword} name="signPassword"   placeholder="********"  />
        </div>
        {formErrors.signPassword && <span className="text-[#DC3545]">{formErrors.signPassword}</span>}
       </div>
      
       
        <button onClick={onSumitLogin} className="py-[13px] px-5] w-full text-xl font-bold leading-6 rounded-[15px] my-[25px] text-white bg-[#8748ff]">Login</button>
        <LoginTextP
          text="Forgot password?"
          />
      </div>
      <div className="ms-0 md:ms-[30px] w-full md:w-1/2 my-10">
        <img src={HeroImg} alt="HeroImg" />
      </div>
    </div>
  )
}

export default Login
