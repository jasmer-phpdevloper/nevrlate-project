const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
    console.log(data);
    console.log(errors);

  data.meetingDetails.title = !isEmpty(data.meetingDetails.title) ? data.meetingDetails.title : "";
  data.meetingDetails.type = !isEmpty(data.meetingDetails.type) ? data.meetingDetails.type : "";
  data.meetingDetails.start_time = !isEmpty(data.meetingDetails.start_time) ? data.meetingDetails.start_time : "";
  data.meetingDetails.duration = !isEmpty(String(data.meetingDetails.duration)) ? data.meetingDetails.duration : "";
  data.meetingDetails.description = !isEmpty(data.meetingDetails.description) ? data.meetingDetails.description : "";
  data.meetingDetails.status = !isEmpty(data.meetingDetails.status) ? data.meetingDetails.status : "";
  data. rating = !isEmpty(String(data.rating)) ? data.rating : "";
  data.selectAttendees = !isEmpty(data.selectAttendees) ? data.selectAttendees : "";
  
  if (Validator.isEmpty(data.meetingDetails.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.meetingDetails.type)) {
    errors.type = "Meeting Type field is required";
  }

  if (Validator.isEmpty(data.meetingDetails.start_time)) {
    errors.start_time = "start time field is required";
  }

  if (Validator.isEmpty(String(data.meetingDetails.duration))) {
    errors.duration = "duration field is required";
  }

  
  if (Validator.isEmpty(data.meetingDetails.description)) {
    errors.description = "description field is required";
  }

 
  if (Validator.isEmpty(data.meetingDetails.status)) {
    errors.status = "status field is required";
  }

  if (Validator.isEmpty(String(data.rating))) {
    errors.rating = "rating  field is required";
  }
  if (Validator.isEmpty(String(data.selectAttendees))) {
    errors.selectAttendees = "Attendees  field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
