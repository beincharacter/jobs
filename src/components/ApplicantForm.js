import React from 'react';
import "../scss/AppliantForm.scss";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ApplicantForm = ({ initialValues, onSubmit }) => {
    // Form validation schema
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        experience: Yup.number().required('Experience is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        expectedSalary: Yup.number("Must be number").required('Expected salary is required'),
        techStack: Yup.string().required('Tech stack is required'),
        noticePeriod: Yup.number().required('Notice period is required'),
        resume: Yup.string().url('Invalid URL').required('Resume URL is required')
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ setFieldValue }) => (
                <Form>
                    <div>
                        <label htmlFor="name">Name</label>
                        <Field type="text" id="name" name="name" />
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div>
                        <label htmlFor="experience">Experience</label>
                        <Field type="number" id="experience" name="experience" />
                        <ErrorMessage name="experience" component="div" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field type="email" id="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <div>
                        <label htmlFor="expectedSalary">Expected Salary</label>
                        <Field type="number" id="expectedSalary" name="expectedSalary" />
                        <ErrorMessage name="expectedSalary" component="div" />
                    </div>
                    <div>
                        <label htmlFor="techStack">Tech Stack</label>
                        <Field type="text" id="techStack" name="techStack" />
                        <ErrorMessage name="techStack" component="div" />
                    </div>
                    <div>
                        <label htmlFor="noticePeriod">Notice Period in days</label>
                        <Field type="number" id="noticePeriod" name="noticePeriod" />
                        <ErrorMessage name="noticePeriod" component="div" />
                    </div>
                    <div>
                        <label htmlFor="resume">Resume docs Link</label>
                        <Field type="url" id="resume" name="resume" />
                        <ErrorMessage name="resume" component="div" />
                    </div>
                    <button type="submit">Apply</button>
                </Form>
            )}
        </Formik>
    );
};

export default ApplicantForm;
