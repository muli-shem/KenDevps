import React from "react";
import { useForm, SubmitHandler } from "react-hook-form"; // Import SubmitHandler
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Features/loginSlice"; // Import the login action
import { RootState, AppDispatch } from "../app/store"; // Import types
import "../sytles/Login.scss"; // Import styles

// Define the shape of the form inputs
interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>(); // Explicitly type useForm
  const dispatch = useDispatch<AppDispatch>(); // Typed dispatch
  const {loading, error, token } = useSelector((state: RootState) => state.login); // Adjusted selector
  const navigate = useNavigate();

  // Redirect to dashboard if the user is already logged in
  React.useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  // Define the onSubmit function with SubmitHandler type
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap(); // Dispatch login action
      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="error">{errors.email.message ?? "Email is required"}</span>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="error">{errors.password.message ?? "Password is required"}</span>
            )}
          </div>

          {error && <p className="error">{error}</p>} {/* Display Redux error */}
          {loading && <p>Logging in...</p>} {/* Display loading state */}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;