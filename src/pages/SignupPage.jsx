import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignupPage.css";
import SignupForm from "../components/SignupFormComponent";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/login");
  };

  return (
    <>
      <div id="main">
        <div className="bothparts" id="left">
          <div id="imgbox">
            <div>
              <h1>SIGN UP</h1>{" "}
              <p>
                Sign up today and unlock a world of benefits – faster checkout,
                personalized recommendations, order tracking, and exclusive
                member-only deals. Join us in just a few steps!
              </p>
            </div>
          </div>
        </div>
        <div className="bothparts" id="right">
          <div id="rightinsidebox">
            <h1 id="h11">Hi there !</h1>
            <p id="">Welcome ! </p>

            <SignupForm />

            <p id="para">
              Already have an account ? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
