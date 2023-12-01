"use client"
import ContainerComponent2 from '@/app/components/wrappComponent2/page'
import React, { useEffect, useState } from 'react'
import "./page.scss"
import { Divider, Stack, Typography } from '@mui/material'
import styled from 'styled-components'
const ContactPage = () => {

    const [hopdongApi, setHopdongApi] = useState<ApiHopdongResponse>()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userApi = window.localStorage.getItem('userData');
            if (!userApi) {
                // Redirect to login page if local storage is not present
                // Replace '/login' with your actual login page route
                window.location.href = '/pages/login';
            } else {
                const userData = JSON.parse(userApi)


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
                        });

                        const data: ApiHopdongResponse = await response.json();
                        setHopdongApi(data)
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                };

                fetchData();
            }
        }
    }, []);
    console.log("api hop dong", hopdongApi?.data.allKhachHD[0].ten_khach);

    // Gọi hàm async trong useEffect

    // Đối với trường hợp này, không có dependency array, nghĩa là hàm fetchData sẽ chạy mỗi khi component được render lại.


    return (
        <ContainerComponent2>
            <div className="contact-container">
                <div className="contact-container--top">
                    <Typography className="fontsize-mobile" style={{ textAlign: "center", fontSize: "18px" }}>Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "center", fontSize: "18px" }}>Độc lập - Tự do - Hạnh Phúc</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "center", fontSize: "18px", marginBottom: "16px" }}>--- o0o ---</Typography>
                    <Typography className="fontsize-mobile--tile" style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", textTransform: "uppercase" }}>HỢP ĐỒNG ĐIỆN TỬ CHO THUÊ</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", fontStyle: "italic", marginBottom: "16px" }}>Hôm nay, ngày 01/11/2023</Typography>


                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontWeight: "bold", fontSize: "18px", marginBottom: "4px" }}>BÊN A (BÊN CHO THUÊ):</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Ông: <b>Trần Hồng Hiệp</b></Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- CCCD: <b>079082008653</b></Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "16px" }}>- Điện thoại & Zalo: <b>0398.771.881</b></Typography>

                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontWeight: "bold", fontSize: "18px", marginBottom: "4px" }}>BÊN B (BÊN THUÊ):</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Ông/bà: <b style={{ color: 'blue' }}>{hopdongApi?.data.allKhachHD[0].ten_khach}</b></Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Điện thoại: <b style={{ color: 'blue' }}>{hopdongApi?.data.allKhachHD[0].sdt_khach}</b></Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "24px" }}>- CCCD: <b>{hopdongApi?.data.allKhachHD[0].cccd}</b></Typography>

                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "24px" }}>- Địa chỉ: 295B, Kp6, Hiệp Thành, Quận 12, TP.Hồ Chí Minh</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "center", fontSize: "18px", fontStyle: "italic", marginBottom: "24px" }}>Hợp đồng được lập ra được sự đồng ý của cả hai bên với các điều khoản sau:</Typography>


                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontWeight: "bold", fontSize: "18px", marginBottom: "4px" }}>Điều 1: THÔNG TIN THUÊ VÀ MỤC ĐÍCH THUÊ</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Bên A đồng ý cho Bên B thuê <b style={{ color: 'blue' }}>Phòng QX11</b> </Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Mục đích thuê: <b>Để ở đúng theo quy định pháp luật Việt Nam</b> </Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "24px" }}>- Tài sản bàn giao cho bên B như clip gồm:</Typography>

                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontWeight: "bold", fontSize: "18px", marginBottom: "4px" }}>Điều 2: THỜI HẠN HỢP ĐỒNG</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Thời hạn hợp đồng:  <b style={{ color: 'blue' }}>6 tháng</b> </Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Được tính từ ngày <b style={{ color: 'blue' }}>01/11/2023</b> đến ngày <b>01/05/2024</b> </Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "24px" }}>- Nếu đến ngày hết thời hạn hợp đồng, Bên thuê không thông báo kết thúc hợp đồng trước 30 ngày thì mặc định sẽ đồng ý tiếp tục gia hạn hợp đồng này thêm 06 tháng</Typography>

                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontWeight: "bold", fontSize: "18px", marginBottom: "4px" }}>Điều 3: TIỀN ĐẶT CỌC</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Tiền bên B đặt cọc cho bên A là  <b style={{ color: 'blue' }}>3.500.000</b> </Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Tiền đặt cọc không được dùng làm thay thế tiền thuê. </Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "24px" }}>- Điều kiện hoàn cọc cho bên B là: hết thời hạn hợp đồng và phải báo trước 30 ngày.</Typography>

                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontWeight: "bold", fontSize: "18px", marginBottom: "4px" }}>Điều 4: GIÁ CHO THUÊ</Typography>
                    {/* <Typography className="fontsize-mobile" style={{ textAlign: "center", fontSize: "18px", marginBottom: "4px" }}>Tiền thuê: <b>3.500.000</b> / tháng</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "center", fontSize: "18px", marginBottom: "4px" }}>Tiền điện: <b>3.500</b> / kwh</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "center", fontSize: "18px", marginBottom: "4px" }}>Tiền nước: <b>80.000</b> /người/tháng</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "center", fontSize: "18px", marginBottom: "4px" }}>Tiền Net: <b>100.000</b> / tháng</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "center", fontSize: "18px", marginBottom: "4px" }}>Tiền Rác: <b>50.000 </b> / tháng</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "center", fontSize: "18px", marginBottom: "4px" }}>Tiền Xe: <b>100.000</b> xe/tháng</Typography> */}
                    <Stack direction='column' spacing={1} marginBottom="24px">
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tiền thuê: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}><b style={{ color: 'blue' }} >3.500.000</b> / tháng </Typography>
                        </Stack>
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tiền điện: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}> <b style={{ color: 'blue' }} >3.500</b> / kwh </Typography>
                        </Stack>
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tiền nước: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}> <b style={{ color: 'blue' }} >80.000</b> /người/tháng </Typography>
                        </Stack>
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tiền Net: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}> <b style={{ color: 'blue' }} >100.000</b> /tháng </Typography>
                        </Stack>
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tiền Rác: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}> <b style={{ color: 'blue' }} >50.000</b> /tháng </Typography>
                        </Stack>
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tiền Xe: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}> <b style={{ color: 'blue' }} >100.000</b> /xe/tháng </Typography>
                        </Stack>
                    </Stack>


                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontWeight: "bold", fontSize: "18px", marginBottom: "4px" }}>Điều 5: PHƯƠNG THỨC THANH TOÁN</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Tiền thuê thu mỗi tháng một lần vào ngày <b style={{ color: 'blue' }}>1 đến 3</b> </Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Thanh toán đúng qua ngân hàng của:  <b>TRẦN HỒNG HIỆP</b> </Typography>
                    <Stack direction='column' spacing={1} marginBottom='24px'>
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Vietcombank </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}><b>0071 0024 4853 7</b> </Typography>
                        </Stack>

                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Vietinbank </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}><b>1018 7104 3785</b> </Typography>
                        </Stack>

                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Agribank </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}><b>6400 2054 7685 6</b> </Typography>
                        </Stack>

                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>ACB </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}><b>1047 2526 9</b> </Typography>
                        </Stack>
                    </Stack>


                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontWeight: "bold", fontSize: "18px", marginBottom: "8px" }}>Điều 6: QUY ĐỊNH VỚI BÊN THUÊ</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "8px" }}>1. Bên thuê phải thanh toán tiền thuê đúng ngày ghi tại Điều 5. Nếu vi phạm bên cho thuê có quyền chấm dứt
                        hợp đồng ngay lập tức và không cần hoàn trả lại toàn bộ tiền bên thuê đã đưa trước đó và buộc bên thuê phải dọn đi ngay lập tức.
                    </Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "8px" }}>2. Với các ngày chậm thanh toán phụ thu 50.000/ngày. Nếu thu tiền mặt sẽ phụ thu 10.000</Typography>

                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "8px" }}>3. Bên thuê phải chấp hành các quy định về trật tự, an ninh, phòng cháy chữa cháy. Chịu mọi trách nhiệm và bồi thường thiệt hại nếu để xảy ra tai nạn cháy, nổ, mất mát, hư hỏng do mình gây ra.</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "8px" }}>4. Giữ gìn vệ sinh chung, bỏ rác đúng nơi quy định, chịu mọi trách nhiệm với phần rác mình sử dụng</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "8px" }}>2. Với các ngày chậm thanh toán phụ thu 50.000/ngày. Nếu thu tiền mặt sẽ phụ thu 10.000</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "8px" }}>5. Nghiêm cấm tổ chức nhậu nhẹt, cờ bạc, ca hát, mở nhạc làm ồn làm ảnh hưởng đến người khác</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "8px" }}>6. Không được mua bán, sử dụng, chứa chấp ma túy, mại dâm và tất cả hàng hóa trái quy định của pháp luật Việt Nam.</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "8px" }}>7. Không cho người lạ hoặc chưa đăng ký ở lại qua đêm. Nếu có người thân (cha, mẹ, anh chị em) muốn ở lại phải thông báo đến điện thoại/zalo 0398.771.881. Và chịu mọi trách nhiệm với người mình dẫn vào.</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "8px" }}>8. Bên thuê phải cung cấp đầy đủ giấy tờ để làm việc với cơ quan có thẩm quyền tối đa 3 ngày kể từ khi ký hợp đồng. Nếu không bên thuê phải chịu toàn bộ trách nhiệm và chi phí bị phạt phát sinh với chính quyền địa phương.</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "8px" }}>9. Bên thuê khi trả phòng phải trả lại toàn bộ hiện trạng như ban đầu.</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "8px" }}>10. Bên thuê tự bảo quản và chịu trách nhiệm về tài sản của mình như tiền bạc, quần áo, xe, điện thoại, laptop… và tất cả các vật dụng cá nhân.</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "24px" }}>11. Sau khi dọn vào ở 15 ngày, mọi chi phí hư, hỏng phát sinh bên thuê phải chịu trách nhiệm chi trả và sửa chữa.</Typography>



                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontWeight: "bold", fontSize: "18px", marginBottom: "8px" }}>Điều 7: CHẤM DỨT HỢP ĐỒNG</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "8px" }}>1. Nếu bên thuê vi phạm bất cứ điều khoản nào trong hợp đồng thì bên A có
                        quyền chấm dứt hợp đồng ngay lập tức. Bên thuê sẽ phải chịu mất toàn bộ khoản tiền đã thanh toán trước đó.
                    </Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "8px" }}>2. Nếu bên thuê muốn chấm dứt hợp đồng trước hạn phải tìm người
                        nhượng lại hợp đồng và chịu phí sang nhượng 10% tiền thuê hoặc chịu mất toàn bộ tiền đã đưa trước đó.
                    </Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "24px" }}>3. Bên A muốn lấy lại phòng hoặc giường trước thời hạn hợp đồng sẽ phải thông báo cho
                        bên B trước 30 ngày và phải hoàn trả lại tiền cọc.
                    </Typography>



                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontWeight: "bold", fontSize: "18px", marginBottom: "8px" }}>Điều 8: TIỀN KHI KÝ HỢP ĐỒNG</Typography>
                    <Stack direction='column' spacing={1} marginBottom='24px'>
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Từ ngày: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%", whiteSpace: "nowrap" }}><b style={{ color: 'blue' }}>01/11/2023</b> đến <b style={{ color: 'blue' }}>30/11/2023</b></Typography>
                        </Stack>

                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tổng ngày:</Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}><b style={{ color: '#fd06ff' }}>29</b> ngày</Typography>
                        </Stack>
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tiền thuê: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}> <b style={{ color: 'blue' }}>3.500.000 </b> / tháng</Typography>
                        </Stack>
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tiền điện: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}><b style={{ color: 'blue' }}>	0 </b> / kwh</Typography>
                        </Stack>
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tiền nước 1 người: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%", whiteSpace: "nowrap" }}><b style={{ color: 'blue' }}>01/11/2023</b> đến <b style={{ color: 'blue' }}>30/11/2023</b></Typography>
                        </Stack>
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tiền Net: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}><b style={{ color: 'blue' }}>80.000 </b> /người/tháng</Typography>
                        </Stack>
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tiền Rác: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}><b style={{ color: 'blue' }}>50.000 </b> /tháng</Typography>
                        </Stack>
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tiền để xe 1 chiếc: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}><b style={{ color: 'blue' }}>100.000 </b> xe/tháng</Typography>
                        </Stack>


                        <Divider />


                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tiền tháng đầu:	 </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}><b>3.830.000</b></Typography>
                        </Stack>
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tiền đặt cọc: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}><b style={{ color: 'blue' }}>3.500.000</b></Typography>
                        </Stack>
                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Trừ tiền đã đưa: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}><b style={{ color: '#fd06ff' }}>-3.500.000</b></Typography>
                        </Stack>
                        <Stack direction='row' spacing={2} justifyContent='center' style={{ backgroundColor: "yellow" }}>
                            <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tổng thanh toán: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}><b style={{ color: 'red' }}>3.830.000</b></Typography>
                        </Stack>

                    </Stack>


                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontWeight: "bold", fontSize: "18px", marginBottom: "8px" }}>Điều 9: HIỆU LỰC HỢP ĐỒNG</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "8px", color: "red" }}>- Hợp đồng này sẽ có hiệu lực ngay tại thời điểm bên thuê <b>xác nhận nhập mã OPT.</b> </Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "8px", color: "red" }}>- Tại thời điểm xác nhận bên thuê có đầy đủ nhận thức và hiểu rõ hành vi của mình </Typography>

                </div>
                <div className="contact-container--bottom">
                    <Typography className='fontsize-mobile--tile' style={{ textAlign: "center", fontWeight: "bold", fontSize: "18px", marginBottom: "4px" }}>Tình trạng hợp đồng</Typography>
                    <Typography className="fontsize-mobile" style={{ textAlign: "center", fontSize: "14px", fontWeight: "bold", marginBottom: "24px", color: "#15a35e" }}>ĐÃ KÝ</Typography>

                    <Stack direction='column' spacing={1} marginBottom="24px">
                        <Stack direction='row' spacing={1} justifyContent='left'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "16px", }}>Người Sale: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "16px", }}><b>Hằng NT</b></Typography>
                        </Stack>

                        <Stack direction='row' spacing={1} justifyContent='left'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "16px", }}>Người Dẫn khách: </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "16px", }}><b>Đan PHY</b></Typography>
                        </Stack>

                        <Stack direction='row' spacing={1} justifyContent='left'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "16px", }}>Tạo hợp đồng cọc:  </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "16px", }}><b>Như PQ 10:26 31/10/2023</b></Typography>
                        </Stack>

                        <Stack direction='row' spacing={1} justifyContent='left'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "16px", }}>Tạo Hợp đồng thuê:  </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "16px", }}><b>Tín LT 13:27 01/11/2023</b></Typography>
                        </Stack>

                        <Stack direction='row' spacing={1} justifyContent='left'>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "16px", }}>Ký hợp đồng bằng OTP:  </Typography>
                            <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "16px", }}><b>334963459 13:28 01/11/2023</b></Typography>
                        </Stack>
                    </Stack>
                </div>
            </div>


        </ContainerComponent2 >
    )
}

export default ContactPage