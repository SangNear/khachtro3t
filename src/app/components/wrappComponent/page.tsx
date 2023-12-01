"use client"
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import "./page.scss";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { ReactNode, useState } from "react";
import Button from "@mui/material/Button";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import React from "react";
import HeaderComponent from "../header/page";
import Footer from "../footer/page";


interface ContainerComponentProps {
    children: ReactNode
}
const ContainerComponent = ({ children }: ContainerComponentProps) => {
    const MenuHouse = [
        { value: 'Qt1', label: 'Quang trung 1' },
        { value: 'Qt2', label: 'Quang trung 2' },
        { value: 'Qt3', label: 'Quang trung 3' }
    ]
    const [openModalAddHouse, setOpenModalAddHouse] = useState(false);
    const handleOpenModalAddHouse = () => {
        setOpenModalAddHouse(!openModalAddHouse);
    };
    const handleCloseModalAddHouse = () => {
        setOpenModalAddHouse(false);
    };
    const [openModalEditHouse, setOpenModalEditHouse] = useState(false);
    const handleOpenModalEditHouse = () => {
        setOpenModalEditHouse(!openModalEditHouse);
    };
    const handleCloseModalEditHouse = () => {
        setOpenModalEditHouse(false);
    };
    const [openModalSelectHouse, setModalOpenSelectHouse] = useState(false)

    const handleOpenSelectHouse = () => {
        setModalOpenSelectHouse(!openModalSelectHouse)
    }
    const handleCloseSeclectHouse = () => {
        setModalOpenSelectHouse(false)
    }
    return (
        <React.Fragment>
            <HeaderComponent />
            <div className="wrapp-container">
                <div className="top">
                    <div
                        className="info"

                        style={{ cursor: "pointer" }}
                    >
                        <div className="info-wrapp" onClick={handleOpenSelectHouse}>
                            <span className="home-info">
                                quang trung <ArrowDropDown sx={{ color: "#15e35a" }} />

                            </span>
                            <span className="address">
                                315/272/26 Phạm Văn Chiêu, Phường 9, Gò vấp
                            </span>

                        </div>

                        <div className="menuHouseIcon">
                            <MoreVertIcon sx={{ color: "black" }} className="icon-menu" />
                            <div className="menuHouse-container">
                                <div className="menuHouse-list">
                                    <div className="menuHouse-item" onClick={handleOpenModalEditHouse}>
                                        <EditOutlinedIcon sx={{ color: "#17a2b8" }} />
                                        <span style={{ color: "#333" }}>Sửa</span>
                                    </div>
                                    <div className="menuHouse-item">
                                        <DeleteOutlineOutlinedIcon sx={{ color: "#dc3545" }} />
                                        <span style={{ color: "#333" }}>Xóa</span>
                                    </div>
                                    <div className="menuHouse-item">
                                        <InfoOutlinedIcon sx={{ color: "#804bdf" }} />
                                        <span style={{ color: "#333" }}>Chi tiết</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="actions">
                    </div>
                </div>

                <div className="bottom">

                    {children}
                </div>

            </div>
            <Footer />
        </React.Fragment>




    )
}

export default ContainerComponent