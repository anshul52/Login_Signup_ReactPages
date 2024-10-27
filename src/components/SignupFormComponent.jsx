import React, { useState } from "react";
import "../styles/SignupComponentForm.css";
import { useNavigate } from "react-router-dom";
import { statesByCountry, citiesByState } from "../utils/locationData";

const SignupForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    isdCode: "",
    mobile: "",
    fax: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.firstName)
      newErrors.firstName = "Please enter a valid first name";
    if (!form.email.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = "Please enter a valid email";
    if (!form.address) newErrors.address = "Please enter a valid address";
    if (!form.country) newErrors.country = "Please select your country";
    if (!form.state) newErrors.state = "Please select your state";
    if (!form.city) newErrors.city = "Please select your city";
    if (!form.pincode.match(/^\d{6}$/))
      newErrors.pincode = "Please enter a valid pincode";
    if (!form.isdCode) newErrors.isdCode = "Please enter a valid ISD code";
    if (!form.mobile.match(/^\d{10}$/))
      newErrors.mobile = "Please enter a valid mobile number";
    if (form.fax && !form.fax.match(/^\d+$/))
      newErrors.fax = "Fax must be a numeric value";
    if (form.phone && !form.phone.match(/^\d{10}$/))
      newErrors.phone = "Phone must be a numeric value";
    if (!form.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/))
      newErrors.password =
        "Password must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Confirm password should match the password";

    if (!form.accountType) newErrors.accountType = "Please select account type";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    if (name === "country") {
      setForm((prevForm) => ({ ...prevForm, state: "", city: "" }));
    }

    if (name === "state") {
      setForm((prevForm) => ({ ...prevForm, city: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully", form);
      navigate("/login");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        isdCode: "",
        mobile: "",
        fax: "",
        phone: "",
        password: "",
        confirmPassword: "",
        accountType: "",
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form custom-scrollbar">
      <div className="form-group">
        <label>Individual/Enterprises/Government</label>
        <div className="account-type">
          <label>
            <input
              type="radio"
              name="accountType"
              value="Individual"
              checked={form.accountType === "Individual"}
              onChange={handleChange}
            />
            Individual
          </label>
          <label>
            <input
              type="radio"
              name="accountType"
              value="Enterprise"
              checked={form.accountType === "Enterprise"}
              onChange={handleChange}
            />
            Enterprise
          </label>
          <label>
            <input
              type="radio"
              name="accountType"
              value="Government"
              checked={form.accountType === "Government"}
              onChange={handleChange}
            />
            Government
          </label>
        </div>
        {errors.accountType && <p className="error">{errors.accountType}</p>}
      </div>

      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          className={errors.firstName ? "error-input" : ""}
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={errors.email ? "error-input" : ""}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          className={errors.address ? "error-input" : ""}
        />
        {errors.address && <p className="error">{errors.address}</p>}
      </div>

      <div className="form-group">
        <label>Country</label>
        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          className={errors.country ? "error-input" : ""}
        >
          <option value="">Select Country</option>
          {Object.keys(statesByCountry).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && <p className="error">{errors.country}</p>}
      </div>

      <div className="form-group">
        <label>State</label>
        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          className={errors.state ? "error-input" : ""}
          disabled={!form.country}
        >
          <option value="">Select State</option>
          {form.country &&
            statesByCountry[form.country].map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
        </select>
        {errors.state && <p className="error">{errors.state}</p>}
      </div>

      <div className="form-group">
        <label>City</label>
        <select
          name="city"
          value={form.city}
          onChange={handleChange}
          className={errors.city ? "error-input" : ""}
          disabled={!form.state}
        >
          <option value="">Select City</option>
          {form.state &&
            citiesByState[form.state]?.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>
        {errors.city && <p className="error">{errors.city}</p>}
      </div>

      <div className="form-group">
        <label>Pincode</label>
        <input
          type="text"
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          className={errors.pincode ? "error-input" : ""}
        />
        {errors.pincode && <p className="error">{errors.pincode}</p>}
      </div>

      <div className="form-group">
        <label>ISD Code</label>
        <select
          name="isdCode"
          value={form.isdCode}
          onChange={handleChange}
          className={errors.isdCode ? "error-input" : ""}
        >
          <option value="">Select ISD Code</option>
          <option value="+91">+91</option>
        </select>
        {errors.isdCode && <p className="error">{errors.isdCode}</p>}
      </div>

      <div className="form-group">
        <label>Mobile</label>
        <input
          type="text"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          className={errors.mobile ? "error-input" : ""}
        />
        {errors.mobile && <p className="error">{errors.mobile}</p>}
      </div>

      <div className="form-group">
        <label>Fax</label>
        <input
          type="text"
          name="fax"
          value={form.fax}
          onChange={handleChange}
          className={errors.fax ? "error-input" : ""}
        />
        {errors.fax && <p className="error">{errors.fax}</p>}
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className={errors.phone ? "error-input" : ""}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>

      <div className="form-group">
        <label>Password</label>
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? "error-input" : ""}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <div className="password-field">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "error-input" : ""}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
      </div>

      <button type="submit" id="butt" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default SignupForm;
