import React from "react";
import styled from "styled-components";

interface SpinnerProps {
    width: string;
    height: string;
  }
  
export default function Spinner({ width, height }: SpinnerProps) {
  return (
    <Container className="spinner">
    </Container>
  );
}

const Container = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    } 
  `;
