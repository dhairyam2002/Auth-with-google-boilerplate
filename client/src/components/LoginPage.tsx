import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/img.jpg";
import "./LoginPage.css";
import {FcGoogle} from 'react-icons/fc';
import GoogleSignIn from "./GoogleSignIn";

const LoginPage : React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8000/user/me', {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }).then((data) => data.json()).then((data) => {
            if(data.success === true){
                navigate('/');
            }
            setLoading(false);
        }).catch((err) => console.log(err))
    }, [])
    return (
        <div className="login">
            {loading ? <h1>Loading...</h1> : <>
            <div className="login-component">
                <h3>Company Name</h3>
                <h4>Log In</h4>

                <GoogleSignIn signup={false}/>

                <span className="span-text">OR LOGIN WITH EMAIL</span>
                <input type={'email'} placeholder='Email' className="google-sign input">

                </input>

                <input type={'password'} placeholder='Password' className="google-sign input">

                </input>

                <button className="sign-button">Log In</button>

            </div>
            <div className="img-component">
                <img src={img} className='animated-image'></img>
            </div></>}
        </div>
    )
}

export default LoginPage;