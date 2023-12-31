"use client";
import Image from "next/image";
import "./page.scss";
import { useEffect, useState } from "react";
import React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import logo from "../../../../public/assets/img/logo3t.png";
import Link from "next/link";
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import { redirect, usePathname } from "next/navigation";
import avatar from "../../../../public/assets/img/1.png";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import LinkOffOutlinedIcon from '@mui/icons-material/LinkOffOutlined';
import { DataApi, Datalogin, HopDong, KhachHangHopDong } from "@/app/api/login";
import Loading from "@/app/loading";
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
const HeaderComponent = () => {
    const pathname = usePathname();


    const [dataSession, setDataSession] = useState<ApiHopdongResponse>()
    const [dataUser, setDataUser] = useState<KhachHangHopDong>()
    const [dataHopdong, setDataHopdong] = useState<HopDong>()

    const [isLoading, setIsLoading] = useState(true);


    const fetchData = async () => {
        try {
            const userApi = window.localStorage.getItem('userData');
            if (!userApi) {
                // Redirect to login page if local storage is not present
                // Replace '/login' with your actual login page route
                window.location.href = '/pages/login';
            } else {
                const userData = JSON.parse(userApi);
                let id_hop_dong = userData.id;
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
                setDataSession(data);




            }
        } catch (error) {

        }
    };

    useEffect(() => {
        // fetchData()
        const userDataApi = localStorage.getItem('userData')
        const dataLoginApi = localStorage.getItem('loginData')
        if (dataLoginApi && userDataApi) {
            const userData: DataApi = JSON.parse(userDataApi);
            const dataLogin: Datalogin = JSON.parse(dataLoginApi);

            dataLogin.data.allKhachHD.map(item => {


                if (userData.id == item.id_hop_dong) {

                    setIsLoading(false)
                    setDataUser(item)

                }

            })

            dataLogin.data.allHopDong.map(item => {
                if (item.id == userData.id) {
                    setDataHopdong(item)
                }
            })


        }
    }, []);




    // if (isLoading) {
    //     // Render a loading indicator or any other UI while waiting for data
    //     return <Loading />;
    // }

    const handleLogout = () => {
        // Clear session storage
        localStorage.clear();
        redirect("/");
        // Redirect to the home page or any other desired page after logout
        // Example: window.location.href = "/";
    };

    // if (!dataSession || !dataSession.data || !dataSession.data.hopDong) {
    //     return null; // hoặc có thể return một phần tử UI tương ứng với trạng thái loading hoặc không có dữ liệu
    // }

    // if (isLoading) {
    //     // Render a loading indicator or any other UI while waiting for data
    //     return '';
    // }

    return (
        <div className="header-container">
            <div className="top">
                <div className="left">

                    <div style={{ width: 'auto' }} className="logo-container">
                        <Image src={logo} alt="logo" className="logo" height={50} />
                    </div>
                </div>
                <div className="menu-container">
                    <div className="menu-list">
                        <Link href="/" className={`menu-items ${pathname === "/" ? "active" : ""}`}>
                            <ReceiptLongOutlinedIcon className="icon" />
                            <div
                                className={`menu__item-link ${pathname === "/" ? "active" : ""
                                    }`}

                            >
                                Hóa đơn
                            </div>
                        </Link>

                        <Link
                            href="/pages/contact/" className={`menu-items ${pathname === "/pages/contact/" ? "active" : ""}`}
                        >
                            <AssignmentOutlinedIcon className="icon" />
                            <div
                                className={`menu__item-link ${pathname === "/pages/contact/" ? "active" : ""
                                    }`}

                            >
                                Hợp đồng
                            </div>
                        </Link>

                        <Link
                            href="/pages/problem/" className={`menu-items ${pathname === "/pages/problem/" ? "active" : ""}`}
                        >
                            <NotificationImportantOutlinedIcon className="icon" />
                            <div
                                className={`menu__item-link ${pathname === "/pages/problem/" ? "active" : ""
                                    }`}

                            >
                                Sự cố
                            </div>
                        </Link>

                        <Link
                            href="/pages/support/" className={`menu-items ${pathname === "/pages/support/" ? "active" : ""}`}
                        >
                            <HelpOutlineIcon className="icon" />
                            <div
                                className={`menu__item-link ${pathname === "/pages/support/" ? "active" : ""
                                    }`}

                            >
                                Hỗ trợ
                            </div>
                        </Link>



                    </div>
                </div>

                <div className="right-container">
                    <div className="right-items">
                        {/* <div className="search-cotainer">

                            <Modal
                                open={openSearchInput}
                                onClose={handleCloseSearchInput}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                className="ModalSearch"
                                sx={{ padding: "35px" }}
                            >
                                <Box sx={styleInputSearch}>
                                    <TabContext value={value}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{
                                                '& .MuiTabs-indicator': {
                                                    backgroundColor: 'rgb(128, 75, 223)',
                                                },
                                            }}>
                                                <Tab label="Cục bộ" value="1" style={{ color: "rgb(128, 75, 223)" }} />
                                                <Tab label="Khách" value="2" style={{ color: "rgb(128, 75, 223)" }} />

                                            </TabList>
                                        </Box>
                                        <TabPanel value="1">
                                            <TextField
                                                id="outlined-basic"
                                                label="cục bộ"
                                                variant="outlined"
                                                className="textField-container"
                                                sx={textfield}
                                                fullWidth

                                            />
                                            <IconButton
                                                aria-label="delete"
                                                size="small"
                                                sx={{
                                                    position: "absolute",
                                                    fontSize: "25px",
                                                    right: "11%",
                                                    top: "54%"
                                                }}
                                            >
                                                <SearchIcon fontSize="inherit" />
                                            </IconButton>
                                        </TabPanel>
                                        <TabPanel value="2">
                                            <TextField
                                                id="outlined-basic"
                                                label="Tìm kiếm khách"
                                                variant="outlined"
                                                className="textField-container"
                                                sx={textfield}
                                                fullWidth

                                            />
                                            <IconButton
                                                aria-label="delete"
                                                size="small"
                                                sx={{
                                                    position: "absolute",
                                                    fontSize: "25px",
                                                    right: "11%",
                                                    top: "54%"
                                                }}
                                            >
                                                <SearchIcon fontSize="inherit" />
                                            </IconButton>
                                        </TabPanel>

                                    </TabContext>

                                </Box>
                            </Modal>
                        </div> */}
                        <div className="menu-user">
                            <AccountCircleIcon
                                sx={{ fontSize: "25px", color: "#fff", cursor: "pointer" }}
                            // onClick={handleUserMenu}
                            />

                            <Paper className="popperMenu" sx={{ width: "240px !important", maxWidth: '100%' }}>
                                <MenuList className="menu-list">

                                    <MenuItem className="menu-item" style={{ padding: "5px 16px", display: "flex", justifyContent: "center" }}>
                                        <div className="profile-container">
                                            <div className="avatar">
                                                <Image
                                                    src={avatar}
                                                    alt="avatar "
                                                    width={40}
                                                    height={40}
                                                    priority={true}
                                                    style={{ borderRadius: "50%", cursor: "pointer" }}
                                                />
                                            </div>

                                        </div>
                                    </MenuItem>

                                    <Link href="#"
                                        className="menu-item bg"
                                    >
                                        <PersonOutlineIcon className="icon" style={{ color: "rgba(58, 53, 65, 0.68)" }} />
                                        <span
                                            style={{
                                                color: "rgba(58, 53, 65, 0.68)",
                                            }}
                                        >
                                            {dataUser?.ten_khach}
                                        </span>
                                    </Link>

                                    <Link
                                        href="#"
                                        className="menu-item bg"
                                    >
                                        <PhoneAndroidIcon className="icon" style={{ color: "rgba(58, 53, 65, 0.68)" }} />
                                        <span
                                            style={{
                                                color: "rgba(58, 53, 65, 0.68)",
                                            }}
                                        >
                                            {dataUser?.sdt_khach}
                                        </span>
                                    </Link>

                                    <Link
                                        href="#"
                                        className="menu-item bg"
                                    >
                                        <LocalHotelIcon className="icon" style={{ color: "rgba(58, 53, 65, 0.68)" }} />
                                        <span
                                            style={{
                                                color: "rgba(58, 53, 65, 0.68)",
                                            }}
                                        >
                                            {dataHopdong?.phong.ten}
                                        </span>
                                    </Link>
                                    <Divider />

                                    <Link
                                        href="/pages/login/"
                                        className="menu-item"
                                        onClick={handleLogout}
                                    >
                                        <LogoutIcon className="icon" style={{ color: "rgba(58, 53, 65, 0.68)" }} />
                                        <span style={{
                                            color: "rgba(58, 53, 65, 0.68)",
                                        }}>Đăng xuất</span>
                                    </Link>

                                </MenuList>
                            </Paper>

                        </div>



                    </div>
                </div>
            </div>



            <div className="menuMobile-container">

                <div className="menuMobile-list">
                    <Link
                        href="/"
                        className={`menuMobile-items ${pathname === "/" ? "activeMobieMenu" : ""
                            } `}
                    >
                        <TextSnippetOutlinedIcon />
                        <span>Hóa đơn</span>
                    </Link>

                    <Link
                        href="/pages/contact/"
                        className={`menuMobile-items ${pathname === "/pages/contact/" ? "activeMobieMenu" : ""
                            } `}
                    >
                        <FileOpenOutlinedIcon />
                        <span>Hợp đồng</span>
                    </Link>

                    <Link
                        href="/pages/problem/"
                        className={`menuMobile-items ${pathname === "/pages/problem/" ? "activeMobieMenu" : ""
                            } `}
                    >
                        <LinkOffOutlinedIcon />
                        <span>Sự cố</span>
                    </Link>

                    <Link
                        href="/pages/support"
                        className={`menuMobile-items ${pathname === "/pages/support/" ? "activeMobieMenu" : ""
                            } `}
                    >
                        <HelpOutlineIcon />
                        <span className="title">
                            Hỗ trợ
                        </span>
                        <div className="subMenuMobile">

                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default HeaderComponent;
