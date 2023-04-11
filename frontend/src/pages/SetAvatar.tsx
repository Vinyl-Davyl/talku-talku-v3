import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar-edit";
import styled from "styled-components";
import { setProfileAvatar } from "../api";
import { User } from "../interfaces";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions";
import Spinner from "../components/Spinner";

const SetAvatar: React.FC = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [preview, setPreview] = useState<string>("");

  const handleClose = () => {
    setPreview("");
  };
  const handleCrop = (view: string) => {
    setPreview(view);
  };
  const handleCancel = () => {
    navigate("/chat");
  };

  //handleSave: function retrieves the user's ID, calls the setProfileAvatar function to set the user's avatar image in the backend and saves it in local storage. If successful, the function navigates to the home page;
  const handleSave = async () => {
    setLoading(true);

    const user: User = await JSON.parse(localStorage.getItem("chat-app-user")!);
    const { data } = await setProfileAvatar(user._id, preview);

    try {
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/chat");
      }
    } catch (err) {
      setErr(true);
      toast.error("Error setting avatar. Please try again.", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        <div className="avatarSelector">
          <Avatar
            width={window.innerWidth < 320 ? 250 : 300}
            height={300}
            src={undefined}
            onClose={handleClose}
            onCrop={handleCrop}
            labelStyle={{ color: "white", fontSize: "2rem" }}
            label="Choose an image"
          />
        </div>
        <div className="buttons">
          <button
            className="submit-btn"
            onClick={handleSave}
            disabled={preview ? false : true}
          >
             {loading ? (
              <Spinner width="50px" height="50px" />
            ) : (
              "Save"
            )}
          </button>
          <button className="submit-btn cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  background-color: #080420;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  .avatarSelector {
    &:hover {
      cursor: pointer;
    }
  }
  .buttons {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    @media screen and (min-width: 600px) {
      flex-direction: row;
    }
    .submit-btn {
      background-color: #4e0eff;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      min-width: 150px;
      &:hover {
        background-color: #4206e7;
      }
      &:disabled {
        background-color: #828282;
        cursor: default;
      }
    }
    .cancel {
      background-color: #FF4500;
      &:hover {
        background-color: #FC7300;
      }
    }
  }
`;

export default SetAvatar;
