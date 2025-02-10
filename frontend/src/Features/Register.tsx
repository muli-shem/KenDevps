import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Features/registerSlice"; // Import registerUser
import { RootState, AppDispatch } from "../app/store"; // Import AppDispatch
import "../sytles/Register.scss";

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch<AppDispatch>(); // Type dispatch with AppDispatch
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const onSubmit = async (data: any) => {
    try {
      await dispatch(registerUser(data)).unwrap(); // Use unwrap() to handle the promise
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="register-page">
      {/* Left Section: Constitutional Rights */}
      <div className="info-section left">
        <h3>Your Rights Under the Data Protection Act, 2019</h3>
        <ul>
          <li>
            <strong>Right to Access:</strong> You have the right to access your personal data held by any organization.
          </li>
          <li>
            <strong>Right to Correction:</strong> You can request correction of inaccurate or incomplete personal data.
          </li>
          <li>
            <strong>Right to Erasure:</strong> You can request deletion of your personal data under certain conditions.
          </li>
          <li>
            <strong>Right to Object:</strong> You can object to the processing of your personal data for specific purposes.
          </li>
          <li>
            <strong>Right to Data Portability:</strong> You can request your data in a structured, commonly used format.
          </li>
        </ul>
      </div>

      {/* Registration Form */}
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
            <input
              type="password"
              {...register("password_hash", { required: true, minLength: 6 })}
            />
            {errors.password_hash && (
              <span className="error">Password must be at least 6 characters</span>
            )}
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

          {error && <p className="error">{error}</p>} {/* Display Redux error */}
          {loading && <p>Registering...</p>} {/* Display loading state */}

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>

      {/* Right Section: Data Collection Principles */}
      <div className="info-section right">
        <h3>Principles of Data Collection</h3>
        <ul>
          <li>
            <strong>Lawfulness, Fairness, and Transparency:</strong> Data must be processed lawfully, fairly, and transparently.
          </li>
          <li>
            <strong>Purpose Limitation:</strong> Data must be collected for specified, explicit, and legitimate purposes.
          </li>
          <li>
            <strong>Data Minimization:</strong> Only the necessary data should be collected for the intended purpose.
          </li>
          <li>
            <strong>Accuracy:</strong> Data must be accurate and kept up to date.
          </li>
          <li>
            <strong>Storage Limitation:</strong> Data should not be kept longer than necessary.
          </li>
          <li>
            <strong>Integrity and Confidentiality:</strong> Data must be processed securely.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Register;