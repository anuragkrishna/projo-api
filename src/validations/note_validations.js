/*jshint esversion: 6 */

import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateNote(data) {
  let errors = {};

  if (Validator.isEmpty(data.title)) {
      errors.title = 'This field is required';
  }else if(!Validator.isLength(data.title, { min:0, max:50})){
      errors.title = 'Limit: 50 characters.';
  }

  if (Validator.isEmpty(data.content)) {
      errors.content = 'This field is required';
  }else if(!Validator.isLength(data.content, { min:0, max:500})){
      errors.content = 'Limit: 500 characters.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}