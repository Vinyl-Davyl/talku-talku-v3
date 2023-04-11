import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Button onClick={handleClick}>
      <h3 className="button">
        logout
      </h3>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  color: #ffffff;
  border-radius: 0.3rem;
  background-color: rgb(255, 82, 161);
  border: none;
  cursor: pointer;
  .button {
    font-size: 0.8rem;
    color: #ebe7ff;
    margin: "0rem";
  }
`;

export default Logout;
