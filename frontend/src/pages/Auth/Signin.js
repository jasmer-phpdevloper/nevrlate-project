import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { loginUser } from "../../redux/actions/authActions"
import { Toaster,toast } from 'react-hot-toast';

const SignIn = () => {
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
    <div className="w-full">
      <div className="md:w-1440 mx-auto px-2 md:px-40  flex items-center justify-center">
        <div className="w-[400px] rounded-3xl my-20 pb-20">
          <div className="flex w-full flex-col rounded-t-3xl bg-[#FFFFFF] bg-opacity-20 shadow">
            <div className="mt-10 space-y-8 px-10 py-10 text-center">
           
              <div className="group relative">
                <input type="email"  onChange={handleInputChange} value={formData.signEmail} id="email" name="signEmail" className="peer h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none" />
                <label className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-custom peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-custom">Username</label>
                {formErrors.signEmail && <span className="text-[#DC3545]">{formErrors.signEmail}</span>}
              </div>
              <div className="group relative">
                <input type="password"  onChange={handleInputChange} value={formData.signPassword} id="password" name="signPassword" className="peer h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none" />
                <label className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-custom peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-custom">Password</label>
                {formErrors.signPassword && <span className="text-[#DC3545]">{formErrors.signPassword}</span>}
              </div>
              <button onClick={onSumitLogin} className="h-12 w-full rounded-3xl bg-[#3B82F6] text-black hover:text-white transition-all duration-300 hover:bg-blue-800">Login</button>
              <Link to="#" className="inline-flex !w-auto justify-center font-medium text-custom underline">Forgot password?</Link>
            </div>

            <p className="gap-2 text-center text-custom">
              Don't have an account?
              <Link to="/signup" className="font-semibold text-blue-900 hover:text-[#1E40AF]">Sign up</Link>
            </p>

            <Link to="#" className="text-custom hover:text-white border-white-500 group m-auto mb-4 mt-5 inline-flex h-12 w-[320px] items-center justify-center space-x-2 rounded-3xl border px-4 py-2 transition-colors duration-300 hover:border-blue-500 hover:bg-blue-500 focus:outline-none">
            <span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png" alt="google" className=" w-6 h-6" />
              </span>
              <span className="text-sm font-medium">Google</span>
             
            </Link>

            <Link to="#" className="text-custom hover:text-white border-white-500 group m-auto my-0 inline-flex h-12 w-[320px] items-center justify-center space-x-2 rounded-3xl border px-4 py-2 transition-colors duration-300 hover:border-black hover:bg-blue-500 focus:outline-none">
              <span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" alt="facebook" className=" w-6 h-6" />
              </span>
              <span className="text-sm font-medium ">FaceBook</span>
            </Link>
          </div>
        </div>
      </div >
    </div >
  )
}

export default SignIn
