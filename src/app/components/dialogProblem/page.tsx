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
interface DialogProblemProps {
    open: boolean
    close: () => void

}

const DialogProblem = ({ open, close }: DialogProblemProps) => {
    const [loaisuco, setLoaisuco] = useState('điện')
    const handleChangeLoaisuco = (event: ChangeEvent<HTMLInputElement>) => {
        setLoaisuco(event.target.value)
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
                height: "100%",
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



    return (
        <Dialog
            onClose={close}
            aria-labelledby="customized-dialog-title"
            open={open}
            sx={styleDialogCustom}
            scroll='body'

        >
            <DialogTitle sx={{ m: 0, padding: " 10px 11px", color: "#fff", background: "#15a35e" }} id="customized-dialog-title">
                BÁO SỰ CỐ
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
                <Stack direction='column' spacing={2}>
                    <Stack>
                        <SelectComponent
                            value={loaisuco}
                            label='Loại sự cố'
                            variant='outlined'
                            onchange={handleChangeLoaisuco}
                        >
                            <MenuItem value={'điện'}>Điện</MenuItem>
                            <MenuItem value={'nước'}>Nước</MenuItem>
                            <MenuItem value={'net'}>Net</MenuItem>
                            <MenuItem value={'khóa'}>Khóa vân tay</MenuItem>
                            <MenuItem value={'máy'}>Máy lạnh/Tủ lạnh</MenuItem>
                            <MenuItem value={'khác'}>Khác</MenuItem>
                        </SelectComponent>
                    </Stack>

                    <Stack>
                        <textarea placeholder='Mô tả sự cố' className='form-control'></textarea>
                    </Stack>

                    <Stack direction={{ xs: 'row', sm: 'row', lg: 'row' }} spacing={2}>

                        <Stack flex={1}>
                            <Typography style={{ whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold', color: '#15a35e' }}>Thời gian bạn có nhà</Typography>
                            <Stack>
                                <FormControlLabel sx={{ color: "black" }} control={<Checkbox sx={{ '&.Mui-checked': { color: '#15a35e' } }} />} label="Buổi sáng" />
                                <FormControlLabel sx={{ color: "black" }} control={<Checkbox sx={{ '&.Mui-checked': { color: '#15a35e' } }} />} label="Buổi trưa" />
                                <FormControlLabel sx={{ color: "black" }} control={<Checkbox sx={{ '&.Mui-checked': { color: '#15a35e' } }} />} label="Buổi chiều" />
                                <FormControlLabel sx={{ color: "black" }} control={<Checkbox sx={{ '&.Mui-checked': { color: '#15a35e' } }} />} label="Buổi tối" />
                            </Stack>
                        </Stack>

                        <Stack flex={1}>
                            <Typography style={{ whiteSpace: 'nowrap', fontSize: '14px', textAlign: 'right', fontWeight: 'bold', color: '#15a35e' }}>Ngày bạn có nhà</Typography>
                            <Stack>
                                <FormControlLabel sx={{ color: "black" }} control={<Checkbox sx={{ '&.Mui-checked': { color: '#15a35e' } }} />} label="Thứ 2" labelPlacement='start' />
                                <FormControlLabel sx={{ color: "black" }} control={<Checkbox sx={{ '&.Mui-checked': { color: '#15a35e' } }} />} label="Thứ 3" labelPlacement='start' />
                                <FormControlLabel sx={{ color: "black" }} control={<Checkbox sx={{ '&.Mui-checked': { color: '#15a35e' } }} />} label="Thứ 4" labelPlacement='start' />
                                <FormControlLabel sx={{ color: "black" }} control={<Checkbox sx={{ '&.Mui-checked': { color: '#15a35e' } }} />} label="Thứ 5" labelPlacement='start' />
                                <FormControlLabel sx={{ color: "black" }} control={<Checkbox sx={{ '&.Mui-checked': { color: '#15a35e' } }} />} label="Thứ 6" labelPlacement='start' />
                                <FormControlLabel sx={{ color: "black" }} control={<Checkbox sx={{ '&.Mui-checked': { color: '#15a35e' } }} />} label="Thứ 7" labelPlacement='start' />
                                <FormControlLabel sx={{ color: "black" }} control={<Checkbox sx={{ '&.Mui-checked': { color: '#15a35e' } }} />} label="Chủ nhật có phụ phí ngoài giờ" labelPlacement='start' style={{ marginLeft: '-109px' }} />
                            </Stack>
                        </Stack>

                    </Stack>

                    <Stack alignItems='center' margin='0'>
                        <input style={input} type='file' id='file' onChange={handleFileChange} />
                        <label style={label} className='label' htmlFor="file"><CameraAltIcon /></label>
                        <Stack direction='row' spacing={2}>
                            {selectedImages.length > 0 ? (
                                selectedImages.map((file, index) => (
                                    <Image key={index} src={URL.createObjectURL(file)} alt={`selected-${index}`} width={80} height={80} style={{ borderRadius: '6px' }} />
                                ))
                            ) : ''}
                        </Stack>

                    </Stack>
                    <Typography sx={{ fontSize: "13px", color: "#a5a5a5" }}>Phí ngoài giờ vui lòng liên hệ hotline 0398.771.881 để biết thêm chi tiết</Typography>
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
                    Báo
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogProblem