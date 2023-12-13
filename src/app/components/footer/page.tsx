import React from "react";
import "./page.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import LanguageIcon from "@mui/icons-material/Language";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Link from "next/link";
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import zaloIocn from "../../../../public/assets/img/zaloicon.png"
import Image from "next/image";
const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-wrapp">
                <div className="footer-top">
                    <div className="footer-top__items1">
                        <h2 className="footer-title">Giới thiệu</h2>
                        <p className="footer-text">
                            Nhà Trọ 3T chuyên quản lý vận hành căn hộ dịch vụ, phòng trọ, dãy trọ, ký túc xá,
                            sleepbox tại thành phố Hồ Chí Minh.
                        </p>
                        <div className="footer-social"></div>
                    </div>
                    <div className="footer-top__items2">
                        <h2 className="footer-title">thông tin</h2>
                        <div className="info">
                            <ReceiptLongOutlinedIcon className="icon" />
                            <Link href="#">
                                <span>Hóa đơn</span>
                            </Link>

                        </div>
                        <div className="info">
                            <AssignmentOutlinedIcon className="icon" />
                            <Link href="#">
                                <span>Hợp đồng</span>
                            </Link>
                        </div>
                        <div className="info">
                            <NotificationImportantOutlinedIcon className="icon" />
                            <Link href="#">
                                <span>Sự cố</span>
                            </Link>

                        </div>
                        <div className="info">
                            <GradingOutlinedIcon className="icon" />
                            <Link href="#">
                                <span>Nội quy</span>
                            </Link>

                        </div>
                    </div>
                    <div className="footer-top__items3">
                        <h2 className="footer-title">liên hệ</h2>
                        <div className="info">
                            <PhoneIcon className="icon" />
                            <Link href='tel:0398771881'> <span>0398 771 881</span></Link>
                        </div>
                        <div className="info">
                            <Image src={zaloIocn} alt="zalo" width={24} height={24}/>
                            
                                <Link href='https://zalo.me/0398771881'> <span>Zalo: 0398 771 88</span></Link>
                            

                        </div>
                        <div className="info">
                            <LanguageIcon className="icon" />
                            <Link href='https://khach.nhatro3t.com/'> <span>Web: khach.nhatro3t.com</span></Link>

                        </div>
                        
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>
                        Copyright© 2024{" "}
                        <Link href='https://khach.nhatro3t.com/' style={{ color: "#15a35e", cursor: "pointer", textTransform: 'none' }}>nhatro3t</Link>
                    </span>
                    <span style={{ textTransform: 'unset' }}>Website: https://khach.nhatro3t.com</span>
                </div>
            </div>
        </div >
    );
};

export default Footer;
