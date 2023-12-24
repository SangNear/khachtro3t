"use client"
import React, { ChangeEvent, useState, FormEvent, useEffect } from 'react'
import "./page.scss"
import Image from 'next/image'
import loginLogo from "../../../../public/assets/img/logoLogin.png"
import InputComponent from '@/app/components/textFieldComponent/InputComponent'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Link from 'next/link'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ReCAPTCHA from "react-google-recaptcha"
import Stack from '@mui/material/Stack'
import DialogChooseRoom from '@/app/components/dialogChooseRoom/page'
import { DataApi, Datalogin } from '@/app/api/login'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';



const Login = () => {


  useEffect(() => {

    // Xóa dữ liệu từ localStorage khi vào trang Login
    localStorage.clear();
  }, []);

  const [openChooseRoom, setOpenChooseRoom] = useState(false)
  const handleCloseChooseRoom = () => {
    setOpenChooseRoom(false)
  }

  const [phone, setPhone] = useState('')
  const [error, setErrors] = useState('')
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [capcha, setCapcha] = useState<string | null>(null);
  const [apiRoom, setApiRoom] = useState<DataApi[]>([])
  const maxLoginAttempts = 3;
  const HandleChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value)
    setErrors('')
  }
  console.log("apirooom:", apiRoom);

  const handleKeyPressEnter = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // Kiểm tra nếu phím được nhấn là phím Enter (keyCode 13)

    if (event.key === 'Enter') {
      handleLogin(event)


    }
  };

  const handleLogin = async (event: FormEvent) => {


    try {
      const response = await fetch(
        "https://ad.tro4u.com/api/version/1.0/khachthue/login",
        {
          method: "POST",
          body: JSON.stringify({
            phone
          }),
          headers: {
            "Content-Type": "application/json",
          }
        }
      )

      const dataApiLogin = await response.json();
      console.log("dataApiLogin", dataApiLogin);


      const sophong = dataApiLogin.data ? dataApiLogin.data.allHopDong.length : 0;


      if (dataApiLogin.status == 'false') {
        setErrors(dataApiLogin.message)
        setLoginAttempts(loginAttempts + 1);

        if (loginAttempts > maxLoginAttempts) {
          setCapcha(null)
          setLoginAttempts(3)
          setPhone('')
        }

      }
      
      else {
        //kiểm tra xem sdt này có bao nhiêu phòng nếu phòng bằng 1
        // thì chuyển tới trang chủ luôn còn khác 1 thì sẽ có lựa chọn phòng
        if (sophong == 1) {
          localStorage.setItem("userData", JSON.stringify(dataApiLogin.data.allHopDong[0]));
          localStorage.setItem("loginData", JSON.stringify(dataApiLogin))

          window.location.href = "/";
        }
        else {
          setOpenChooseRoom(!openChooseRoom)
          setApiRoom(dataApiLogin.data.allHopDong)
          localStorage.setItem("loginData", JSON.stringify(dataApiLogin))
        }
      }

    }
    catch (error) {
      console.error(
        "An error occurred while processing your request:",
        error
      );
    }
  };


  const handleCaptchaChange = (val: string | null) => {
    setCapcha(val);
  };



  return (
    <div className='login-container'>
      <div className="login-form">
        <div className="login-logo">
          <Image src={loginLogo} alt='logo' />
        </div>
        <div className="login-input">
          <InputComponent variant='outlined' label='Số điện thoại' type='tel' onchange={HandleChangePhone} data={phone} onkeydown={handleKeyPressEnter} />
          <PhoneAndroidIcon className='login-input--icon' />
        </div>

        <Stack>
          {loginAttempts > maxLoginAttempts && (
            <ReCAPTCHA
              sitekey="6LeYUSEpAAAAAPi74XZgSyXKq_D8Q0ujQRPafIml"
              onChange={handleCaptchaChange}
            />
          )}
        </Stack>

        {error ? <div className='validationText'><ErrorOutlineOutlinedIcon sx={{ color: "red" }} /> <span>{error}</span></div> : ''}
        <div className="login-btn">
          {loginAttempts > maxLoginAttempts && capcha == null || phone.length < 10 ?
            <Button
              variant="contained"
              className="login-btn--item disable"
              onClick={handleLogin}
              disabled
            >
              <PowerSettingsNewIcon />
              <span>Đăng nhập</span>
            </Button>
            :
            <Button

              variant="contained"
              className="login-btn--item"
              onClick={handleLogin}



            >
              <PowerSettingsNewIcon />
              Đăng nhập
            </Button>}

        </div>
        <div className="login-bottom">
          <div className="luuy">
            <Divider className='divider' />
            <span>Lưu ý</span>
            <Divider className='divider' />
          </div>
          <span style={{ color: "#000000", opacity: "50%", fontSize: "16px" }}>Chỉ áp dụng số điện thoại đã đăng ký</span>
          <span style={{ color: "#16A55F", fontSize: "16px" }}>HOT LINE:<Link href='tel:0398771881'>0398 771 881</Link> </span>
        </div>
      </div>
      <DialogChooseRoom open={openChooseRoom} close={handleCloseChooseRoom} apiRoom={apiRoom} />
    </div>
  )
}

export default Login