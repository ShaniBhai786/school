"use client"

import React, {useEffect} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"

const Page = () => {
    const feeFields = [
        {
            type: "text",
            name: "studentId",
            id: "studentId",
            label: "Student ID"
        },
        {
            type: "text",
            name: "name",
            id: "name",
            label: "Student's Name"
        },
        {
            type: "text",
            name: "class",
            id: "class",
            label: "Class"
        },
        {
            type: "number",
            name: "fee",
            id: "fee",
            label: "Monthly Fee"
        },
        {
            type: "number",
            name: "pending",
            id: "pending",
            label: "Pending Dues"
        },
        {
            type: "number",
            name: "balance",
            id: "balance",
            label: "Balance"
        },
        {
            type: "number",
            name: "testfee",
            id: "testfee",
            label: "Tests Dues"
        },
        {
            type: "number",
            name: "others",
            id: "others",
            label: "Others Dues"
        },
        {
            type: "string",
            name: "month",
            id: "month",
            label: "Month"
        },
        {
            type: "date",
            name: "date",
            id: "date",
            label: "Date"
        },
        {
            type: "number",
            name: "total",
            id: "total",
            label: "Total"
        },
    ]
    const initialValues = {
        name: "",
        studentId: "",
        class: "",
        fee: "",
        pending: 0,
        balance: 0,
        testfee: 0,
        others: 0,
        total: 0, 
        month: new Date().toLocaleString("default", {month: "long"}),
        date: new Date().toISOString().split("T")[0]
    }
    const validationSchema = Yup.object({
    name: Yup.string()
        .required("Name is required")
        .min(2, "Too short"),
    studentId: Yup.string().required("Student ID is required"),
    class: Yup.string()
        .required("Class is required"),

    fee: Yup.number()
        .typeError("Fee must be a number")
        .required("Fee is required")
        .min(0, "Cannot be negative"),

    pending: Yup.number()
        .typeError("Pending must be a number")
        .min(0, "Cannot be negative"),

    balance: Yup.number()
        .typeError("Balance must be a number")
        .min(0, "Cannot be negative"),

    testfee: Yup.number()
        .typeError("Test fee must be a number")
        .min(0, "Cannot be negative"),

    others: Yup.number()
        .typeError("Others must be a number")
        .min(0, "Cannot be negative"),

});

const onSubmit = (values, {resetForm}) => {
    alert("Fee Submitted")
    console.table(values)
    resetForm()
}
  return (
    <>
    <div className="fee-container">
        <div className="fee-header">
            <h1>Fee Submission</h1>
        </div>
        <div className="fee-body">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    ({values, setFieldValue}) => {
                        useEffect(() => {
                            const calculated = Number(values.fee || 0) + Number(values.pending || 0) + Number(values.testfee || 0) + Number(values.others || 0) - Number(values.balance || 0);
                            setFieldValue("total", calculated)
                        },[values, setFieldValue])
                        return(
                            <Form autoComplete='off'>
                    <div className="fees-inputs">
                        {feeFields.map((value, index) => {
                            return(
                                <div className="fee-input" key={index}>
                                    <Field type={value.type} name={value.name} id={value.id} className="fee-field" placeholder=" " readOnly={value.name === "total"} />
                                    <label htmlFor={value.id} className='fee-label'>{value.label}</label>
                                    <ErrorMessage name={value.name} className='error' component="div" />
                                </div>
                            )
                        })}
                    </div>
                        <div className="fee-btns-div">
                            <button type='reset'>Cancel</button>
                            <button type='submit'>Submit</button>
                        </div>
                </Form>
                        )
                    }
                }
            </Formik>
        </div>
    </div>
    </>
  )
}

export default Page
