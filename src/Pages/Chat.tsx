import React, { FC, useRef } from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";
import TobNavi from "Components/common/TobNavi";

const Chat: FC = () => {
  const [inputMsg, setInputMsg] = useState("");
  const [nickname, setNickname] = useState("Anonymous");
  const [receivedMsg, setReceivedMsg] = useState([]);
  const socket = io("http://localhost:8000", {
    cors: {
      origin: "*",
    },
  });
  const inputRef = useRef(null);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      if (!data.data.length) return;
      setReceivedMsg([...receivedMsg, data]);
    });
  }, [socket]);

  const handleRequestSocket = () => {
    socket.emit("request_message", {
      data: inputMsg,
      nick: nickname,
    });
    setInputMsg("");
    inputRef.current.value = "";
  };

  function chatHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setInputMsg(event.target.value);
  }

  function nickHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setNickname(event.target.value);
  }

  return (
    <>
      <TobNavi />
      <SChatLayout>
        <input placeholder="닉네임" type="text" onChange={nickHandler} />
        <section>
          <input
            ref={inputRef}
            placeholder="내용을 입력해주세요"
            type="text"
            onChange={chatHandler}
          />
          <button onClick={handleRequestSocket}>전송</button>
        </section>
        <SChats>
          {receivedMsg.map((data) => (
            <span>
              <p>{data.nick}</p>
              <p>:</p>
              <p>{data.data}</p>
            </span>
          ))}
        </SChats>
      </SChatLayout>
    </>
  );
};

export default Chat;

const SChatLayout = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;

  input {
    width: 20vw;
    border: 1px solid var(--gray-600);
    height: 50px;
    padding: 0 10px;
    font-size: 16px;
    margin-bottom: 50px;
    border-radius: 5px;
  }

  section {
    display: flex;
    input {
      width: 70vw;
      height: 50px;
      border: 1px solid var(--gray-600);
      border-radius: 5px;
      font-size: 16px;
      padding: 0 10px;
    }
    gap: 20px;
    button {
      background-color: var(--orange);
      border-radius: 10px;
      width: 100px;
      height: 50px;
      color: white;
      font-size: 20px;
    }
  }
`;

const SChats = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  border: 5px solid orange;
  border-radius: 50px;
  padding: 50px 20px;

  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--gray-200);
    border-radius: 10px;
    padding: 10px;
    gap: 50px;

    p:first-child {
      width: 100px;
      text-overflow: ellipsis;
      overflow: hidden;
      flex-wrap: nowrap;
    }

    p:last-child {
      /* border-bottom: 1px solid var(--gray-400); */
      text-align: center;
      width: 50vw;
      white-space: pre-wrap;
      word-wrap: break-word;
      line-height: 20px;
      padding: 5px 0;
    }
  }
`;
