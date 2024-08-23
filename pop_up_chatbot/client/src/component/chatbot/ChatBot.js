import axios from "axios";
import react, { useState, useEffect, useRef } from "react";
// import { useState} from "react";
const ChatBot =()=> {
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState([
        {
            sender:'bot',
            content:'How can I help you?',
            // addition:["Hello", 'how', "what is that?"]
        }
    ])
    const [userInput, setUserInput] = useState('')
    const ref = useRef();
    const scrollToBottom = () => {
        const mainRoot = document.getElementById("roof");
        mainRoot?.scrollIntoView({ behavior: "smooth" });
        // ref?.current.scrollIntoView({ behavior: "smooth" });
      };
      useEffect(() => {
        scrollToBottom();
      }, [message]);  
    const closechatbot = ()=>{
        setShow(false)
        console.log('close')
    }
    const getResponse =async (mes)=>{
        await axios
        .post('http://127.0.0.1:8000/chatbot/', {'content':mes})
        .then((res)=>{
            console.log(res['data'])
            setMessage((prevMessage)=>[...prevMessage, {sender:'bot', content:res['data']}])
        })
    }
    const sendMessage = ()=>{
        setMessage((preMessage)=>[...preMessage, {
            sender:'user',
            content:userInput,
            addition:[],
        }])
        setUserInput('')
        getResponse(userInput)

    }
    const handleUserInput = (e)=>{
        setUserInput(e.target.value)
    }
    return(
        <div className="chatpage">
            {show === true && (
                <div className="chatbotwidget">
                    <div className="chatheader">
                        <div>Chatbot</div>
                        <button className="close-button" onClick={closechatbot}></button>
                    </div>
                    <div className="chat-group">
                        <div className="conversation-group">
                            <div>
                                {message.map((mes, index)=>(
                                        <div key={index} className={`${mes.sender === 'user' ? 'user-message' : 'bot-message'}`}>{mes.content}</div>
                                    //     {/* <div className="add-response">
                                    //     {mes.addition.length > 1 && (
                                    //         mes.addition.map((res, index) => (
                                    //             <button key={index} className="select-response">{res}</button>
                                    //         ))
                                    //     )}
                                    // </div>*/
                                    // }
                                ))}
                            </div>
                            <div id = "roof" className="ref"></div>

                        </div>
                    </div>
                    <div className="input-contrainer">
                        <div className="input-group">
                                <textarea className="userInput" value={userInput} rows={1} onChange={handleUserInput} onKeyDown={(e)=>{
                                    if(e.key==="Enter"){
                                        sendMessage();
                                    }
                                }}/>
                                <button className="sendbutton" onClick={sendMessage} ></button>
                        </div>
                    </div>
                </div>
            )}
            {show === false && (
                <div>
                    <button onClick={()=>setShow(true)} className="chatbot-icon"></button>
                </div>
            )
            }
        </div>
    )
}

export default ChatBot;