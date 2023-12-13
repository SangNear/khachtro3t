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
import InputComponent from '../textFieldComponent/InputComponent'
import acb from "../../../../public/assets/img/acb.jpg"
import viettin from "../../../../public/assets/img/viettinbank.png"
import sacom from "../../../../public/assets/img/sacombank.png"
import vietcom from "../../../../public/assets/img/vietcombank.png"
import techcombank from "../../../../public/assets/img/techcombank.png"
import zalo from "../../../../public/assets/img/zalopay.png"
import momo from "../../../../public/assets/img/momo.png"
import agribank from "../../../../public/assets/img/agribank.jpg"
interface DialogProblemProps {
    open: boolean
    close: () => void

}

const DialogTransfer = ({ open, close }: DialogProblemProps) => {


    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;

        if (selectedFiles) {
            // Update state to store the selected image
            const fileArray = Array.from(selectedFiles) as File[];
            setSelectedImages(prevImages => [...prevImages, ...fileArray]);
        }
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
                    <Stack spacing={1}>
                        <InputComponent label='Tiền' variant={'outlined'}></InputComponent>
                        <SelectComponent label={'Chọn ngân hàng'} variant={'outlined'} >
                            <MenuItem value='acb' sx={{ display: 'flex', gap: "20px" }}>
                                <Image src={acb} width={70} height={25} alt='acb' />
                                <span>ACB</span>
                            </MenuItem>
                            <MenuItem value='vtb' sx={{ display: 'flex', gap: "20px" }}>
                                <Image src={viettin} width={70} height={25} alt='acb' />
                                <span>Viettinbank</span>
                            </MenuItem>
                            <MenuItem value='vcb' sx={{ display: 'flex', gap: "20px" }}>
                                <Image src={vietcom} width={70} height={25} alt='acb' />
                                <span>Vietcombank</span>
                            </MenuItem>
                            <MenuItem value='agr' sx={{ display: 'flex', gap: "20px" }}>
                                <Image src={agribank} width={70} height={25} alt='acb' />
                                <span>Agribank</span>
                            </MenuItem>
                            <MenuItem value='sa' sx={{ display: 'flex', gap: "20px" }}>
                                <Image src={sacom} width={70} height={25} alt='acb' />
                                <span>Sacombank</span>
                            </MenuItem>
                            <MenuItem value='te' sx={{ display: 'flex', gap: "20px" }}>
                                <Image src={techcombank} width={70} height={25} alt='acb' />
                                <span>Techcombank</span>
                            </MenuItem>
                            <MenuItem value='zalo' sx={{ display: 'flex', gap: "20px" }}>
                                <Image src={zalo} width={70} height={25} alt='acb' />
                                <span>Zalo pay</span>
                            </MenuItem>
                            <MenuItem value='mo' sx={{ display: 'flex', gap: "20px" }}>
                                <Image src={momo} width={70} height={25} alt='acb' />
                                <span>Momo</span>
                            </MenuItem>
                        </SelectComponent>
                        <Typography sx={{ color: "#ccc", fontSize: "14px", textAlign: "center" }}>Vui lòng chọn tài khoản của chủ trọ</Typography>
                    </Stack>
                    <Stack>
                        <textarea className='form-control' placeholder='Ghi chú'></textarea>
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
                    }} variant="contained" autoFocus onClick={close}>
                    Gửi
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogTransfer