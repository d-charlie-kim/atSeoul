import { FC } from "react";
import styled from "styled-components";
import TobNavi from "Components/common/TobNavi";

const Home: FC = () => {
  return (
    <>
      <TobNavi />
      <SHomeLayout>
        <p>메인 영역</p>
      </SHomeLayout>
    </>
  );
};

export default Home;

const SHomeLayout = styled.main`
  margin-top: 100px;
  text-align: center;
`;
