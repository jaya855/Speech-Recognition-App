
import './App.css';
import { message } from 'antd';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import useClipboard from "react-use-clipboard";
import { useState } from 'react';
function App() {
  const [textToCopy,setTextToCopy]=useState("")
  
  const [isCopied, setCopied] = useClipboard(textToCopy);
  const {transcript,resetTranscript,browserSupportsSpeechRecognition} = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const handleCopy = () => {
    setCopied();
    if(!textToCopy){
      message.error('to text to copy');
    }
    else{
      message.success('Text copied to clipboard');
    }
    
  };
  const handleClear = () => {
    resetTranscript();
    if(!textToCopy){
      message.error('no text to clear');
    }
    else{
      message.success('Transcript cleared');
    }
    
  };
  const startlisten=()=>{
    SpeechRecognition.startListening({ continuous: true })
    message.success('listening started');
  };
  const stoplisten=()=>{
    SpeechRecognition.stopListening()
    message.success('listening stopped');
  };
  
  return (
    <div className="h-screen w-screen bg-red-200 flex justify-center items-center">
     
      
      <div className="h-[70%] w-[90%] lg:w-[35%] md:w-[60%] ">
        <div className='pb-[3rem] md:text-[1rem] text-green-600 lg:text-[2rem] font-bold  h-[10%] w-[100%] flex justify-center items-center'>
          Speech to Text Converter
        </div>
        <div className=' shadow-2xl shadow-green-900 h-[90%] w-[100%] bg-slate-900 rounded-xl'>
          <div className='h-[80%] w-[100%] overflow-auto text-white p-[1rem]' onClick={()=>{setTextToCopy(transcript)}}>
            {transcript}
          </div>
      
          
          <div className='h-[20%] w-[100%]  flex  justify-center items-center lg:space-x-10 md:space-x-5 space-x-2'>
          <button  className='hover:-translate-y-1 hover:bg-red-600  shadow-sm shadow-white font-bold bg-green-600 text-white h-[2rem] w-[3rem] md:p-[0.5rem] md:h-[3rem] md:w-[5rem] lg:p-[0.5rem] lg:h-[3rem] lg:w-[5rem] rounded-md' onClick={handleCopy}>Copy</button>
          
          <button className="hover:-translate-y-1 hover:bg-red-600 shadow-sm shadow-white font-bold bg-green-600 text-white h-[2rem] w-[3rem] md:p-[0.5rem] md:h-[3rem] md:w-[5rem] lg:p-[0.5rem] lg:h-[3rem] lg:w-[5rem] rounded-md" onClick={()=>{startlisten()}}>Start</button>
          <button className="hover:-translate-y-1 hover:bg-red-600 shadow-sm shadow-white font-bold bg-green-600 text-white h-[2rem] w-[3rem] md:p-[0.5rem] md:h-[3rem] md:w-[5rem] lg:p-[0.5rem] lg:h-[3rem] lg:w-[5rem] rounded-md" onClick={()=>{stoplisten()}}>Stop</button>
          <button className="hover:-translate-y-1 hover:bg-red-600 shadow-sm shadow-white font-bold bg-green-600 text-white h-[2rem] w-[3rem] md:p-[0.5rem] md:h-[3rem] md:w-[5rem] lg:p-[0.5rem] lg:h-[3rem] lg:w-[5rem] rounded-md" onClick={handleClear}>Clear</button>
          </div>
        </div>
      </div>


      </div>
    
  );
}

export default App;
