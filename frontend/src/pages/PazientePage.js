import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
    Card,
    Stack,
    Avatar,
    Button,
    Container,
    Typography,
    Chip,
    Divider
} from '@mui/material';
import {
    AppWebsiteVisits,
} from '../sections/@dashboard/app';
// components
import Iconify from '../components/iconify';
// sections
import MaleRoundedIcon from '@mui/icons-material/MaleRounded';
import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';

import useForm from 'src/hooks/UseForm';


import axios from 'axios';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from 'src/layouts/dashboard/header';

const theme = createTheme({
    palette: {
        male: {
            light: '#a2d2ff',
            main: '#a2d2ff',
            dark: '#a2d2ff',
            contrastText: '#293241',
        },
        female: {
            light: '#ffc8dd',
            main: '#ffc8dd',
            dark: '#ffc8dd',
            contrastText: '#293241',
        },
    },
});
// ----------------------------------------------------------------------

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

// ----------------------------------------------------------------------


export default function PazientePage() {
    const [dateValue, setDateValue] = useState(null);
    var { formInputs, handleInputChange, resetFormInputs } = useForm();

    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const [successAlert, setSuccessAlert] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    const [paziente, setPaziente] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("user") === null) {
            navigate('/login');
        }

        getPaziente();

    }, []);

    function getPaziente() {
        let id = window.location.pathname.split('/')[2];

        axios({
            method: 'post',
            url: 'http://localhost:5000/paziente',
            data: {
                id: id
            }
        }).then(function (response) {
            console.log(response);
            if (response.status === 200) {
                setPaziente(response.data);

                setLoaded(true);

            }
        }).catch(function (error) {
            console.log(error);
        });
    }


    function getSexString(sex) {
        if (sex === 'male')
            return 'Maschio'
        else
            return 'Femmina'
    }

    function getSexIcon(sex) {
        if (sex === 'male')
            return <MaleRoundedIcon />
        else
            return <FemaleRoundedIcon />
    }


    return (
        <>
            <Helmet>
                <title> Paziente - {paziente.nome + ' ' + paziente.cognome} </title>
            </Helmet>

            <Header></Header>

            <Container style={{ maxWidth: '1000px', marginTop: '7.2rem' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Dettagli paziente
                    </Typography>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenModal}>
                            Aggiungi biopsia
                        </Button>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenModal}>
                            Aggiungi follow up
                        </Button>
                    </div>
                </Stack>

                <Card style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <Avatar alt={paziente.nome + " " + paziente.cognome} src={'/assets/images/avatars/' + paziente.sesso + '.jpg'} sx={{ width: 100, height: 100 }} />
                            <div style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', gap: '1rem' }}>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <Typography variant="h4" gutterBottom>{paziente.nome + ' ' + paziente.cognome}</Typography>
                                    <ThemeProvider theme={theme}>
                                        <Chip label={getSexString(paziente.sesso)} icon={getSexIcon(paziente.sesso)} color={paziente.sesso}></Chip >
                                    </ThemeProvider>
                                </div>
                                <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'block' }}>{'Data di nascita: ' + paziente.data}</Typography>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', height: 'fit-content', flexDirection: 'column' }}>
                            <Button variant="outlined">Vedi biopsia</Button>
                            <Button variant="outlined">Vedi follow up</Button>
                        </div>
                    </div>

                    <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
                    <AppWebsiteVisits
                        title="Previsione"
                        subheader="(+43%) than last year"
                        chartLabels={[
                            '01/01/2003',
                            '02/01/2003',
                            '03/01/2003',
                            '04/01/2003',
                            '05/01/2003',
                            '06/01/2003',
                            '07/01/2003',
                            '08/01/2003',
                            '09/01/2003',
                            '10/01/2003',
                            '11/01/2003',
                        ]}
                        chartData={[
                            {
                                name: 'Team A',
                                type: 'column',
                                fill: 'solid',
                                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                            },
                            {
                                name: 'Team B',
                                type: 'area',
                                fill: 'gradient',
                                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                            },
                            {
                                name: 'Team C',
                                type: 'line',
                                fill: 'solid',
                                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                            },
                        ]}
                    />
                </Card>
            </Container>

        </>
    );
}
