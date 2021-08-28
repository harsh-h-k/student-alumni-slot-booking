import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './login.css'

function Login() {

    const UsersDB = [{
        username: "student1",
        password: "asdasd",
    },
    {
        username: "student2",
        password: "asdasd",
    },
    {
        username: "alumni",
        password: "asdasd",
    }]


    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [isAdmin, setisAdmin] = useState(false)



    function setAdmin() {
        if (isAdmin === true)
            setisAdmin(false)
        else {
            setisAdmin(true)
        }

    }

    function validateLink(event) {
        const validate = UsersDB.some(user => user.username === username && user.password === password);
        if (validate) {
            return null
        }
        else {
            alert("please fill details correctly")
            event.preventDefault()
        }
    }



    return (
        <div className="login">
            <div className="login__image">

            </div>
            <div className="login__form__container">


                <div className="login__form">
                    <p className="heading">Welcome</p>
                    <p className="body2">to</p>
                    <p className="heading">Student-Alumni portal</p>
                    <p className="body1">Please login to access your account</p>
                    <div className="login__form__heading">
                        <h1 className="heading">Login</h1>
                    </div>
                    <div className="login__form__radio">
                        <input type="checkbox" onClick={setAdmin} />
                        <p className="body1">Login as Alumni</p>
                    </div>
                    <div className="login__form__inputs">
                        <div>
                            <p className="body1">Username</p>
                            <input type="text" value={username} onChange={event => setusername(event.target.value)} />
                        </div>
                        <div>
                            <p className="body1">Password</p>
                            <input type="password" value={password} onChange={event => setpassword(event.target.value)} />
                        </div>
                    </div>
                    {isAdmin ? (
                        <Link to="/admin" onClick={validateLink}>
                            <button className="login__btn" type="submit">Login</button>
                        </Link>
                    ) : (
                        <Link to={`/student?username=${username}`} onClick={validateLink}>
                            <button className="login__btn" type="submit">Login</button>
                        </Link>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Login
