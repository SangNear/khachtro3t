"use client"
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import React, { ChangeEvent, ReactNode, useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AnchorIcon from '@mui/icons-material/Anchor';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import PedalBikeOutlinedIcon from '@mui/icons-material/PedalBikeOutlined';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import "./page.scss"
import { Divider } from '@mui/material'
import { HoaDon, HoadonThu, ThangData } from '@/app/api/hoadon'
interface DialogPayedProps {
    open: boolean
    close: () => void
    dataBill: ThangData | undefined

}

const DialogPayed = ({ open, close, dataBill }: DialogPayedProps) => {



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
                width: "100%",
                minWidth: '320px',
                maxWidth: '100%',
            }
        }
    }

    const styleDialogAction = {
        backgroundColor: "#ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "@media (max-width: 783px)": {
            padding: "8px 20px"
        }

    };
    const btnText = {
        border: 'none',
        color: "#333",
        textTranform: "none",
        backgroundColor: "#ccc",
        '&:hover': {
            backgroundColor: "unset",
            color: "#15a35e"
        }
    }


    const dialogContent = {
        padding: "16px 10px"
    }
    const formatNumber = (num: number): string => {
        return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    const convertDateFormat = (inputString: string) => {

        const dateObject = new Date(inputString);

        // Lấy thông tin ngày, tháng, năm
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1; // Tháng trong JavaScript đếm từ 0 đến 11
        const year = dateObject.getFullYear();

        // Định dạng lại thành chuỗi 'dd/mm/yy'
        const formattedDateString = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;

        return formattedDateString;
    }


    

    const tiencanthanhtoan = dataBill && dataBill.tong_tien ? dataBill.tong_tien : 0

    const tinhtongtienconlai = (sumcost: number, sumcostPayed: HoadonThu[]) => {
        const sumcostPayedResult = sumcostPayed.reduce((accur, curr) => {
            return accur + curr.tong_tien
        }, 0)
        console.log("tổng tiền đã thanh toán", sumcostPayedResult);
        console.log("tổng tiền cần thanh toán", sumcost);
        const result = sumcost - sumcostPayedResult
        return result
    }
    const tongtienconlai = dataBill && dataBill.hoa_don_thu && tinhtongtienconlai(dataBill.tong_tien, dataBill.hoa_don_thu) ? tinhtongtienconlai(dataBill.tong_tien, dataBill.hoa_don_thu) : 0

    return (
        <Dialog
            onClose={close}
            aria-labelledby="customized-dialog-title"
            open={open}
            sx={styleDialogCustom}
            scroll='body'

        >
            <DialogTitle sx={{ m: 0, padding: " 10px 11px", color: "#fff", background: "#15a35e" }} id="customized-dialog-title">
                Tiền đã thanh toán qxxxx
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
                    <Stack direction='row' justifyContent='space-between' sx={{ backgroundColor: '#f4f5fa', padding: '10px', borderRadius: '4px' }}>
                        <Typography sx={{ fontStyle: 'italic' }}>Tiền cần thanh toán</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>{formatNumber(tiencanthanhtoan)}</Typography>
                    </Stack>


                    {dataBill && dataBill.hoa_don_thu.length > 0 ? dataBill.hoa_don_thu.map((item => {
                        return (
                            <Stack key={item.id} direction='row' width='100%' sx={{ padding: '10px', backgroundColor: '#15a35e', borderRadius: '4px' }} >
                                <Stack direction='column' justifyContent='space-between' width='100%'>
                                    <Typography sx={{ color: '#fff', }}>Hình thức: <span style={{ fontWeight: 'bold' }}>{item.hinh_thuc}</span> </Typography>
                                    <Typography sx={{ color: '#fff', fontWeight: 'bold' }}> 20/11/23</Typography>
                                </Stack>
                                <Stack direction='column' justifyContent='space-between' width='100%'>
                                    <Typography sx={{ color: '#fff', textAlign: 'right', fontWeight: 'bold' }}>{formatNumber(item.tong_tien)}</Typography>
                                    <Typography sx={{ color: '#fff', textAlign: 'right', fontWeight: 'bold', fontStyle: 'italic' }}>{item.tinh_trang_thu}</Typography>
                                </Stack>
                            </Stack>
                        )
                    })) : ''}


                    <Stack direction='row' justifyContent='space-between' sx={{ backgroundColor: '#f4f5fa', padding: '10px', borderRadius: '4px' }}>
                        <Typography sx={{ fontStyle: 'italic' }}>Số tiền còn lại:</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>{formatNumber(tongtienconlai)}</Typography>
                    </Stack>
                </Stack>
            </DialogContent>

            <DialogActions sx={styleDialogAction}>
                <Button

                    sx={btnText}
                    variant="text" onClick={close}>
                    Đóng
                </Button>


            </DialogActions>
        </Dialog>
    )
}

export default DialogPayed