import React from 'react';
// import { Field, reduxForm } from 'redux-form';

const searchBar = () => {
  const handleSubmit = () => {

  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div> */}
    </form>
  );
};

// export default reduxForm({
//   form: 'contact',
//   validate: values => {
//     const errors = {};
//     if (!values.firstName) {
//       errors.firstName = 'Required';
//     }
//     if (!values.lastName) {
//       errors.lastName = 'Required';
//     }
//     return errors;
//   },
// });