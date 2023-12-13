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
import { SubmitSucoReponse } from '@/app/api/submitSuco'

interface DialogProblemProps {
    open: boolean
    close: () => void
    id_hop_dong?: number
    sdt_khach?: string
}

const DialogProblem = ({ open, close, id_hop_dong, sdt_khach }: DialogProblemProps) => {

    const [clicked, setClicked] = useState(true)
    const [nhom, setLoaisuco] = useState('')
    const handleChangeLoaisuco = (event: ChangeEvent<HTMLInputElement>) => {
        setLoaisuco(event.target.value)
    }

    const [all_hinh_cong_viec_base64, setSelectedImages] = useState<File[]>([]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;

        if (selectedFiles) {
            // Update state to store the selected image
            const fileArray = Array.from(selectedFiles) as File[];
            setSelectedImages(prevImages => [...prevImages, ...fileArray]);
        }
    };

    const [mo_ta, setMota] = useState('')
    const handleChangeMota = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (event && event.target) {
            setMota(event.target.value);
        }
    }

    const [thoi_gian_co_nha, setGiotrongngay] = useState<string[]>([]);

    const handleCheckboxChange = (value: string) => {
        const updatedCheckedItems = [...thoi_gian_co_nha];

        if (updatedCheckedItems.includes(value)) {
            // If the value is already in the array, remove it
            const index = updatedCheckedItems.indexOf(value);
            updatedCheckedItems.splice(index, 1);
        } else {
            // If the value is not in the array, add it
            updatedCheckedItems.push(value);
        }

        setGiotrongngay(updatedCheckedItems);
    };


    const [ngay_co_nha, setNgaytrongtuan] = useState<string[]>([]);

    const handleNgayTrongTuanChange = (value: string) => {
        const updatedCheckedItems = [...ngay_co_nha];

        if (updatedCheckedItems.includes(value)) {
            // If the value is already in the array, remove it
            const index = updatedCheckedItems.indexOf(value);
            updatedCheckedItems.splice(index, 1);
        } else {
            // If the value is not in the array, add it
            updatedCheckedItems.push(value);
        }

        setNgaytrongtuan(updatedCheckedItems);
    };



    const handleSubmitProlem = async () => {
        setClicked(!clicked)
        try {
            const reponse = await fetch('https://ad.tro4u.com/api/version/1.0/congviec2/bao-su-co', {
                method: "POST",
                body: JSON.stringify({
                    id_hop_dong,
                    sdt_khach,
                    thoi_gian_co_nha,
                    ngay_co_nha,
                    mo_ta,
                    nhom,
                    all_hinh_cong_viec_base64
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const reponseSucoSubmit: SubmitSucoReponse = await reponse.json()
            console.log("reponsse", reponseSucoSubmit);
            window.location.reload();
            window.location.href = "/pages/problem";

        } catch (error) {
            close()
        }

        console.log({
            id_hop_dong,
            sdt_khach,
            thoi_gian_co_nha,
            ngay_co_nha,
            mo_ta,
            nhom,
            all_hinh_cong_viec_base64
        });
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

            <DialogTitle  sx={{ m: 0, padding: " 10px 11px", color: "#fff", background: "#15a35e" }} id="customized-dialog-title">
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
                    <Stack >
                        <SelectComponent
                            value={nhom}
                            label='Loại sự cố'
                            variant='outlined'
                            
                            onchange={handleChangeLoaisuco}
                        >
                            <MenuItem value={'dien'}>Điện</MenuItem>
                            <MenuItem value={'nuoc'}>Nước</MenuItem>
                            <MenuItem value={'net'}>Net</MenuItem>
                            <MenuItem value={'khoa_van_tay'}>Khóa vân tay</MenuItem>
                            <MenuItem value={'may_lanh_tu_lanh'}>Máy lạnh/Tủ lạnh</MenuItem>
                            <MenuItem value={'khac'}>Khác</MenuItem>
                        </SelectComponent>
                    </Stack>

                    <Stack>
                        <textarea onChange={handleChangeMota} placeholder='Mô tả sự cố' className='form-control'></textarea>
                    </Stack>

                    <Stack direction={{ xs: 'row', sm: 'row', lg: 'row' }} spacing={2}>

                        <Stack flex={1}>
                            <Typography style={{ whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold', color: '#15a35e' }}>Thời gian bạn có nhà</Typography>
                            <Stack>
                                <FormControlLabel sx={{ color: "black" }} control={
                                    <Checkbox
                                        checked={thoi_gian_co_nha.includes('Buổi sáng')}
                                        onChange={() => handleCheckboxChange('Buổi sáng')}
                                        sx={{ '&.Mui-checked': { color: '#15a35e' } }}
                                    />
                                } label="Buổi sáng" />
                                <FormControlLabel sx={{ color: "black" }} control={
                                    <Checkbox
                                        checked={thoi_gian_co_nha.includes('Buổi trưa')}
                                        onChange={() => handleCheckboxChange('Buổi trưa')}
                                        sx={{ '&.Mui-checked': { color: '#15a35e' } }}
                                    />
                                } label="Buổi trưa" />
                                <FormControlLabel sx={{ color: "black" }} control={
                                    <Checkbox
                                        checked={thoi_gian_co_nha.includes('Buổi chiều')}
                                        onChange={() => handleCheckboxChange('Buổi chiều')}
                                        sx={{ '&.Mui-checked': { color: '#15a35e' } }}
                                    />
                                } label="Buổi chiều" />
                                <FormControlLabel sx={{ color: "black" }} control={
                                    <Checkbox
                                        checked={thoi_gian_co_nha.includes('Buổi tối')}
                                        onChange={() => handleCheckboxChange('Buổi tối')}
                                        sx={{ '&.Mui-checked': { color: '#15a35e' } }}
                                    />
                                } label="Buổi tối" />
                            </Stack>
                        </Stack>

                        <Stack flex={1}>
                            <Typography style={{ whiteSpace: 'nowrap', fontSize: '14px', textAlign: 'right', fontWeight: 'bold', color: '#15a35e' }}>Ngày bạn có nhà</Typography>
                            <Stack>
                                <FormControlLabel sx={{ color: "black" }} control={
                                    <Checkbox
                                        checked={ngay_co_nha.includes('Thứ 2')}
                                        onChange={() => handleNgayTrongTuanChange('Thứ 2')}
                                        sx={{ '&.Mui-checked': { color: '#15a35e' } }}
                                    />
                                } label="Thứ 2" labelPlacement='start' />
                                <FormControlLabel sx={{ color: "black" }} control={
                                    <Checkbox
                                        checked={ngay_co_nha.includes('Thứ 3')}
                                        onChange={() => handleNgayTrongTuanChange('Thứ 3')}
                                        sx={{ '&.Mui-checked': { color: '#15a35e' } }}
                                    />
                                } label="Thứ 3" labelPlacement='start' />
                                <FormControlLabel sx={{ color: "black" }} control={
                                    <Checkbox
                                        checked={ngay_co_nha.includes('Thứ 4')}
                                        onChange={() => handleNgayTrongTuanChange('Thứ 4')}
                                        sx={{ '&.Mui-checked': { color: '#15a35e' } }}
                                    />
                                } label="Thứ 4" labelPlacement='start' />
                                <FormControlLabel sx={{ color: "black" }} control={
                                    <Checkbox
                                        checked={ngay_co_nha.includes('Thứ 5')}
                                        onChange={() => handleNgayTrongTuanChange('Thứ 5')}
                                        sx={{ '&.Mui-checked': { color: '#15a35e' } }}
                                    />
                                } label="Thứ 5" labelPlacement='start' />
                                <FormControlLabel sx={{ color: "black" }} control={
                                    <Checkbox
                                        checked={ngay_co_nha.includes('Thứ 6')}
                                        onChange={() => handleNgayTrongTuanChange('Thứ 6')}
                                        sx={{ '&.Mui-checked': { color: '#15a35e' } }}
                                    />
                                } label="Thứ 6" labelPlacement='start' />
                                <FormControlLabel sx={{ color: "black" }} control={
                                    <Checkbox
                                        checked={ngay_co_nha.includes('Thứ 7')}
                                        onChange={() => handleNgayTrongTuanChange('Thứ 7')}
                                        sx={{ '&.Mui-checked': { color: '#15a35e' } }}
                                    />
                                } label="Thứ 7" labelPlacement='start' />
                                <FormControlLabel sx={{ color: "black" }} control={
                                    <Checkbox
                                        checked={ngay_co_nha.includes('Chủ nhật')}
                                        onChange={() => handleNgayTrongTuanChange('Chủ nhật')}
                                        sx={{ '&.Mui-checked': { color: '#15a35e' } }}
                                    />
                                } label="Chủ nhật có phụ phí ngoài giờ" labelPlacement='start' style={{ marginLeft: '-109px' }} />
                            </Stack>
                        </Stack>

                    </Stack>

                    <Stack alignItems='center' margin='0'>
                        <input style={input} type='file' id='file' onChange={handleFileChange} />
                        <label style={label} className='label' htmlFor="file"><CameraAltIcon /></label>
                        <Stack direction='row' spacing={2}>
                            {all_hinh_cong_viec_base64.length > 0 ? (
                                all_hinh_cong_viec_base64.map((file, index) => (
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
                {clicked ?
                    <Button
                        style={{
                            background: "#15a35e"
                        }} variant="contained"
                        
                        onClick={handleSubmitProlem}

                    >
                        Báo
                    </Button>
                    :
                    <Button
                        style={{
                            background: "#ccc",
                            border: '1px solid #bababa',
                            color: 'rgb(112 110 110 / 26%)'
                        }} variant="contained"
                        
                        onClick={handleSubmitProlem}
                        disabled
                    >
                        Báo
                    </Button>
                }




            </DialogActions>
        </Dialog>
    )
}

export default DialogProblem