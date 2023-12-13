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
import "./page.scss"
import { Divider } from '@mui/material'
import { HoaDon, ThangData } from '@/app/api/hoadon'
interface DialogProblemProps {
    open: boolean
    close: () => void
    dataBill: ThangData | undefined
    giathue: number
}

const DialogBill = ({ open, close, dataBill, giathue }: DialogProblemProps) => {



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
    const tiencoc = dataBill && dataBill.hoa_don_coc.length > 0 ? dataBill.hoa_don_coc[0].tong_tien : 0
    const tienthue = giathue
    const tiennet = dataBill && dataBill.hoa_don_thang.length > 0 ? dataBill.hoa_don_thang[0].thanh_tien_net : 0
    const tiendien = dataBill && dataBill.hoa_don_dien_nuoc.length > 0 ? dataBill && dataBill.hoa_don_dien_nuoc[0].thanh_tien_dien + dataBill.hoa_don_dien_nuoc[0].thanh_tien_dien_1 : 0
    const tiennuoc = dataBill && dataBill.hoa_don_dien_nuoc.length > 0 ? dataBill && dataBill.hoa_don_dien_nuoc[0].thanh_tien_nuoc + dataBill.hoa_don_dien_nuoc[0].thanh_tien_nuoc_1 : 0
    const tiennuockhoan = dataBill && dataBill.hoa_don_thang.length > 0 ? dataBill.hoa_don_thang[0].thanh_tien_nuoc + dataBill.hoa_don_thang[0].thanh_tien_nuoc_1 : 0
    const tienxe = dataBill && dataBill.hoa_don_thang.length > 0 ? dataBill.hoa_don_thang[0].thanh_tien_xe : 0
    const tienrac = dataBill && dataBill.hoa_don_thang.length > 0 ? dataBill.hoa_don_thang[0].thanh_tien_rac : 0
    const tongtien = tienthue + tiennet + tiendien + tiennuoc + tiennuockhoan + tienxe + tienrac
    const tienphat = dataBill && dataBill.hoa_don_phat ? dataBill.hoa_don_phat : 0
    const tiendichvu = dataBill && dataBill.hoa_don_khac.length > 0 ? dataBill.hoa_don_khac[0].tong_tien : 0
    const tienkhuyenmai = dataBill && dataBill.hoa_don_km.length > 0 ? dataBill.hoa_don_km[0].tong_tien : 0
    const tongtiencanthanhtoan = dataBill && dataBill.tong_tien ? dataBill.tong_tien : 0
    return (
        <Dialog
            onClose={close}
            aria-labelledby="customized-dialog-title"
            open={open}
            sx={styleDialogCustom}
            scroll='body'

        >
            <DialogTitle sx={{ m: 0, padding: " 10px 11px", color: "#fff", background: "#15a35e" }} id="customized-dialog-title">
                Hóa đơn
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
                <Stack spacing={2}>
                    <Stack direction="column" alignItems="center" justifyContent="center">
                        <Typography sx={{ textTransform: "capitalize", color: "#a9a9a9", fontWeight: "600" }}>Hóa đơn </Typography>
                        <Typography sx={{ color: "#a9a9a9" }}>Từ  {dataBill && convertDateFormat(dataBill.hoa_don_thang[0].tu_ngay)}  {dataBill && dataBill.hoa_don_thang[0].den_ngay ? `đến ngày ${convertDateFormat(dataBill.hoa_don_thang[0].den_ngay)}` : ''}</Typography>
                    </Stack>

                    <Stack>



                        <Stack direction='column' gap="15px" alignItems='center' marginTop='0 !important'>

                            <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='row' gap="10px">
                                    <AnchorIcon />
                                    <Typography>Cọc</Typography>

                                </Stack>
                                <Stack>
                                    <Typography>{formatNumber(tiencoc)}</Typography>
                                </Stack>
                            </Stack>

                            <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='row' gap="10px">
                                    <HomeOutlinedIcon />
                                    <Typography>Thuê</Typography>

                                </Stack>
                                <Stack>
                                    <Typography>{formatNumber(tienthue)}</Typography>
                                </Stack>
                            </Stack>
                            {dataBill && dataBill.hoa_don_dien_nuoc.length > 0 ?
                                <>
                                    <Stack direction='row' justifyContent='space-between' width='100%'>
                                        <Stack direction='column' gap="10px">
                                            <Stack direction='row' gap="10px">
                                                <BoltOutlinedIcon />
                                                <Typography style={{ position: 'relative', minWidth: '58px', maxWidth: '58px', }}>
                                                    Điện
                                                </Typography>
                                            </Stack>

                                            <Stack direction='row' gap={2}>
                                                <Typography sx={{ color: "#a3a3a3", whiteSpace: 'nowrap', fontSize: '12px', fontStyle: 'italic', marginLeft: '10px' }}>Số cũ: <span style={{ fontWeight: "bold", color: "#333" }}>{dataBill && dataBill.hoa_don_dien_nuoc[0].so_dien_cu + dataBill.hoa_don_dien_nuoc[0].so_dien_cu_1}</span>  </Typography>
                                                <Typography sx={{ color: "#a3a3a3", whiteSpace: 'nowrap', fontSize: '12px', fontStyle: 'italic', marginLeft: '10px' }}>Số mới: <span style={{ fontWeight: "bold", color: "#333" }}>{dataBill && dataBill.hoa_don_dien_nuoc[0].so_dien_moi + dataBill.hoa_don_dien_nuoc[0].so_dien_moi_1}</span></Typography>
                                            </Stack>



                                        </Stack>
                                        <Stack>
                                            <Typography>{formatNumber(tiendien)}</Typography>
                                        </Stack>
                                    </Stack>

                                    <Stack direction='row' justifyContent='space-between' width='100%'>
                                        <Stack direction='column' gap="10px">
                                            <Stack direction='row' gap="10px">
                                                <WaterDropOutlinedIcon />
                                                <Typography style={{ position: 'relative', minWidth: '58px', maxWidth: '58px', }}>
                                                    Nước
                                                </Typography>
                                            </Stack>

                                            <Stack direction='row' gap={2}>
                                                <Typography sx={{ color: "#a3a3a3", whiteSpace: 'nowrap', fontSize: '12px', fontStyle: 'italic', marginLeft: '10px' }}>Số cũ: <span style={{ fontWeight: "bold", color: "#333" }}>{dataBill && dataBill.hoa_don_dien_nuoc[0].so_nuoc_cu + dataBill.hoa_don_dien_nuoc[0].so_nuoc_cu_1}</span>  </Typography>
                                                <Typography sx={{ color: "#a3a3a3", whiteSpace: 'nowrap', fontSize: '12px', fontStyle: 'italic', marginLeft: '10px' }}>Số mới: <span style={{ fontWeight: "bold", color: "#333" }}>{dataBill && dataBill.hoa_don_dien_nuoc[0].so_nuoc_moi + dataBill.hoa_don_dien_nuoc[0].so_nuoc_moi_1}</span></Typography>
                                            </Stack>
                                        </Stack>
                                        <Stack>
                                            <Typography>{formatNumber(tiennuoc)}</Typography>
                                        </Stack>
                                    </Stack>
                                </>
                                :
                                ''
                            }



                            <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='row' gap="10px">
                                    <InvertColorsIcon />
                                    <Typography>Nước Khoán</Typography>

                                </Stack>
                                <Stack>
                                    <Typography>{formatNumber(tiennuockhoan)}</Typography>
                                </Stack>
                            </Stack>

                            <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='row' gap="10px">
                                    <WifiOutlinedIcon />
                                    <Typography>Net</Typography>

                                </Stack>
                                <Stack>
                                    <Typography>{formatNumber(tiennet)}</Typography>
                                </Stack>
                            </Stack>

                            <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='row' gap="10px">
                                    <PedalBikeOutlinedIcon />
                                    <Typography>Xe</Typography>

                                </Stack>
                                <Stack>
                                    <Typography>{formatNumber(tienxe)}</Typography>
                                </Stack>
                            </Stack>
                            <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='row' gap="10px">
                                    <DeleteOutlineIcon />
                                    <Typography>Rác</Typography>

                                </Stack>
                                <Stack>
                                    <Typography>{formatNumber(tienrac)}</Typography>
                                </Stack>
                            </Stack>
                            <Divider sx={{ width: '100%' }} />

                            <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='row' gap="10px">
                                    <AttachMoneyIcon />
                                    <Typography>Tổng tiền</Typography>

                                </Stack>
                                <Stack>
                                    <Typography sx={{ color: "red" }}>{formatNumber(tongtien)}</Typography>
                                </Stack>
                            </Stack>

                            <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='row' gap="10px">
                                    <ContentPasteIcon />
                                    <Typography>Phạt</Typography>

                                </Stack>
                                <Stack>
                                    <Typography sx={{ color: "red" }}>{dataBill && formatNumber(dataBill.hoa_don_phat)}đ</Typography>
                                </Stack>
                            </Stack>
                            <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='row' gap="10px">
                                    <DesignServicesOutlinedIcon />
                                    <Typography >Dịch vụ</Typography>

                                </Stack>
                                <Stack>
                                    <Typography sx={{ color: "red" }}>{formatNumber(tiendichvu)}</Typography>
                                </Stack>
                            </Stack>
                            <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='row' gap="10px">
                                    <LoyaltyOutlinedIcon />
                                    <Typography>Khuyến mãi</Typography>

                                </Stack>
                                <Stack>
                                    <Typography sx={{ color: "#15a35e" }}>  {formatNumber(tienkhuyenmai)}</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack direction='row' sx={{ height: "50px", backgroundColor: "#15a35e", alignItems: "center", padding: '10px', borderRadius: "4px" }}>
                        <Typography sx={{ textAlign: "right", width: "100%", color: "#fff", fontWeight: 'bold', whiteSpace: 'nowrap' }}>Tổng tiền cần thanh toán:</Typography>
                        <Typography sx={{ textAlign: "right", width: "60%", color: "#fff", fontWeight: "600" }}>{formatNumber(tongtiencanthanhtoan)}</Typography>
                    </Stack>

                    {/* <Stack>
                        <Typography>Ghi chú:</Typography>
                        <textarea className='form-control'></textarea>
                    </Stack> */}

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

export default DialogBill