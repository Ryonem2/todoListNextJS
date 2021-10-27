import React, { useState } from "react";
import axios from "axios";

export default function Content() {
  const [inputData, setInputData] = useState("");
  const [check, setCheck] = useState("");
  //   const data: string[] = [];
  const d = new Date();
  let key = 1;

  const setKeyDown = (e: any): void => {
    setInputData(e.target.value);
  };
  const insertData = async () => {
    try {
      const res = await axios.post("https://localhost:8080", {
        listContent: inputData,
        date: d.getTime(),
        key: d.getTime() + key,
      });
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  };
  const setData = (): void => {
    setCheck("");
    if (!!inputData) {
      setCheck("You input incorrectly");
      return;
    }
    insertData();
    key++;
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold text-gray-600 text-center my-6">
        ADD TODOLIST
      </h1>
      <div className="flex justify-center items-center mx-auto">
        <input
          className="block w-1/2 mr-3 h-8 border-solid border-2 border-gray-200 text-gray-500 focus:border-gray-400"
          type="text"
          placeholder="Type Here..."
          onChange={setKeyDown}
        />
        {/* <input type="text" /> */}
        <small className="text-red-500">{check}</small>

        <button
          className="w-16 h-8 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold"
          onClick={setData}
        >
          ADD
        </button>
      </div>
      <hr className="w-4/5 h-1 my-6" />
    </div>
  );
}
