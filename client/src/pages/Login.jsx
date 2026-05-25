import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import API from
"../services/api";

import {
  useAuth,
} from "../context/AuthContext";


const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();


  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });


  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });

  };


  // HANDLE LOGIN
  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const { data } =
        await API.post(
          "/auth/login",
          formData
        );

      // SAVE USER
      login(data);

      // REDIRECT
      navigate("/admin");

    } catch (err) {

      setError(
        err.response?.data?.message
        || "Login failed"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      px-6
      "
    >

      <motion.form

        onSubmit={
          handleSubmit
        }

        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.8,
        }}

        className="
        w-full
        max-w-md
        p-8
        rounded-3xl
        border
        flex
        flex-col
        gap-6
        "
        style={{
          backgroundColor:
            "var(--bg-secondary)",

          borderColor:
            "var(--border)",
        }}
      >

        <div
          className="
          text-center
          "
        >

          <h2
            className="
            text-4xl
            font-bold
            mb-3
            "
          >
            Admin Login
          </h2>


          <p
            className="
            opacity-70
            "
          >
            Welcome back Mahek
          </p>

        </div>


        {/* EMAIL */}
        <input
          type="email"

          name="email"

          placeholder="Email"

          value={
            formData.email
          }

          onChange={
            handleChange
          }

          required

          className="
          p-4
          rounded-2xl
          outline-none
          "
          style={{
            backgroundColor:
              "var(--bg-primary)",
          }}
        />


        {/* PASSWORD */}
        <input
          type="password"

          name="password"

          placeholder="Password"

          value={
            formData.password
          }

          onChange={
            handleChange
          }

          required

          className="
          p-4
          rounded-2xl
          outline-none
          "
          style={{
            backgroundColor:
              "var(--bg-primary)",
          }}
        />


        {/* ERROR */}
        {
          error && (

            <p
              className="
              text-red-500
              "
            >
              {error}
            </p>

          )
        }


        {/* BUTTON */}
        <button
          type="submit"

          disabled={loading}

          className="
          py-4
          rounded-2xl
          transition
          duration-300
          hover:scale-105
          "
          style={{
            backgroundColor:
              "var(--accent)",

            color: "#fff",
          }}
        >

          {
            loading
            ? "Logging in..."
            : "Login"
          }

        </button>

      </motion.form>

    </div>

  );

};

export default Login;