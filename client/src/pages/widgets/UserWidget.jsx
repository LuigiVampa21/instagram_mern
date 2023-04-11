import React from 'react'
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const UserWidget = () => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector(state => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    useEffect(() => {
        getUser();
    }, [])
    const getUser = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BASE_URL + '/users/' + user.id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>UserWidget</div>
    )
}

export default UserWidget