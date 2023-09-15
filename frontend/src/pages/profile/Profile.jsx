import React, { useState ,useEffect} from 'react';
import userimg from '../../assets/Profile/Images/Image (1).png'
import slideimg from '../../assets/Profile/demo.png'
import logoimg from '../../assets/Profile/logoaudi.png'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '../../assets/Profile/CustomCalender.css'
import Footer from "../../components/Footer/Footer";
import axios from 'axios';

const Profile = () => {
    const myStyle = {
        objectFit: 'cover',
        maxHeight: '220px',
        position: 'relative',
        marginBottom: '100px'
    };

    const myLogo1 = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        border: '1px solid #000',
        maxWidth: '148px',
        maxHeight: '138px',
        padding: '19px',
        objectFit: 'contain',
        borderRadius: '50%',
        left: '117px',
        bottom: '-65px',
        backgroundColor: '#040000'


    };
    const imageDiv = {
        position: 'relative',

    };

    const roundedMd = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px'

    };

    const cssCalender = {
        width: '500px',
        boxShadow: '#808080'

    };
    // const search = {
    //     border: '1px solid #c1c1c1',
    //     padding: '2px 9px',
    //     borderRadius: '5px'
    // };


    // const searchInput = {
    //     border: 'none',
    //     outline: 'none'
    // };


    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const token = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': token,
      'Content-Type': 'application/json',
      // Add any other headers as needed
    };
    const [userDetails, setUserDetails] = useState({});
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Use await within an async function
             const response = await axios.get('http://localhost:5000/api/users/get-profile-front-company', {
                headers,
              });
            setUserDetails({
                firstName: response.data.data[0].firstname,
                lastName: response.data.data[0].lastname,
                bio:response.data.data[0].bio,
                avatar:response.data.data[0].avatar
                });
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        };
    
        fetchData();
      }, []);
      
      const [data,setData]=useState([]);
      const [selectedOption, setSelectedOption] = useState('');
      
      const  fetchUser= () => {
        const apiUrl = 'http://localhost:5000/api/users/get-invite-users-company'; // Replace with your API URL
        const token = localStorage.getItem('jwtToken');
        const headers = {
          'Authorization': token,
          'Content-Type': 'application/json', // Set the appropriate content type
          // Add any other headers as needed
        };
        fetch(apiUrl
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
             
              email: item.email,
            
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


      const handleDropdownChange = (selectedValue) => {
        // Make an API call with the selected value
        if (selectedValue) {
            console.log(selectedValue);

    
         const apiUrl = 'http://localhost:5000/api/users/get-meetings-company'; // Replace with your API URL
        //   const token = localStorage.getItem('jwtToken');
        //   const headers = {
        //     'Authorization': token,
        //     'Content-Type': 'application/json', // Set the appropriate content type
        //     // Add any other headers as needed
        //   };
      
        //   // Make the API call with the selected value
          fetch(apiUrl + `?selectedValue=${selectedValue}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((result) => {
              // Handle the API response as needed
              console.log(result);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      };
      






    return (

        <div className='w-full'>
            <div style={imageDiv}>
                <img src={slideimg} alt='' style={myStyle} width="100%" height="100%" />
                <img src={logoimg} alt='' style={myLogo1} width="100%" height="100%" />
            </div>
            <div className="w-[80%] flex lg:flex-row flex-col items-center justify-between mx-auto gap-20">

                <div className='basis-1/2 flex gap-3 flex-col lg:self-start'>
                <h1><b>{userDetails?.firstName || ''} {userDetails?.lastName || ''}</b></h1>
                    <p>{userDetails?.bio || ''} </p>
                    <div className='flex gap-3 justify-between'>
                        <button className='bg-[#8748FF] py-2 px-5 rounded text-white cursor-pointer'>Connect</button>
                        <button className='border-[#8748FF] border-[1px] rounded py-2 px-5 cursor-pointer'>Schedule Meeting</button>
                        <button className='border-[#8748FF] border-[1px] rounded py-2 px-5 cursor-pointer'>Book Appointment</button>
                    </div>
                    <div className="">
                        <label for="dropdown" className="block font-medium text-[#585858]">Select Location</label>
                        <select id="dropdown" className="mt-1 block w-full border-[1px] rounded-md border-[#8748FF] shadow-sm py-1">
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                    <p>500+ Connections</p>
                    <div className='rounded-md' style={roundedMd}>
                        <img src={userimg} alt='' className="rounded-full" width="69px" height="69px" />
                        <p>Igor Royzis, Richard C.Wilson and 1 other mutual connection</p>
                    </div>

                </div>
                <div className='basis-1/2 flex gap-3 flex-col lg:self-start w-[100%]'>
                    <h2><b>Schedule a Meeting</b></h2>
                    <div className="">
                        <label for="dropdown" className="block font-medium text-[#585858]">Associate Locator</label>
                        <select id="dropdown" className="mt-1 block w-full border-[1px] rounded-md border-[#8748FF] shadow-sm py-1" value={selectedOption}
    onChange={(e) => {
        setSelectedOption(e.target.value);
        handleDropdownChange(e.target.value); // Call the API function here
      }}>
                        <option value="">Select User</option>
                            {data.map((item, index) => (
                                <option key={index} value={item.email}>
                                {item.email}
                                </option>
                            ))}     
                        </select>
                    </div>
                    <p>calender</p>
                    <div style={cssCalender} className=''>
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                        />
                    </div>
                    <div className='flex gap-5'>
                        <button className='bg-[#8748FF] py-2 px-5 rounded text-white cursor-pointer'>Schedule Meeting</button>
                        <p>Powered by</p>

                    </div>
                </div>
            </div>
            <div className='w-[80%] mx-auto'>
                <h1><b>Associates</b></h1>
                <p>Please select to review schedule, set appointment, book meetings</p>
                <div className='main-box'>
                    <div className='box1'>
                        <button className='btn-box active'>Tech Team</button>
                        <button className='btn-box '>Tech Team</button>
                        <button className='btn-box '>Tech Team</button>
                    </div>
                    <div className='box-2'>
                        <div className="search" >
                            <input type="text" placeholder="Search..." className="boxSearch" />
                        </div>
                    </div>
                </div>
                <table className='w-[100%]'>
                    <thead></thead>
                    <tbody className="border-t-[1px] border-t-[#c1c1c1]">
                        <tr className='tr-border'>
                            <td className='flex items-center gap-3 td-flex' >
                                <div className='rounded-md'>
                                    <img src={userimg} alt='' className="rounded-full" width="69px" height="69px" />
                                </div>
                                <div className=''>
                                    <p>Saul Ramirez</p>
                                    <p>Service Advisor , Sales Team</p>
                                </div>
                            </td>
                            <td className="next">Next Available Dates <br />
                                <button className="clickbutton" ><span>29</span>Mar</button>  <button className="clickbutton"><span>29</span>Mar</button></td>
                            <td className="andButton"><button type="button" className="cbutton">Schedule  a Meeting</button></td>

                        </tr>
                        <tr className='tr-border'>
                            <td className='flex items-center gap-3 td-flex' >
                                <div className='rounded-md'>
                                    <img src={userimg} alt='' className="rounded-full" width="69px" height="69px" />
                                </div>
                                <div className=''>
                                    <p>Saul Ramirez</p>
                                    <p>Service Advisor , Sales Team</p>
                                </div>
                            </td>
                            <td className="next">Next Available Dates <br />
                                <button className="clickbutton" ><span>29</span>Mar</button>  <button className="clickbutton"><span>29</span>Mar</button></td>
                            <td className="andButton"><button type="button" className="cbutton">Schedule  a Meeting</button></td>

                        </tr>
                        <tr className='tr-border'>
                            <td className='flex items-center gap-3 td-flex' >
                                <div className='rounded-md'>
                                    <img src={userimg} alt='' className="rounded-full" width="69px" height="69px" />
                                </div>
                                <div className=''>
                                    <p>Saul Ramirez</p>
                                    <p>Service Advisor , Sales Team</p>
                                </div>
                            </td>
                            <td className="next">Next Available Dates <br />
                                <button className="clickbutton" ><span>29</span>Mar</button>  <button className="clickbutton"><span>29</span>Mar</button></td>
                            <td className="andButton"><button type="button" className="cbutton">Schedule  a Meeting</button></td>

                        </tr>
                        <tr className='tr-border'>
                            <td className='flex items-center gap-3 td-flex' >
                                <div className='rounded-md'>
                                    <img src={userimg} alt='' className="rounded-full" width="69px" height="69px" />
                                </div>
                                <div className=''>
                                    <p>Saul Ramirez</p>
                                    <p>Service Advisor , Sales Team</p>
                                </div>
                            </td>
                            <td className="next">Next Available Dates <br />
                                <button className="clickbutton" ><span>29</span>Mar</button>  <button className="clickbutton"><span>29</span>Mar</button></td>
                            <td className="andButton"><button type="button" className="cbutton">Schedule  a Meeting</button></td>

                        </tr>
                        <tr className='tr-border'>
                            <td className='flex items-center gap-3 td-flex' >
                                <div className='rounded-md'>
                                    <img src={userimg} alt='' className="rounded-full" width="69px" height="69px" />
                                </div>
                                <div className=''>
                                    <p>Saul Ramirez</p>
                                    <p>Service Advisor , Sales Team</p>
                                </div>
                            </td>
                            <td className="next">Next Available Dates <br />
                                <button className="clickbutton" ><span>29</span>Mar</button>  <button className="clickbutton"><span>29</span>Mar</button></td>
                            <td className="andButton"><button type="button" className="cbutton">Schedule  a Meeting</button></td>

                        </tr>

                    </tbody>
                </table>
            </div>
            <div className="mx-auto w-full md:w-1440">
           <Footer />
          </div>
        </div>
    )
}

export default Profile