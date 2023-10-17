import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const TableTop = ({ component }) => {
  return (
    <div className=" w-[100%] px-[15px] pt-[15px] flex">
      <div className="w-[600px] bg-[#fff] border-[1.5px] border-[#E8E9EB] mr-[10px] overflow-hidden rounded-[11px] flex h-[42px]">
        <input
          type="text"
          style={{
            border: "0px",
            height: "100%",
            padding: "0px 10px",
          }}
          placeholder="Search leads..."
          className=" w-[100%] h-[100%] text-[14px] font-medium tracking-wide outline-none bg-transparent "
        />
        <img
          src="/assets/table/search.svg"
          className="w-[20px] shrink-0 mx-[5px]"
          alt=""
        />
      </div>
      {component.actions.length !== 0 && (
        <div className="bg-[#909193] h-[41px] cursor-pointer flex text-[14px] text-white font-medium rounded-[10px] pr-[16px] px-[24px] items-center justify-center">
          Actions{" "}
          <img
            src="/assets/table/down.svg"
            className="ml-[5px] w-[20px]"
            alt=""
          />
        </div>
      )}

      {component.kanban && (
        <div className="bg-[#434343] h-[41px] cursor-pointer flex text-[14px] text-white font-medium rounded-[10px] pr-[16px] px-[16px] ml-[10px] items-center justify-center">
          View{" "}
          <img
            src="/assets/table/gra.svg"
            className="ml-[13px] w-[20px]"
            alt=""
          />
          <img
            src="/assets/table/tab.svg"
            className="ml-[7px] w-[20px]"
            alt=""
          />
        </div>
      )}
      {component.addDataButton && (
        <div className="bg-[#FE5143] h-[41px] ml-[10px] cursor-pointer flex text-[14px] text-white font-medium rounded-[10px] pr-[16px] px-[24px] items-center justify-center">
          Add lead{" "}
          <img
            src="/assets/table/plus.svg"
            className="ml-[5px] w-[20px]"
            alt=""
          />
        </div>
      )}
    </div>
  );
};

const RouteFilter = ({ title, initial, list }) => {
  const [val, setVal] = useState(initial);
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const pointerIsDown = () => {
      if (!hover) {
        setClicked(false);
      }
    };

    document.addEventListener("pointerdown", pointerIsDown, false);
    return () => {
      document.removeEventListener("pointerdown", pointerIsDown, false);
    };
  });

  return (
    <div
      onClick={() => {
        setClicked(true);
      }}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      className="border-[#FE5143] relative border-[1.5px] bg-white h-[34px] ml-[10px] cursor-pointer flex text-[13px] text-black font-medium rounded-[10px] pr-[16px] px-[10px] items-center justify-center"
    >
      {title}
      <span className="text-[#FE5143] text-[12px] ml-[25px]">
        {val !== null && list[val].text}
      </span>
      <img
        src="/assets/table/down-dark.svg"
        className="ml-[5px] w-[15px]"
        alt=""
      />
      {clicked && (
        <div className="w-[100%] py-[5px] drop-shadow-xl rounded-[10px] absolute top-[40px] bg-white  z-10">
          {list.map((item, i) => {
            return (
              <div
                style={{
                  backgroundColor: i === val ? "#f0f0f0" : "#fff",
                }}
                onClick={() => {
                  navigate(item.route);
                  setVal(i);
                }}
                className="w-[100%] h-[32px] flex items-center px-[10px] text-black"
                key={i}
              >
                {item.text}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Filters = ({ filters }) => {
  console.log(filters, 214152142141);
  return (
    <div className="w-[100%] flex items-center px-[8px] mt-[10px]">
      {filters.map((item, i) => {
        return (
          <React.Fragment key={i}>
            {item.type === "route" && (
              <RouteFilter
                title={item.title}
                initial={item.initialValue}
                list={item.list}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const LeadBox = ({ width, bool }) => {
  const [check, setCheck] = useState(false);
  React.useEffect(() => {
    if (check) {
      if (bool) {
        ref.current.checked = true;
      } else {
        ref.current.checked = false;
      }
    }
    setCheck(true);
  }, [bool]);
  const ref = useRef();

  return (
    <div
      className={`flex items-center mr-[18px] justify-center h-[20px] shrink-0 `}
      style={{ width: width, flexShrink: "unset" }}
    >
      <input
        type="checkbox"
        ref={ref}
        className="checkbox h-[16px] outline-none w-[16px]"
      />
    </div>
  );
};

const Headers = ({ tableHeaders }) => {
  return (
    <div className="flex  h-[50px] items-center ">
      <div className="flex h-[50px] items-center border-[#C0C2C6] border-b-[1px]">
        <LeadBox width={"40px"} />
        {tableHeaders.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <div
                style={{
                  width: item.width ? item.width : "150px",
                }}
                className="font-medium shrink-0 text-[14px] mr-[10px]"
              >
                {item.text}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const Item = ({ tableItems, data }) => {
  function convertISODateToCustomFormat(isoDateString) {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    // Convert 24-hour time to 12-hour time
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const formattedDate = `${day} ${month} ${year}`;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

    return [formattedDate, formattedTime];
  }

  function calculateDurationBetweenISOStrings(startISOString, endISOString) {
    const startTime = new Date(startISOString);
    const endTime = new Date(endISOString);

    if (isNaN(startTime) || isNaN(endTime)) {
      return "Invalid date format";
    }

    const timeDifference = endTime - startTime;
    const minutes = Math.floor(timeDifference / (1000 * 60));

    if (minutes === 1) {
      return "1 min";
    } else {
      return `${minutes} mins`;
    }
  }
  return (
    <div className="flex   h-[50px] items-center relative   ">
      <div className="flex h-[50px] items-center border-[#C0C2C6] border-b-[1px]">
        <LeadBox width={"40px"} />
        {tableItems.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <div
                style={{
                  width: item.width ? item.width : "150px",
                }}
                className="font-medium shrink-0 text-[14px] mr-[10px]"
              >
                {item?.type === "date" ? (
                  <div className="flex flex-col justify-center ">
                    <div>
                      {convertISODateToCustomFormat(data[item.property])[0]}
                    </div>
                    <div>
                      {convertISODateToCustomFormat(data[item.property])[1]}
                    </div>
                  </div>
                ) : item?.type === "duration" ? (
                  calculateDurationBetweenISOStrings(
                    data[item.property1],
                    data[item.property2]
                  )
                ) : (
                  data[item.property]
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const Table = ({ component, data, page }) => {
  console.log(0 >= page, 0 < (page + 1) * 10, page);
  return (
    <div
      style={{
        width: "calc(100vw - 121px)",
      }}
      className=" mt-[10px]  min-h-[100px] overflow-y-hidden custom-scroll  overflow-x-auto"
    >
      <Headers tableHeaders={component.tableHeaders} />
      {data.map((item, i) => {
        return (
          <React.Fragment key={i}>
            {i >= page * 10 && i < (page + 1) * 10 && (
              <Item tableItems={component.tableItems} data={item} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Pagination = ({ page, total, setPage }) => {
  const first = page === 0;
  const last = Math.floor(total / 10) === page;
  const pagesArr = new Array(Math.floor(total / 10) + 1).fill(0);
  return (
    <div className="w-[100%] items-center flex justify-end h-[50px]">
      <div className="flex">
        <div
          style={{
            backgroundColor: page > 0 ? "#ffe7e5" : "#fff",
          }}
          onClick={() => {
            setPage(0);
          }}
          className="w-[34px] mx-[5px] h-[34px] cursor-pointer bg-white flex items-center justify-center rounded-[12px]"
        >
          <img
            src={page > 0 ? "/assets/table/arr1.svg" : "/assets/table/arr.svg"}
            className="translate-x-[5px]"
            alt=""
          />
          <img
            src={page > 0 ? "/assets/table/arr1.svg" : "/assets/table/arr.svg"}
            className="translate-x-[-5px]"
            alt=""
          />
        </div>

        <div
          style={{
            backgroundColor: page > 0 ? "#ffe7e5" : "#fff",
          }}
          onClick={() => {
            if (page > 0) {
              setPage(page - 1);
            }
          }}
          className="w-[34px] mx-[5px] cursor-pointer h-[34px] bg-white flex items-center justify-center rounded-[12px]"
        >
          <img
            src={page > 0 ? "/assets/table/arr1.svg" : "/assets/table/arr.svg"}
            alt=""
          />
        </div>
        {pagesArr.map((item, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                setPage(i);
              }}
              style={{
                backgroundColor: page === i ? "#FE5143" : "#fff",
              }}
              className="w-[34px] h-[34px] mx-[5px] text-[12px] font-medium cursor-pointer bg-white flex items-center justify-center rounded-[12px]"
            >
              {i + 1}
            </div>
          );
        })}
        <div
          style={{
            backgroundColor: page < Math.floor(total / 10) ? "#ffe7e5" : "#fff",
          }}
          onClick={() => {
            if (page < Math.floor(total / 10)) {
              setPage(page + 1);
            }
          }}
          className="w-[34px] mx-[5px] cursor-pointer h-[34px] bg-white flex items-center justify-center rounded-[12px]"
        >
          <img
            src={
              page < Math.floor(total / 10)
                ? "/assets/table/arr1.svg"
                : "/assets/table/arr.svg"
            }
            className="rotate-180"
            alt=""
          />
        </div>

        <div
          style={{
            backgroundColor: page < Math.floor(total / 10) ? "#ffe7e5" : "#fff",
          }}
          onClick={() => {
            if (page < Math.floor(total / 10)) {
              setPage(Math.floor(total / 10));
            }
          }}
          className="w-[34px] mx-[5px] cursor-pointer h-[34px] bg-white flex items-center justify-center rounded-[12px]"
        >
          <img
            src={
              page < Math.floor(total / 10)
                ? "/assets/table/arr1.svg"
                : "/assets/table/arr.svg"
            }
            className="translate-x-[5px] rotate-180"
            alt=""
          />
          <img
            src={
              page < Math.floor(total / 10)
                ? "/assets/table/arr1.svg"
                : "/assets/table/arr.svg"
            }
            className="translate-x-[-5px] rotate-180"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

const CustomTable = ({ component }) => {
  const [data, setData] = useState([]);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (!check) {
      function flattenNestedObject(obj, prefix = "") {
        const flattened = {};

        for (const key in obj) {
          if (typeof obj[key] === "object" && obj[key] !== null) {
            const nestedPrefix = prefix ? `${prefix}.${key}` : key;
            const nestedFlatten = flattenNestedObject(obj[key], nestedPrefix);
            Object.assign(flattened, nestedFlatten);
          } else {
            const finalKey = prefix ? `${prefix}.${key}` : key;
            flattened[finalKey] = obj[key];
          }
        }

        return flattened;
      }

      axios.get(component.api).then((e) => {
        const arr = e.data.result;
        console.log(e.data.result);
        for (let i = 0; i < arr.length; i++) {
          arr[i] = flattenNestedObject(arr[i]);
        }
        setData(arr);
      });
      setCheck(true);
    }
  });

  console.log(data);

  const [page, setPage] = useState(0);

  return (
    <div className="w-[100%] min-h-[100px] pb-[30px] mb-[20px] relative  rounded-[12px]  bg-[#fff8f7]  ">
      <TableTop component={component} />
      <Filters filters={component.filters} />
      <Table component={component} data={data} page={page} />
      <Pagination total={data.length} page={page} setPage={setPage} />
    </div>
  );
};

export default CustomTable;
