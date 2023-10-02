import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";

// interface {

// }

const Contents = ({ showInfo }) => {
  const [currentShowInfo, setCurrentShowInfo] = useState(showInfo);

  useEffect(() => {
    setCurrentShowInfo(showInfo);
  }, [showInfo]);

  if (!currentShowInfo) {
    return (
      <SContents>
        <p>로딩중...</p>
      </SContents>
    );
  }

  return (
    <SContents>
      {currentShowInfo.map((show) => (
        <li key={show.TITLE}>
          <div>
            <img src={show.MAIN_IMG} alt="포스터 이미지" />
          </div>
          <p>{show.GUNAME}</p>
          <h2>{show.TITLE} </h2>
          <p>{show.PLACE}</p>
        </li>
      ))}
      {/* <div ref={setObservationTarget}></div> */}
    </SContents>
  );
};

export default Contents;

const SContents = styled.ul`
  flex-wrap: wrap;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  gap: 50px;

  li {
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 300px;
    border: 2px solid var(--gray-400);
    border-radius: 10px;
    overflow: hidden;
    transition: 0.3s;
    box-sizing: border-box;

    &:hover {
      border: 4px solid var(--yellow);
    }

    div {
      height: 200px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    h2 {
      padding: 0 10px;
      font-size: 16px;
      font-weight: bold;
      margin-top: 5px;
      /* 여러줄 다 보이기 */
      overflow: hidden;
      white-space: normal;
      display: -webkit-box;
      line-height: 1.2;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    p {
      padding: 0 10px;
      font-size: 12px;
      margin-top: 10px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      &:nth-child(2) {
        color: salmon;
      }
      &:nth-child(5) {
        color: grey;
      }
    }
  }
`;

/*

1. 스크롤을 내릴때마다 끊어서 API 요청
2. 페이지 첫 랜더링 시에 전체 데이터를 받아온 후에, 스크롤에 따라 데이터를 보여줌
3. 


컨텐츠는 20개씩 혹은 30갸씩 들고온다
메인 페이지는 페이지네이션으로 구현한다
검색 페이지는 무한스크롤로 구현한다

메인 페이지
필터 알아보기
장르 필터
지역은 못 찾아

지역을 안내해주고 싶은데 그러려면 다 들고와야 함
--> 그렇게 가능한가


*/
