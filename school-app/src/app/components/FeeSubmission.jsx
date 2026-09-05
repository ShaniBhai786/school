"use client"

import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"
import StudentFetcher from './StudentFetcher'

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
        {
            type: "number",
            name: "payment",
            id: "payment",
            label: "Payment"
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
        payment: 0,
        month: new Date().toLocaleString("default", { month: "long" }),
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

        payment: Yup.number()
            .typeError("Payment must be a number")
            .min(0, "Cannot be negative"),

    });

    const onSubmit = async (values, { resetForm }) => {
        try {
            const res = await fetch("/api/fees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();

            if (data.success) {
                alert("Fee Submitted");
                resetForm();
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div className="fee-container">
                <div className="fee-header">
                    <h1>Fee Submission</h1>
                </div>
                <div className="fee-body">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {
                            ({ values, setFieldValue }) => {
                                useEffect(() => {
                                    const total =
                                        Number(values.fee || 0) +
                                        Number(values.pending || 0) +
                                        Number(values.testfee || 0) +
                                        Number(values.others || 0);

                                    setFieldValue("total", total);

                                    const payment = Number(values.payment || 0);
                                    // setFieldValue("payment", total + values.pending);

                                    if (payment >= total) {
                                        setFieldValue("pending", 0);
                                        setFieldValue("balance", payment - total);
                                    } else {
                                        setFieldValue("pending", total - payment);
                                        setFieldValue("balance", 0);
                                    }
                                }, [
                                    values.fee,
                                    values.testfee,
                                    values.others,
                                    values.payment,
                                    setFieldValue,
                                ]);
                                return (
                                    <Form autoComplete='off'>
                                        <StudentFetcher />
                                        <div className="fees-inputs">
                                            {feeFields.map((value, index) => {
                                                return (
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
