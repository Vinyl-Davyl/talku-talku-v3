import { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatLogo from "../assets/Logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastOptions } from "react-toastify/dist/types";
import { login } from "../api";
import Spinner from "../components/Spinner";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  

  const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/chat");
    }
  }, [navigate]);

  const handleSubmit = async (event: FormEvent) => {
    setLoading(true);
    event.preventDefault();
    try {
      if (handleValidation()) {
        const { password, username } = values;

        const { data } = await login({ password, username });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/chat");
        }
      }
    } 
    catch (err) {
      setErr(true);
      toast.error("Something went wrong.", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("Username and password are required", toastOptions);
      return false;
    } else if (username.length < 4) {
      toast.error("Username and password are required", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={ChatLogo} alt="logo" />
            <h1>Talku Talku</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => setValues({ ...values, username: e.target.value })}
            min="3"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />

          <button type="submit">
            {loading ? (
              <Spinner width="50px" height="50px" />
            ) : (
              "Log In"
            )}
          </button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 0.8rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;
