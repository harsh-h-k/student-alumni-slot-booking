import React, { useState, useEffect, Fragment } from "react";
import DatePicker from "react-datepicker";
import axios from 'axios'
import queryString from 'query-string'
import img from '../../images/1.png'

import "react-datepicker/dist/react-datepicker.css";
import { isThisHour } from "date-fns";
import './student.css'

// COMPONENTS 
import Table from '../Table/DataTable'

// FOR RADIO INPUT 

const RadioInput = ({ label, value, checked, setter }) => {
    return (
        <label>
            <input type="radio" checked={checked === value}
                onChange={() => setter(value)} />
            <span>{label}</span>
        </label>
    );
};


// STUDENT COMPONENT 

function Student({ location }) {

    // STATES 
    const [username, setusername] = useState('')
    const [timeSlot, setTimeSlot] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [bookings, setBookings] = useState([])
    const [confirm, setConfirm] = useState([])



    
    // DATES 
    const currDate = new Date()
    var day = new Date()
    const maxDate = day.setDate(day.getDate() + 14)

    // useEFFECT HOOKS
    // TO GET USERNAME 
    useEffect(() => {
        const { username } = queryString.parse(location.search);
        setusername(username);
    }, [location.search]);
    
    
    //TO GET RECORDS FROM BOOKING COLLECTION
    useEffect(() => {
        fetch('/showBookings/'+ username)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then((jsonRes) => setBookings(jsonRes))
            .catch((err) => console.log(err))
            
    })

    // TO GET RECORD FROM CONFIRM COLLECTION
    useEffect(() => {
        fetch('/showConfirmBookings/' + username)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then((jsonRes) => setConfirm(jsonRes))
            .catch((err) => console.log(err))
    })


    // FUNCTIONS

    const data = { username, startDate, timeSlot }

    // FUNCTION TO HANDLE SUBMIT
    async function handleSubmit(event) {
        event.preventDefault()
        await axios.post("addToBooking", data)
        alert("Booking saved")
    
    }

   


    // RETURN 
    return (
        <div className="student">

            <div className="student__booking__container">
                <div className="student__booking__heading">
                    <p className="heading">Welcome , {username} </p>
                </div>
                {/* TO STOP USER FROM MAKING MORE THAN 2 BOOKINGS  */}
                {confirm?.length >= 2 ? (
                    <div className="student__error__2">
                    {/* IF MADE 2 BOOKINGS  */}
                        <h1>You can only make 2 reservation</h1>
                        <h1>Your reservation details are as follow:</h1>
                        <Table data={confirm} />
                    </div>
                ) : (
                    <div className="student__booking__portal">
                    {/* IF NO. OF BOOKINGS IS LESS THAN 2  */}
                        {bookings?.length > 0 ? (
                            <div className="student__booking__error">
                                <p className="body1">Alumni has your pending Request, please wait</p>
                                <p className="body2">Your Request Details</p>
                                <Table data={bookings} />
                            </div>
                        ) : (
                            <div>
                                <div className="student__booking__form">
                                <div>
                                <p className="body1">Please select Date and Time-Slot to book your meeting with Alumni. </p>
                    <ol style={{textAlign:"left"}}>
                        <li>Click and select preferred date(upto 1 week in advance)</li>
                        <li>Select Time-slot</li>
                        <li>Click on Book Slot</li>
                    </ol>
                                </div>
                                    <form onSubmit={handleSubmit} >
                                        <DatePicker className="student__date" minDate={currDate} maxDate={maxDate} selected={startDate} onChange={(date) => setStartDate(date)} name="Bookingdate" />
                                        <div className="student__radio__button">
                                            <label>TimeSlot</label>
                                            <RadioInput className="student__radio" label="1pm-2pm" name="TimeSlot" value="1pm-2pm" checked={timeSlot} setter={setTimeSlot} />
                                            <RadioInput className="student__radio" label="4pm-5pm" name="TimeSlot" value="4pm-5pm" checked={timeSlot} setter={setTimeSlot} />
                                            <RadioInput className="student__radio" label="6pm-7pm" name="TimeSlot" value="6pm-7pm" checked={timeSlot} setter={setTimeSlot} />
                                        </div>
                                        <button className="login__btn student__btn" type="submit" >Book Slot</button>
                                    </form>
                                </div>
                                <div className="student__confirm__booking">
                                    {confirm?.length > 0 ? (
                                        <div className="student__confirm__booking__table">
                                            <p className="heading">Your Confirmed Request.</p>
                                            <p className="body2">Alumni has confirmed these request</p>
                                            <Table data={confirm} />
                                        </div>
                                    ) : (
                                        <div className="student__confirm__booking__error">
                                            <p className="body1"> Record : {username}, has not booked any slots yet. </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                )}



                <div className="student__image"></div>
            </div>
            <div className="student__image">
<img src={img} />
            </div>
        </div>
    )
}

export default Student
