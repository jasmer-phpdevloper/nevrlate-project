import React, { useState ,useEffect} from 'react';
import userimg from '../../assets/Profile/Images/Image (1).png'
import slideimg from '../../assets/Profile/demo.png'
import logoimg from '../../assets/Profile/Images/profile.png'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '../../assets/Profile/CustomCalender.css'
import Footer from "../../components/Footer/Footer";

import axios from 'axios';


const IndividualProfile = () => {
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

    /* background-color: #e8e8e8; */
    

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


  





    const handleDateChange = date => {
        setSelectedDate(date);
        fetchUserData();
      
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
             const response = await axios.get('http://localhost:5000/api/users/get-profile-front', {
            //    headers,
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
        fetchUserData();
      }, []);

      const [data,setData]=useState([]);
      const  fetchUserData= () => {
        const apiUrl = 'http://localhost:5000/api/users/get-meetings-front'; // Replace with your API URL
        const customClasses = `
        text-lg          // Large font size
        mt-3             // Top margin
        bg-blue-500      // Background color
        text-white       // Text color
        rounded-lg       // Rounded corners
      `;


        fetch(apiUrl, {
            method: 'GET', // HTTP method (GET, POST, etc.)
            headers: headers, // Include the custom headers
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((result) => {
           // console.log(result)
            setData(result.data.map((item) => {
                const dateObj = new Date(item.createdAt);
              
                const day = String(dateObj.getDate()).padStart(2, '0');
                const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                const year = dateObj.getFullYear();
              
                const formattedDate = `${year}-${month}-${day}`;
              
                return {
                  date: formattedDate,
                  title: <span classname={customClasses}>*</span>,
                };
              }));
           
              
            
           console.log('data',data);
          })
          .catch((error) => {
            // setError(error);
            // setLoading(false);
          });
        }

    
      // Call the function whenever you want to fetch user data
     // fetchUserData();
         


      const [selectedDate, setSelectedDate] = useState(new Date());
      const [events, setEvents] = useState();
     
        const tileContent = ({ date }) => {
          const eventOnDate = data.find(
            (event) => new Date(event.date).toDateString() === date.toDateString()
          );
      
          return eventOnDate ? (
            <div className="event-marker">{eventOnDate.title}</div>
          ) : null;
        };
    
    return (

        <div className='w-full'>
            <div className='relative h-60 bg-body mb-20'>
                {/* <img src={slideimg} alt='' style={myStyle} width="100%" height="100%" /> */}
                <img src={userDetails.avatar || logoimg} alt="User" className="absolute top-40 left-[117px] rounded-[50%] w-[100%] h-[100%]  max-w-[137px] max-h-[127px]"/>
              
            </div>
            <div className="w-[80%] flex lg:flex-row flex-col items-center justify-between mx-auto gap-20">

                <div className='basis-1/2 flex gap-3 flex-col lg:self-start'>
                    <h1><b>{userDetails?.firstName || ''} {userDetails?.lastName || ''}</b></h1>
                    <p>{userDetails?.bio || ''} 
                    </p>
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
                    
                    <p>calender</p>
                    <div style={cssCalender} className=''>
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}

                            tileContent={tileContent}
                        />
                    </div>
                    <div className='flex gap-5 mb-3'>
                        <button className='bg-[#8748FF] py-2 px-5 rounded text-white cursor-pointer'>Schedule Meeting</button>
                        <p>Powered by</p>

                    </div>
                </div>
            </div>
            <div className="mx-auto w-full md:w-1440">
           <Footer />
          </div>
           
        </div>
    )
}

export default IndividualProfile