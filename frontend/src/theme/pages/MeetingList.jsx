import React, { useState,useEffect  } from 'react';
import axios from 'axios';
// import { FaStar } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import Table from '../components/Table';
import Breadcrumb from '../components/Breadcrumb';

import Select from 'react-select';
const MeetingList = () => {

  const [data,setData]=useState([]);
  useEffect(() => {
    fetchUser();
  }, []);
    const token = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': token,
      'Content-Type': 'application/json',
      // Add any other headers as needed
    };
  const  fetchUser= () => {
    const apiUrl = 'http://localhost:5000/api/users/get-meeting-list'; // Replace with your API URL

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
        console.log(result)
        setData(result.data.map((item,index) => ({
          id:index+1,
          title: item.title,
          description: item.description,
          startTime: new Date(item.startTime).toLocaleDateString('en-GB', {
            year: 'numeric',  // Full year (e.g., 2023)
            month: 'numeric',    // Full month name (e.g., September)
            day: 'numeric',   // Day of the month (e.g., 11)
            hour: '2-digit',  // Two-digit hour (e.g., 03)
            minute: '2-digit', // Two-digit minute (e.g., 09)
            second: '2-digit', // Two-digit second (e.g., 05)
            hour12: false,    // Use 24-hour time format (e.g., 13:09:05)
          }),
          duration: item.duration,
          status: item.status,
     

          createdAt:new Date(item.createdAt).toLocaleDateString('en-GB'),
        })
        ));
        // setLoading(false);

        console.log('data',data);
      })
      .catch((error) => {
        // setError(error);
        // setLoading(false);
      });
    }
 
  const columns = [
    {
      Header: 'Id',
      accessor: 'id', // Replace with your data field
    },
    {
      Header: 'Title',
      accessor: 'title', // Replace with your data field
    },
    {
      Header: 'Description',
      accessor: 'description', // Replace with your data field
    },
    {
      Header: 'Duration',
      accessor: 'duration', // Replace with your data field
    },
    {
      Header: 'Start Time',
      accessor: 'startTime', // Replace with your data field
    },
    
    {
        Header: 'Status',
        accessor: 'status', // Replace with your data field
    },
  
    {
        Header: 'Created Date',
        accessor: 'createdAt', // Replace with your data field
     }


      
    
      // Add more columns as needed
    ];
 

  return (
    <>
   <div className="container mx-auto py-8">
   <Breadcrumb pageName="Manage Meetings" />

    <div className="grid grid-cols-1 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              
            <Table  data={data}     columns={columns} />
              
            </div>
          </div>
       
        </div>

</div>

  
     </>
  );
};

export default MeetingList;
