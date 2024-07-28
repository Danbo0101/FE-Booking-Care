import Breadcrumb from "../../General/Breadcrumb";
import imgtest from "../../../assets/images/clinic.png";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllClinic } from "../../../services/clinicService";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer"
}));

const ListClinics = (props) => {

    const navigate = useNavigate();

    const [indexBreadcrumb, setIndexBreadcrumb] = useState(0);

    const districts = [
        "Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5", "Quận 6",
        "Quận 7", "Quận 8", "Quận 9", "Quận 10", "Quận 11", "Quận 12",
        "Quận Bình Tân", "Quận Bình Thạnh", "Quận Gò Vấp", "Quận Phú Nhuận",
        "Quận Tân Bình", "Quận Tân Phú", "Quận Thủ Đức"
    ];

    const [districtAddresses, setDistrictAddresses] = useState({});
    const [otherAddresses, setOtherAddresses] = useState([]);
    const [listClinic, setListClinic] = useState([]);

    useEffect(() => {
        const fetchDataClinic = async () => {
            let result = await getAllClinic();
            if (result.ER === 0) {
                setListClinic(result.data);
            }
        };

        fetchDataClinic();
    }, []);

    useEffect(() => {
        const districtMap = districts.reduce((acc, district) => {
            acc[district] = [];
            return acc;
        }, {});

        const others = [];

        listClinic.forEach(addr => {
            const lowerAddress = addr.address.toLowerCase();
            let found = false;

            for (const district of districts) {
                if (lowerAddress.includes(district.toLowerCase())) {
                    districtMap[district].push(addr);
                    found = true;
                    break;
                }
            }

            if (!found) {
                others.push(addr);
            }
        });

        setDistrictAddresses(districtMap);
        setOtherAddresses(others);
    }, [listClinic]);

    const bufferToDataURL = (buffer) => {
        const blob = new Blob([new Uint8Array(buffer.data)], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;
    }

    const handleNavigate = (id) => {
        navigate(`/clinic-info/${id}`)
    }


    return (
        <div className="py-10 px-32">
            <div >
                <Breadcrumb
                    indexBreadcrumb={indexBreadcrumb}
                />
            </div>
            <div>
                {Object.keys(districtAddresses).filter(district => districtAddresses[district].length > 0).map((district) => (
                    <div key={district}>
                        <div className="text-xl font-serif font-bold py-10">
                            {district}
                            <hr />
                        </div>
                        <Grid container spacing={2}>
                            {districtAddresses[district].map((item, index) => {
                                return (
                                    <Grid item xs={3}>
                                        <Item onClick={() => handleNavigate(item.id)}>
                                            <img src={bufferToDataURL(item.image)} className="w-56 h-44 mb-2" />
                                            {item.name}
                                        </Item>
                                    </Grid>
                                )
                            }
                            )}
                        </Grid>
                    </div>
                ))}
                <div className="text-xl font-serif font-bold py-10">
                    Không thuộc các quận
                    <hr />
                </div>
                <Grid container spacing={2}>
                    {otherAddresses.map((item, index) => {
                        return (
                            <Grid item xs={3}>
                                <Item onClick={() => handleNavigate(item.id)}>
                                    <img src={imgtest} className="w-56 h-36 mb-2" />
                                    {item.address}
                                </Item>
                            </Grid>
                        )
                    }
                    )}
                </Grid>
            </div>
        </div>
    )
}

export default ListClinics;