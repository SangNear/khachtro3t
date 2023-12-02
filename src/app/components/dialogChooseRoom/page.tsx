"use client"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import React, { ChangeEvent, ReactNode, useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'
import SelectComponent from '../textFieldComponent/SelectComponent'
import MenuItem from '@mui/material/MenuItem'
import { Checkbox, Divider, FormControlLabel, Typography } from '@mui/material'
import Image from 'next/image'
import img from "../../../../public/assets/img/5.jpg"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import "./page.scss"
import { DataApi } from '@/app/api/login'
interface DialogChooseRoomProps {
    open: boolean
    close: () => void
    apiRoom: DataApi[]
}

const DialogChooseRoom = ({ open, close, apiRoom }: DialogChooseRoomProps) => {
    const [data, setData] = useState<DataApi>()
    const handleChooseRoom = (item: DataApi) => {
        setData(item);


    }
    
    

    if (data != undefined) {
        localStorage.setItem("userData", JSON.stringify(data));
        console.log('data from choose', data);
        window.location.href = "/";
    }



    const styleDialogCustom = {
        padding: '5px',
        '.MuiDialog-container': {
            height: "100%"
        },
        '.MuiPaper-root ': {
            borderRadius: "6px",
            margin: "0",
            maxWidth: "360px !important",
            minWidth: '350px',

            "@media (max-width: 783px)": {
                minWidth: '320px',
                maxWidth: '100%',
            }
        }
    }


    const styleBtn = {
        backgroundColor: "#15a35e",
        width: "max-content",
        '&:hover': {
            backgroundColor: "#067f44"
        }
    }




    return (
        <Dialog
            onClose={close}
            aria-labelledby="customized-dialog-title"
            open={open}
            sx={styleDialogCustom}
            scroll='body'

        >
            <DialogTitle sx={{ m: 0, padding: " 10px 11px", color: "#fff", background: "#15a35e" }} id="customized-dialog-title">
                Chọn sản phẩm
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={close}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: '#fff'
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Stack spacing={2}>
                    <Stack>
                        <Typography sx={{ fontSize: "16px", textAlign: "center" }}>Vui lòng chọn sản phẩm</Typography>
                    </Stack>
                    {apiRoom && apiRoom.map((item) => {
                        return (
                            <Stack key={item.id} alignItems='center' justifyContent='center'>
                                <Button variant='contained' sx={styleBtn} onClick={() => handleChooseRoom(item)}>
                                    <Stack  padding="5px">
                                        {/* <Typography sx={{ textAlign: "center", fontSize: "12px" }}>loại hợp đồng: {item.tinh_trang_hop_dong}</Typography> */}
                                        <Typography sx={{ textAlign: "center", fontSize: "16px", fontWeight: "bold" }}>{item.phong.loai} - {item.phong.ten}</Typography>
                                        <Typography sx={{ textAlign: "center", fontSize: "12px" }}>Địa chỉ: {item.phong.nha.dia_chi}</Typography>
                                    </Stack>
                                </Button>
                            </Stack>
                        )
                    })}


                </Stack>


            </DialogContent>

        </Dialog>
    )
}

export default DialogChooseRoom