import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 100,
    width: 500,
    lineHeight: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: '20px',
    borderRadius: "20px",
    fontWeight: 600,
    fontSize: "1.25rem",
    cursor: "pointer",
}));



const Specialties = (props) => {

    const { listSpecialties } = props;

    const navigate = useNavigate();

    // const [listSpecialties, setListSpecialties] = useState([]);


    // const fetchListSpecialties = async () => {
    //     let result = await getSpecialtiesPagination(1, 8);
    //     if (result.ER === 0) {
    //         setListSpecialties(result.data);
    //     } else console.log(result.message);
    // }

    // useEffect(() => {
    //     fetchListSpecialties();
    // }, [])

    const bufferToDataURL = (buffer) => {
        const blob = new Blob([new Uint8Array(buffer.data)], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;
    }


    const handleNavigate = (id) => {
        navigate(`/doctors-specialties/${id}`);
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={10} key={1}>
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        // bgcolor: 'background.default',
                        display: 'grid',
                        gridTemplateColumns: { md: '1fr 1fr' },
                        gap: 5,
                    }}
                >
                    {listSpecialties && listSpecialties.length > 0
                        && listSpecialties.map((specialties, index) => {
                            return (
                                <Item key={index} elevation={4} onClick={() => {
                                    handleNavigate(specialties.id)
                                }}>
                                    {specialties.image ?
                                        <img src={bufferToDataURL(specialties.image)} className='h-24 w-40 rounded-lg ml-10' />
                                        :
                                        <></>
                                    }

                                    {specialties.name}
                                </Item>
                            )
                        })
                    }
                </Box>
            </Grid>
        </Grid >

    )
}

export default Specialties;