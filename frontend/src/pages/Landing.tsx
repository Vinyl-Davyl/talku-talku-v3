import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/Logo.svg";
import NewLanding from "../components/NewLanding";

const Landing: React.FC = () => {
  return (
    <div>
      <Container>
        <div className="header">
          <div className="container">
            <nav className="flex">
                  <img src={Logo} className="logo" alt="logo" />
                  <Link to="/register">
                    <button className="btn">
                      Sign Up Free
                    </button>
                  </Link> 
              </nav>
            </div>
        </div>
        <NewLanding />
      </Container>
    </div>

  );
};

const Container = styled.div`
    //margin-bottom: -80px;
    background-color: #131324;

    .header{
      padding: 20px 0;
    }
    .container{
      //padding: 0 20px;
      width: 80%;
      margin: 0 auto;
      max-width: 100%;
      width: 1000px;
    }
    
    .flex{
      display: flex;
      align-items: center;
    }
    .flex > div, .flex > ul {
      flex: 1;
    }

    button:hover{
        background-color: rgba(224, 56, 140, 0.7);
    }

    .logo{
      height: 60px;
      width: 60px;
    }

    .btn{
      border-radius: 50px;
      background-color: #4e0eff;
      cursor: pointer;
      color: white;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
      border: none;
      font-weight: 700;
      font-size: 16px;
      padding: 15px 50px;

      animation-name: shake;
      animation-duration: 2s;
      animation-direction: alternate;
      animation-timing-function: cubic-bezier (.5, 1.5, .5, 1.5);
      animation-iteration-count: infinite;
    }

      @keyframes shake {
        0% { -webkit-transform: scale(1); transform-origin: center center; }
        50% { -webkit-transform: scale(0.9); transform-origin: center center; }
        100% { -webkit-transform: scale(1); transform-origin: center center; }
      }

    nav{
      align-items: center;/*Centers an stretches nav*/
      justify-content: space-between;
      margin-bottom: 40px;
    }

   
          @media screen and (min-width: 1024px) and (max-width: 1025px){
            margin-bottom: 0px;

            .container{
              width: 85%;
            }
          .header{
            scrollable: true;
          }
         
          nav.flex{
              flex-direction: row;
          }
          
          .btn{
              padding: 15px 30px;
          }
          .flex{
              flex-direction: column-reverse;
          }
      }
      @media screen and (max-width: 768px){
        margin-bottom: 0px;

        .container{
          width: 85%;
        }
          nav.flex{
              flex-direction: row;
          }
         
          .btn{
              padding: 15px 30px;
          }
          .flex{
              flex-direction: column-reverse;
          }
      }
      
      @media screen and (max-width: 450px){
        margin-bottom: 0px;

          .btn{
              font-weight: 700;
              font-size: 14px;
              padding: 15px 30px;
          }
      }
      
      @media screen and (max-width: 320px){
        margin-bottom: 0px;

          .btn{
              padding: 13px 20px;
          }
          .logo{
              height: 110px;
              width: 130px;
          }
      }
    `;

export default Landing;


   