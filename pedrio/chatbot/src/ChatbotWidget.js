import './chatbotWidget.scss';
import smallIcon from './assets/icon-small.svg';
import bigIcon from './assets/icon-big.svg';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';



const ChoiceBox = ({message, addMessage, getResponse}) => {
  const [selectedChoice, setSelectedChoice] = useState(true);
  const handleChoiceClick = (choice) => {
    let userChoice = [{sender:"user", content:choice}];
    setSelectedChoice(true);
    addMessage(userChoice);
    getResponse(userChoice);
  }
  if (!message.hasOwnProperty("choices")){
    return;
  }
  return (
    <>
        {!selectedChoice && 
          <>
            {message.choices.map((choice, index) => (
              <div 
                className='choice' 
                onClick={(e) => handleChoiceClick(choice)}
                key={index}>
                {choice}
              </div>
            ))}
          </>
        }
    </>
  );
}


const MessageBox = ({message}) => {
  const boxClass = message.sender === "user"? "user-message" : "chatbot-message";
  return (
    <>
      <div className={boxClass}>
        <div dangerouslySetInnerHTML={{ __html: message.content }} />
        {/* {message.content} */}
      </div>
    </>    
  );
}

const ChatbotWidget = () => {
  const server = "http://localhost:5000/"
  const [messages, setMessages] = useState([{
    sender:"bot",
    content:"Greetings, There are some questions"
  },
  {
    sender:"bot",
    content:"Select your current heat source"
  },
]);
  const [userInput, setUserInput] = useState("");
  const [isShow, setIsShow] = useState(true);
  const ref = useRef();
  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, ...message]);
  };
  const getResponse = async (message) => {
    try {
      const response = await axios.post(`${server}/api`, message);
      console.log(response.data);
      addMessage(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  const sendMessage = () => {
    if (!userInput.trim()) {
      return;
    }
    let message = [{sender:"user", content:userInput}];
    addMessage(message);
    getResponse(message);
    setUserInput('');
  }
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  }
  const scrollToBottom = () => {
    ref.current.scrollIntoView({behavior: 'smooth'});
  }
  const hideWidget = () => {
    setIsShow(!isShow);
  }
  const fetchData = async () => {
    try {
      const response = await axios.post(server);
      console.log(response.data); // Do something with the response data
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    scrollToBottom();    
  }, [messages])
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='chatbot'>
      {isShow && 
        <div className="chatbot-widget">
          <div className="chatbot-header">
            <img src={smallIcon} alt='image of icon'/>
            {/* <h3>Easy<span>Health</span>Ai</h3> */}
          </div>
          <div className='conversation-group'>
            <div className='message-group'>
              {messages.map((message, index) => ( 
                <MessageBox
                  key={index}
                  message={message}
                  addMessage={addMessage}
                  getResponse={getResponse}
                  />
              ))} 
              <div ref={ref}/>
            </div>
            <div className='choice-container'>
              {messages.map((message, index) => ( 
                <ChoiceBox
                  key={index}
                  message={message}
                  addMessage={addMessage}
                  getResponse={getResponse}
                  />
              ))}
            </div>
          </div>
          
          <div className='input-group'>
            <input
              type='text'
              placeholder='Ask me any questions.'
              onChange={handleInputChange}
              value={userInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
          </div>
          <div className='chatbot-footer'>
          </div>
        </div>}
        <div className='mini-bot'>
          <img src={bigIcon} alt='image of icon' onClick={hideWidget}/>
        </div>
    </div>
  );
}

export default ChatbotWidget;