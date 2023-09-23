import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TobNavi from "Components/common/TobNavi";
import useSeoulShowAPI from "API/getShowAPI";

import Contents from "../Components/Info/Contents";

const Info: React.FC = () => {
  const [getShow, setShow] = useState([]);
  const { getShowList } = useSeoulShowAPI();

  useEffect(() => {
    async function fetchData() {
      const data = await getShowList(0);
      setShow(data);
    }

    fetchData();
  }, []);

  return (
    <>
      <TobNavi />
      <SectionLayout>
        <Contents showInfo={getShow} />
      </SectionLayout>
    </>
  );
};

export default Info;

const SectionLayout = styled.section``;
