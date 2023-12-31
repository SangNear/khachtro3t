"use client"
import Image from 'next/image'
import './page.scss'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import React from 'react'
import { DataApi, Datalogin } from '@/app/api/login'
import Loading from '@/app/loading'
import DialogBill from '@/app/components/dialogBill/page'
import DialogTransfer from '@/app/components/dialogTransfer/page'
import ContainerComponent from './components/wrappComponent/page'
import ContainerComponent2 from './components/wrappComponent2/page'
import DialogTransferPointment from './components/dialogTranferPointment/page'

import { CircularProgress, Divider, LinearProgress } from '@mui/material'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { ApiHoaDonResponse, ThangData } from './api/hoadon'
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DialogPayed from './components/dialogPayed/page'
import Link from 'next/link'
export default function Home() {
  const [openModalBill, setOpenModalBill] = useState(false)
  const [openModalPayed, setOpenModalPayed] = useState(false)
  const [dataBill, setdataBill] = useState<ThangData | undefined>()
  const [hoadonApi, setHoadonApi] = useState<ApiHoaDonResponse>()
  const [giathue, setGiathue] = useState(0)
  const [tenphong, setTenphong] = useState('')

  const handleOpenModalBill = (data: ThangData) => {
    setOpenModalBill(!openModalBill)
    setdataBill(data)
  }

  const handleCloseModalBill = () => {
    setOpenModalBill(false)
  }

  const handleOpenModalPayed = (data: ThangData) => {
    setOpenModalPayed(!openModalBill)
    setdataBill(data)
  }

  const handleCloseModalPayed = () => {
    setOpenModalPayed(false)
  }




  const [dataSession, setDataSession] = useState<ApiHopdongResponse>()
  const [isLoading, setIsLoading] = useState(true);

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const [openModalTransfer, setOpenModalTransfer] = useState(false)

  const handleOpenModalTransfer = () => {
    setOpenModalTransfer(!openModalTransfer)
  }

  const handleCloseModalTransfer = () => {
    setOpenModalTransfer(false)
  }

  const [openModalTransferPointment, setOpenModalTransferPointment] = useState(false)
  const handleOpenModalTransferPointment = () => {
    setOpenModalTransferPointment(!openModalTransferPointment)
  }
  const handleCloseModalTransferPointment = () => {
    setOpenModalTransferPointment(!openModalTransferPointment)
  }



  useEffect(() => {

    if (typeof window !== 'undefined') {
      const userApi = window.localStorage.getItem('userData');
      const dataLoginApi = localStorage.getItem('loginData')
      if (!userApi) {
        // Redirect to login page if local storage is not present
        // Replace '/login' with your actual login page route
        window.location.href = '/pages/login';
      } else {
        const userData:  DataApi = JSON.parse(userApi);
        if (dataLoginApi) {
          const dataLogin: Datalogin = JSON.parse(dataLoginApi);

          // console.log("khach", userData[0].tinh_trang_hop_dong);
          // console.log("hopdong", dataLogin);
        }

        let id_hop_dong = userData.id
        console.log("id hop dong:", id_hop_dong);

        const clearLocalStorage = () => {
          // Clear localStorage
          localStorage.clear();
          // Redirect to login page if local storage is not present
          window.location.href = '/pages/login';
        };

        const clearLocalStorageIfTimeOut = () => {
          const storedTimestamp = localStorage.getItem('clearTimestamp');
          const currentTime = new Date().getTime();

          if (!storedTimestamp) {
            // Nếu chưa có timestamp, lưu timestamp vào localStorage
            localStorage.setItem('clearTimestamp', currentTime.toString());
          } else {
            // Nếu đã có timestamp, kiểm tra thời gian
            const storedTime = parseInt(storedTimestamp, 10);
            const elapsedTime = currentTime - storedTime;

            if (elapsedTime >= 1 * 60 * 60 * 1000) {
              // Nếu đã qua 2 giờ, xóa dữ liệu và cập nhật timestamp mới
              clearLocalStorage();
              localStorage.setItem('clearTimestamp', currentTime.toString());
            }
          }
        }

        const fetchData = async () => {
          try {
            const response = await fetch("https://ad.tro4u.com/api/version/1.0/hopdong/get-chi-tiet-hop-dong", {

              method: "POST",
              body: JSON.stringify({
                id_hop_dong
              }),
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true"
              }
            })

            const dataApi: ApiHopdongResponse = await response.json();
            setDataSession(dataApi)
            setIsLoading(false)
            setGiathue(dataApi.data.hopDong.gia_thue)
            setTenphong(dataApi.data.hopDong.phong.ten)
          }
          catch (error) {
            console.log(error);
          }
        }

        const fetchdataHoadon = async () => {
          try {
            const response = await fetch("https://ad.tro4u.com/api/version/1.0/hoadon/get-all-hoa-don-by-idhd", {

              method: "POST",
              body: JSON.stringify({
                id_hop_dong
              }),
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true"
              }

            })
            const dataHoadon: ApiHoaDonResponse = await response.json()
            console.log("data hoas don", dataHoadon);

            setHoadonApi(dataHoadon)
          } catch (error) {
            console.log(error);

          }
        }
        clearLocalStorageIfTimeOut()
        fetchdataHoadon()
        fetchData();
      }
    }

  }, []);

  console.log("data session", dataSession);
  console.log("data session232", hoadonApi);

  const styleCircle = {

    '.MuiCircularProgress-circle': {
      color: "#fff !important"
    }

  }
  const styleTimelineText = {
    fontWeight: 'bold',
    "@media (max-width: 768px)": {
      fontSize: '0.8rem'
    }

  }
  const styleDividerTimeline = {
    width: '2px',
    height: '30px',
    marginBottom: '-10px',

  }
  const styleTitleTimeline = {
    color: "#15a35e",
    fontWeight: 'bold',
    fontSize: '20px',
    textAlign: 'left',
    margin: '15px 0 10px',
    "@media (max-width: 768px)": {
      fontSize: '15px',
    }
  }


  console.log("api hoa don", hoadonApi);
  // console.log("chi tiet hoa don222", chitiethoadonallThang?.filter((items) => items[1].thang.includes(thang.toString())));




  // const thangThuTien = (arr: IHoaDonResponseArray | undefined) => {
  //   const date = new Date()
  //   const thang = date.getMonth() + 1
  //   const nam = date.getFullYear()
  //   const ngay = date.getDate()
  //   const thangFormatted = thang.toString().padStart(2, '0');
  //   let thangs = arr?.filter((items) => items[1].thang.includes(thang.toString()))

  //   console.log("tháng", thangs);

  //   const ngayThangNamFormatted = "12/2023";
  //   // console.log("ngayfthangnawm", ngayThangNamFormatted);
  //   // console.log(" tháng ", chitiethoadonallThang?.map(item => item[1].thang));

  //   // const allMonth =  arr?.map((item, index) => item[1].thang.fil)
  //   // console.log("all thág", allMonth);


  //   // if(thangs?.find((items) => items[1].thang == ngayThangNamFormatted))
  //   //  {
  //   //   console.log("bằng nhausdsd ->>>> ", thangs[]);

  //   //  }
  //   //  else {
  //   //   console.log("khác nhau");
  //   //  }






  // }
  // thangThuTien(chitiethoadonallThang)



  const dinhDangSo = (so?: number) => {
    if (so) {
      // Sử dụng toLocaleString để định dạng số
      var chuoiDinhDang = Number(so).toLocaleString('vi-VN');
      return chuoiDinhDang;
    }

  }
  const dinhDangNgayThang = (chuoiNgayThang?: string) => {
    // Chuyển đổi thành đối tượng Date
    if (chuoiNgayThang) {
      var ngayThang = new Date(chuoiNgayThang);

      // Lấy thông tin về ngày, tháng, năm
      var ngay = ngayThang.getDate();
      var thang = ngayThang.getMonth() + 1; // Tháng bắt đầu từ 0
      var nam = ngayThang.getFullYear();

      // Định dạng lại theo yêu cầu
      var chuoiDinhDang = (ngay < 10 ? '0' : '') + ngay + '/' + (thang < 10 ? '0' : '') + thang + '/' + nam;

      return chuoiDinhDang;
    }

  }

  // const dateString = new Date();
  // const getday= dateString.getDate()

  // // Chuyển đổi chuỗi thành đối tượng Date
  // const targetDate = new Date(`${dateString}-28T00:00:00Z`);
  // console.log(getday);


  if (isLoading) {
    // Render a loading indicator or any other UI while waiting for data
    return <Loading />;
  }
  return (
    <React.Fragment>
      {dataSession &&
        dataSession.data.hopDong.tinh_trang_hop_dong === "Cho thuê" &&
        dataSession?.data.hopDong.ngay_xac_nhan || dataSession &&
        dataSession.data.hopDong.signature ?


        <ContainerComponent>
          <Stack direction={{ xs: 'column', md: 'row', lg: 'row' }} width=" 100%" gap='20px'>
            <div className="wrapp-container--left">
              <Stack style={{ padding: "10px 5px", height: '100%' }} spacing={4} alignItems='center' justifyContent='center'>
                {hoadonApi && hoadonApi.data.allThang.map((item) => {
                  return (
                    <Stack key={item.thang} direction='column' alignItems='center' justifyContent='center' gap={5}>
                      <Stack>
                        <Typography sx={{ fontWeight: '600', color: '#a3a3a3' }}>Hóa đơn tháng {item.thang}</Typography>
                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>Tổng tiền: {formatNumber(item.tong_tien)}</Typography>
                        <span style={{ textAlign: 'center', fontStyle: 'italic', color: '#15a35e', cursor: 'pointer' }} onClick={() => handleOpenModalBill(item)}>Xem chi tiết</span>
                      </Stack>

                      <Stack>
                        <Typography sx={{ fontWeight: '600', color: '#a3a3a3' }}>Tiền đã thanh toán</Typography>
                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                          {item.hoa_don_thu.length > 0 ? formatNumber(item.hoa_don_thu.reduce((acc, curr) => acc + curr.tong_tien, 0)) : 0}
                          /
                          <span style={{ color: "red" }}>{formatNumber(item.tong_tien)}</span></Typography>
                        <Typography sx={{ textAlign: 'center', fontStyle: 'italic', color: '#15a35e', cursor: 'pointer' }} onClick={() => handleOpenModalPayed(item)}>Xem chi tiết</Typography>
                      </Stack>

                    </Stack>
                  )
                })}

                <Stack direction='row' alignItems='center' justifyContent='center' spacing={2}>
                  <Stack>

                    <Button style={{ backgroundColor: "#15a35e", color: "#fff", textTransform: "none", display: 'flex', gap: '5px' }} onClick={handleOpenModalTransfer}>
                      <ContactMailIcon />
                      <span>Báo chuyển khoản</span>

                    </Button>
                  </Stack>
                  <Stack>

                    <Button style={{ backgroundColor: "red", color: "#fff", textTransform: "none", display: 'flex', gap: '5px' }} onClick={handleOpenModalTransferPointment}>
                      <EditCalendarIcon />
                      <span>Hẹn thanh toán</span>

                    </Button>
                  </Stack>


                </Stack>
                <Stack direction='column' alignItems='center' justifyContent='center'>
                  <Typography sx={{ color: "silver", textAlign: "center" }}>Bạn vui lòng nhấn vào số tiền để xem chi tiết hóa đơn</Typography>
                  <Typography sx={{ color: "silver", textAlign: "center" }}>Mọi thắc mắc vui lòng liên hệ về <span style={{ color: "#15a35e" }}>hotline</span> hoặc <span style={{ color: "#15a35e" }}>zalo 0398.771.881</span></Typography>
                </Stack>
              </Stack>

            </div>
            <div className="wrapp-container--right">
              <Stack direction='column' style={{ padding: '8px 16px' }} >
                <Stack >
                  <Typography sx={styleTitleTimeline}>THANH TOÁN TIỀN CHUYỂN KHOẢN</Typography>

                  <Stack direction='row' alignItems='center' gap='10px' marginBottom='14px'>
                    <Stack direction='column' justifyContent='center' alignItems='center' gap='10px'>
                      <Divider orientation='vertical' style={{ color: 'red', width: '2px', height: '10px', marginTop: '-15px' }} />
                      <AccountBalanceOutlinedIcon className='icon-timeline' />
                      <Divider orientation='vertical' style={styleDividerTimeline} />
                    </Stack>
                    <Stack>
                      <Typography sx={styleTimelineText}>Bước 1: Chuyển khoản về ngân hàng ACB</Typography>
                      <Typography sx={{ color: '#a3a3a3', }}>STK: <span style={{ color: 'red', fontWeight: 'bold' }}> 91881 - Phan Thi Kim Loan</span></Typography>
                      <Typography sx={styleTimelineText}> <span style={{ fontWeight: '500', color: '#a3a3a3' }}>Nội dung: ghi rõ</span>  <span style={{ color: '#15a35e', fontWeight: 'bold' }}>Số điện thoại</span> hoặc <span style={{ color: '#15a35e', fontWeight: 'bold' }}>Mã phòng</span></Typography>
                    </Stack>
                  </Stack>

                  <Stack direction='row' alignItems='center' gap='10px' marginBottom='14px'>
                    <Stack direction='column' justifyContent='center' alignItems='center' gap='10px'>

                      <NotificationsActiveOutlinedIcon className='icon-timeline' />
                      <Divider orientation='vertical' style={styleDividerTimeline} />
                    </Stack>
                    <Stack>
                      <Typography sx={styleTimelineText}>Bước 2: Báo chuyển khoản</Typography>
                      <Typography sx={styleTimelineText}><span style={{ color: "#a3a3a3", fontWeight: '500' }}>Đăng nhập vào website: khach.nhatro.3t.com</span> </Typography>
                      <Typography sx={styleTimelineText}><span style={{ color: "#a3a3a3", fontWeight: '500' }}>Nhấn vào nút Báo chuyển khoản</span></Typography>
                    </Stack>
                  </Stack>

                  <Stack direction='row' alignItems='center' gap='10px' marginBottom='14px'>
                    <Stack direction='column' justifyContent='center' alignItems='center' gap='10px'>

                      <ArticleOutlinedIcon className='icon-timeline' />
                      <Divider orientation='vertical' style={styleDividerTimeline} />
                    </Stack>
                    <Stack>
                      <Typography sx={styleTimelineText}>Bước 3: Cung cấp sao kê</Typography>
                      <Typography sx={styleTimelineText}><span style={{ color: "#a3a3a3", fontWeight: '500' }}>Nhập số tiền đã chuyển khoản kèm hình sao kê</span> </Typography>

                    </Stack>
                  </Stack>

                  <Stack direction='row' alignItems='center' gap='10px' marginBottom='20px'>
                    <Stack direction='column' justifyContent='center' alignItems='center' gap='10px'>

                      <PriceCheckOutlinedIcon className='icon-timeline' />

                    </Stack>
                    <Stack>
                      <Typography sx={styleTimelineText}>Bước 4: Xác nhận tiền</Typography>
                      <Typography sx={styleTimelineText}><span style={{ color: "#a3a3a3", fontWeight: '500' }}>Kế toán sẽ kiểm tra sao kê và xác nhận</span> </Typography>

                    </Stack>
                  </Stack>

                </Stack>


                <Stack >
                  <Typography sx={styleTitleTimeline}>THANH TOÁN BẰNG TIỀN MẶT</Typography>

                  <Stack direction='row' alignItems='center' gap='10px' marginBottom='14px'>
                    <Stack direction='column' justifyContent='center' alignItems='center' gap='10px'>
                      <Divider orientation='vertical' style={{ color: 'red', width: '2px', height: '10px', marginTop: '-15px' }} />
                      <CheckCircleOutlineOutlinedIcon className='icon-timeline' />
                      <Divider orientation='vertical' style={styleDividerTimeline} />
                    </Stack>
                    <Stack>
                      <Typography sx={styleTimelineText}>Bước 1: Hẹn thanh toán</Typography>
                      <Typography sx={styleTimelineText}><span style={{ fontWeight: '500', color: '#a3a3a3' }}>Nhấn vào nút hen thanh toán bên trên</span></Typography>

                    </Stack>
                  </Stack>

                  <Stack direction='row' alignItems='center' gap='10px' marginBottom='14px'>
                    <Stack direction='column' justifyContent='center' alignItems='center' gap='10px'>

                      <AlarmOnOutlinedIcon className='icon-timeline' />
                      <Divider orientation='vertical' style={styleDividerTimeline} />
                    </Stack>
                    <Stack>
                      <Typography sx={styleTimelineText}>Bước 2: Chọn thời gian phù hợp</Typography>

                      <Typography sx={styleTimelineText}><span style={{ fontWeight: '500', color: '#a3a3a3' }}>Nhập thời gian phù hợp để nhân viên qua thu trực tiếp</span></Typography>
                    </Stack>
                  </Stack>

                  <Stack direction='row' alignItems='center' gap='10px' marginBottom='14px'>
                    <Stack direction='column' justifyContent='center' alignItems='center' gap='10px'>

                      <CurrencyExchangeOutlinedIcon className='icon-timeline' sx={{ marginTop: '-40px' }} />

                    </Stack>
                    <Stack>
                      <Typography sx={styleTimelineText}>Bước 3: Nhân viên đến thu tiền</Typography>
                      <Typography sx={styleTimelineText}><span style={{ fontWeight: '500', color: '#a3a3a3' }}>Đến thời gian hẹn nhân viên sẽ gọi điện liên hệ để thu tiền</span></Typography>
                      <Typography sx={styleTimelineText}><span style={{ fontWeight: '500', color: '#a3a3a3' }}>Lưu ý phụ thu 10.000đ/lần</span></Typography>
                    </Stack>
                  </Stack>



                </Stack>


              </Stack>
            </div>
            <DialogBill open={openModalBill} close={handleCloseModalBill} dataBill={dataBill} tenphong={tenphong} />
            <DialogPayed open={openModalPayed} close={handleCloseModalPayed} dataBill={dataBill} />
            <DialogTransfer
              open={openModalTransfer}
              close={handleCloseModalTransfer}
              id_hop_dong={dataSession && dataSession?.data.hopDong.id}
              sdt_khach={dataSession && dataSession?.data.hopDong.khach.sdt_khach}
            />
            <DialogTransferPointment
              open={openModalTransferPointment}
              close={handleCloseModalTransferPointment}
              id_hop_dong={dataSession && dataSession?.data.hopDong.id}
              id_hoa_don={hoadonApi && hoadonApi.data.hoaDonNow && hoadonApi.data.hoaDonNow.id}
            />
          </Stack>
        </ContainerComponent>


        :


        <ContainerComponent2>
          <Stack direction={{ xs: 'column', md: 'row', lg: 'row' }} width=" 100%" gap='10px'>
            <div className="wrapp-container2--left">
              <Stack padding="12px 10px" spacing={2}>
                <Typography sx={{ fontSize: '24px', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>Xác nhận đặt cọc</Typography>

                <Stack direction="row" spacing={1}>
                  <Typography>Tên người nộp tiền:</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>{dataSession && dataSession?.data.hopDong.khach.ten_khach}</Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Typography>Điện thoại: </Typography>
                  <Typography sx={{ fontWeight: "bold" }}>{dataSession && dataSession?.data.hopDong.khach.sdt_khach}</Typography>
                </Stack>


                <Stack direction="row" spacing={1}>
                  <Typography>Số tiền nộp:</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>{dataSession && dinhDangSo(dataSession?.data.hopDong.tien_coc)}</Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Typography sx={{ whiteSpace: 'nowrap' }}>Lý do:</Typography>
                  <Typography >Đặt cọc giữ chỗ thuê <span style={{ fontWeight: 'bold' }}>{dataSession && dataSession?.data.hopDong.phong.loai} {dataSession && dataSession?.data.hopDong.phong.ten} </span>  đến ngày <span style={{ fontWeight: 'bold' }}>{dataSession && dinhDangNgayThang(dataSession.data.hopDong.ngay_het_han)} </span>với các thỏa thuận sau: </Typography>
                </Stack>

                <Stack padding="12px 20px" spacing={0} alignItems='center' justifyContent='center'>
                  <Stack direction="row" width="100%" spacing={2}>
                    <Typography sx={{ width: "100%", flex: '1', textAlign: 'right' }}>Tiền thuê:</Typography>
                    <Typography sx={{ fontWeight: "bold", flex: '1' }}>{dataSession && dinhDangSo(dataSession?.data.hopDong.gia_thue)}</Typography>
                  </Stack>

                  <Stack direction="row" width="100%" spacing={2}>
                    <Typography sx={{ width: "100%", flex: '1', textAlign: 'right' }}>Tiền điện:</Typography>
                    <Typography sx={{ fontWeight: "bold", flex: '1' }}>3.500</Typography>
                  </Stack>

                  <Stack direction="row" width="100%" spacing={2}>
                    <Typography sx={{ flex: '1', textAlign: 'right' }}>Tiền nước:</Typography>
                    <Typography sx={{ fontWeight: "bold", flex: '1', textAlign: 'left' }}>80.000</Typography>
                  </Stack>

                  <Stack direction="row" width="100%" spacing={2}>
                    <Typography sx={{ flex: '1', textAlign: 'right' }}>Tiền Net:</Typography>
                    <Typography sx={{ fontWeight: "bold", flex: '1', textAlign: 'left' }}>	100.000</Typography>
                  </Stack>

                  <Stack direction="row" width="100%" spacing={2}>
                    <Typography sx={{ flex: '1', textAlign: 'right' }}>Tiền Rác:</Typography>
                    <Typography sx={{ fontWeight: "bold", flex: '1', textAlign: 'left' }}>	50.000</Typography>
                  </Stack>

                  <Stack direction="row" width="100%" spacing={2}>
                    <Typography sx={{ flex: '1', textAlign: 'right' }}>Tiền Xe:	</Typography>
                    <Typography sx={{ fontWeight: "bold", flex: '1', textAlign: 'left' }}>100.000</Typography>
                  </Stack>

                  <Stack direction="row" width="100%" spacing={2}>
                    <Typography sx={{ flex: '1', textAlign: 'right', whiteSpace: 'nowrap' }}>Thời gian hợp đồng:</Typography>
                    <Typography sx={{ fontWeight: "bold", flex: '1', textAlign: 'left' }}>{dataSession && dataSession?.data.hopDong.han_hop_dong} từ {dataSession && dinhDangNgayThang(dataSession.data.hopDong.ngay_het_han)}</Typography>
                  </Stack>

                </Stack>



              </Stack>

            </div>


            <div className="wrapp-container2--right">
              <Stack direction='column' padding="12px 10px" height="100%" justifyContent='space-around' gap={4}>
                <Stack direction="column" spacing={1}>
                  <Typography sx={{ color: 'red', textDecoration: 'underline', fontWeight: 'bold' }}>Lưu ý:</Typography>
                  <Stack direction='row' gap={1} alignItems='center'>
                    <Typography sx={{ color: 'red' }}>1.</Typography>
                    <Typography sx={{ color: "red", }}>Số tiền đã nộp trên sẽ được trừ vào tiền đặt cọc ký kết hợp đồng</Typography>
                  </Stack>
                  <Stack direction='row' gap={1} alignItems='flex-start'>
                    <Typography sx={{ color: 'red' }}>2.</Typography>
                    <Typography sx={{ color: "red", }}>Đến ngày <span style={{ fontWeight: 'bold' }}>{dataSession && dinhDangNgayThang(dataSession.data.hopDong.ngay_het_han)}</span>  người nộp tiền không ký hợp đồng sẽ chấp nhận bị mất toàn bộ số tiền đã trên.</Typography>
                  </Stack>
                  <Stack direction='row' gap={1} alignItems='center'>
                    <Typography sx={{ color: 'red' }}>3.</Typography>
                    <Typography sx={{ color: "red", }}>Mọi thắc mắc liên hệ hotline: <Link href='tel:0398771881'>0398 771 881</Link> </Typography>
                  </Stack>

                </Stack>

                <Stack direction='column' alignItems='center' justifyContent='center' sx={{ padding: '12px 10px', width: '100%', border: '1px solid black', borderRadius: '20px' }} spacing={0}>

                  <Stack direction='row' gap={1}>
                    <Typography sx={{ whiteSpace: 'nowrap' }}>Thời gian lập phiếu: </Typography>
                    <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>00:21 12/12/2023 </Typography>
                  </Stack>
                  <Stack direction='row' gap={1}>
                    <Typography sx={{ whiteSpace: 'nowrap' }}>Người lập phiếu:  </Typography>
                    <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Tên nhân sự </Typography>
                  </Stack>
                  <Stack direction='row' gap={1}>
                    <Typography sx={{ whiteSpace: 'nowrap' }}>Người Sale:  </Typography>
                    <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Tên nhân sự </Typography>
                  </Stack>
                  <Stack direction='row' gap={1}>
                    <Typography sx={{ whiteSpace: 'nowrap' }}>Người dẫn khách:  </Typography>
                    <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Tên nhân sự </Typography>
                  </Stack>
                </Stack>
              </Stack>

            </div>
          </Stack>
        </ContainerComponent2 >



      }


    </React.Fragment >


  )
}
