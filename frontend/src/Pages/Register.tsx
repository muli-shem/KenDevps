import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "../sytles/Register.scss";

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: any) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/register", data);
      setMessage("Registration successful!");
    } catch (error) {
      setMessage("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" {...register("username", { required: true })} />
          {errors.username && <span className="error">Username is required</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register("email", { required: true })} />
          {errors.email && <span className="error">Email is required</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register("password_hash", { required: true, minLength: 6 })} />
          {errors.password_hash && <span className="error">Password must be at least 6 characters</span>}
        </div>

        <div className="form-group">
          <label>County</label>
          <input type="text" {...register("county", { required: true })} />
          {errors.county && <span className="error">County is required</span>}
        </div>

        <div className="form-group">
          <label>Sub County</label>
          <input type="text" {...register("sub_county", { required: true })} />
          {errors.sub_county && <span className="error">Sub County is required</span>}
        </div>

        <div className="form-group">
          <label>Ward</label>
          <input type="text" {...register("ward", { required: true })} />
          {errors.ward && <span className="error">Ward is required</span>}
        </div>

        <div className="form-group">
          <label>Role</label>
          <select {...register("role", { required: true })}>
            <option value="citizen">Citizen</option>
          </select>
        </div>

        {message && <p className="message">{message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
