import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Landing: FC = () => {
  const navigate = useNavigate();

  const [blogTitle, setBlogTitle] = useState("");
  const [count, setCount] = useState(0);
  const landingSentence = "오늘 서울엔 무슨 일이 있을까요?";

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (count >= landingSentence.length) {
        setTimeout(() => {
          navigate("/home");
        }, 1000);
        return;
      }

      setBlogTitle((prevTitleValue) => {
        let result = prevTitleValue
          ? prevTitleValue + landingSentence[count]
          : landingSentence[0];
        setCount(count + 1);

        return result;
      });
    }, 150);

    return () => {
      clearInterval(typingInterval);
    };
  });

  return (
    <SLandingLayout>
      <h1>{blogTitle}</h1>
    </SLandingLayout>
  );
};

export default Landing;

const SLandingLayout = styled.div`
  text-align: center;
  h1 {
    color: var(--gray-800);
    font-size: 80px;
    margin: 40vh 0;
  }
  strong {
    color: var(--orange);
  }
`;
