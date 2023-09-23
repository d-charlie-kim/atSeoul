import React from "react";
import axios from "axios";

const useSeoulShowAPI = () => {
  const API_KEY = "774c79676c79686f31303566616f7871";
  const seoulShowAxios = axios.create({
    baseURL: "http://openapi.seoul.go.kr:8088",
  });

  async function getShowsTitle(title: string, start: number) {
    const end: number = start + 20;
    const requestURL = `/${API_KEY}/json/culturalEventInfo/${start}/${end}/ /${title}`;
    try {
      const response = await seoulShowAxios
        .get(requestURL)
        .then((response) => response.data);

      console.log("get Shows Title API call");
      return response.culturalEventInfo.row;
    } catch (error) {
      console.error("ERROR fetching show titles data");
    }
  }

  async function getShowList(start: number) {
    const end: number = start + 20;
    const requestURL = `/${API_KEY}/json/culturalEventInfo/${start}/${end}/`;
    try {
      const response = await seoulShowAxios
        .get(requestURL)
        .then((response) => response.data);

      console.log("getShowList API call");
      return response.culturalEventInfo.row;
    } catch (error) {
      console.error("ERROR fetching show list data");
    }
  }

  return { getShowList, getShowsTitle };
};

export default useSeoulShowAPI;
