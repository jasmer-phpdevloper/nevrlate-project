const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateInviteInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.email2 = !isEmpty(data.email2) ? data.email2 : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
