import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Content() {
  const [inputData, setInputData] = useState("");
  const [check, setCheck] = useState("");
  const [dataList, setDataList] = useState<List[]>([]);
  //   const data: string[] = [];
  const d = new Date();
  let key: number = 1;

  // type get<T = never, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig<T>): Promise<R>;
  interface List {
    id: number;
    listcontent: string;
    isimportant: boolean;
    date: number;
    key: number;
  }

  useEffect(() => {
    axios.get<List[]>(`http://localhost:8080/showdata`).then((res) => {
      setDataList(res.data);
      console.log(res.data);
    });
    console.log("UseEffect Activated");
  }, []);

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
      getData();
      return;
    }
    setCheck("You input incorrectly");
  };

  const getData = () => {
    axios.get<List[]>(`http://localhost:8080/showdata`).then((response) => {
      console.log(response.data);
      setDataList(response.data);
    });
    console.log(dataList);
  };

  const ListElem = dataList.map((list) => {
    return (
      <>
        <li
          className="my-3 py-2 text-gray-500 text-xl font-semibold border-b-2 border-gray-300"
          key={list.key}
        >
          {list.listcontent}
        </li>

        <span className=" text-red-500 hover:text-red-300 cursor-pointer">
          X
        </span>
      </>
    );
  });

  // console.log(ListElem);

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

      <div className="flex justify-between">
        <ul>{ListElem}</ul>
      </div>
    </div>
  );
}
