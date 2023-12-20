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
import { Checkbox, Divider, FormControlLabel, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import img from "../../../../public/assets/img/5.jpg"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import "./page.scss"
import InputComponent from '../textFieldComponent/InputComponent'
import acb from "../../../../public/assets/img/acb.jpg"
import viettin from "../../../../public/assets/img/viettinbank.png"
import sacom from "../../../../public/assets/img/sacombank.png"
import vietcom from "../../../../public/assets/img/vietcombank.png"
import techcombank from "../../../../public/assets/img/techcombank.png"
import zalo from "../../../../public/assets/img/zalopay.png"
import momo from "../../../../public/assets/img/momo.png"
import agribank from "../../../../public/assets/img/agribank.jpg"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
interface DialogProblemProps {
    open: boolean
    close: () => void
    id_hop_dong?: number
    sdt_khach: string
}

const DialogTransfer = ({ open, close, id_hop_dong, sdt_khach }: DialogProblemProps) => {

    const [so_tien, setMoney] = useState("")
    const [id_hoa_don, setIdHoadon] = useState(0)
    const [ghi_chu, setGhichu] = useState('')
    const [hinh_thuc, setHinhthuc] = useState('')
    const handleChangeNote = (event: ChangeEvent<HTMLInputElement>) => {
        setGhichu(event.target.value as string)
    }
    const handleChangeBank = (event: ChangeEvent<HTMLInputElement>) => {
        setHinhthuc(event.target.value as string)
    }
    // const [all_hinh_cong_viec_base64, sethinhconviec] = useState<string[] | string>()

    const handleChangeMoney = (event: ChangeEvent<HTMLInputElement>) => {
        setMoney(event.target.value)
    }


    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;

        if (selectedFiles) {
            // Update state to store the selected image
            const fileArray = Array.from(selectedFiles) as File[];
            setSelectedImages(prevImages => [...prevImages, ...fileArray]);
        }

    };
    const fileToBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result as string);
            };

            reader.onerror = (error) => {
                reject(error);
            };


        });
    };



    const handleSubmit = async () => {
        const base64String = await fileToBase64(selectedImages[0]);
        const all_hinh_cong_viec_base64 = base64String.split(' ')
        try {
            const response = await fetch('https://ad.tro4u.com/api/version/1.0/hoadon/save-thanh-toan?', {
                method: "POST",
                body: JSON.stringify({
                    id_hop_dong,
                    id_hoa_don,
                    hinh_thuc,
                    so_tien,
                    ghi_chu,
                    sdt_khach,
                    all_hinh_cong_viec_base64
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = response.json()
            console.log("data chuyển khoản", data);

        } catch (error) {

        }

        // console.log({
        //     id_hop_dong,
        //     id_hoa_don,
        //     so_tien,
        //     sdt_khach,
        //     all_hinh_cong_viec_base64
        // });
        // close()
    }

    const textfield = {
        // maxHeight: "30px",
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#15a35e',
        },
        '.MuiSelect-select': {

            color: "#15a35e"
        },

        '.MuiInputBase-root': {
            height: "100px"
        },
        '.MuiSvgIcon-root ': {
            fill: "black !important",
        },
        '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: "#15a35e"
        },
        ".css-x2l1vy-MuiInputBase-root-MuiOutlinedInput-root": {
            color: "#ccc",
        },


        "& .MuiFormLabel-root": {
            color: "#cfcfcf",


        },
        '.MuiInputLabel-outlined.Mui-focused': {

            color: "#15a35e",

        },
        '&.Mui-focused': {
            color: '#15a35e', // Màu khi textfield được focus
            borderColor: '#15a35e !important', // Màu viền khi textfield được focus
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#15a35e !important', // Màu viền khi textfield được hover
        },
        background: "#fff",

    };
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

                maxWidth: '100%',
            }
        }
    }

    const styleDialogAction = {
        backgroundColor: "#ccc",

        "@media (max-width: 783px)": {
            padding: "8px 20px"
        }

    };
    const btnText = {
        border: 'none',
        color: "#333",
        textTranform: "none",
        '&:hover': {
            backgroundColor: "unset",
            color: "#15a35e"
        }
    }
    const input = {
        display: 'none'
    }
    const label = {
        height: '80px',
        width: '80px',
        borderRadius: "6px",
        border: "1px dashed #999",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: "pointer",
        color: "#15a35e",
        marginBottom: '5px',
        '&:hover': {
            color: "#15a35e",
            border: "1px dashed #15a35e",
        }
    }

    const dialogContent = {
        padding: '16px 10px'
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
                Báo chuyển khoản
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
            <DialogContent sx={dialogContent} dividers>
                <Stack>
                    <Stack>
                        <Typography sx={{ color: "#15a35e", fontSize: "18px", fontWeight: "600", textAlign: "center" }}>QX11</Typography>
                    </Stack>

                    <Stack spacing={1} marginTop='10px'>

                        <div className='input-container'>
                            <span className='input-label--span'>Tiền chuyển khoản</span>
                            <Stack direction='row' alignItems='center' gap={1}>
                                <div>
                                    <AttachMoneyIcon sx={{ color: "#15a35e" }} />
                                </div>

                                <InputComponent label='Nhập số tiền' variant={'outlined'} onchange={handleChangeMoney} />
                            </Stack>

                        </div>


                        <div className='input-container'>
                            <span className='input-label--span'>Chọn ngân hàng</span>
                            <Stack direction='row' alignItems='center' gap={1}>
                                <div>
                                    <CurrencyExchangeIcon sx={{ color: "#15a35e" }} />
                                </div>
                                <SelectComponent label={'Ngân hàng'} variant={'outlined'} onchange={handleChangeBank} value={hinh_thuc} >
                                    <MenuItem value='ACB' sx={{ display: 'flex', gap: "20px" }}>
                                        <Image src={acb} width={70} height={25} alt='acb' />
                                        <span>ACB</span>
                                    </MenuItem>
                                    <MenuItem value='Vietinbank' sx={{ display: 'flex', gap: "20px" }}>
                                        <Image src={viettin} width={70} height={25} alt='acb' />
                                        <span>Viettinbank</span>
                                    </MenuItem>
                                    <MenuItem value='Vietcombank' sx={{ display: 'flex', gap: "20px" }}>
                                        <Image src={vietcom} width={70} height={25} alt='acb' />
                                        <span>Vietcombank</span>
                                    </MenuItem>
                                    <MenuItem value='Agribank' sx={{ display: 'flex', gap: "20px" }}>
                                        <Image src={agribank} width={70} height={25} alt='acb' />
                                        <span>Agribank</span>
                                    </MenuItem>
                                    <MenuItem value='Sacombank' sx={{ display: 'flex', gap: "20px" }}>
                                        <Image src={sacom} width={70} height={25} alt='acb' />
                                        <span>Sacombank</span>
                                    </MenuItem>
                                    <MenuItem value='Techcombank' sx={{ display: 'flex', gap: "20px" }}>
                                        <Image src={techcombank} width={70} height={25} alt='acb' />
                                        <span>Techcombank</span>
                                    </MenuItem>
                                    <MenuItem value='Zalopay' sx={{ display: 'flex', gap: "20px" }}>
                                        <Image src={zalo} width={70} height={25} alt='acb' />
                                        <span>Zalo pay</span>
                                    </MenuItem>
                                    <MenuItem value='Momo' sx={{ display: 'flex', gap: "20px" }}>
                                        <Image src={momo} width={70} height={25} alt='acb' />
                                        <span>Momo</span>
                                    </MenuItem>
                                </SelectComponent>
                            </Stack>
                            <Typography sx={{ color: "#ccc", fontSize: "14px", textAlign: "center" }}>Vui lòng chọn tài khoản của chủ trọ</Typography>
                        </div>


                    </Stack>
                    <Stack>
                        <div className='input-container'>
                            <span className='input-label--span'>Ghi chú</span>
                            <Stack direction='row' alignItems='center' gap={1}>
                                <div>
                                    <AttachMoneyIcon sx={{ color: "#15a35e" }} />
                                </div>

                                <TextField onChange={handleChangeNote} fullWidth label='Ghi chú' variant={'outlined'} multiline sx={textfield} />
                            </Stack>

                        </div>
                    </Stack>
                    <Stack alignItems='center' spacing={2}>
                        <input style={input} type='file' id='file' onChange={handleFileChange} />

                        <Stack direction='row' spacing={2} marginTop="10px">

                            {selectedImages.length > 0 ? (
                                selectedImages.map((file, index) => (
                                    <Image key={index} src={URL.createObjectURL(file)} alt={`selected-${index}`} width={80} height={80} style={{ borderRadius: '6px' }} />
                                ))
                            ) : <label style={label} className='label' htmlFor="file"><CameraAltIcon /></label>}



                        </Stack>
                        <Stack>
                            <Typography sx={{ color: "#ccc", fontSize: "14px", textAlign: "center", fontStyle: "italic" }}>Kèm hình chuyển khoản - tối đa 1 tấm hình</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </DialogContent>

            <DialogActions sx={styleDialogAction}>
                <Button

                    sx={btnText}
                    variant="text" autoFocus onClick={close}>
                    Đóng
                </Button>

                <Button
                    style={{
                        background: "#15a35e"
                    }} variant="contained" autoFocus onClick={handleSubmit}>
                    Gửi
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogTransfer