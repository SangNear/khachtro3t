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
import "./page.scss"
interface DialogProblemProps {
    open: boolean
    close: () => void
    dataMoney: number
}

const DialogBill = ({ open, close, dataMoney }: DialogProblemProps) => {


    const formatNumber = (num: number): string => {
        return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
                        <Typography sx={{ textTransform: "capitalize", color: "#a9a9a9", fontWeight: "600" }}>Hóa đơn tháng số 1</Typography>
                        <Typography sx={{ color: "#a9a9a9" }}>Từ 01/12/2023 đến 31/12/2023</Typography>
                    </Stack>
                    <Stack>
                        <table style={{ borderBottom: "1px solid #333" }}>
                            <thead  >
                                <tr style={{ backgroundColor: "#15a35e", padding: "10px", height: "30px", }}>
                                    <th style={{ fontWeight: "500", color: "#fff", fontSize: "12px", textAlign: "center", borderRadius: "4px" }}>DỊCH VỤ</th>
                                    <th style={{ fontWeight: "500", color: "#fff", fontSize: "12px", textAlign: "center", borderRadius: "4px" }}>ĐƠN GIÁ</th>
                                    <th style={{ fontWeight: "500", color: "#fff", fontSize: "12px", textAlign: "center", borderRadius: "4px" }}>SL</th>
                                    <th style={{ fontWeight: "500", color: "#fff", fontSize: "12px", textAlign: "center", borderRadius: "4px" }}>TIỀN</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr style={{ padding: "10px", height: "20px" }}>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>$ Thuê</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>3.500.000</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>1</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>3.500.000</th>
                                </tr>

                                <tr style={{ padding: "10px", height: "20px" }}>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>$ Thuê</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>3.500.000</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>1</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>3.500.000</th>
                                </tr>

                                <tr style={{ padding: "10px", height: "20px" }}>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>$ Thuê</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>3.500.000</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>1</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>3.500.000</th>
                                </tr>
                                <tr style={{ padding: "10px", height: "20px" }}>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>$ Thuê</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>3.500.000</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>1</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>3.500.000</th>
                                </tr>
                                <tr style={{ padding: "10px", height: "20px" }}>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>$ Thuê</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>3.500.000</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>1</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>3.500.000</th>
                                </tr>
                                <tr style={{ padding: "10px", height: "20px" }}>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>$ Thuê</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>3.500.000</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>1</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>3.500.000</th>
                                </tr>
                                <tr style={{ padding: "10px", height: "20px" }}>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>$ Thuê</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>3.500.000</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>1</th>
                                    <th style={{ textAlign: "center", fontSize: "12px", fontWeight: "500", borderTop: "1px solid #ccc", borderRight: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>3.500.000</th>
                                </tr>


                            </tbody>
                        </table>

                    </Stack>

                    <Stack direction='row' sx={{ height: "50px", backgroundColor: "#15a35e", alignItems: "center", padding: '10px', borderRadius: "4px" }}>
                        <Typography sx={{ textAlign: "right", width: "100%", color: "#fff" }}>Tổng tiền:</Typography>
                        <Typography sx={{ textAlign: "right", width: "100%", color: "#fff", fontWeight: "600" }}>{formatNumber(dataMoney)}</Typography>
                    </Stack>

                    <Stack>
                        <Typography>Ghi chú:</Typography>
                        <textarea className='form-control'></textarea>
                    </Stack>

                </Stack>
            </DialogContent>
            <DialogActions sx={styleDialogAction}>
                <Button

                    sx={btnText}
                    variant="text" autoFocus onClick={close}>
                    Đóng
                </Button>


            </DialogActions>
        </Dialog>
    )
}

export default DialogBill