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
import { HoadonApi, IHoaDonAllthangData } from './api/hoadon'
import { CircularProgress, LinearProgress } from '@mui/material'




export default function Home() {
  const [openModalBill, setOpenModalBill] = useState(false)
  const [dataMoney, setDataMoney] = useState<number>(0)
  const [hoadonApi, setHoadonApi] = useState<HoadonApi>()
  const [statusHopdong, setStatusHopdong] = useState('')
  const [chitiethoadonallThang, setChitiethoadonallThang] = useState<IHoaDonResponseArray>()

  const handleOpenModalBill = (data: number) => {
    setOpenModalBill(!openModalBill)
    setDataMoney(data)
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
      const clearLocalStorage = () => {
        // Clear localStorage
        localStorage.clear();
        // Redirect to login page if local storage is not present
        window.location.href = '/pages/login';
      };

      if (!userApi) {
        // Redirect to login page if local storage is not present
        // Replace '/login' with your actual login page route
        window.location.href = '/pages/login';
      } else {

        const userData: DataApi = JSON.parse(userApi);


        if (dataLoginApi) {
          const dataLogin: Datalogin = JSON.parse(dataLoginApi);
          setStatusHopdong(userData.tinh_trang_hop_dong)
          // console.log("khach", userData.tinh_trang_hop_dong);
          // console.log("hopdong", dataLogin);
        }

        const lastAccessTimestamp = localStorage.getItem('lastAccessTimestamp') || new Date().toDateString();
        // Check if the current date is different from the stored date
        const currentDate = new Date().toDateString();

        if (lastAccessTimestamp !== currentDate) {
          // If the dates are different, clear localStorage and update the timestamp
          clearLocalStorage();
          localStorage.setItem('lastAccessTimestamp', currentDate);
        }


        let id_hop_dong = userData.id
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
            const dataHoadon: HoadonApi = await response.json()
            setHoadonApi(dataHoadon)


            const allthangObject = dataHoadon.data.allThang

            if (typeof allthangObject === 'object' && allthangObject !== null) {
              const result = Object.entries(allthangObject);
              console.log("result", result);
              setChitiethoadonallThang(result)
            } else {

            }


          } catch (error) {

          }
        }
        fetchdataHoadon()
        fetchData();




      }
    }

  }, []);

  const styleCircle = {

    '.MuiCircularProgress-circle': {
      color: "#fff !important"
    }

  }

  console.log("api hoa don", hoadonApi);
  console.log("chi tiet hoa don", chitiethoadonallThang);
  const dinhDangSo = (so?: number) => {
    if (so) {
      // Sử dụng toLocaleString để định dạng số
      var chuoiDinhDang = Number(so).toLocaleString('vi-VN');
      return chuoiDinhDang;
    }

  }
  console.log("data>>>>>>", dataSession);

  if (isLoading) {
    // Render a loading indicator or any other UI while waiting for data
    return <Loading />;
  }
  return (
    <React.Fragment>
      {dataSession && dataSession.data.hopDong.tinh_trang_hop_dong === "Cho thuê" && dataSession?.data.hopDong.ngay_xac_nhan ?


        <ContainerComponent>
          <Stack direction={{ xs: 'column', md: 'row', lg: 'row' }} width=" 100%" gap='10px'>
            <div className="wrapp-container--left">
              <Stack style={{ padding: "10px 5px" }} spacing={4}>
                <table style={{ width: "100%" }}>
                  <thead>

                    <tr >
                      <th style={{ fontSize: "14px", height: "60px", borderRadius: "6px", backgroundColor: "#15a35e", color: "#fff" }}>
                        CHI PHÍ
                      </th>
                      {chitiethoadonallThang ? chitiethoadonallThang && chitiethoadonallThang.map((item) => {
                        return (
                          <th key={item[0]} style={{ fontSize: "14px", height: "60px", borderRadius: "6px", backgroundColor: "#15a35e", color: "#fff" }}>
                            {item[0]}
                          </th>
                        )
                      })
                        :
                        <>
                          <th style={{ fontSize: "14px", height: "60px", borderRadius: "6px", backgroundColor: "#15a35e", color: "#fff" }}>
                            <CircularProgress sx={styleCircle} size={30} />
                          </th>
                          <th style={{ fontSize: "14px", height: "60px", borderRadius: "6px", backgroundColor: "#15a35e", color: "#fff" }}>
                            <CircularProgress sx={styleCircle} size={30} />
                          </th>
                          <th style={{ fontSize: "14px", height: "60px", borderRadius: "6px", backgroundColor: "#15a35e", color: "#fff" }}>
                            <CircularProgress sx={styleCircle} size={30} />
                          </th>
                        </>

                      }



                    </tr>
                  </thead>

                  <tbody>

                    <tr>
                      <th style={{ fontSize: "12px", borderRight: "1px solid #ccc", borderBottom: "1px solid #ccc", width: "160px", whiteSpace: 'nowrap' }}>
                        Tiền cần thanh toán
                      </th>
                      {chitiethoadonallThang ? chitiethoadonallThang && chitiethoadonallThang.map(item => {
                        return (

                          <th key={item[0]} style={{ fontSize: "12px", borderRight: "1px solid #ccc", borderBottom: "1px solid #ccc" }}>
                            <Stack direction='column' spacing={2} padding='5px 5px'>
                              {formatNumber(item[1].tong_tien)}

                              <span style={{ color: "#15a35e", fontSize: "10px", marginTop: "10px", cursor: 'pointer', }} onClick={() => handleOpenModalBill(item[1].tong_tien)}>Xem chi tiết</span>
                            </Stack>
                          </th>

                        )
                      })
                        :
                        <>
                          <th style={{ fontSize: "12px", borderRight: "1px solid #ccc", borderBottom: "1px solid #ccc" }}>
                            <Stack direction='column' spacing={2} padding='5px 5px' justifyContent='center' alignItems='center'>
                              <CircularProgress color='success' size={30} />
                            </Stack>

                          </th>

                          <th style={{ fontSize: "12px", borderRight: "1px solid #ccc", borderBottom: "1px solid #ccc" }}>
                            <Stack direction='column' spacing={2} padding='5px 5px' justifyContent='center' alignItems='center'>
                              <CircularProgress color='success' size={30} />
                            </Stack>

                          </th>

                          <th style={{ fontSize: "12px", borderRight: "1px solid #ccc", borderBottom: "1px solid #ccc" }}>
                            <Stack direction='column' spacing={2} padding='5px 5px' justifyContent='center' alignItems='center'>
                              <CircularProgress color='success' size={30} />
                            </Stack>

                          </th>
                        </>
                      }
                    </tr>

                    <tr>
                      <th style={{ fontSize: "12px", borderRight: "1px solid #ccc", borderBottom: "1px solid #ccc", width: "160px" }}>
                        Tiền đã thanh toán
                      </th>
                      {chitiethoadonallThang ? chitiethoadonallThang && chitiethoadonallThang.map((item) => {
                        return (
                          <th key={item[0]} style={{ fontSize: "12px", borderRight: "1px solid #ccc", borderBottom: "1px solid #ccc" }}>
                            <Stack direction='column' spacing={2} padding='5px 5px'>
                              {item[1].hoa_don_thu.reduce((accmulator, curr) => {
                                let totalBill = accmulator + curr.tong_tien
                                return totalBill
                              }, 0)}
                              <span style={{ color: "#15a35e", fontSize: "10px", marginTop: "10px", cursor: 'pointer' }}>Xem chi tiết</span>
                            </Stack>

                          </th>
                        )
                      })
                        :
                        <>
                          <th style={{ fontSize: "12px", borderRight: "1px solid #ccc", borderBottom: "1px solid #ccc" }}>
                            <Stack direction='column' spacing={2} padding='5px 5px' justifyContent='center' alignItems='center'>
                              <CircularProgress color='success' size={30} />
                            </Stack>

                          </th>

                          <th style={{ fontSize: "12px", borderRight: "1px solid #ccc", borderBottom: "1px solid #ccc" }}>
                            <Stack direction='column' spacing={2} padding='5px 5px' justifyContent='center' alignItems='center'>
                              <CircularProgress color='success' size={30} />
                            </Stack>
                          </th>

                          <th style={{ fontSize: "12px", borderRight: "1px solid #ccc", borderBottom: "1px solid #ccc" }}>
                            <Stack direction='column' spacing={2} padding='5px 5px' justifyContent='center' alignItems='center'>
                              <CircularProgress color='success' size={30} />
                            </Stack>

                          </th>
                        </>
                      }
                    </tr>

                    <tr style={{ height: '40px', backgroundColor: "red" }} >
                      <th style={{ color: "#fff", fontSize: "12px", borderRight: "1px solid #ccc", borderBottom: "1px solid #ccc", width: "160px" }}>
                        Dư nợ
                      </th>

                      <th style={{ fontSize: "12px", borderRight: "1px solid #ccc", borderBottom: "1px solid #ccc" }}>
                        <span style={{ color: "#fff", fontSize: "14px", }}>0</span>
                      </th>
                      <th style={{ fontSize: "12px", borderRight: "1px solid #ccc", borderBottom: "1px solid #ccc" }}>
                        <span style={{ color: "#fff", fontSize: "14px", }}>0</span>
                      </th>
                      <th style={{ fontSize: "12px", borderRight: "1px solid #ccc", borderBottom: "1px solid #ccc" }}>
                        <span style={{ color: "#fff", fontSize: "14px", }}>0</span>
                      </th>
                    </tr>
                  </tbody>

                </table>
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
              <Stack direction='column' style={{ padding: '8px 16px' }}>
                <Typography sx={{ color: "#15a35e", fontWeight: 'bold', fontSize: '20px', textAlign: 'center', marginBottom: '24px' }}>HƯỚNG DẪN THANH TOÁN TIỀN</Typography>
                <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>1. Thanh toán tiền mặt tại công ty</Typography>
                <Typography sx={{ fontSize: '16px', color: "#969696", marginBottom: '5px' }}>Địa chỉ: Sảnh tòa nhà 41 An Nhơn, Phường 17, Quận Gò Vấp</Typography>
                <Typography sx={{ fontSize: '16px', color: "#969696", marginBottom: '24px' }}>Liên hệ: 0398.771.881</Typography>


                <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>2. Chuyển khoản qua ngân hàng</Typography>
                <Typography sx={{ fontSize: '16px', color: "#969696", marginBottom: '24px' }}>Nội dung chuyển khoản: <span style={{ color: "#15a35e", fontWeight: 'bold' }}>Ghi rõ họ tên + SĐT đang thuê</span>  hoặc <span style={{ color: "#15a35e", fontWeight: 'bold' }}>mã phòng</span> </Typography>
                <Stack direction='column' alignItems='center' justifyContent='center' sx={{ marginBottom: '24px' }}>
                  <Image src='https://khach.nhatro3t.com/template/img/bank/acb_qr.jpg' alt='bank' width={200} height={100} />
                  <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>104725269</Typography>
                </Stack>
                <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>3. Nhân viên đến thu trực tiếp</Typography>
                <Typography sx={{ fontSize: '16px', color: "#969696", marginBottom: '24px' }}>Liên hệ: 0398 771 881 (Phụ phí: 10.000vnđ/lần)</Typography>
              </Stack>
            </div>
            <DialogBill open={openModalBill} close={handleCloseModalBill} dataMoney={dataMoney} />
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
