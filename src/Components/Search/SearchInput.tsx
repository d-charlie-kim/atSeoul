import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "Assets/search-icon.svg";
import SearchIcon_Fill from "Assets/search-fill-icon.svg";

import useSeoulShowAPI from "API/getShowAPI";

const SearchInput: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const { getShowsTitle } = useSeoulShowAPI();

  const searchTimeoutRef = useRef<number | null>(null);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
    setTimeout(async () => {
      const data = await getShowsTitle(inputValue, 0);
      setSearchData(data);
    }, 500);
  }

  // useDebounce 얘를 어디서 호출하나요?

  function makeKeywordStrong(title: string) {
    // console.log("!!!! ::: ", new RegExp(`(${inputValue})`, "i"));
    const parts = title.split(new RegExp(`(${inputValue})`, "i")); // split으로 잘려서 배열이 만들어지는데, 자른 분기 str은 살아있다

    const temp = parts.map((part, index) =>
      part === inputValue ? <strong key={index}>{part}</strong> : part
    );

    console.log(
      "🚀 ~ file: SearchInput.tsx:32 ~ makeKeywordStrong ~ temp:",
      temp
    );
    return temp;
  }

  //브런치콘서트 [이달의 공연] 11월 클래식과 재즈의 더 배틀
  //['브런치'],['콘서트'],[' [이달의 공연] 11월 클래식과 재즈의 더 배틀']]

  useEffect(() => {
    if (inputValue.length === 0) return;
    if (searchTimeoutRef.current !== null) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      const data = await getShowsTitle(inputValue, 0);
      setSearchData(data);
    }, 500);

    return () => {
      clearTimeout(searchTimeoutRef.current);
    };
  }, [inputValue]);

  console.log("🚀 ~ file: SearchInput.tsx:12 ~ searchData:", searchData);

  return (
    <SLayout>
      <SSearch onChange={handleInputChange} />
      <SSearchIcon src={SearchIcon} alt="검색아이콘" />
      <SDropDown>
        {searchData &&
          searchData.map((show) => (
            <li key={show.TITLE}>
              <Link to={show.HMPG_ADDR}>{makeKeywordStrong(show.TITLE)}</Link>
            </li>
          ))}
      </SDropDown>
    </SLayout>
  );
};

export default SearchInput;

const SLayout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70vw;
  position: relative;
  margin: 20px auto 0;
`;

const SSearch = styled.input`
  display: flex;
  width: 100%;
  min-height: 50px;
  flex: 1;
  font-size: 18px;
  padding: 6px 20px;
  box-sizing: border-box;
  border: 1px solid var(--orange);
  border-radius: 6px;
  position: relative;
  outline: none;
  color: black;
`;

const SSearchIcon = styled.img`
  position: absolute;
  left: 90%;
  top: 10px;
`;

const SDropDown = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;

  li {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    font-size: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--gray-400);
    strong {
      color: var(--orange);
      font-weight: 800;
    }
  }
`;
