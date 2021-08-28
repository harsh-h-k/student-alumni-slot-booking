
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import img from '../../images/2.png'
import './admin.css'
import AdminTable from '../Table/AdminTable'
import DataTable from '../Table/DataTable'
function Admin({ location }) {

    const [bookings, setBookings] = useState([])
    const [confirm, setConfirm] = useState([])
    

    useEffect(() => {
        fetch('/show')
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then((jsonRes) => setBookings(jsonRes))
            .catch((err) => console.log(err))
    })

    useEffect(() => {
        fetch('/showConfirm')
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then((jsonRes) => setConfirm(jsonRes))
            .catch((err) => console.log(err))
    })

    function ConfirmBooking(id) {
        const ConfirmItem = bookings.find((book) => book._id === id)
        axios.post('/confirm', ConfirmItem)
        axios.delete('/delete/' + id)
        alert("Request Confirmed")
       
        
    }

    function DeleteBooking(id) {
        axios.delete('/delete/' + id)
        alert("Request Deleted")
    }

    
    return (
        <div className="admin">

        <h1>Welcome Back</h1>
<div className="admin__container">
        <div className="admin__image">
            <img src={img} alt="admin image"/>
        </div>

        <div className="admin__info">
        {bookings?.length > 0 ? (
                <div className="admin__booking">
                <p className="heading">Bookings Request</p>
                <p className="body2">Please , click on confirm to accept or reject to decline the request.</p>
                    <AdminTable data={bookings} ConfirmFunction={ConfirmBooking} DeleteFunction={DeleteBooking} />
                </div>
            ) : (
                <div className="admin__no__booking"><p className="body2">No pending request</p> </div>
            )}

            {confirm?.length > 0 ? (
                <div className="admin__confirm">
                <p className="heading">You have confirmed these Request.</p>
                    <DataTable data={confirm} />
                </div>
            ) : (
                <div className="admin__no__booking"></div>
            )
            }
        </div>
        
            
        </div>
        </div>
    )
}

export default Admin
