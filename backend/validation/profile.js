const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
   console.log('error',data);
  data.firstName= !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.bio = !isEmpty(data.bio) ? data.bio : "";
 
  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = "first name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "first name field is required";
  }
  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = "last name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "last name field is required";
  }

  if (!Validator.isLength(data.bio, { min: 2, max: 500})) {
    errors.bio = "Bio must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.bio)) {
    errors.bio = "Bio field is required";
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
