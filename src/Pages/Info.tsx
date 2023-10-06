import { FC, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import TobNavi from "Components/common/TobNavi";
import useSeoulShowAPI from "API/getShowAPI";

import Contents from "../Components/Info/Contents";
// import { QueryObserver } from "react-query";

const Info: FC = () => {
  const [showList, setShowList] = useState([]);
  const [index, setIndex] = useState(0);
  const { getShowList } = useSeoulShowAPI();
  const bottomElementRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getShowList(index);
      setShowList((prevShowList) => [...prevShowList, ...data]);
    }

    fetchData();
  }, [index]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIndex((prevIndex) => prevIndex + 20);
        }
      },
      { threshold: 0.7 }
    );
    if (bottomElementRef.current) {
      observer.observe(bottomElementRef.current);
    }
    return () => {
      if (bottomElementRef.current) {
        observer.unobserve(bottomElementRef.current);
      }
    };
  }, []);

  return (
    <>
      <TobNavi />
      <SectionLayout>
        <Contents showInfo={showList} />
        <div className="bottomElement" ref={bottomElementRef}></div>
      </SectionLayout>
    </>
  );
};

export default Info;

const SectionLayout = styled.section`
  .bottomElement {
    height: 10px;
  }
`;

/*
// NOTE

타입 해결하기
GOOD JOB how about that?
hello it's me 

hahassssssssssssssssss
재밌다 재밌다ssssssssssssss

------------------------------------------------
------------------------------------------------
------------------------------------------------
------------------------------------------------
------------------------------------------------
-----------------------------------------------
-----------------------------------------------


*/
