"use client"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import React, { ChangeEvent, ReactNode, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'
import SelectComponent from '../textFieldComponent/SelectComponent'
import MenuItem from '@mui/material/MenuItem'
import { Checkbox, Divider, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import img from "../../../../public/assets/img/5.jpg"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import "./page.scss"
import InputComponent from '../textFieldComponent/InputComponent'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers'
interface DialogProblemProps {
    open: boolean
    close: () => void
    id_hop_dong: number
    id_hoa_don?: number
}

const DialogTransferPointment = ({ open, close, id_hop_dong, id_hoa_don }: DialogProblemProps) => {
    const [id_hen_tt, sethenthanhtoan] = useState(0)
    const [thoi_gian, setGiotrongngay] = useState<string[]>([]);
    const [ghi_chu, setGhichu] = useState('')
    const [ngay_thu, setNgaythu] = React.useState('');
    const [hinh_thuc_radio, setHinhthuc] = useState('')
    const handleChangeNote = (event: ChangeEvent<HTMLInputElement>) => {
        setGhichu(event.target.value as string)
    }

    const handleCheckboxChange = (value: string) => {
        const updatedCheckedItems = [...thoi_gian];

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







    const handleChangeHinhThuc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHinhthuc((event.target as HTMLInputElement).value);
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


    const dialogContent = {
        padding: '16px 5px',
        overflowX: 'hidden'
    }

    const nowrap = {
        whiteSpace: 'nowrap',

    }
    const styleDate = {

        '&.Mui-focused': {
            color: '#15a35e', // Thay đổi màu khi tập trung
        },
        backgroundColor: "#fff",
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#15a35e',
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#15a35e',
        },
        '.MuiSvgIcon-root ': {
            fill: "#15a35e !important",
            fontSize: "30px"
        },

        '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: "#15a35e"
        },
        ".css-x2l1vy-MuiInputBase-root-MuiOutlinedInput-root": {
            color: "#ccc",
        },
        '.MuiInputLabel-outlined.Mui-focused': {
            color: "#15a35e"
        },



        width: "100%"
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

    const handleSubmit = () => {
        console.log(typeof(thoi_gian));
        
        // console.log({
        //     id_hop_dong,
        //     id_hoa_don,
        //     id_hen_tt,
        //     ghi_chu,
        //     thoi_gian,
        //     hinh_thuc_radio,
        //     ngay_thu

        // });

    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog
                onClose={close}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={styleDialogCustom}
                scroll='body'

            >
                <DialogTitle sx={{ m: 0, padding: " 10px 11px", color: "#fff", background: "#15a35e" }} id="customized-dialog-title">
                    Hẹn thanh toán
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

                    <Stack spacing={1}>
                        <Stack spacing={1}>
                            <Stack direction='row'>
                                <Stack flex={1} >
                                    <Typography style={{ whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold', color: '#15a35e', textAlign: 'center' }}>Thời gian bạn có nhà</Typography>
                                    <FormControlLabel sx={nowrap} control={
                                        <Checkbox
                                            checked={thoi_gian.includes('sáng')}
                                            onChange={() => handleCheckboxChange('sáng')}
                                            sx={{ '&.Mui-checked': { color: '#15a35e' } }}
                                        />
                                    } label="Sáng (trước 11h)" />

                                    <FormControlLabel sx={nowrap} control={
                                        <Checkbox
                                            checked={thoi_gian.includes('trưa')}
                                            onChange={() => handleCheckboxChange('trưa')}
                                            sx={{ '&.Mui-checked': { color: '#15a35e' } }}
                                        />
                                    } label="Trưa (11h - 15h)" />

                                    <FormControlLabel sx={nowrap} control={
                                        <Checkbox
                                            checked={thoi_gian.includes('chiều')}
                                            onChange={() => handleCheckboxChange('chiều')}
                                            sx={{ '&.Mui-checked': { color: '#15a35e' } }}
                                        />
                                    } label="Chiều (15h - 19h)" />

                                    <FormControlLabel sx={nowrap} control={
                                        <Checkbox
                                            checked={thoi_gian.includes('tối')}
                                            onChange={() => handleCheckboxChange('tối')}
                                            sx={{ '&.Mui-checked': { color: '#15a35e' } }}
                                        />
                                    } label="Tối (Sau 19h)" />

                                </Stack>
                                <Divider orientation="vertical" flexItem />
                                <Stack flex={1} sx={{ width: '100%' }}>
                                    <Typography style={{ whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold', color: '#15a35e', textAlign: 'center' }}>Hình thức</Typography>
                                    <FormControl>

                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={hinh_thuc_radio}
                                            onChange={handleChangeHinhThuc}
                                        >
                                            <FormControlLabel sx={{ marginLeft: '2px', ...nowrap }} labelPlacement="end" value="TM" control={<Radio color='success' />} label="Tiền mặt" />
                                            <FormControlLabel sx={{ marginLeft: '2px', ...nowrap }} labelPlacement="end" value="CK" control={<Radio color='success' />} label="Chuyển khoản" />
                                        </RadioGroup>
                                    </FormControl>





                                </Stack>
                            </Stack>


                            <Stack spacing={1} >

                                <DatePicker sx={styleDate} onChange={(newvalue) => setNgaythu(newvalue as string)} />
                            </Stack>

                            <Stack>
                                <TextField onChange={handleChangeNote} fullWidth label='Ghi chú' variant={'outlined'} multiline sx={textfield} />
                            </Stack>
                        </Stack>

                        <Stack sx={{ backgroundColor: '#ccc', padding: '10px', borderRadius: '6px' }}>
                            <Typography sx={{ fontStyle: 'italic' }}>Bạn vui lòng chọn thời gian phù hợp để nhân viên sắp xếp đến thu tiền trực tiếp.</Typography>
                            <Typography sx={{ fontStyle: 'italic' }}>Lưu ý: phụ phí thu tiền mặt là <span style={{ color: 'red' }}>10.000đ/lần.</span> </Typography>
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
        </LocalizationProvider>

    )
}

export default DialogTransferPointment