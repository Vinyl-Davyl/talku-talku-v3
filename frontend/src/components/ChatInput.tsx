import React, { useState } from "react";
import styled from "styled-components";
import Picker, { EmojiClickData, Theme } from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import cameraImage from "../assets/camera.png";

interface ChatInputProps {
  handleSendMessage: (msg: string, img: string) => {};
}

const ChatInput: React.FC<ChatInputProps> = ({ handleSendMessage }) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [images] = React.useState([]);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject: EmojiClickData, event: MouseEvent) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event: any) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg, "");
      setMsg("");
    }
  };

  const onChange = (imageList: ImageListType) => {
    imageList.forEach((element: ImageType) => {
      if (element.dataURL) {
        handleSendMessage("", element.dataURL);
      }
    });
  };

  const handleError = (errors: any, _: any) => {
    console.log(errors);
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && (
            <div className="emoji-picker-react">
              <Picker onEmojiClick={handleEmojiClick} theme={Theme.DARK} height={400} width={260} />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />

        <button type="submit">
          <IoMdSend />
        </button>
      </form>
      <div className="image-send">
        <ImageUploading
          multiple={false}
          value={images}
          onChange={onChange}
          onError={handleError}
        >
          {({ onImageUpload, isDragging, dragProps }) => (
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: "red" } : undefined}
                className="add-image-btn"
                onClick={onImageUpload}
                {...dragProps}
              >
                <img src={cameraImage} alt="camera" />
              </button>
            </div>
          )}
        </ImageUploading>
      </div>
    </Container>
  );
};

const Container = styled.div`
  /* display: grid; */
  align-items: center;
  /* grid-template-columns: 15% 70% 15%; */
  background-color: #00000076;
  border-top: 0.2px solid #ffffff15;
  display: flex;
  padding: 0 2rem;
  justify-content: space-between;
  align-content: space-between;
  @media screen and (min-width: 590px) {
    /* grid-template-columns: 10% 90%; */
  }
  @media screen and (min-width: 1000px) {
    /* grid-template-columns: 5% 95%; */
    /* gap: 0.5rem; */
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    padding-right: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -420px;
        // background-color: #080420;
        // box-shadow: 0 5px 10px #9a86f3;
        border: 2px solid #9a86f3;
        border-radius: 3%;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    /* background-color: #ffffff34; */
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 2rem;

      font-size: 1.1rem;
      background-color: #ffffff34;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.1rem 0.1rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: none;
      @media screen and (min-width: 720px) {
        padding: 0.2rem 0.2rem;

        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: rgb(0, 135, 255);
      }
    }
  }
  .image-send {
    .add-image-btn {
      color: white;
      background: transparent;
      outline: none;
      border: none;
      padding-left: 0.6rem;
      cursor: pointer;
      img {
        width: 2rem;
        height: 2rem;
      }
    }
  }
`;

export default ChatInput;
