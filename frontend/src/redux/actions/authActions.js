import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "../constants/authConstants";

export const registerUser = (userData,callback) => dispatch => {
  axios
    .post("http://localhost:5000/api/users/register", userData)
    .then((res) => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data,
      });

      // Execute the callback with the response data
      callback(res.data);
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });

      // Execute the callback with an error
      callback(err.response.data);
    });
   
};

export const registerUserOrg = (userData,callback) => dispatch => {
  axios
    .post("http://localhost:5000/api/users/registerOrg", userData)
    .then((res) => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data,
      });

      // Execute the callback with the response data
      callback(res.data);
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });

      // Execute the callback with an error
      callback(err.response.data);
    });
   
};





export const loginUser = (userData,callback) => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
		   
	     
      const { token } = res.data;


      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      callback(res.data);
    })
    .catch(err => {
     // console.log(err.response);
        if(err.response === undefined) {
          
          dispatch({
            type: GET_ERRORS,
            payload: 'email and password both required'
          });
          callback({status:2 ,errors:{errors:{signEmail:"Valid Email and password both required"}}});
        } else{
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });

          callback({status:2 ,errors:err.response.data});

       

        } 

     
    
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {

  localStorage.removeItem("jwtToken");

  setAuthToken(false);

  dispatch(setCurrentUser({}));
};


