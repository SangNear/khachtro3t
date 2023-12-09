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

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-wrapp">
                <div className="footer-top">
                    <div className="footer-top__items1">
                        <h2 className="footer-title">Giới thiệu</h2>
                        <p className="footer-text">
                            Dựa trên việc đã quản lý hơn 1.000 phòng trọ, chúng tôi muốn chia
                            sẽ phần mềm quản lý phòng trọ hoàn toàn miễn phí cho những ai có
                            nhu cầu
                        </p>
                        <div className="footer-social"></div>
                    </div>
                    <div className="footer-top__items2">
                        <h2 className="footer-title">thông tin</h2>
                        <div className="info">
                            <BorderColorIcon className="icon" />
                            <Link href="#">
                                <span>Giới thiệu</span>
                            </Link>

                        </div>
                        <div className="info">
                            <LocalLibraryIcon className="icon" />
                            <Link href="#">
                                <span>Hợp đồng mẫu</span>
                            </Link>
                        </div>
                        <div className="info">
                            <SettingsIcon className="icon" />
                            <Link href="#">
                                <span>Quy trình vận hành</span>
                            </Link>

                        </div>
                    </div>
                    <div className="footer-top__items3">
                        <h2 className="footer-title">liên hệ</h2>
                        <div className="info">
                            <PhoneIcon className="icon" />
                            <span>Hotline: 0907.771.881 </span>
                        </div>
                        <div className="info">
                            <HomeIcon className="icon" />
                            <Link href="#">
                                <span>Cho thuê phòng</span>
                            </Link>

                        </div>
                        <div className="info">
                            <LanguageIcon className="icon" />
                            <span>Web: https://tro4u.com </span>
                        </div>
                        <div className="info">
                            <FacebookIcon className="icon" />
                            <span>Web: Facebook </span>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>
                        Copyright© 2023{" "}
                        <span style={{ color: "#15a35e", cursor: "pointer" }}>Tro4u</span>
                    </span>
                    <span>Website: Https://Tro4u.Com</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
