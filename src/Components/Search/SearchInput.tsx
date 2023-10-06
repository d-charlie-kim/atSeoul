import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "Assets/search-icon.svg";
import SearchIcon_Fill from "Assets/search-fill-icon.svg";

import useSeoulShowAPI from "API/getShowAPI";

const SearchInput: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [index, setIndex] = useState(0);
  const bottomElementRef = useRef(null);
  const { getShowsTitle } = useSeoulShowAPI();

  const searchTimeoutRef = useRef<number | null | Timeout>(null);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
    setTimeout(async () => {
      const data = await getShowsTitle(inputValue, 0);
      setSearchData(data);
    }, 500);
  }

  function makeKeywordStrong(title: string) {
    const parts = title.split(new RegExp(`(${inputValue})`, "i")); // split으로 잘려서 배열이 만들어지는데, 자른 분기 str은 살아있다

    const temp = parts.map((part, index) =>
      part === inputValue ? <strong key={index}>{part}</strong> : part
    );

    return temp;
  }

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

  useEffect(() => {
    if (!inputValue.length) return;
    async function fetchData() {
      const data = await getShowsTitle(inputValue, index);
      setSearchData((prevData) => [prevData, ...data]);
    }
    fetchData();
  }, [index]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIndex((prevIndex) => prevIndex + 30);
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
        <div ref={bottomElementRef}></div>
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
