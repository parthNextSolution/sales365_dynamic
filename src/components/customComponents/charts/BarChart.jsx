import axios from "axios";
import React, { useEffect, useState } from "react";

const Chart = ({ title, percent }) => {
  return (
    <div className="w-[10px] h-[100%] flex flex-col items-center relative">
      <div className="w-[14px] h-[100%] mb-[15px] bg-[#fff8f8] rounded-t-[19px] relative overflow-hidden">
        <div
          className="w-[100%] bg-[#FE5143] bottom-0 absolute rounded-t-[19px]"
          style={{ height: percent }}
        ></div>
      </div>
      <div className="text-[10px] min-h-[40px] flex items-center justify-center tracking-sm font-medium text-[#8A9099] text-center absolute bottom-[-27px]">
        {title}
      </div>
    </div>
  );
};

const BarChart = ({ component }) => {
  const [data, setData] = useState({});
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (!check) {
      axios.get(component.api).then((e) => {
        console.log(e.data);
        setData(e.data);
      });
      setCheck(true);
    }
  });

  return (
    <div
      className={
        component.class +
        " w-[100%] max-w-[600px] flex flex-col rounded-[18px] border-[2px] border-[#f0f0f0] h-[340px] px-[18px] pt-[14px] py-[30px] bg-white"
      }
    >
      <div className="w-[100%] shrink-0 justify-center flex ">
        <h1 className="font-medium max-w-[500px] w-[100%] text-[16px]  text-[#585858]">
          {component.title}
        </h1>
      </div>
      <div className="w-[100%] justify-center items-center flex h-[100%] mt-[28px]">
        <div className="flex justify-center max-w-[500px]  w-[100%] h-[100%]">
          <div className="w-[20px] mr-[30px] h-[100%] text-[#8A9099]  flex flex-col justify-between">
            <div>{0 + data?.difference * 4}</div>
            <div>{0 + data?.difference * 3}</div>
            <div>{0 + data?.difference * 2}</div>
            <div>{0 + data?.difference}</div>
            <div>0</div>
          </div>
          <div className="w-[100%] h-[100%] pr-[10px] flex justify-between">
            {data?.list?.map((item, i) => {
              return (
                <Chart title={item.title} key={i} percent={item.percentage} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
