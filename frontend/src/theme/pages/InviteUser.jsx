import Breadcrumb from '../components/Breadcrumb';
import userThree from '../images/user/user-03.png';
import { Toaster,toast } from 'react-hot-toast';
import Table from '../components/Table';
import axios from 'axios';
import Paginate from "../pages/Paginate";
import { useState,useEffect } from "react";


const InviteUser = () => {
  
  const [formErrors,setformErrors]=useState({});
  const [data,setData]=useState([]);
  const [userDetails, setuserDetails] = useState({
    email: '',
  
  });
  const  fetchUser= () => {
    const apiUrl = 'http://localhost:5000/api/users/get-invite-users'; // Replace with your API URL
    const token = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': token,
      'Content-Type': 'application/json', // Set the appropriate content type
      // Add any other headers as needed
    };
    fetch(apiUrl, {
      method: 'GET', // HTTP method (GET, POST, etc.)
      headers: headers, // Include the custom headers
    }
      )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        console.log(result)
        setData(result.data.map((item,index) => ({
          id:index+1,
          email: item.email,
          status: item.status,
          createdAt:new Date(item.createdAt).toLocaleDateString('en-GB'),
        })));
        // setLoading(false);

        console.log('data',data);
      })
      .catch((error) => {
        // setError(error);
        // setLoading(false);
      });
    }
  useEffect(() => {
    // Define the API endpoint URL
    
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    console.log(userDetails)
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('jwtToken');
      const headers = {
        'Authorization': token,
        'Content-Type': 'application/json', // Set the appropriate content type
        // Add any other headers as needed
      };
      const response = await axios.post('http://localhost:5000/api/users/invite-user', userDetails,{
        headers
      });
      console.log(response);
      if(response.data.error){
        console.log(response.data.error)
        setformErrors(response.data.error);
        
      }else{
        //setFormErrors({ ...formErrors, email: '' });
       setuserDetails({ // Reset form fields to their initial state
          email: '',
        });

        setformErrors({ ...formErrors, email: '' });
        toast.success('Invite sended succesfully!', {
          duration: 4000, // milliseconds (optional)
          position: 'top-right', // 'top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left' (optional)
        });
        fetchUser();
      }
     
    } catch (error) {
      console.error('Error generating Zoom authorization URL:', error.message);
    }
  };

 


  const columns = [
  {
    Header: 'Id',
    accessor: 'id', // Replace with your data field
  },
    {
      Header: 'Email',
      accessor: 'email', // Replace with your data field
    },
    {
      Header: 'Status',
      accessor: 'status', // Replace with your data field
    },
    {
      Header: 'Created At',
      accessor: 'createdAt', // Replace with your data field
    },
    // Add more columns as needed
  ];
  return (
    <>
      <div className="mx-auto max-w-270">
      <Toaster position="top-right" />
        <Breadcrumb pageName="Invite User" />

        <div className="grid grid-cols-1 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                
                  {/* <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="subject"
                    >
                     Subject
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="subject"
                      id="subject"
                      value=""
                      onChange={handleChange}
                    />
                  </div> */}
           
                  <div className="mb-5.5 flex justify-between gap-2 items-center">
                    <div className='w-full'>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="user@gmail.com"
                      value={userDetails.email}
                      onChange={handleChange}
                    />
                 
                    </div>
                    <div className="w-[25%]">
                    
                    <button
                      className="flex justify-center rounded bg-primary py-3 mt-7 px-6 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Send invitaion
                    </button>
                  </div>
                  </div>
                 {formErrors.email && <p className="text-[#DC3545]">{formErrors.email}</p>}

                 
                  
                </form>
              </div>

            </div>
          </div>
       
        </div><br>
        </br>
        <div className="grid grid-cols-1 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              
            <Table data={data}  PaginationComponent={Paginate}  columns={columns} />
              
            </div>
          </div>
       
        </div>

        
      </div>
    </>
  );
};

export default InviteUser;
