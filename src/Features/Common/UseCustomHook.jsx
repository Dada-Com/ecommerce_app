import { useState } from "react";
import { toast } from "react-toastify";

function useCustomState() {
  const [filter, setFilter] = useState({});

  return [filter, setFilter];
}
function useCustomSorts() {
  const [sort, setSort] = useState({});

  return [sort, setSort];
}
// let keyWordMain = "";
// function useCustomkeyWord(state) {
//   const [keyWord, setkeyWord] = useState(state);
//   keyWordMain = keyWord;
//   toast.success(keyWord);
//   return [keyWord, setkeyWord];
// }  useCustomkeyWord, keyWordMain
// console.log("keyWordMain", keyWordMain);
export { useCustomState, useCustomSorts };
