import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { tobBar } from "Constants/tobBar";

const TobNavi = () => {
  const tobLinks = tobBar.map((link) => (
    <STobLink key={link.id}>
      <Link to={link.url}>{link.label}</Link>
    </STobLink>
  ));

  return (
    <STobNaviLayout>
      <ul>{tobLinks}</ul>
    </STobNaviLayout>
  );
};

export default TobNavi;

const STobNaviLayout = styled.section`
  border-bottom: 2px solid var(--gray-200);

  ul {
    height: 100px;
    display: flex;
    justify-content: center;
    gap: 30px;
  }
`;

const STobLink = styled.li`
  cursor: pointer;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 20px;
  font-weight: 800;

  &:hover {
    color: var(--orange);
  }
  transition: 0.5s;
`;
