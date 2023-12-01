"use client";

import SearchIcon from "@mui/icons-material/Search";
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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import LinkOffOutlinedIcon from '@mui/icons-material/LinkOffOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { DataApi } from "@/app/api/login";



const HeaderComponent = () => {
    const pathname = usePathname();
    const [openSearchInput, setOpenSearchInput] = useState(false);
    const [dataSession, setDataSession] = useState<DataApi>()
    const handleOpenSearchInput = () => {
        setOpenSearchInput(!openSearchInput);
    };
    const handleCloseSearchInput = () => {
        setOpenSearchInput(false);
    }; 
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    

    
    const textfield = {
        position: "relative",
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#9155fd",
            color: "#9155fd",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(58, 53, 65, 0.54)",
            color: "#9155fd",
        },
        ".MuiOutlinedInput-root": {
            borderRadius: "6px",
        },
        ".MuiInputLabel-outlined.Mui-focused": {
            color: "#9155fd",
        },
        ".MuiOutlinedInput-root.Mui-focused.MuiOutlinedInput-notchedOutline": {
            borderColor: "#9155fd",
        },
        ".MuiOutlinedInput-root:hover": {
            borderColor: "#9155fd",
        },
        "& .MuiOutlinedInput-root:hover": {
            "& fieldset": {
                borderColor: "#9155fd",
            },
        },
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userApi = window.localStorage.getItem('userData');
            if (!userApi) {
                // Redirect to login page if local storage is not present
                // Replace '/login' with your actual login page route
                window.location.href = '/pages/login';
            } else {
                const userData = JSON.parse(userApi);
                setDataSession(userData);
            }
        }
    }, []);



    const handleLogout = () => {
        // Clear session storage
        localStorage.clear();
        redirect("/");
        // Redirect to the home page or any other desired page after logout
        // Example: window.location.href = "/";
    };
    const styleInputSearch = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "360px",
        bgcolor: "background.paper",
        border: "none",
        boxShadow: 24,
        p: 1,
        borderRadius: "6px",
        "@media (max-width: 767px)": {
            width: 330,
        },
    };


    return (
        <div className="header-container">
            <div className="top">
                <div className="left">

                    <div style={{ width: 150 }} className="logo-container">
                        <Image src={logo} alt="logo" priority={true} className="logo" width={150} height={50} />
                    </div>
                </div>
                <div className="menu-container">
                    <div className="menu-list">
                        <div className={`menu-items ${pathname === "/" ? "active" : ""}`}>
                            <TextSnippetOutlinedIcon className="icon" />
                            <Link
                                className={`menu__item-link ${pathname === "/" ? "active" : ""
                                    }`}
                                href="/"
                            >
                                Hóa đơn
                            </Link>
                        </div>

                        <div
                            className={`menu-items ${pathname === "/pages/contact/" ? "active" : ""}`}
                        >
                            <FileOpenOutlinedIcon className="icon" />
                            <Link
                                className={`menu__item-link ${pathname === "/pages/contact/" ? "active" : ""
                                    }`}
                                href="/pages/contact/"
                            >
                                Hợp đồng
                            </Link>
                        </div>
                        <div
                            className={`menu-items ${pathname === "/pages/problem/" ? "active" : ""}`}
                        >
                            <LinkOffOutlinedIcon className="icon" />
                            <Link
                                className={`menu__item-link ${pathname === "/pages/problem/" ? "active" : ""
                                    }`}
                                href="/pages/problem/"
                            >
                                Sự cố
                            </Link>
                        </div>

                        <div
                            className={`menu-items ${pathname === "/guestReport/" || pathname === "/income/"
                                ? "active"
                                : ""
                                }`}
                        >
                            <LocalGroceryStoreOutlinedIcon className="icon" />
                            <Link
                                className={`menu__item-link ${pathname === "/guestReport/" || "/income/" ? "active" : ""
                                    }`}
                                href="#"
                            >
                                Chợ
                            </Link>
                            
                        </div>

                        

                    </div>
                </div>

                <div className="right-container">
                    <div className="right-items">
                        <div className="search-cotainer">
                            <SearchIcon
                                className="search-icon"
                                onClick={handleOpenSearchInput}
                            />
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
                        </div>
                        <div className="menu-user">
                            <PersonOutlineOutlinedIcon
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
                                            Họ và tên
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
                                            Số điện thoại
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
                                            {dataSession && dataSession?.phong.ten}
                                        </span>
                                    </Link>
                                    <Divider />

                                    <Link
                                        href="/pages/login/"
                                        className="menu-item"
                                        onClick={handleLogout}
                                    >
                                        <LogoutIcon className="icon" style={{ color: "rgba(58, 53, 65, 0.68)" }} />
                                        <span >Đăng xuất</span>
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

                    <div

                        className={`menuMobile-items ${pathname === "/report" ? "activeMobieMenu" : ""
                            } `}
                    >

                        <NotificationsNoneOutlinedIcon />

                        <span className="title">
                            Thông báo

                        </span>

                        <div className="subMenuMobile">
                            {/* <SubMenu /> */}
                        </div>


                    </div>


                </div>
            </div>
        </div>
    );
};

export default HeaderComponent;
