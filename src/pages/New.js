import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button";
import Header from '../components/Header';
import Editor from './Editor';
import { useContext } from 'react';
import { DiaryDispatchContext} from "../App";
import { setPageTitle } from '../util';
const New = () => {
  const navigate =useNavigate();
  const goBack =() =>{
    navigate(-1);
  }
  const onSubmit = (data) =>{
    const {date, content, emotionId} = data;
    onCreate(date, content, emotionId);
    navigate("/", {replace:true});
  };
  useEffect(() =>{
    setPageTitle("새 일기 쓰기");
  },[])
  const {onCreate} = useContext(DiaryDispatchContext);
  return (
    <div>
      <Header 
        title={"새 일기 쓰기"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
      />
      <Editor onSubmit={onSubmit}/>
    </div>
  )
}

export default New