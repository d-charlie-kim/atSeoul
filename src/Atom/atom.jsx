import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const scrollPos = atom({
  key: "scrollPos",
  default: 0,
});

export const Show = atom({
  key: "Show",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
