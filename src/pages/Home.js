import { useState, useContext, useEffect } from 'react';
import React from 'react'
import { DiaryStateContext } from '../App';
import Header from '../components/Header';
import Button from '../components/Button';
import { getMonthRangeByDate, setPageTitle } from '../util';
import DiaryList from '../components/DiaryList';

const Home = () => {
  const data= useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);
  const handleTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`
  const onIncreaseMonth = () =>{
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreateMonth = () =>{
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  }
  useEffect(() => {
    setPageTitle("김수지의 감정일기장");
    if (data.lenght >= 1){
      const {beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate);
      setFilteredData(
        data.filter(
          (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
        )
      );
    } else {
      setFilteredData(data);
    }
  },[data, pivotDate]);
  return (
    <div>
      <Header
        title={handleTitle}
        leftChild={<Button text={"<"} onClick={onDecreateMonth}/>}
        rightChild={<Button text={">"} onClick={onIncreaseMonth}/>}
      />
      <DiaryList data={filteredData}/>
    </div>
  )
}

export default Home