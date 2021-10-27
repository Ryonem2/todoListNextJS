import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Content() {
  const [inputData, setInputData] = useState("");
  const [check, setCheck] = useState("");
  //   const data: string[] = [];
  const d = new Date();
  let key: number = 1;

  useEffect(async () => {
    const result: unknown[] = await axios.get("http://localhost:8080/showdata");
  }, []);

  type listData<T> = {
    [Property in keyof T]: T[Property];
  };

  type dataFromDatabase = {
    id: number;
    listContent: string;
    isImportent: boolean;
    date: number;
    key: number;
  };

  type list = listData<dataFromDatabase>;

  const setKeyDown = (e: any): void => {
    setInputData(e.target.value);
  };
  const insertData = async () => {
    try {
      const res = await axios.post("http://localhost:8080/insertdata", {
        listContent: inputData,
        date: d.getTime(),
        key: d.getTime() + key,
      });
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  };
  const setData = async (): Promise<void> => {
    setCheck("");
    if (!!inputData) {
      await insertData();
      key++;
      return;
    }
    setCheck("You input incorrectly");
  };

  const getData = async (): Promise<any> => {
    try {
      const result = await axios.get("http://localhost:8080/showdata");
      //   console.log(result);
      return result.data.listcontent;
    } catch (e) {
      console.error(e);
    }
  };

  const listDatas = getData();

  const listData = listDatas.map((list: string) => {
    return list;
  });

  return (
    <div className="container mx-auto">
      <section>
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
      </section>

      <hr className="w-4/5 h-1 my-6" />

      <section>{/* <div>{listDatas}</div> */}</section>
    </div>
  );
}
