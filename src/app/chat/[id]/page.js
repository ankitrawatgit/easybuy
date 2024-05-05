"use client"
import React, { useEffect, useRef, useState } from 'react';
import './chat.css';
import { initializeApp } from 'firebase/app';
import { collection, addDoc, query, orderBy, limit, onSnapshot, getFirestore, Timestamp } from 'firebase/firestore';
import PostNavbar from '@/Components/PostNavbar';
import { useGetLogedinUser } from '@/hooks/User';
import Loading from '@/app/loading';
import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { randomUUID } from 'crypto';
const app = initializeApp({
  apiKey: "AIzaSyCq-G8y1jENXrT3ansHPxvBzYWS7Gt6BDk",
  authDomain: "easybuychat-e2938.firebaseapp.com",
  projectId: "easybuychat-e2938",
  storageBucket: "easybuychat-e2938.appspot.com",
  messagingSenderId: "787785893150",
  appId: "1:787785893150:web:8aa6c87e643cb8d85cb50f",
  measurementId: "G-1VB88C45PP"
})



function App() {
  return (
    <div className="Apps">
      <PostNavbar title={`Chat`} />
      <section>
        <ChatRoom />
      </section>

    </div>
  );
}


function ChatRoom() {
  const dummy = useRef();
  const params = useParams();
  const { id } = params;
  const [formValue, setFormValue] = useState('');
  const [messages, setmessages] = useState([]);
  const [chatid, setchatroomid] = useState("");
  const [isRoomexists, setisRoomexists] = useState(false);
  const [isinitdone, setisinitdone] = useState(false);
  const [iserror, setiserror] = useState(false);
  const listenerRef = useRef(null);
  const initialized = useRef(false)
 
  const listenForMessages = (chatId, callback) => {
    const messagesRef = collection(getFirestore(app), `chats/${chatId}/messages`);
    const q = query(messagesRef, orderBy('createdAt'), limit(25));
    return onSnapshot(q, callback);
  }

  const { data: loginuserdata, isError: getloginusererror, isFetching, isSuccess } = useGetLogedinUser();
  const logedinuserdetails = loginuserdata?.data.user;


  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
  
    checkroomExistsornot()
    }
    return () => {
      if (listenerRef.current) {
        // console.log("delete listener");
        listenerRef.current(); 
      }
    };
  }, []);

  


  const checkroomExistsornot = async () => {
    setisinitdone(false)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST_API_URL}/chat/isRoomexists`, { "participant": parseInt(id) }, { withCredentials: true });
      if (res.status == 200) {
        if (res.data.isExists) {
          setisRoomexists(true);
          // console.log(res.data.roomid);
          setchatroomid(res.data.roomid);
          const unsubscribe =  listenForMessages(res.data.roomid, (querySnapshot) => {
            let data = []
            querySnapshot.forEach((doc) => {
              // console.log(doc.data());
              data.push(doc.data())
            });
            // data.reverse()
            setmessages(data)
            data = [];
          });
          listenerRef.current = unsubscribe
        }else{
          setisRoomexists(false)
        }

        setisinitdone(true)
      }
    } catch (error) {
      setiserror(true)
      console.log(error);
    }
  }



  const handleCreateRoom = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST_API_URL}/chat/createRoom`, { "participant": parseInt(id) }, { withCredentials: true })

      if (res.status == 200) {
        console.log(res);
        setchatroomid(res.data.roomid);
        listenerRef.current = listenForMessages(res.data.roomid, (querySnapshot) => {
          let data = []
          querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            data.push(doc.data())
          });
          // data.reverse()
          setmessages(data)
          data = [];
        });
  
        setisinitdone(true)
      }


    } catch (error) {
      setiserror(true)
      setisinitdone(false);
      // console.log(error);
    }


  }




  const sendMessage = async (e) => {
    e.preventDefault();
    if(!isRoomexists){
      setisinitdone(false);
      await handleCreateRoom()
    }

    const messagesRef = collection(getFirestore(app), `chats/${chatid}/messages`);

    await addDoc(messagesRef, { // Use addDoc instead of messagesRef.add
      text: formValue,
      createdAt: Timestamp.now(),
      uid: logedinuserdetails.id,
      photoURL: logedinuserdetails.image ?logedinuserdetails.image:""
    });


    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  function generateKey() {
    // Define a set to store generated keys
    const keySet = new Set();
  
    // Return a function that generates a unique key
    return () => {
      let key;
      do {
        // Generate a random key
        key = Math.random().toString(36).substring(7);
      } while (keySet.has(key)); // Regenerate if key already exists
      keySet.add(key); // Add key to the set to ensure uniqueness
      return key;
    };
  }

  function ChatMessage(props) {
    


    const { text, uid, photoURL} = props.message;
    const messageClass = logedinuserdetails?.id == uid ? 'sent' : 'received';

    return (<>
      <div className={`message ${messageClass}`} >
        <img src={photoURL || 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png'} className='image'/>
        <p className='paragraph'>{text}</p>
      </div>
    </>)
  }



  return (
    <div>
      {
        <div>
          <main>
            {
              !iserror ? !isinitdone && <div className='flex h-[100vh] justify-center items-center text-white font-bold'>Please wait while we initialize your chat.</div> : <div className='flex h-[100vh] justify-center items-center text-white font-bold'>An Error occurred.. Please Retry</div>
            }
            {messages && messages.map(msg => <ChatMessage   message={msg} key={generateKey()()}/>)}
            <span ref={dummy}></span>
          </main>

          <form onSubmit={sendMessage} className='form'>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Write you message here.." className='input'/>
            <button type="submit" disabled={!formValue || !isinitdone} className='button' >▶</button>
          </form>
        </div>

      }

    </div>
  );
}


export default App;
