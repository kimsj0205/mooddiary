import React, { useEffect, useState, useCallback } from 'react'
import { emotionList, getFormattedDate } from '../util';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import './Editor.css';
import EmotinoItem from './EmotionItem';
const Editor = ({initData, onSubmit}) => {
  // 날짜
  const [state, setState] = useState({
    date:getFormattedDate(new Date()),
    emotionId:3,
    content:""
  });
  const handleChangeData = (e) =>{
    setState({
      ...state,
      date:e.target.value
    });
  }
  // 내용
  const handleChangeContent = (e) =>{
    setState({
      ...state,
      content:e.target.value
    })
  }
  const handleSubmit = () =>{
    onSubmit(state);
  };
  const handleChangeEmotion = useCallback((emotionId) =>{
    setState((state) =>({
      ...state,
      emotionId
    }));
  },[]); 
  useEffect(()=>{
    if(initData){
      setState({
        ...initData,
        date:getFormattedDate(new Date(parseInt(initData.date))),
      });
    }
  },[initData]);
  const navigate = useNavigate();
  return (
    <div className="Editor">
      <div className="editor_section">
        {/* 날짜 */}
        <h4>오늘의 날짜</h4>
        <div className="editor_section">
          <input type="date" value={state.date} onChange={handleChangeData} />
        </div>
      </div>
      <div className="editor_section">
        {/* 감정 */}
        <h4>오늘의 감정</h4>
          <div className="input_wrapper emotion_list_wrapper">
            {
              emotionList.map((it) => (
                <EmotinoItem 
                key={it.id}
                {...it}
                onClick={handleChangeEmotion}
                isSelected = {state.emotionId === it.id}
                />
              ))
            }
          </div>
      </div>
      <div className="editor_section">
        <h4>오늘의 일기</h4>
        <div className="input_wrapper">
          <textarea
          placeholder="오늘은 어땟나요?"
          value={state.content}
          onChange={handleChangeContent}
          />
        </div>
      </div>
      <div className="editor_section">
        {/* 작성 완료, 취소 */}
      </div>
      <div className="editor_section button_section">
        <Button text={"취소하기"} onClick={()=>navigate(-1)}/>
        <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit}/>
      </div>
    </div>
  )
}

export default Editor