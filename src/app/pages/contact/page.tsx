"use client"
import React, { useEffect, useState } from 'react'
import "./page.scss"
import Loading from '@/app/loading'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import InputComponent from '@/app/components/textFieldComponent/InputComponent'
import OtpInput from "react-otp-input";
import CircularProgress from '@mui/material/CircularProgress';
import SignatureCanvas from 'react-signature-canvas'
import { OtpResponse, OtpResponseSubmit } from '@/app/api/otp'
import ReactSignatureCanvas from 'react-signature-canvas'
import { ButtonGroup } from '@mui/material'
import { url } from 'inspector'
import Image from 'next/image'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
const ContactPage = () => {
    const [hasSignA, setHasSignA] = useState(false)
    const [hasSignB, setHasSignB] = useState(false)
    const [signA, setSignA] = useState<ReactSignatureCanvas | null>(null);
    const [signB, setSignB] = useState<ReactSignatureCanvas | null>(null);
    const [urlA, setUrlA] = useState<string | undefined>();
    const [urlB, setUrlB] = useState<string | undefined>();
    const [hopdongApi, setHopdongApi] = useState<ApiHopdongResponse>()
    const [isLoading, setIsLoading] = useState(true);
    const [otp, setOtp] = useState("");
    const [id_hop_dong, setIDhopdong] = useState<number>()
    const [otpResponse, setOtpResponse] = useState("");
    const [isSign, setIsSign] = useState(false)
    const [errorsOTP, setErrorsOTP] = useState("")
    const [openOpt, setOpenOtp] = useState(false)
    const [loading, setLoading] = useState(true)
    const handleOpenOtp = async () => {
        try {
            console.log("id hop dong from click", hopdongApi?.data.hopDong.id);
            let id_hop_dong = hopdongApi?.data.hopDong.id
            let user_token = '630f72226ad43'
            const response = await fetch('https://ad.tro4u.com/api/version/1.0/send-otp', {
                method: "POST",
                body: JSON.stringify({
                    user_token,
                    id_hop_dong

                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const dataOtp: OtpResponse = await response.json()
            console.log("otp send:", dataOtp.data.otp);

            setOtpResponse(dataOtp.data.otp)
            setOpenOtp(!openOpt)
            setIDhopdong(id_hop_dong)
            setLoading(!loading)
        } catch (error) {

        }


    }
    const handleChangeOtp = () => {
        // setTimeout(() => {
        //     setIsSign('2347')
        // }, 2000)
        setOtp
        console.log(otp);
    }
    const checkOtp = (otp1: string, otp2: string) => {
        if (otp1 == otp2) {
            return true
        }
        else {
            return false
        }
    }
    const handleSubmitOtp = async () => {
        if (checkOtp(otp, otpResponse)) {
            setErrorsOTP("đang kiểm tra otp, vui lòng đợi")

            const response = await fetch("https://ad.tro4u.com/api/version/1.0/hopdong/update-otp-by-hop-dong", {
                method: "POST",
                body: JSON.stringify({
                    id_hop_dong,
                    otp

                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const dataSubmit: OtpResponseSubmit = await response.json()

            if (dataSubmit.status) {
                setIsSign(true)
            }
        }
        else {
            setErrorsOTP("Mã OTP không trùng khớp! Xin thử lại")
        }
    };


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userApi = window.localStorage.getItem('userData');
            if (!userApi) {
                // Redirect to login page if local storage is not present
                // Replace '/login' with your actual login page route
                window.location.href = '/pages/login';
            } else {
                const userData = JSON.parse(userApi)
                // setHopdongApi(userData)
                let isMounted = true;
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
                        setIsLoading(false)
                        setIsSign(data.data.hopDong.ngay_xac_nhan)
                    } catch (error) {

                    }
                };

                fetchData();
                return () => {
                    fetchData()
                };
            }
        }
    }, []);
    console.log("api from contact", hopdongApi);


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

    const dinhDangSo = (so?: number) => {
        if (so) {
            // Sử dụng toLocaleString để định dạng số
            var chuoiDinhDang = Number(so).toLocaleString('vi-VN');

            return chuoiDinhDang;
        }

    }

    // Gọi hàm async trong useEffect

    // Đối với trường hợp này, không có dependency array, nghĩa là hàm fetchData sẽ chạy mỗi khi component được render lại.
    if (isLoading) {
        // Render a loading indicator or any other UI while waiting for data
        return <Loading />;
    }
    const btnNotSign = {
        border: "1px solid red",
        color: "red",
        "&:hover ": {
            border: "1px solid red",

            backgroundColor: '#fff',
            opacity: "0.6",
            span: {

            }
        }
    }
    const inputOtp = {
        width: 40,
        height: 40,
        border: "1px solid #15a35e",
        borderRadius: "5px",
        '&:focusVisible': {
            outline: "none !important"
        }
    }
    const btnSubmitOtp = {
        whiteSpace: 'nowrap',
        fontSize: '12px',
        border: '1px solid #15a35e',
        color: '#15a35e',
        '&:hover ': {
            border: '1px solid #15a35e',
            opacity: 0.8
        }
    }
    const handleClearSignA = () => {
        signA?.clear()
    }
    const handleClearSignB = () => {
        signB?.clear()
    }
    const handleSaveSignA = () => {
        setUrlA(signA?.getTrimmedCanvas().toDataURL('image/png'))
        setHasSignA(true)
    }
    const handleSaveSignB = () => {
        setUrlB(signB?.getTrimmedCanvas().toDataURL('image/png'))
        setHasSignB(true)
    }

    const handleChangeSignA = () => {
        setUrlA('')
        setHasSignA(false)
    }
    const handleChangeSignB = () => {
        setUrlB('')
        setHasSignB(false)
    }
    const btnSignSave = {
        border: "1px solid green",
        color: 'green',
        "&:hover": {
            backgroundColor: '#fff',
            border: "1px solid green",

        }
    }
    const btnSignDelete = {
        border: "1px solid red",
        color: 'red',
        "&:hover": {
            backgroundColor: '#fff',
            border: "1px solid red",

        }
    }
    const btnText = {
        fontSize: '12px',
        "@media (max-width: 783px)": {
            width: "100%",
            minWidth: '320px',
            maxWidth: '100%',
        }
    }

    return (

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
                <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Ông/bà: <b style={{ color: 'blue' }}>{hopdongApi?.data.hopDong.khach.ten_khach}</b></Typography>
                <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Điện thoại: <b style={{ color: 'blue' }}>{hopdongApi?.data.hopDong.khach.sdt_khach}</b></Typography>
                <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "24px" }}>- CCCD: <b>{hopdongApi?.data.hopDong.khach.cccd}</b></Typography>

                <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "24px" }}>- Địa chỉ: 295B, Kp6, Hiệp Thành, Quận 12, TP.Hồ Chí Minh</Typography>
                <Typography className="fontsize-mobile" style={{ textAlign: "center", fontSize: "18px", fontStyle: "italic", marginBottom: "24px" }}>Hợp đồng được lập ra được sự đồng ý của cả hai bên với các điều khoản sau:</Typography>


                <Typography className="fontsize-mobile" style={{ textAlign: "left", fontWeight: "bold", fontSize: "18px", marginBottom: "4px" }}>Điều 1: THÔNG TIN THUÊ VÀ MỤC ĐÍCH THUÊ</Typography>
                <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Bên A đồng ý cho Bên B thuê <b style={{ color: 'blue' }}>{hopdongApi?.data.hopDong.phong.loai} {hopdongApi?.data.hopDong.phong.ten}</b> </Typography>
                <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Mục đích thuê: <b>Để ở đúng theo quy định pháp luật Việt Nam</b> </Typography>
                <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "24px" }}>- Tài sản bàn giao cho bên B như clip gồm:</Typography>

                <Typography className="fontsize-mobile" style={{ textAlign: "left", fontWeight: "bold", fontSize: "18px", marginBottom: "4px" }}>Điều 2: THỜI HẠN HỢP ĐỒNG</Typography>
                <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Thời hạn hợp đồng:  <b style={{ color: 'blue' }}>{hopdongApi?.data.hopDong.han_hop_dong}</b> </Typography>
                <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Được tính từ ngày <b style={{ color: 'blue' }}>{dinhDangNgayThang(hopdongApi?.data.hopDong.ngay_ky)}</b> đến ngày <b>01/05/2024</b> </Typography>
                <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "24px" }}>- Nếu đến ngày hết thời hạn hợp đồng, Bên thuê không thông báo kết thúc hợp đồng trước 30 ngày thì mặc định sẽ đồng ý tiếp tục gia hạn hợp đồng này thêm 06 tháng</Typography>

                <Typography className="fontsize-mobile" style={{ textAlign: "left", fontWeight: "bold", fontSize: "18px", marginBottom: "4px" }}>Điều 3: TIỀN ĐẶT CỌC</Typography>
                <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Tiền bên B đặt cọc cho bên A là  <b style={{ color: 'blue' }}>{dinhDangSo(hopdongApi?.data.hopDong.gia_thue)}</b> </Typography>
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
                        <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}><b style={{ color: 'blue' }} >{dinhDangSo(hopdongApi?.data.hopDong.gia_thue)}</b> / tháng </Typography>
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
                <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", marginBottom: "4px" }}>- Tiền thuê thu mỗi tháng một lần vào ngày <b style={{ color: 'blue' }}>{hopdongApi?.data.hopDong.thanh_toan}</b> </Typography>
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
                        <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%", whiteSpace: "nowrap" }}><b style={{ color: 'blue' }}>{dinhDangNgayThang(hopdongApi?.data.hopDong.ngay_ky)}</b> đến <b style={{ color: 'blue' }}>30/11/2023</b></Typography>
                    </Stack>

                    <Stack direction='row' spacing={2} justifyContent='center'>
                        <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tổng ngày:</Typography>
                        <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}><b style={{ color: '#fd06ff' }}>29</b> ngày</Typography>
                    </Stack>
                    <Stack direction='row' spacing={2} justifyContent='center'>
                        <Typography className="fontsize-mobile" style={{ textAlign: "right", fontSize: "18px", width: "100%", }}>Tiền thuê: </Typography>
                        <Typography className="fontsize-mobile" style={{ textAlign: "left", fontSize: "18px", width: "100%" }}> <b style={{ color: 'blue' }}>{dinhDangSo(hopdongApi?.data.hopDong.gia_thue)} </b> / tháng</Typography>
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
            <div className="contact-container--signatures">
                <Stack sx={{ width: '50%' }}>
                    <Typography sx={{ textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold' }}>Bên A</Typography>
                    <div className='signature--item' >
                        {urlA ?
                            <img src={urlA} alt='signA' className='imgSign' />
                            : <SignatureCanvas penColor='green'
                                ref={data => setSignA(data)}
                                canvasProps={{ className: 'sigCanvas' }} />}


                    </div>

                    <Stack direction='row' alignItems='center' justifyContent='center' marginTop="10px">
                        {hasSignA ? <Button variant='outlined' onClick={handleChangeSignA}>Thay đổi</Button> :
                            <Stack direction='row' gap={1}>
                                <Button sx={btnSignDelete} variant='outlined' onClick={handleClearSignA}>
                                    <DeleteOutlineOutlinedIcon />
                                    <span className='btn-sign--text' >Xóa</span>
                                </Button>
                                <Button sx={btnSignSave} variant='outlined' onClick={handleSaveSignA}>
                                    <SaveOutlinedIcon />
                                    <span className='btn-sign--text' >Lưu</span>
                                </Button>
                            </Stack>



                        }


                    </Stack>


                </Stack>


                <Stack sx={{ width: '50%' }}>
                    <Typography sx={{ textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold' }}>Bên B</Typography>
                    <div className='signature--item' >

                        {urlB ?
                            <img src={urlB} alt='signB' className='imgSign' style={{ textAlign: 'center' }} />
                            : <SignatureCanvas penColor='green'
                                ref={data => setSignB(data)}
                                canvasProps={{ className: 'sigCanvas' }} />}
                    </div>
                    <Stack direction='row' alignItems='center' justifyContent='center' marginTop="10px">

                        {hasSignB ? <Button variant='outlined' onClick={handleChangeSignB}>Thay đổi</Button> :
                            <Stack direction='row' gap={1}>
                                <Button sx={btnSignDelete} variant='outlined' onClick={handleClearSignB}>
                                    <DeleteOutlineOutlinedIcon />
                                    <span className='btn-sign--text'>Xóa</span>
                                </Button>
                                <Button sx={btnSignSave} variant='outlined' onClick={handleSaveSignB}>
                                    <SaveOutlinedIcon />
                                    <span className='btn-sign--text' >Lưu</span>
                                </Button></Stack>



                        }


                    </Stack>
                </Stack>



            </div>
            <div className="contact-container--bottom">
                <Typography className='fontsize-mobile--tile' style={{ textAlign: "center", fontWeight: "bold", fontSize: "18px", marginBottom: "4px" }}>Tình trạng hợp đồng</Typography>
                {hopdongApi && hopdongApi?.data.hopDong.ngay_xac_nhan || isSign ?
                    <Typography className="fontsize-mobile" style={{ textAlign: "center", fontSize: "14px", fontWeight: "bold", marginBottom: "24px", color: "#15a35e" }}>ĐÃ KÝ</Typography>
                    :
                    !openOpt ?
                        <Stack alignItems='center'>
                            <Button variant="outlined" sx={btnNotSign}><span style={{ textTransform: "none" }} onClick={handleOpenOtp}>Chờ ký</span></Button>
                        </Stack>
                        :
                        <Stack spacing={2}>
                            <Typography sx={{ textAlign: 'center', color: '#15a35e' }}>Mã xác thực sẽ được gửi qua Zalo của bạn</Typography>
                            <Stack marginBottom='24px' spacing={2} alignItems='center' justifyContent='center' direction='row'>
                                <OtpInput
                                    shouldAutoFocus
                                    value={otp}
                                    inputType="tel"
                                    onChange={setOtp}
                                    numInputs={4}
                                    renderSeparator={"-"}
                                    renderInput={(props) => <input {...props} />}
                                    containerStyle={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                    inputStyle={inputOtp}
                                />
                                {otp.length < 4 ?
                                    <Button variant='outlined' sx={btnSubmitOtp} disabled>Xác nhận otp</Button>
                                    :
                                    <Button variant='outlined' sx={btnSubmitOtp} onClick={handleSubmitOtp}>Xác nhận otp</Button>
                                }

                            </Stack>
                            {errorsOTP ?
                                <Stack direction='row' alignContent='center ' justifyContent='center'>
                                    <Typography sx={{ textAlign: 'center', marginTop: '5px !important', fontStyle: 'italic', color: 'red' }}> {errorsOTP}</Typography>

                                </Stack>

                                :
                                ''
                            }
                        </Stack>
                }



                <Stack direction='column' spacing={1} marginBottom="24px" marginTop='24px'>
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



    )
}

export default ContactPage