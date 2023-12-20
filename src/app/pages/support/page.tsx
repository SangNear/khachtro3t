"use client"
import React, { ChangeEvent, useState } from 'react'
import "./page.scss"
import Image from 'next/image'
import avatar from "../../../../public/assets/img/1.png"
import { Button, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';
import SendIcon from '@mui/icons-material/Send';
import InputComponent from '@/app/components/textFieldComponent/InputComponent'
import ImageIcon from '@mui/icons-material/Image';
import io from "socket.io-client"
const SupportPage = () => {
    const [message, setMessage] = useState("")
    const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value)
    }
    console.log("message: >>>>", message);

    var socket = io('https://cho4u.xyz:3000');
    console.log(socket);


    const submitMessage = () => {
        socket.emit("Client-sent-data", {
            message: message,
            userId: 232
        })


    }



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
                    <div className="chat-body"></div>
                    <div className="chat-bottom">
                        <button className='btn-img'><ImageIcon className='btn-img--item' /></button>
                        <input type='text' className='input-form' onChange={handleChangeMessage} />
                        <SendIcon className='send-icon' onClick={submitMessage} />

                    </div>
                </div>

            </div>

        </div>
    )
}

export default SupportPage