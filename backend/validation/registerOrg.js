const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInputOrg(data) {
  let errors = {};

  data.organization_id = !isEmpty(data.organization_id) ? data.organization_id : "";
  data.organization_name = !isEmpty(data.organization_name) ? data.organization_name : "";
  data.personal_name = !isEmpty(data.personal_name) ? data.personal_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.email2 = !isEmpty(data.email2) ? data.email2 : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

 
  if (Validator.isEmpty(data.organization_id)) {
    errors.organization_id = "Organization Id is required";
  }

  if (!Validator.isLength(data.organization_name, { min: 2, max: 30 })) {
    errors.organization_name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.organization_name)) {
    errors.organization_name = "Organization Name field is required";
  }

  if (!Validator.isLength(data.personal_name, { min: 2, max: 30 })) {
    errors.personal_name = "Personal Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.personal_name)) {
    errors.personal_name = "Personal Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email2)) {
    errors.email2 = "Confirm Email field is required";
  }

  if (!Validator.equals(data.email, data.email2)) {
    errors.email2 = "emails must match";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characterss";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
