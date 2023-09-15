import { useState } from "react"
import { Link,useNavigate ,Route  } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"

import { registerUser } from "../../redux/actions/authActions"
import { registerUserOrg } from "../../redux/actions/authActions"
import { Toaster,toast } from 'react-hot-toast';

import InputField from "../../components/Auth/InputField"

const SignUp = () => {
  const [formErrors,setformErrors]=useState({});
  const [userType, setUserType] = useState(true)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    email2: '',
    password: '',
    password2: '',
  })
  const [formData2, setFormData2] = useState({
    organization_id: '',
    organization_name: '',
    personal_name: '',
    email: '',
    email2: '',
    password: '',
    password2: '',
  })




  const changeUserType = (e) => {
    if (e.target.id === "indi") setUserType(true)
    else setUserType(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const  handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const dispatch = useDispatch()

  const navigate = useNavigate();
  const onSubmitIndi = async () =>{
 

  dispatch(registerUser(formData, (error, responseData) => {
     
     //  console.log(error.status);
    if (error.status == '2') {
        setformErrors(error.errors);
    
      } else {
        setFormData({ // Reset form fields to their initial state
          firstName: '',
          lastName: '',
          email: '',
          email2: '',
          password: '',
          password2: '',
        });

        setformErrors({ ...formErrors,firstName: '',
        lastName: '',
        email: '',
        email2: '',
        password: '',
        password2: '',});

        toast.success('You are register succesfully! now you can login', {
          duration: 4000, // milliseconds (optional)
          position: 'top-right', // 'top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left' (optional)
        });

        
      }
    }));


  }

  const onSubmitOrg = async () =>{
 
    dispatch(registerUserOrg(formData2, (error, responseData) => {
     
      //  console.log(error.status);
     if (error.status == '2') {
         setformErrors(error.errors);

         console.log('sdfffffd');
     
       } else {
        setFormData2({ // Reset form fields to their initial state
          organization_id: '',
          organization_name: '',
          personal_name: '',
          email: '',
          email2: '',
          password: '',
          password2: '',
         });
 
         setformErrors({ ...formErrors,
         organization_id: '',
         organization_name: '',
         personal_name: '',
         email: '',
         email2: '',
         password: '',
         password2: '',});
        
         console.log('dssddffsdff');
     
         toast.success('You are register succesfully! now you can login', {
           duration: 4000, // milliseconds (optional)
           position: 'top-right', // 'top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left' (optional)
         });
 
         
       }
     }));
 


  }

  




  const errors = useSelector(state => state.errors)

  return (
    <div className="w-full">
      <div className="md:w-1440 mx-auto px-2 md:px-40  flex items-center justify-center">
        <div className="w-[400px] rounded-3xl my-10 pb-20">
          <form className="mb-5 flex justify-around">
            <div>
              <input className="me-1" type="radio" id="indi"  name="user_type" checked={userType} onChange={(e) => changeUserType(e)} />
              <label>Individual</label>
            </div>
            <div>
              <input className="me-1" type="radio" id="orgain" name="user_type" onChange={(e) => changeUserType(e)} />
              <label>Organization</label>
            </div>
          </form>
          <Toaster position="top-center" />
          <div className="flex w-full flex-col rounded-t-3xl bg-white bg-opacity-20 shadow">
            {userType ?
              <div className="space-y-8 px-10 text-center">
                <InputField
                  id='firstname'
                  name='firstName'
                  type='text'
                  labelname="FirstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
               
                />
                 {formErrors.firstName && <span className="text-[#DC3545]">{formErrors.firstName}</span>}
                <InputField
                  id='lastname'
                  name='lastName'
                  type='text'
                  labelname="LastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
               
                />
                {formErrors.lastName && <span className="text-[#DC3545]">{formErrors.lastName}</span>}
               
                <InputField
                  id='email'
                  name='email'
                  type='text'
                  labelname="Email"
                  value={formData.email}
                  onChange={handleInputChange}
               
                />
                {formErrors.email && <span className="text-[#DC3545]">{formErrors.email}</span>}
                <InputField
                  id='email2'
                  name='email2'
                  type='text'
                  labelname="Confirm Email"
                  value={formData.email2}
                  onChange={handleInputChange}
                 
                />
                {formErrors.email2 && <span className="text-[#DC3545]">{formErrors.email2}</span>}
                <InputField
                  id='password'
                  name='password'
                  type='password'
                  labelname="Password"
                  value={formData.password}
                  onChange={handleInputChange}
             
                />
                 {formErrors.password && <span className="text-[#DC3545]">{formErrors.password}</span>}
                <InputField
                  id='password2'
                  name='password2'
                  type='password'
                  labelname="Confirm Password"
                  value={formData.password2}
                  onChange={handleInputChange}
                
        
                />
                {formErrors.password2  && <span className="text-[#DC3545]">{formErrors.password2}</span>}
                <button onClick={onSubmitIndi} className="h-12 w-full rounded-3xl bg-blue-500 text-custom hover:text-white transition-all duration-300 hover:bg-blue-800">Register</button>
              </div>
              :
              <div className="space-y-8 px-10 text-center">
             
                 <InputField
                  id='organization_id'
                  name='organization_id'
                  type='text'
                  labelname="Organization ID"
                  value={formData2.organization_id}
                  onChange={handleInputChange2}
                
                />
                {formErrors.organization_id && <span className="text-[#DC3545]">{formErrors.organization_id}</span>}
                
                 <InputField
                  id='organization_name'
                  name='organization_name'
                  type='text'
                  labelname="Organization Name"
                  value={formData2.organization_name}
                  onChange={handleInputChange2}
                
                />
                  {formErrors.organization_name && <span className="text-[#DC3545]">{formErrors.organization_name}</span>}

                <InputField
                  id='personal_name'
                  name='personal_name'
                  type='text'
                  labelname="Personal Name"
                  value={formData2.personal_name}
                  onChange={handleInputChange2}
               
                />
                  {formErrors.personal_name && <span className="text-[#DC3545]">{formErrors.personal_name}</span>}
               
                <InputField
                  id='email'
                  name='email'
                  type='text'
                  labelname="Email"
                  value={formData2.email}
                  onChange={handleInputChange2}
                 
                />
                  {formErrors.email && <span className="text-[#DC3545]">{formErrors.email}</span>}
               
                 <InputField
                  id='email2'
                  name='email2'
                  type='text'
                  labelname="Confirm Email"
                  value={formData2.email2}
                  onChange={handleInputChange2}
                  error = {errors.email2}
                />
                  {formErrors.email2 && <span className="text-[#DC3545]">{formErrors.email2}</span>}

                <InputField
                  id='password'
                  name='password'
                  type='password'
                  labelname="Password"
                  value={formData2.password}
                  onChange={handleInputChange2}
               
                />
                   {formErrors.password && <span className="text-[#DC3545]">{formErrors.password}</span>}
                <InputField
                  id='password2'
                  name='password2'
                  type='password'
                  labelname="Confirm Password"
                  value={formData2.password2}
                  onChange={handleInputChange2}
                 
                />
                  {formErrors.password2 && <span className="text-[#DC3545]">{formErrors.password2}</span>}
                <button  onClick={onSubmitOrg} className="h-12 w-full rounded-3xl bg-blue-500 text-custom hover:text-white transition-all duration-300 hover:bg-blue-800">Register</button>
              </div>
            }
            <p className="gap-2 text-center text-custom">
              Already have an account?
              <Link to="/signin" className="font-semibold text-blue-900 hover:text-blue-800">Sign in</Link>
            </p>

            {/* <Link to="#" className="text-custom hover:text-white border-white-500 group m-auto mb-4 mt-5 inline-flex h-12 w-[320px] items-center justify-center space-x-2 rounded-3xl border px-4 py-2 transition-colors duration-300 hover:border-blue-500 hover:bg-blue-500 focus:outline-none">
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
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
