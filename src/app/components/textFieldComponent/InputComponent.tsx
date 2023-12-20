"use client"
import TextField from '@mui/material/TextField'
import React, { ReactNode, useState } from 'react'


type TextAlign = "left" | "center" | "right" | "justify";

interface InputComponentProps {
    label: string
    data?: number | string | []
    onchange?: any
    variant: "outlined" | "standard" | "filled"
    size?: "small" | "medium"
    multiline?: boolean
    align?: TextAlign
    type?: string
    onkeydown?: any
    placeholder?: string
}
const InputComponent = ({ data, label, onchange, variant, size, multiline, align, type, onkeydown, placeholder, }: InputComponentProps) => {

    const textfield = {
        // maxHeight: "30px",
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#15a35e',
        },
        '.MuiSelect-select': {

            color: "#15a35e"
        },

        '.MuiInputBase-root': {
            height: "55px"
        },
        '.MuiSvgIcon-root ': {
            fill: "black !important",
        },
        '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: "#15a35e"
        },
        ".css-x2l1vy-MuiInputBase-root-MuiOutlinedInput-root": {
            color: "#ccc",
        },
        '.css-1jy569b-MuiFormLabel-root-MuiInputLabel-root': {
            top: '1px !important'
        },
        '.css-1ald77x': {
            fontSize: "0.8rem !important",
            top: '1px !important'
        },

        "& .MuiFormLabel-root": {
            color: "#cfcfcf",


        },
        '.MuiInputLabel-outlined.Mui-focused': {

            color: "#15a35e",

        },
        '&.Mui-focused': {
            color: '#15a35e', // Màu khi textfield được focus
            borderColor: '#15a35e !important', // Màu viền khi textfield được focus
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#15a35e !important', // Màu viền khi textfield được hover
        },
        background: "#fff",

    };
    return (
        <>

            <TextField
                id="input basic"
                label={label}
                size={size}
                multiline={multiline}
                value={data}
                variant={variant}
                type={type}
                onChange={onchange}
                fullWidth
                sx={textfield}
                onKeyDown={onkeydown}
                placeholder={placeholder}
                inputProps={{
                    style: {
                        fontSize: "1.5rem",
                        color: "#15a35e",
                        textAlign: align || undefined
                    }
                }}

            />
        </>




    )
}

export default InputComponent