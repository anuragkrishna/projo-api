/*jshint esversion: 6 */

import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateProject(data) {
  let errors = {};

  if (Validator.isEmpty(data.title)) {
    errors.title = 'This field is required';
  }else if(!Validator.isLength(data.title, { min:0, max:50})){
    errors.title = 'Limit: 50 characters.';
  }

  if (Validator.isEmpty(data.donor)) {
    errors.donor = 'This field is required';
  }else if(!Validator.isLength(data.donor, { min:0, max:50})){
    errors.donor = 'Limit: 50 characters.';
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'This field is required';
  }

  if (Validator.isEmpty(data.started_on)) {
    errors.status = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}