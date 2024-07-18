
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ReviewForm = ({ locationId, onReviewPosted }) => {
  const initialValues = {
    rating: '',
    comment: '',
  };

  const validationSchema = Yup.object({
    rating: Yup.number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating must be at most 5')
      .required('Rating is required'),
    comment: Yup.string(),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      console.error('User is not authenticated');
      setSubmitting(false);
      return;
    }

    axios.post(
      '/traveler/post_review',
      {
        location_id: locationId,
        rating: values.rating,
        comment: values.comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(response => {
        console.log('Review posted successfully:', response.data);
        onReviewPosted();
        resetForm();
      })
      .catch(error => {
        console.error('Error posting review:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <h2>Post a Review</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="rating">Rating</label>
              <Field as="select" name="rating">
                <option value="">Select Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Field>
              <ErrorMessage name="rating" component="div" />
            </div>
            <div>
              <label htmlFor="comment">Comment</label>
              <Field as="textarea" id="comment" name="comment" />
              <ErrorMessage name="comment" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReviewForm;
