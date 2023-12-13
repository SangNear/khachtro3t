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

import { ApiHoaDonResponse, ThangData } from './api/hoadon'
export default function Home() {
  const [openModalBill, setOpenModalBill] = useState(false)
  const [dataBill, setdataBill] = useState<ThangData | undefined>()
  const [hoadonApi, setHoadonApi] = useState<ApiHoaDonResponse>()
  const [giathue, setGiathue] = useState(0)


  const handleOpenModalBill = (data: ThangData) => {
    setOpenModalBill(!openModalBill)
    setdataBill(data)
  }

  const handleCloseModalBill = () => {
    setOpenModalBill(false)
  }




  const [dataSession, setDataSession] = useState<ApiHopdongResponse>()
  const [isLoading, setIsLoading] = useState(true);

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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

        const userData: DataApi = JSON.parse(userApi);


        if (dataLoginApi) {
          const dataLogin: Datalogin = JSON.parse(dataLoginApi);

          // console.log("khach", userData.tinh_trang_hop_dong);
          // console.log("hopdong", dataLogin);
        }

        let id_hop_dong = userData.id

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
              }
            })

            const dataApi: ApiHopdongResponse = await response.json();


            setDataSession(dataApi)
            setIsLoading(false)
            setGiathue(dataApi.data.hopDong.gia_thue)
          }
          catch (error) {

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
              }
            })
            const dataHoadon: ApiHoaDonResponse = await response.json()
            setHoadonApi(dataHoadon)



            // const allthangObject = dataHoadon.data.allThang
            // console.log("all tháng ", allthangObject);



            // if (typeof allthangObject === 'object' && allthangObject !== null) {
            //   const result: ThangHientai | undefined = convertArrayToObject(Object.entries(allthangObject));
            //   console.log("result", result);
            //   setChitiethoadonallThang(result);
            // } else {
            //   // Handle the case when allthangObject is not an object or is null
            // }


          } catch (error) {

          }
        }

        clearLocalStorageIfTimeOut()
        fetchdataHoadon()
        fetchData();




      }
    }

  }, []);

  console.log("data session", dataSession?.data.hopDong.gia_thue);


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
    marginBottom: '10px',
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
      {dataSession && dataSession.data.hopDong.tinh_trang_hop_dong === "Cho thuê" && dataSession?.data.hopDong.ngay_xac_nhan ?


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
                        <Typography sx={{ textAlign: 'center', fontStyle: 'italic', color: '#15a35e', cursor: 'pointer' }}>Xem chi tiết</Typography>
                      </Stack>

                    </Stack>
                  )
                })}

                <Stack direction='row' alignItems='center' justifyContent='center' spacing={2}>
                  <Button style={{ backgroundColor: "#15a35e", color: "#fff", textTransform: "none" }} onClick={handleOpenModalTransfer}>Báo chuyển khoản</Button>
                  <Button style={{ backgroundColor: "red", color: "#fff", textTransform: "none" }} onClick={handleOpenModalTransferPointment}>Hẹn thanh toán</Button>
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
                  <Typography sx={styleTitleTimeline}>HƯỚNG DẪN THANH TOÁN TIỀN</Typography>

                  <Stack direction='row' alignItems='center' gap='10px' marginBottom='14px'>
                    <Stack direction='column' justifyContent='center' alignItems='center' gap='10px'>
                      <Divider orientation='vertical' style={{ color: 'red', width: '2px', height: '10px', marginTop: '-15px' }} />
                      <AccountBalanceOutlinedIcon className='icon-timeline' />
                      <Divider orientation='vertical' style={styleDividerTimeline} />
                    </Stack>
                    <Stack>
                      <Typography sx={styleTimelineText}>Bước 1: Chuyển khoản về ngân hàng ACB</Typography>
                      <Typography sx={styleTimelineText}>STK: <span style={{ color: 'red' }}> 91881 - Phan Thi Kim Loan</span></Typography>
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
                  <Typography sx={styleTitleTimeline}>HƯỚNG DẪN THANH TOÁN BẰNG TIỀN MẶT</Typography>

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
            <DialogBill open={openModalBill} close={handleCloseModalBill} dataBill={dataBill} giathue={giathue} />
            <DialogTransfer open={openModalTransfer} close={handleCloseModalTransfer} />
            <DialogTransferPointment open={openModalTransferPointment} close={handleCloseModalTransferPointment} />
          </Stack>
        </ContainerComponent>


        :


        <ContainerComponent2>
          <Stack direction={{ xs: 'column', md: 'row', lg: 'row' }} width=" 100%" gap='10px'>
            <div className="wrapp-container2--left">
              <Stack padding="12px 20px" spacing={2}>
                <Typography sx={{ fontSize: '24px', textAlign: 'center', fontWeight: 'bold' }}>Thông tin người đặt cọc</Typography>
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
                  <Typography sx={{}}>Đặt cọc giữ chỗ thuê <span style={{ fontWeight: 'bold' }}>{dataSession && dataSession?.data.hopDong.phong.loai} {dataSession && dataSession?.data.hopDong.phong.ten} </span>  đến ngày <span style={{ fontWeight: 'bold' }}>01/12/2023</span> </Typography>
                </Stack>

                <Stack direction="column" spacing={1}>
                  <Typography>Lưu ý:</Typography>
                  <Typography sx={{ color: "red", fontStyle: 'italic', fontSize: '14px' }}>- Số tiền đã nộp trên sẽ được trừ vào tiền đặt cọc ký kết hợp đồng</Typography>
                  <Typography sx={{ color: "red", fontStyle: 'italic', fontSize: '14px' }}>- Đến ngày <span style={{ fontWeight: 'bold' }}>01/12/2023</span>  người nộp tiền không ký hợp đồng sẽ chấp nhận bị mất toàn bộ số tiền đã trên.</Typography>
                  <Typography sx={{ color: "red", fontStyle: 'italic', fontSize: '14px' }}>- Mọi thắc mắc liên hệ hotline: <span>0398.771.881</span> </Typography>
                </Stack>

              </Stack>

            </div>


            <div className="wrapp-container2--right">
              <Stack direction='column' justifyContent='space-between'>
                <Stack padding="12px 20px" spacing={2} alignItems='center' justifyContent='center'>
                  <Typography sx={{ fontSize: '24px', textAlign: 'center', fontWeight: 'bold' }}>Thỏa thuận thuê</Typography>
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
                    <Typography sx={{ flex: '1', textAlign: 'right' }}>Thời gian hợp đồng:</Typography>
                    <Typography sx={{ fontWeight: "bold", flex: '1', textAlign: 'left' }}>{dataSession && dataSession?.data.hopDong.han_hop_dong} từ 01/12/2023</Typography>
                  </Stack>





                </Stack>

                <Stack sx={{ padding: '12px 20px', width: '100%', backgroundColor: '#15a35e', borderRadius: '6px' }} spacing={1}>
                  <Stack direction='row' spacing={1}>
                    <Typography sx={{ color: "#333", fontWeight: 'bold' }}>Người sale:</Typography>
                    <Typography sx={{ fontWeight: 'bold', color: "#fff" }}></Typography>
                  </Stack>

                  <Stack direction='row' spacing={1}>
                    <Typography sx={{ color: "#333", fontWeight: 'bold' }}>Người lập phiếu:</Typography>
                    <Typography sx={{ fontWeight: 'bold', color: "#fff" }}>{dataSession && dataSession?.data.hopDong.user_tao.name} - {dataSession && dataSession?.data.hopDong.user_tao.phone}</Typography>
                  </Stack>

                  <Stack direction='row' spacing={1}>
                    <Typography sx={{ color: "#333", fontWeight: 'bold' }}>Thời gian:</Typography>
                    <Typography sx={{ fontWeight: 'bold', color: "#fff" }}>00:00 01/12/2023</Typography>
                  </Stack>

                </Stack>
              </Stack>

            </div>
          </Stack>
        </ContainerComponent2>



      }


    </React.Fragment>


  )
}
