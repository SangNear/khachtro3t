"use client"
import ContainerComponent2 from '@/app/components/wrappComponent2/page'
import React, { ChangeEvent, useState } from 'react'
import './page.scss'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import DialogProblem from '@/app/components/dialogProblem/page'

import MenuItem from '@mui/material/MenuItem'
import SelectComponent from '@/app/components/textFieldComponent/SelectComponent'
import TextareaComponent from '@/app/components/textFieldComponent/Textarea'
const ProblemPage = () => {

    const [openBSC, setOpenBSC] = useState(false)
    const handleOpenDialogBSC = () => {
        setOpenBSC(true)
    }
    const handleCloseDialogBSC = () => {
        setOpenBSC(false)
    }

    const [openreview, setOpenreview] = useState(false)
    const btnbsc = {
        backgroundColor: "#DC3545",
        width: 'fit-content',
        '&:hover': {
            backgroundColor: "#DC3545",
            opacity: "0.9"
        }

    }
    const btndg = {
        backgroundColor: "#28A745",
        '&:hover': {
            backgroundColor: "#28A745",
            opacity: "0.9"
        }
    }

    const customStack = {
        borderRight: "1px solid #ccc",
        paddingRight: "24px",
        "@media (max-width: 783px)": {
            borderRight: 'none',
            paddingRight: 0
        }
    }



    return (
        <ContainerComponent2>
            <div className="problem-container">
                <div className="problem-top">
                    <Stack height='100%' alignItems='center' justifyContent='center'>
                        <Button className='fx-btn' variant='contained' sx={btnbsc} onClick={handleOpenDialogBSC}>Báo sự cố</Button>
                    </Stack>
                </div>

                <div className="problem-top">


                    <Stack direction={{ xs: 'column', md: 'column', lg: 'row' }} spacing={3}>
                        <Stack flex={1} spacing={2} sx={customStack}>
                            <Stack direction='row' justifyContent='space-between' alignItems='center' >
                                <Stack>
                                    <Typography className='fx'><b>Check-in</b> <b style={{ color: "#28A745" }}>(hoàn thành)</b></Typography>
                                    <Typography className='fx' style={{ fontSize: "14px", textAlign: 'center', fontStyle: "italic" }}>10:26 - 31/10/2023</Typography>
                                </Stack>
                                <Stack direction='row' spacing={2}>

                                    <DialogProblem open={openBSC} close={handleCloseDialogBSC} />



                                    <Button className='fx-btn' variant='contained' sx={btndg}>Đánh giá</Button>
                                </Stack>
                            </Stack>
                            <Stack direction='row' justifyContent='space-between' alignItems='center' >
                                <Stack>
                                    <Typography className='fx'><b>Check-in</b> <b style={{ color: "#28A745" }}>(hoàn thành)</b></Typography>
                                    <Typography className='fx' style={{ fontSize: "14px", textAlign: 'center', fontStyle: "italic" }}>10:26 - 31/10/2023</Typography>
                                </Stack>
                                <Stack direction='row' spacing={2}>

                                    



                                    <Button className='fx-btn' variant='contained' sx={btndg}>Đánh giá</Button>
                                </Stack>
                            </Stack>
                            <Stack direction='row' justifyContent='space-between' alignItems='center' >
                                <Stack>
                                    <Typography className='fx'><b>Check-in</b> <b style={{ color: "#28A745" }}>(hoàn thành)</b></Typography>
                                    <Typography className='fx' style={{ fontSize: "14px", textAlign: 'center', fontStyle: "italic" }}>10:26 - 31/10/2023</Typography>
                                </Stack>
                                <Stack direction='row' spacing={2}>

                                    



                                    <Button className='fx-btn' variant='contained' sx={btndg}>Đánh giá</Button>
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack flex={1}>
                            <Typography className='fx' sx={{ fontSize: "20px", textAlign: 'center', fontWeight: "bold", marginBottom: "20px", color: '#28A745' }}>HƯỚNG DẪN QUY TRÌNH</Typography>
                            <Stack direction='column' spacing={2}>
                                <Stack>
                                    <Typography className='fx' sx={{ fontSize: "20px", fontWeight: "bold" }}>1. Nhấn vào Báo sự cố</Typography>
                                    <Typography className='fx' sx={{ fontSize: "16px", paddingLeft: '15px', color: "#808080" }}>Bạn vui lòng cung cấp các thông tin về sự cố của mình</Typography>
                                </Stack>

                                <Stack>
                                    <Typography className='fx' sx={{ fontSize: "20px", fontWeight: "bold" }}>2. Nhân viên tiếp nhận</Typography>
                                    <Typography className='fx' sx={{ fontSize: "16px", paddingLeft: '15px', color: "#808080" }}>Nhân viên sẽ liên lạc qua điện thoại và thông báo các chi phí phát sinh, nếu bạn đồng ý sẽ chuyển qua cho thợ tiến hành xử lý</Typography>
                                </Stack>

                                <Stack>
                                    <Typography className='fx' sx={{ fontSize: "20px", fontWeight: "bold" }}>3. Thợ hẹn xử lý</Typography>
                                    <Typography className='fx' sx={{ fontSize: "16px", paddingLeft: '15px', color: "#808080" }}>Thợ sẽ tiến hành hẹn và đến xử lý theo khung giờ thỏa thuận, tất cả các chi phí sẽ được tính vào hóa đơn tiền thuê</Typography>
                                </Stack>

                                <Stack>
                                    <Typography className='fx' sx={{ fontSize: "20px", fontWeight: "bold" }}>4. Chăm sóc lại</Typography>
                                    <Typography className='fx' sx={{ fontSize: "16px", paddingLeft: '15px', color: "#808080" }}>Nhân viên sẽ liên hệ lại xác nhận tình trạng và thái độ của thợ khi làm việc.</Typography>
                                </Stack>
                            </Stack>
                        </Stack>

                    </Stack>
                </div>





            </div>


        </ContainerComponent2 >
    )
}

export default ProblemPage