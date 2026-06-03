"use client"

import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"

const Page = () => {
  const [students, setStudents] = useState([])
  const initialValues = {
    fullName: "",
    studentId: "",
    class: "",
    contact: "",
    Bform: "",
    group: "",
    religion: "",
    address: "",
    avatar: null || ""
  }

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Required"),
    studentId: Yup.string().required("Required"),
    class: Yup.string().required("Required"),
    contact: Yup.string().required("Required"),
    Bform: Yup.string().required("Required"),
    group: Yup.string().required("Required"),
    religion: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    avatar: Yup.mixed().required("Required"),
  })

  const onSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();

      formData.append("fullName", values.fullName);
      formData.append("studentId", values.studentId);
      formData.append("class", values.class);
      formData.append("contact", values.contact);
      formData.append("Bform", values.Bform);
      formData.append("religion", values.religion);
      formData.append("group", values.group);
      formData.append("address", values.address);
      if (values.avatar) {
        formData.append("avatar", values.avatar);
      }

      const response = await axios.post("/api/students", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });


      if (response.status !== 201) {
        alert(response.data.message);
        return;
      }

      alert("Student Enrolled Successfully 🎓");
      resetForm();

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    }
  };

  const fetchStudents = async () => {
  try {
    const res = await axios.get("/api/fetchstudents");
    setStudents(res.data);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="enroll-container">
      <div className="enroll-card">

        <h1>Student Enrollment</h1>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ setFieldValue, values }) => (
            <Form autoComplete="off" >

              <div className="form-grid">

                {[
                  { name: "fullName", label: "Full Name", type: "text" },
                  { name: "studentId", label: "Student ID", type: "text" },
                  { name: "class", label: "Class", type: "text" },
                  { name: "address", label: "Address", type: "text" },
                ].map((field, i) => (
                  <div className="input-group-enroll" key={i}>
                    <Field
                      name={field.name}
                      type={field.type}
                      className="input-enroll"
                      placeholder=" "
                      autoComplete="new-password"
                      spellCheck="false"
                    />
                    <label>{field.label}</label>
                    <ErrorMessage name={field.name} component="div" className="error" />
                  </div>
                ))}
                <div className="input-group-enroll">
                  <input type="text" name="Bform" className="input-enroll" value={values.Bform} placeholder=" " onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "")

                    if (value.length > 5 && value.length <= 12) {
                      value = `${value.slice(0, 5)}-${value.slice(5, 12)}`
                    } else if (value.length > 12) {
                      value = `${value.slice(0, 5)}-${value.slice(5, 12)}-${value.slice(12, 13)}`
                    }
                    setFieldValue("Bform", value)
                  }} />
                  <label>B-Form</label>
                  <ErrorMessage name="Bform" component="div" className="error" />
                </div>

                <div className="input-group-enroll">
                  <Field type="text" name="contact" className="input-enroll" maxLength={12} value={values.contact} placeholder="" onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "")
                    if (value.length > 4 && value.length <= 11) {
                      value = `${value.slice(0, 4)}-${value.slice(4, 11)}`
                    }
                    setFieldValue("contact", value)
                  }} />
                  <label>Contact</label>
                  <ErrorMessage name="contact" component="div" className="error" />
                </div>

                {/* GROUP SELECT */}
                <div className="input-group-enroll">
                  <Field as="select" name="religion" className="input-enroll-select">
                    <option value="">Select Religion</option>
                    <option value="muslim">Muslim</option>
                    <option value="christian">Non Muslim</option>
                  </Field>
                  <ErrorMessage name="religion" component="div" className="error" />
                </div>

                <div className="input-group-enroll">
                  <Field as="select" name="group" className="input-enroll-select">
                    <option value="">Select Group</option>
                    <option value="arts">Arts</option>
                    <option value="science-computer">Science (Computer)</option>
                    <option value="science-biology">Science (Biology)</option>
                  </Field>
                  <ErrorMessage name="group" component="div" className="error" />
                </div>

                <div className="input-group-enroll">
                  <input type="file" name="avatar" className="input-enroll-select" onChange={(e) => setFieldValue("avatar", e.currentTarget.files[0])} />
                  {values.avatar instanceof File && (
                    <img src={URL.createObjectURL(values.avatar)} alt="user-image" className="preview-image" />
                  )}
                  <ErrorMessage name="avatar" component="div" className="error" />
                </div>

              </div>

              <button type="submit" className="submit-btn">
                Enroll Student
              </button>

            </Form>
          )}
        </Formik>

      </div>
      <button onClick={fetchStudents}>Get All Data</button>
      {students.map((student) => (
  <div key={student._id}>
    <h3>{student.fullName}</h3>
    <p>{student.studentId}</p>
    <p>{student.class}</p>
    <p>{student.contact}</p>
    <img src={student.avatar} alt="image" width={121} />
  </div>
))}
    </div>
  )
}

export default Page