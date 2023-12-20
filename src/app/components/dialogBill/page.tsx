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
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
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
import { HoaDon, ThangData } from '@/app/api/hoadon'
interface DialogProblemProps {
    open: boolean
    close: () => void
    dataBill: ThangData | undefined

    tenphong: string
}

const DialogBill = ({ open, close, dataBill, tenphong }: DialogProblemProps) => {



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
        return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
    const tienthue = dataBill && dataBill.hoa_don_thang.length > 0 ? dataBill.hoa_don_thang[0].thanh_tien_thue : 0
    const tiennet = dataBill && dataBill.hoa_don_thang.length > 0 ? dataBill.hoa_don_thang[0].thanh_tien_net : 0
    const tiendien = dataBill && dataBill.hoa_don_dien_nuoc.length > 0 && dataBill.hoa_don_dien_nuoc[0].thanh_tien_dien ? dataBill.hoa_don_dien_nuoc[0].thanh_tien_dien : 0
    const tiendien1 = dataBill && dataBill.hoa_don_dien_nuoc.length > 0 && dataBill.hoa_don_dien_nuoc[0].thanh_tien_dien_1 ? dataBill.hoa_don_dien_nuoc[0].thanh_tien_dien_1 : 0

    const tiennuoc = dataBill && dataBill.hoa_don_dien_nuoc.length > 0 && dataBill.hoa_don_dien_nuoc[0].thanh_tien_nuoc ? dataBill.hoa_don_dien_nuoc[0].thanh_tien_nuoc : 0
    const tiennuoc1 = dataBill && dataBill.hoa_don_dien_nuoc.length > 0 && dataBill.hoa_don_dien_nuoc[0].thanh_tien_nuoc_1 ? dataBill.hoa_don_dien_nuoc[0].thanh_tien_nuoc_1 : 0

    const tiennuockhoan = dataBill && dataBill.hoa_don_thang.length > 0 ? dataBill.hoa_don_thang[0].thanh_tien_nuoc + dataBill.hoa_don_thang[0].thanh_tien_nuoc_1 : 0
    const tienxe = dataBill && dataBill.hoa_don_thang.length > 0 ? dataBill.hoa_don_thang[0].thanh_tien_xe : 0
    const tienrac = dataBill && dataBill.hoa_don_thang.length > 0 ? dataBill.hoa_don_thang[0].thanh_tien_rac : 0
    const tongtien = tiencoc + tienthue + tiennet + tiendien + tiennuoc + tiennuockhoan + tienxe + tienrac
    const tienphat = dataBill && dataBill.hoa_don_phat ? dataBill.hoa_don_phat : 0
    const tiendichvu = dataBill && dataBill.hoa_don_khac.length > 0 ? dataBill.hoa_don_khac[0].tong_tien : 0
    const tienkhuyenmai = dataBill && dataBill.hoa_don_km.length > 0 ? dataBill.hoa_don_km[0].tong_tien : 0
    const tongtiencanthanhtoan = dataBill && dataBill.tong_tien ? dataBill.tong_tien : 0
    const dunocu = dataBill && dataBill.hoa_don_du_no_cu ? dataBill.hoa_don_du_no_cu : 0

    const sodiencu = dataBill && dataBill.hoa_don_dien_nuoc.length > 0 && dataBill.hoa_don_dien_nuoc[0].so_dien_cu ? dataBill.hoa_don_dien_nuoc[0].so_dien_cu : 0
    const sodienmoi = dataBill && dataBill.hoa_don_dien_nuoc.length > 0 && dataBill.hoa_don_dien_nuoc[0].so_dien_moi ? dataBill.hoa_don_dien_nuoc[0].so_dien_moi : 0

    const sodiencu1 = dataBill && dataBill.hoa_don_dien_nuoc.length > 0 && dataBill.hoa_don_dien_nuoc[0].so_dien_cu_1 ? dataBill.hoa_don_dien_nuoc[0].so_dien_cu_1 : 0
    const sodienmoi1 = dataBill && dataBill.hoa_don_dien_nuoc.length > 0 && dataBill.hoa_don_dien_nuoc[0].so_dien_moi_1 ? dataBill.hoa_don_dien_nuoc[0].so_dien_moi_1 : 0

    const sonuoccu = dataBill && dataBill.hoa_don_dien_nuoc.length > 0 ? dataBill.hoa_don_dien_nuoc[0].so_nuoc_cu + dataBill.hoa_don_dien_nuoc[0].so_nuoc_cu_1 : 0
    const sonuocmoi = dataBill && dataBill.hoa_don_dien_nuoc.length > 0 ? dataBill.hoa_don_dien_nuoc[0].so_nuoc_moi + dataBill.hoa_don_dien_nuoc[0].so_nuoc_moi_1 : 0

    const sonuoccu1 = dataBill && dataBill.hoa_don_dien_nuoc.length > 0 && dataBill.hoa_don_dien_nuoc[0].so_nuoc_cu ? dataBill.hoa_don_dien_nuoc[0].so_nuoc_cu : 0
    const sonuocmoi1 = dataBill && dataBill.hoa_don_dien_nuoc.length > 0 && dataBill.hoa_don_dien_nuoc[0].so_nuoc_moi_1 ? dataBill.hoa_don_dien_nuoc[0].so_nuoc_moi_1 : 0

    const giadien = dataBill && dataBill.hoa_don_dien_nuoc.length > 0 ? dataBill.hoa_don_dien_nuoc[0].gia_dien : 0

    const giadien1 = dataBill && dataBill.hoa_don_dien_nuoc.length > 0 && dataBill.hoa_don_dien_nuoc[0].gia_dien_1 ? dataBill.hoa_don_dien_nuoc[0].gia_dien_1 : 0

    const gianuoc = dataBill && dataBill.hoa_don_thang.length > 0 && dataBill.hoa_don_thang[0].gia_nuoc ? dataBill.hoa_don_thang[0].gia_nuoc : 0
    const gianuoc1 = dataBill && dataBill.hoa_don_thang.length > 0 && dataBill.hoa_don_thang[0].gia_nuoc_1 ? dataBill.hoa_don_thang[0].gia_nuoc_1 : 0
    const gianet = dataBill && dataBill.hoa_don_thang.length > 0 ? dataBill.hoa_don_thang[0].gia_net : 0
    const giaxe = dataBill && dataBill.hoa_don_thang.length > 0 ? dataBill.hoa_don_thang[0].gia_xe : 0
    const giarac = dataBill && dataBill.hoa_don_thang.length > 0 ? dataBill.hoa_don_thang[0].gia_rac : 0




    return (
        <Dialog
            onClose={close}
            aria-labelledby="customized-dialog-title"
            open={open}
            sx={styleDialogCustom}
            scroll='body'

        >
            <DialogTitle sx={{ m: 0, padding: " 10px 11px", color: "#fff", background: "#15a35e" }} id="customized-dialog-title">
                Hóa đơn phòng {tenphong}
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
                            {tiencoc != 0 ? <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='row' gap="10px">
                                    <AnchorIcon sx={{ opacity: '0.5' }} />
                                    <Typography>Cọc</Typography>

                                </Stack>
                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold' }}>{formatNumber(tiencoc)}</Typography>
                                </Stack>
                            </Stack> : ''
                            }


                            {tienthue != 0 ? <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='row' gap="10px">
                                    <HomeOutlinedIcon sx={{ opacity: '0.5' }} />
                                    <Typography>Thuê</Typography>

                                </Stack>
                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold' }}>{formatNumber(tienthue)}</Typography>
                                </Stack>
                            </Stack> : ''}


                            {tiendien != 0 ? <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='column' gap="2px">
                                    <Stack direction='row' gap="10px">
                                        <BoltOutlinedIcon sx={{ opacity: '0.5' }} />
                                        <Typography style={{ position: 'relative', minWidth: '58px', }}>
                                            Điện theo đồng hồ 1
                                        </Typography>
                                    </Stack>

                                    <Stack direction='row' gap={1} paddingLeft='22px'>
                                        <Typography sx={{ color: "#a3a3a3", whiteSpace: 'nowrap', fontSize: '12px', fontStyle: 'italic', marginLeft: '10px' }}>Số mới: <span style={{ fontWeight: "bold", color: "#333" }}>{sodienmoi} - {sodiencu},</span></Typography>


                                        <Typography sx={{ color: "#a3a3a3", whiteSpace: 'nowrap', fontSize: '12px', fontStyle: 'italic', marginLeft: '10px', display: 'flex', alignItems: 'center' }}>Giá:  <span style={{ fontWeight: "bold", color: "#333" }}>{formatNumber(giadien)}</span></Typography>
                                    </Stack>



                                </Stack>
                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold' }}>{formatNumber(tiendien)}</Typography>
                                </Stack>
                            </Stack> : ''
                            }

                            {tiendien1 != 0 ? <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='column' gap="2px">
                                    <Stack direction='row' gap="10px">
                                        <BoltOutlinedIcon sx={{ opacity: '0.5' }} />
                                        <Typography style={{ position: 'relative', minWidth: '58px' }}>
                                            Điện theo đồng hồ 2
                                        </Typography>
                                    </Stack>

                                    <Stack direction='row' gap={1} paddingLeft='22px'>
                                        <Typography sx={{ color: "#a3a3a3", whiteSpace: 'nowrap', fontSize: '12px', fontStyle: 'italic', marginLeft: '10px' }}>Số mới: <span style={{ fontWeight: "bold", color: "#333" }}>{sodienmoi1} - {sodiencu1},</span></Typography>


                                        <Typography sx={{ color: "#a3a3a3", whiteSpace: 'nowrap', fontSize: '12px', fontStyle: 'italic', marginLeft: '10px', display: 'flex', alignItems: 'center' }}>Giá:  <span style={{ fontWeight: "bold", color: "#333" }}>{formatNumber(giadien1)}</span></Typography>
                                    </Stack>



                                </Stack>
                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold' }}>{formatNumber(tiendien1)}</Typography>
                                </Stack>
                            </Stack> : ''
                            }


                            {tiennuoc != 0 ? <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='column' gap="2px">
                                    <Stack direction='row' gap="10px" >
                                        <WaterDropOutlinedIcon sx={{ opacity: '0.5' }} />
                                        <Typography style={{ position: 'relative', minWidth: '58px', }}>
                                            Nước theo đồng hồ 1
                                        </Typography>
                                    </Stack>

                                    <Stack direction='row' gap={1} paddingLeft='22px'>
                                        <Typography sx={{ color: "#a3a3a3", whiteSpace: 'nowrap', fontSize: '12px', fontStyle: 'italic', marginLeft: '10px' }}>Số mới: <span style={{ fontWeight: "bold", color: "#333" }}> {sonuocmoi} - {sonuoccu},</span>  </Typography>

                                        <Typography sx={{ color: "#a3a3a3", whiteSpace: 'nowrap', fontSize: '12px', fontStyle: 'italic', marginLeft: '10px' }}>Giá: <span style={{ fontWeight: "bold", color: "#333" }}>{formatNumber(gianuoc)}</span></Typography>
                                    </Stack>
                                </Stack>
                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold' }}>{formatNumber(tiennuoc)}</Typography>
                                </Stack>
                            </Stack> : ''
                            }

                            {tiennuoc1 != 0 ? <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='column' gap="2px">
                                    <Stack direction='row' gap="10px" >
                                        <WaterDropOutlinedIcon sx={{ opacity: '0.5' }} />
                                        <Typography style={{ position: 'relative', minWidth: '58px', }}>
                                            Nước theo đồng hồ 2
                                        </Typography>
                                    </Stack>

                                    <Stack direction='row' gap={1} paddingLeft='22px'>
                                        <Typography sx={{ color: "#a3a3a3", whiteSpace: 'nowrap', fontSize: '12px', fontStyle: 'italic', marginLeft: '10px' }}>Số mới: <span style={{ fontWeight: "bold", color: "#333" }}> {sonuocmoi1} - {sonuoccu1}</span>  </Typography>

                                        <Typography sx={{ color: "#a3a3a3", whiteSpace: 'nowrap', fontSize: '12px', fontStyle: 'italic', marginLeft: '10px' }}>Giá: <span style={{ fontWeight: "bold", color: "#333" }}>{formatNumber(gianuoc1)}</span></Typography>
                                    </Stack>
                                </Stack>
                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold' }}>{formatNumber(tiennuoc1)}</Typography>
                                </Stack>
                            </Stack> : ''
                            }






                            {tiennuockhoan != 0 ? <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='column' gap="2px">
                                    <Stack direction='row' gap="10px">
                                        <InvertColorsIcon sx={{ opacity: '0.5' }} />
                                        <Typography>Nước </Typography>

                                    </Stack>
                                    <Stack direction='row' gap={1} paddingLeft='22px'>

                                        <Typography sx={{ color: "#a3a3a3", whiteSpace: 'nowrap', fontSize: '12px', fontStyle: 'italic', marginLeft: '10px' }}>Giá: <span style={{ fontWeight: "bold", color: "#333" }}>{formatNumber(gianuoc)}</span></Typography>
                                    </Stack>
                                </Stack>

                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold' }}>{formatNumber(tiennuockhoan)}</Typography>
                                </Stack>
                            </Stack> : ''
                            }

                            {tiennet != 0 ? <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='column' gap="2px">
                                    <Stack direction='row' gap="10px">
                                        <WifiOutlinedIcon sx={{ opacity: '0.5' }} />
                                        <Typography>Net</Typography>

                                    </Stack>
                                    <Stack direction='row' gap={1} paddingLeft='22px'>

                                        <Typography sx={{ color: "#a3a3a3", whiteSpace: 'nowrap', fontSize: '12px', fontStyle: 'italic', marginLeft: '10px' }}>Giá: <span style={{ fontWeight: "bold", color: "#333" }}>{formatNumber(gianet)}</span></Typography>
                                    </Stack>
                                </Stack>

                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold' }}>{formatNumber(tiennet)}</Typography>
                                </Stack>
                            </Stack> : ''
                            }
                            {tienxe != 0 ? <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='column' gap="2px">
                                    <Stack direction='row' gap="10px">
                                        <PedalBikeOutlinedIcon sx={{ opacity: '0.5' }} />
                                        <Typography>Xe</Typography>

                                    </Stack>
                                    <Stack direction='row' gap={1} paddingLeft='22px'>

                                        <Typography sx={{ color: "#a3a3a3", whiteSpace: 'nowrap', fontSize: '12px', fontStyle: 'italic', marginLeft: '10px' }}>Giá: <span style={{ fontWeight: "bold", color: "#333" }}>{formatNumber(giaxe)}</span></Typography>
                                    </Stack>
                                </Stack>

                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold' }}>{formatNumber(tienxe)}</Typography>
                                </Stack>
                            </Stack> : ''
                            }


                            {tienrac != 0 ? <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='column' gap="2px">
                                    <Stack direction='row' gap="10px">
                                        <DeleteOutlineIcon sx={{ opacity: '0.5' }} />
                                        <Typography>Rác</Typography>

                                    </Stack>
                                    <Stack direction='row' gap={1} paddingLeft='22px'>
                                        <Typography sx={{ color: "#a3a3a3", whiteSpace: 'nowrap', fontSize: '12px', fontStyle: 'italic', marginLeft: '10px' }}>Giá: <span style={{ fontWeight: "bold", color: "#333" }}>{formatNumber(giarac)}</span></Typography>
                                    </Stack>
                                </Stack>

                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold' }}>{formatNumber(tienrac)}</Typography>
                                </Stack>
                            </Stack> : ''}

                            <Divider sx={{ width: '100%' }} />

                            <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='row' gap="10px">
                                    <AttachMoneyIcon sx={{ opacity: '0.5' }} />
                                    <Typography>Tổng tiền</Typography>

                                </Stack>
                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold' }}>{formatNumber(tongtien)}</Typography>
                                </Stack>
                            </Stack>


                            {tienphat != 0 ? <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='row' gap="10px">
                                    <ContentPasteIcon sx={{ opacity: '0.5' }} />
                                    <Typography>Phạt</Typography>

                                </Stack>
                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold' }}>{formatNumber(tienphat)}</Typography>
                                </Stack>
                            </Stack> : ''
                            }
                            {tiendichvu != 0 ? <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='row' gap="10px">
                                    <HomeRepairServiceOutlinedIcon sx={{ opacity: '0.5' }} />
                                    <Typography >Dịch vụ</Typography>

                                </Stack>
                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold' }}>{formatNumber(tiendichvu)}</Typography>
                                </Stack>
                            </Stack> : ''
                            }

                            {dunocu != 0 ? <Stack direction='row' justifyContent='space-between' width='100%'>
                                <Stack direction='row' gap="10px">
                                    <DesignServicesOutlinedIcon sx={{ opacity: '0.5' }} />
                                    <Typography >Nợ cũ</Typography>

                                </Stack>
                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold' }}>{formatNumber(dunocu)}</Typography>
                                </Stack>
                            </Stack> : ''
                            }


                            {tienkhuyenmai != 0 ?
                                <Stack direction='row' justifyContent='space-between' width='100%'>
                                    <Stack direction='row' gap="10px">
                                        <LoyaltyOutlinedIcon sx={{ opacity: '0.5' }} />
                                        <Typography>Khuyến mãi</Typography>

                                    </Stack>
                                    <Stack>
                                        <Typography sx={{ fontWeight: 'bold' }}>  {formatNumber(tienkhuyenmai)}</Typography>
                                    </Stack>
                                </Stack> : ''
                            }

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
        </Dialog >
    )
}

export default DialogBill