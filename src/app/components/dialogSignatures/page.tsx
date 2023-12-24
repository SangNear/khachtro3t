"use client"
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from "@mui/icons-material/Close";
import SignatureCanvas from 'react-signature-canvas'
import React, { useState } from 'react'
import ReactSignatureCanvas from 'react-signature-canvas'
import "./page.scss"
import { ApiSignReponse } from '@/app/api/sign'
import { Typography } from '@mui/material'
import ModalSuccessMessage from '../modalSuccessMessage/page'
interface DialogSignaturesProps {
    open: boolean
    close: () => void
    id_hop_dong: number | undefined
    setImgSignB: React.Dispatch<React.SetStateAction<string | undefined>>
}
const DialogSignatures = ({ open, close, setImgSignB, id_hop_dong }: DialogSignaturesProps) => {
    const [signB, setSignB] = useState<ReactSignatureCanvas | null>(null);
    const [urlB, setUrlB] = useState<string | undefined>();
    const [openMessageSuccess, setOpenMessageSuccess] = useState(false)
    const handleCloseMessageSuccess = () => {
        setOpenMessageSuccess(false)
    }
    const handleOpenMessageSuccess = () => {
        setOpenMessageSuccess(true)
    }
    const handleClearSignB = () => {
        signB?.clear()
    }
    const handleSaveSignB = () => {
        setUrlB(signB?.getTrimmedCanvas().toDataURL('image/png'))
        setImgSignB(signB?.getTrimmedCanvas().toDataURL('image/png'))

        setOpenMessageSuccess(true)
    }

    const fetchSignAPi = async () => {
        let signature = urlB
        const reponse = await fetch('https://ad.tro4u.com/api/version/1.0/hopdong/update-signature-by-hop-dong', {
            method: "POST",
            body: JSON.stringify({
                id_hop_dong,
                signature

            }),

            headers: {
                "Content-Type": "application/json",
            }
        })
        const dataSigned: ApiSignReponse = await reponse.json()
        // if (dataSigned.status == 'true') {
        //     window.location.href = "/";
        // }

    }
    urlB ? fetchSignAPi() : ''
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
    console.log(urlB);

    return (
        <Dialog
            onClose={close}
            aria-labelledby="customized-dialog-title"
            open={open}
            sx={styleDialogCustom}
            scroll='body'

        >

            <DialogTitle sx={{ m: 0, padding: " 10px 11px", color: "#fff", background: "#15a35e" }} id="customized-dialog-title">
                Chữ ký điện tử
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
            <DialogContent sx={{ padding: '10px' }} dividers>
                <SignatureCanvas penColor='green'
                    ref={data => setSignB(data)}
                    canvasProps={{ className: 'sigCanvas' }} />
                <Typography sx={{ fontStyle: 'italic', color: 'red', fontSize: '14px', textAlign: 'center' }}> Bằng việc ký nhận này bạn đã đồng ý với hợp đồng thuê phòng</Typography>
            </DialogContent>
            <DialogActions sx={styleDialogAction}>
                <Button

                    sx={btnText}
                    variant="text" autoFocus onClick={handleClearSignB}>
                    Ký lại
                </Button>

                <Button
                    style={{
                        background: "#15a35e"
                    }} variant="contained"
                    onClick={handleSaveSignB}
                >
                    Hoàn thành
                </Button>
            </DialogActions>
            <ModalSuccessMessage open={openMessageSuccess} close={handleCloseMessageSuccess} />
        </Dialog>
    )
}

export default DialogSignatures