import React, { useEffect, useState } from 'react'

const Overview = () => {
    const [students, setStudents] = useState([])
        useEffect(() => {
            const getUsers = async () => {
                try {
                    const response = await fetch("/api/students")
                    if (!response.ok) {
                        console.log("API Error", response)
                    }
                    const data = await response.json()
                    setStudents(data.students)
                    
                } catch (error) {
                    console.error("ERROR FETCHING STUDENTS", error)
                }
            }
            getUsers()
        },[])
  return (
    <div className='container'>
      <h2>Overview</h2>
      <p>Total Students: {students.length}</p>
      
    </div>
  )
}

export default Overview
