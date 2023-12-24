"use client"
import "./page.scss"
import Image from 'next/image'
import avatar from "../../../../public/assets/img/1.png"
import CircleIcon from '@mui/icons-material/Circle';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import io from "socket.io-client"
import Typography from '@mui/material/Typography'
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { DataApi, Datalogin, KhachHangHopDong } from "@/app/api/login";

const socket = io('https://cho4u.xyz:3000');

interface MessageFromOther {
    message: string
    userId: string
    ma_hop_dong: string
    ma_san_pham: string
    phone?: string
    avatar: string
    name?: string
}
const SupportPage = () => {
    const [messages, setMessage] = useState('');
    const [messageList, setMessageList] = useState<MessageFromOther[]>([]);
    const messageEndRef = useRef(null)
    const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value)
    }

    const submitMessage = async () => {
        if (messages !== "") {
            const userDataLocalStorage = localStorage.getItem('userData')
            const loginDataLocalStorage = localStorage.getItem('loginData')
            if (userDataLocalStorage && loginDataLocalStorage) {

                const userData: DataApi = JSON.parse(userDataLocalStorage)
                const loginData: Datalogin = JSON.parse(loginDataLocalStorage)
                const id_hop_dong = userData && userData.id
                const nameArry = loginData && loginData.data.allKhachHD.find((item) => {
                    if (item.id_hop_dong === id_hop_dong) {
                        return item.ten_khach
                    }
                })
                const phoneArry = loginData && loginData.data.allKhachHD.find((item) => {
                    if (item.id_hop_dong === id_hop_dong) {
                        return item.sdt_khach
                    }
                })



                const ma_hop_dong = userData && userData.ma_hop_dong
                const ma_san_pham = userData && userData.phong.ten

                const avatar = userData && userData.phong.avatar
                const phone = phoneArry?.sdt_khach
                const name = nameArry?.ten_khach

                const messageData: MessageFromOther = {
                    message: messages,
                    userId: '0',
                    ma_hop_dong,
                    ma_san_pham,
                    phone,
                    avatar,
                    name: name
                }

                console.log({
                    messages,
                    ma_hop_dong,
                    ma_san_pham,
                    phone,
                    avatar,
                    name
                });

                setMessageList((listMessage) => [...listMessage, messageData]);

                // Gửi tin nhắn qua socket
                await socket.emit("Client-sent-data", messageData);

                // Tin nhắn đã được gửi, không cần giữ lại trong danh sách tạm thời nữa
                setMessageList((listMessage) => listMessage.slice(0, -1));

                // Xóa nội dung tin nhắn sau khi gửi
            }



        }
        setMessage('')
    }

    useEffect(() => {
        const handleServerSentData = (data: MessageFromOther) => {
            setMessageList((listMessage) => [...listMessage, data]);
            console.log("data", data);

        };

        socket.on('Server-sent-data', handleServerSentData);

        return () => {
            socket.off('Server-sent-data', handleServerSentData);
        };
    }, []);



    const chatBodyRef = useRef<HTMLDivElement>(null);



    useEffect(() => {
        chatBodyRef.current?.scrollIntoView()
    }, [messageList]);

    return (
        <div className='chat-container'>
            <div className="chat-wrapp">
                <div className="chat-infoUser">
                    <div className="chat-info--avatar">
                        <Image src={avatar} height={60} width={60} alt='avatar' className='avatar' />
                    </div>
                    <div className="chat-info--content">
                        <div className="chat-info--items">
                            <Typography sx={{ width: '100%', textAlign: "left" }}>Tên: Sang</Typography>

                        </div>
                        <div className="chat-info--items">
                            <Typography sx={{ width: '100%', textAlign: 'left', whiteSpace: 'nowrap' }}>Số đt: 090573485</Typography>

                        </div>
                        <div className="chat-info--items">
                            <Typography sx={{ width: '100%', textAlign: 'left' }}>Phòng: Qx11</Typography>

                        </div>

                    </div>
                </div>
                <div className="chat-content">

                    <div className="chat-header">
                        <CircleIcon className='icon-live' />
                        <span>Live chat</span>
                    </div>
                    <div className="chat-body">
                        {messageList.map((item, index) => {
                            
                            return (
                                item.userId === "0" ?
                                    <div key={index} className="chat-body--message  " >
                                        <span className="text-message you">{item.message}</span>
                                    </div>
                                    :
                                    <div key={index} className="chat-body--message__other " >
                                        <span className="text-message other">{item.message}</span>
                                    </div>
                            )
                        })}





                    </div>
                    <div className="chat-bottom">
                        <button className='btn-img'><ImageIcon className='btn-img--item' /></button>
                        <input type='text' value={messages} className='input-form' onChange={handleChangeMessage} />
                        <SendIcon className='send-icon' onClick={submitMessage} />

                    </div>
                </div>

            </div>

        </div>
    )
}

export default SupportPage