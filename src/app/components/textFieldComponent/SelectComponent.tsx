import TextField from '@mui/material/TextField';
import React from 'react'
import { ReactNode } from "react";

interface SelectComponentProps {
    label: string
    value?: number | string | [] | undefined
    onchange?: any
    variant: "outlined" | "standard" | "filled"
    children: ReactNode;
}
const SelectComponent = ({ label, value, onchange, children, variant }: SelectComponentProps) => {

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

        <TextField
            id="select"
            select
            label={label}
            value={value || ''}
            variant={variant}
            onChange={onchange}
            fullWidth
            sx={textfield}

            inputProps={{
                style: {
                    color: "#15a35e",

                }
            }}

        >
            {children}
        </TextField>


    )
}

export default SelectComponent