import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Content() {
  const [inputData, setInputData] = useState("");
  const [tmpData, setTmpData] = useState<string[]>([]);
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
      // console.log(res.data);
    });
    console.log("UseEffect Activated");
  }, [check]);

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
      // console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  };
  const setData = async (): Promise<void> => {
    setCheck("");
    setInputData("");
    if (!!inputData) {
      setTmpData([...tmpData, inputData]);
      await insertData();
      key++;
      // getData();
      return;
    }
    setCheck("You input incorrectly");
  };

  const handleKey = (e: any): void => {
    if (e.charCode == 13) {
      setData();
    }
  };

  // const getData = () => {
  //   setDataList([]);
  //   axios.get<List[]>(`http://localhost:8080/showdata`).then((response) => {
  //     // console.log(response.data);
  //     setDataList(response.data);
  //   });
  //   console.log(dataList);
  // };

  const delList = (id: number) => (event: any) => {
    try {
      axios
        .delete<number>(`http://localhost:8080/delete/${id}`, {
          data: id,
        })
        .then((response) => {
          setDataList((): any => {
            return dataList.filter((e) => {
              return e.id != id;
            });
          });
          console.log(response, dataList);
        });
    } catch (e) {
      console.error(e);
    }
  };

  const ListElem = dataList.map((list) => {
    return (
      <div
        className="border-b-2 border-gray-300 flex justify-between items-center"
        key={list.key}
      >
        <p className="my-3 py-1 text-gray-500 text-xl font-semibold ">
          {list.listcontent}
        </p>

        <button
          onClick={delList(list.id)}
          className="font-semibold text-xl text-red-500 hover:text-red-300 cursor-pointer"
        >
          X
        </button>
      </div>
    );
  });

  const TmpListElem = tmpData.map((list, i) => {
    return (
      <div
        className="border-b-2 border-gray-300 flex justify-between items-center"
        key={i}
      >
        <p className="my-3 py-1 text-gray-500 text-xl font-semibold ">{list}</p>

        <button className="font-semibold text-xl text-red-500 hover:text-red-300 cursor-pointer">
          Must to Refresh to Delete
        </button>
      </div>
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
            value={inputData}
            onKeyPress={handleKey}
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

      <div className="">{ListElem}</div>
      <div className="">{TmpListElem}</div>
    </div>
  );
}
