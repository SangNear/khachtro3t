"use client"
import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ModalBackdropSlotProps } from '@mui/base';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import Stack from '@mui/material/Stack';
interface ModalSuccessMessageProps {
    open: boolean
    close: () => void
}
const ModalSuccessMessage = ({ open, close }: ModalSuccessMessageProps) => {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 360,
        minWidth: 350,
        bgcolor: 'background.paper',
        borderRadius: '6px',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        height: '220px'

    };
    const btn = {
        position: 'absolute',
        right: '15px',
        bottom: '10px',
        backgroundColor: '#15a35e',
        '&:hover': {
            backgroundColor: '#187146'
        }
    }
    const handleOk = () => {
        window.location.href = "/";
    }
    return (
        <Modal
            open={open}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <CheckOutlinedIcon sx={{ border: '1px solid #ccc', fontSize: '32px', padding: '3px', borderRadius: '20px', color: '#15a35e' }} />
                <Stack direction='column' justifyContent='center' alignItems='center' gap={1}>
                    <h3 style={{ color: '#15a35e' }}>Chúc mừng</h3>
                    <Typography sx={{ textAlign: 'center', color: '#a09f9c' }}>
                        Bạn đã ký hợp đồng thành công
                    </Typography>
                </Stack>
                <Button variant='contained' sx={btn} onClick={handleOk}>OK</Button>

            </Box>
        </Modal>
    )
}

export default ModalSuccessMessage