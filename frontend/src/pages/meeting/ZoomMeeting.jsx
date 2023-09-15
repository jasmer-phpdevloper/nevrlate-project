import React, { useState } from 'react';
import axios from 'axios';
// import { FaStar } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import StarRating from './StarRating';
import Select from 'react-select';
const ZoomMeeting = () => {
 
  const [formErrors,setformErrors]=useState({});
  const [meetingDetails, setMeetingDetails] = useState({
    title: '',
    type: 'zoom',
    start_time: '',
    duration: 30,
    description:'',
    status:'published',
  
  });
  const [selectAttendees, setSelectedAttendees] = useState([]);

  const [rating, setRating] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    console.log(meetingDetails)
  };

  
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      const response = await axios.post('http://localhost:5000/api/generate-meeting', {
        meetingDetails,selectAttendees,rating
      });
    
      if(response.data.error){
        console.log(response.data.error)
        setformErrors(response.data.error);
      }else{
         window.location.href=response.data.authUrl;
        toast.success('Meeting created succesfully');
      }
     
    } catch (error) {
      console.error('Error generating Zoom authorization URL:', error.message);
    }
  };
  const handleSelectChange = (selected) => {
    setSelectedAttendees(selected);
    console.log('selectAttendees',selectAttendees);

  };
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log('rating',rating);
  };

  return (
    <>
   <div className="container mx-auto py-8">
    <h1 className='flex justify-center font-bold '>Create Meeting</h1>
  <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
    <label className="block mb-4 font-normal text-lg leading-7 text-custom">
      Meeting Type:
      <select
        name="type"
        value={meetingDetails.type}
        onChange={handleChange}
        className="form-select mt-1 block py-[10px] px-6 w-full outline-1 outline rounded-[10px]"
      >
        <option value={'zoom'}>Zoom</option>
        <option value={'Google'}>Google Meeting</option>
        <option value={'MicrosoftTeam'}>Microsoft Team</option>
      </select>
      
    </label>

    <label className="block mb-4 font-normal text-lg leading-7 text-custom">
      Meeting Title:
      <input
        type="text"
        name="title"
        value={meetingDetails.topic}
        onChange={handleChange}
        className="form-input mt-1 block py-[10px] px-6 w-full outline-1 outline rounded-[10px]"
      />
       {formErrors.title && <p className="text-[#DC3545]">{formErrors.title}</p>}
    </label>

    <label className="block mb-4 font-normal text-lg leading-7 text-custom">
      Start Time:
      <input
        type="datetime-local"
        name="start_time"
        value={meetingDetails.start_time}
        onChange={handleChange}
        className="form-input mt-1 block py-[10px] px-6 w-full outline-1 outline rounded-[10px]"
      />
       {formErrors.start_time && <p className="text-[#DC3545]">{formErrors.start_time}</p>}

    </label>

    <label className="block mb-4 font-normal text-lg leading-7 text-custom">
      Duration (minutes):
      <input
        type="number"
        name="duration"
        value={meetingDetails.duration}
        onChange={handleChange}
        className="py-[10px] px-6 w-full outline-1 outline rounded-[10px]"
      />
       {formErrors.duration && <p className="text-[#DC3545]">{formErrors.duration}</p>}
    </label>

    <label className="block mb-4 font-normal text-lg leading-7 text-custom">
      Status:
      <select
        name="status"
        value={meetingDetails.type}
        onChange={handleChange}
        className="form-select mt-1 block w-full py-[10px] px-6  outline-1 outline rounded-[10px]"
      >
        <option value={'published'}>published</option>
        <option value={'draft'}>draft</option>
        <option value={'passed'}>passed</option>
      </select>
      {formErrors.status && <p className="text-[#DC3545]">{formErrors.status}</p>}
    </label>

    <label className="block mb-4 font-normal text-lg leading-7 text-custom">
      Importance:
      <StarRating totalStars={3} onRate={handleRatingChange} />
    </label>

    <label className="block mb-4 font-normal text-lg leading-7 text-custom">
      Description:
      <textarea
        name="description"
        value={meetingDetails.description}
        onChange={handleChange}
        className="form-textarea mt-1 block w-full py-[10px] px-6  outline-1 outline rounded-[10px]"
      ></textarea>
        {formErrors.description && <p className="text-[#DC3545]">{formErrors.description}</p>}
    </label>

    <label className="block mb-4 font-normal text-lg leading-7 text-custom">
      Attendees:
      <Select
        options={[
          { value: 'protolabznaveenphp@gmail.com', label: 'protolabznaveenphp@gmail.com' },
          { value: 'vikasprotolabz@gmail.com', label: 'vikasprotolabz@gmail.com' },
          { value: 'protolabzjasmerphp@gmail.com', label: 'protolabzjasmerphp@gmail.com' },
          { value: 'protolabz.shopifyapp@gmail.com', label: 'protolabz.shopifyapp@gmail.com' },
          // Add more email addresses here
        ]}
        name="selectAttendees"
        isMulti
        onChange={handleSelectChange}
        value={selectAttendees}
        className="form-select block w-full outline-1 outline rounded-[10px]"
        theme={(theme) => ({
          ...theme,
          borderRadius: 10,
          colors: {
            ...theme.colors,
            neutral90: 'black',
            primary: 'black',
          },
        })}
      />
       {formErrors.selectAttendees && <p className="text-[#DC3545]">{formErrors.selectAttendees}</p>}
    </label>

    <div class="flex justify-center items-center">
      <button type="submit" class="bg-[#3C50E0] text-white px-4 py-2 rounded-full hover:bg-blue-600">
        Create Meeting
      </button>
  </div>
  </form>
</div>

  
     </>
  );
};

export default ZoomMeeting;
