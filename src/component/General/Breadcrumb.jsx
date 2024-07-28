import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { useEffect, useState } from 'react';

const Breadcrumb = (props) => {
    const { indexBreadcrumb } = props;
    const listBreadcrumb = [
        {
            Home: "/",
            "Tất cả cơ sở y tế": "/clinics",

        },
        {
            Home: "/",
            "Danh sách bác sĩ": "/doctors",
        },
        {
            Home: "/",
            "Chuyên khoa khám": "/specialties",
        },
        {
            Home: "/",
            "Chuyên khoa khám": "/specialties",
            "Danh sách bác sĩ": "/doctors",
        },
        {
            Home: "/",
            "Tất cả cơ sở y tế": "/clinics",
            "Thông tin cơ sở y tế": "/clinic-info",
        }
    ]

    const keys = Object.keys(listBreadcrumb[indexBreadcrumb]);

    return (
        <>
            {keys && keys.length > 2 ?
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href="/"
                    >
                        <HomeIcon sx={{ mr: 0.5, fontSize: "22px", color: "deepskyblue" }} fontSize="inherit" />
                    </Link>
                    {keys.slice(1, -1).map((item, index) => (
                        <Link
                            key={index}
                            underline="hover"
                            href={listBreadcrumb[indexBreadcrumb][item]}
                            sx={{ display: 'flex', alignItems: 'center', fontFamily: 'serif' }}
                        >
                            {item}
                        </Link>
                    ))}
                    <Typography
                        sx={{ display: 'flex', alignItems: 'center', fontFamily: 'serif' }}
                        color="text.primary"
                    >
                        {keys[keys.length - 1]}
                    </Typography>
                </Breadcrumbs>

                :
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href="/"
                    >
                        <HomeIcon sx={{ mr: 0.5, fontSize: "22px", color: "deepskyblue" }} fontSize="inherit" />
                    </Link>
                    <Typography
                        sx={{ display: 'flex', alignItems: 'center', fontFamily: 'serif' }}
                        color="text.primary"
                    >
                        {keys[keys.length - 1]}
                    </Typography>
                </Breadcrumbs>
            }



        </>
    )
}

export default Breadcrumb;