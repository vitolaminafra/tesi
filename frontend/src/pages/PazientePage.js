import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    Modal,
    Box,
    Alert,
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

import TextField from '@mui/material/TextField'
import Grid2 from '@mui/material/Unstable_Grid2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InputAdornment from '@mui/material/InputAdornment';

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
        m: {
            light: '#ef476f',
            main: '#ef476f',
            dark: '#ef476f',
            contrastText: '#fff',
        },
        e: {
            light: '#ff7b00',
            main: '#ff7b00',
            dark: '#ff7b00',
            contrastText: '#fff',
        },
        s: {
            light: '#38b000',
            main: '#38b000',
            dark: '#38b000',
            contrastText: '#000',
        },
        t: {
            light: '#118ab2',
            main: '#118ab2',
            dark: '#118ab2',
            contrastText: '#fff',
        },
        c: {
            light: '#073b4c',
            main: '#073b4c',
            dark: '#073b4c',
            contrastText: '#fff',
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

    const [openBiopsiaModal, setOpenBiopsiaModal] = useState(false);

    const handleOpenBiopsiaModal = () => setOpenBiopsiaModal(true);
    const handleCloseBiopsiaModal = () => setOpenBiopsiaModal(false);

    const [openFollowUpModal, setOpenFollowUpModal] = useState(false);

    const handleOpenFollowUpModal = () => setOpenFollowUpModal(true);
    const handleCloseFollowUpModal = () => setOpenFollowUpModal(false);

    const [successAlert, setSuccessAlert] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    const [paziente, setPaziente] = useState({});
    const [loaded, setLoaded] = useState(false);

    const MValues = [
        {
            value: false,
            label: 'No'
        }, {
            value: true,
            label: 'Si'
        }
    ];

    const EValues = [
        {
            value: false,
            label: 'No'
        }, {
            value: true,
            label: 'Si'
        }
    ];

    const SValues = [
        {
            value: false,
            label: 'No'
        }, {
            value: true,
            label: 'Si'
        }
    ];

    const TValues = [
        {
            value: '0',
            label: '0'
        }, {
            value: '1',
            label: '1'
        }, {
            value: '2',
            label: '2'
        }
    ];

    const CValues = [
        {
            value: false,
            label: 'No'
        }, {
            value: true,
            label: 'Si'
        }
    ];

    const NBofBPmedsValues = [
        {
            value: '0',
            label: '0'
        }, {
            value: '1',
            label: '1'
        }, {
            value: '2',
            label: '2'
        }, {
            value: '3',
            label: '3'
        }, {
            value: '4',
            label: '4'
        }, {
            value: '5',
            label: '5'
        }, {
            value: '6',
            label: '6'
        }, {
            value: '7',
            label: '7'
        }, {
            value: '8',
            label: '8'
        }, {
            value: '9',
            label: '9'
        }, {
            value: '10',
            label: '10'
        }
    ];

    const RASBlockersValues = [
        {
            value: '0',
            label: '0'
        }, {
            value: '1',
            label: '1'
        }, {
            value: '2',
            label: '2'
        }
    ];

    const ImmunotherapiesValues = [
        {
            value: false,
            label: 'No'
        }, {
            value: true,
            label: 'Si'
        }
    ];

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

    function saveBiopsia() {
        let id = window.location.pathname.split('/')[2];

        axios({
            method: 'post',
            url: 'http://localhost:5000/add_biopsia',
            data: {
                id_paziente: id,
                data: dateValue.format("DD/MM/YYYY"),
                m: formInputs.m,
                e: formInputs.e,
                s: formInputs.s,
                t: formInputs.t,
                c: formInputs.c,
            }
        }).then(function (response) {
            console.log(response);
            if (response.status === 200) {

                setSuccessAlert(true);
                setDisableButton(true);

                setTimeout(() => {
                    handleCloseBiopsiaModal();
                    setDisableButton(false);
                    setSuccessAlert(false);

                    resetFormInputs();
                    setDateValue(null);

                }, 3000);
            }
        }).catch(function (error) {
            console.log(error);
        });

    }

    function saveFollowup() {
        let id = window.location.pathname.split('/')[2];

        axios({
            method: 'post',
            url: 'http://localhost:5000/add_followup',
            data: {
                id_paziente: id,
                data: dateValue.format("DD/MM/YYYY"),
                altezza: formInputs.altezza,
                peso: formInputs.peso,
                systolic: formInputs.systolic,
                diastolic: formInputs.diastolic,
                creatinine: formInputs.creatinine,
                uprotein: formInputs.uprotein,
                nbofbpmeds: formInputs.nbofbpmeds,
                ras: formInputs.rasblockers,
                immunotherapies: formInputs.immunotherapies,
            }
        }).then(function (response) {
            console.log(response);
            if (response.status === 200) {

                setSuccessAlert(true);
                setDisableButton(true);

                setTimeout(() => {
                    handleCloseFollowUpModal();
                    setDisableButton(false);
                    setSuccessAlert(false);

                    resetFormInputs();
                    setDateValue(null);

                }, 3000);
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
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenBiopsiaModal}>
                            Aggiungi biopsia
                        </Button>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenFollowUpModal}>
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
                    </div>

                    <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
                    {/* <AppWebsiteVisits
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
                    /> */}

                    <Typography variant='h6' gutterBottom>Biopsia</Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}>Svolta in data 20/05/2023</Typography>
                        <div style={{ display: 'inline-block' }}>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <ThemeProvider theme={theme}>
                                    <Chip variant="outlined" color="m" label="Si" icon={<Iconify icon="tabler:circle-letter-m" />} />

                                    <Chip variant="outlined" color="e" label="Si" icon={<Iconify icon="tabler:circle-letter-e" />} />

                                    <Chip variant="outlined" color="s" label="Si" icon={<Iconify icon="tabler:circle-letter-s" />} />

                                    <Chip variant="outlined" color="t" label="1" icon={<Iconify icon="tabler:circle-letter-t" />} />

                                    <Chip variant="outlined" color="c" label="Si" icon={<Iconify icon="tabler:circle-letter-c" />} />
                                </ThemeProvider>
                            </div>
                        </div>
                    </div>

                    <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />

                    <Typography variant='h6' gutterBottom>Tutti i follow up</Typography>
                    

                </Card>
            </Container>

            <Modal
                open={openBiopsiaModal}
                //onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '2rem' }}>
                        <Typography variant="h4" gutterBottom>
                            Inserisci i dati della biopsia
                        </Typography>
                        <IconButton aria-label="close" onClick={handleCloseBiopsiaModal}>
                            <CloseRoundedIcon />
                        </IconButton>
                    </Box>
                    <Grid2 container="container" spacing={2}>
                        <Grid2 xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DesktopDatePicker
                                    label="Data biopsia"
                                    format='DD/MM/YYYY'
                                    name="birth_date"
                                    value={dateValue}
                                    onChange={(newValue) => {
                                        setDateValue(newValue);
                                    }}
                                    slotProps={{ textField: { fullWidth: true } }}

                                />
                            </LocalizationProvider>
                        </Grid2>

                        <Grid2 xs={12} sm={6}>
                            <TextField
                                select
                                id="m"
                                name="m"
                                defaultValue=""
                                values={MValues}
                                onChange={handleInputChange}
                                value={formInputs.m}
                                label="M"
                                variant="outlined"
                                required
                                fullWidth>
                                {
                                    MValues.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid2>
                        <Grid2 xs={12} sm={6}>
                            <TextField
                                select
                                id="e"
                                name="e"
                                defaultValue=""
                                values={EValues}
                                onChange={handleInputChange}
                                value={formInputs.e}
                                label="E"
                                variant="outlined"
                                required
                                fullWidth>
                                {
                                    EValues.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid2>
                        <Grid2 xs={12} sm={6}>
                            <TextField
                                select
                                id="s"
                                name="s"
                                defaultValue=""
                                onChange={handleInputChange}
                                value={formInputs.s}
                                values={SValues}
                                label="S"
                                variant="outlined"
                                required
                                fullWidth>
                                {
                                    SValues.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid2>

                        <Grid2 xs={12} sm={6}>
                            <TextField
                                select
                                id="t"
                                name="t"
                                defaultValue=""
                                values={TValues}
                                onChange={handleInputChange}
                                value={formInputs.t}
                                label="T"
                                variant="outlined"
                                required
                                fullWidth>
                                {
                                    TValues.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid2>
                        <Grid2 xs={12} sm={6}>
                            <TextField
                                select
                                id="c"
                                name="c"
                                defaultValue=""
                                values={CValues}
                                onChange={handleInputChange}
                                value={formInputs.c}
                                label="C"
                                variant="outlined"
                                required
                                fullWidth>
                                {
                                    CValues.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid2>

                        <Grid2 xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button className="submit-button" disabled={disableButton} startIcon={<Iconify icon="charm:circle-tick" />} size="medium" variant="contained" onClick={saveBiopsia} sx={{ mt: '2rem' }}>Salva biopsia</Button>
                        </Grid2>
                    </Grid2>
                    {successAlert && <Alert severity="success" sx={{ mt: '2rem' }}>Dati della biopsia salvati con successo!</Alert>}
                </Box>
            </Modal >

            <Modal
                open={openFollowUpModal}
                //onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '2rem' }}>
                        <Typography variant="h4" gutterBottom>
                            Inserisci i dati del follow up
                        </Typography>
                        <IconButton aria-label="close" onClick={handleCloseFollowUpModal}>
                            <CloseRoundedIcon />
                        </IconButton>
                    </Box>
                    <Grid2 container="container" spacing={2}>
                        <Grid2 xs={12} sm={6} md={4}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DesktopDatePicker
                                    id="date"
                                    name="date"
                                    label="Data follow up"
                                    format='DD/MM/YYYY'
                                    value={dateValue}
                                    onChange={(newValue) => {
                                        setDateValue(newValue);
                                    }}
                                    slotProps={{ textField: { fullWidth: true } }} />

                            </LocalizationProvider>
                        </Grid2>
                        <Grid2 xs={12} sm={6} md={4}>
                            <TextField
                                id="altezza"
                                name="altezza"
                                label="Altezza"
                                variant="outlined"
                                required
                                fullWidth
                                onChange={handleInputChange}
                                value={formInputs.height}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>
                                }} />
                        </Grid2>
                        <Grid2 xs={12} sm={6} md={4}>
                            <TextField
                                id="peso"
                                name="peso"
                                label="Peso"
                                variant="outlined"
                                required
                                fullWidth
                                onChange={handleInputChange}
                                value={formInputs.weight}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">kg</InputAdornment>
                                }} />
                        </Grid2>

                        <Grid2 xs={12} sm={6} md={3}>
                            <TextField
                                id="systolic"
                                name="systolic"
                                label="Systolic"
                                variant="outlined"
                                required
                                onChange={handleInputChange}
                                value={formInputs.systolic}
                                fullWidth />
                        </Grid2>
                        <Grid2 xs={12} sm={6} md={3}>
                            <TextField
                                id="diastolic"
                                name="diastolic"
                                label="Diastolic"
                                variant="outlined"
                                required
                                onChange={handleInputChange}
                                value={formInputs.diastolic}
                                fullWidth />
                        </Grid2>
                        <Grid2 xs={12} sm={6} md={3}>
                            <TextField
                                id="creatinine"
                                name="creatinine"
                                label="Creatinine"
                                variant="outlined"
                                required
                                onChange={handleInputChange}
                                value={formInputs.creatinine}
                                fullWidth />
                        </Grid2>
                        <Grid2 xs={12} sm={6} md={3}>
                            <TextField
                                id="uprotein"
                                name="uprotein"
                                label="Uprotein"
                                variant="outlined"
                                required
                                onChange={handleInputChange}
                                value={formInputs.uprotein}
                                fullWidth />
                        </Grid2>

                        <Grid2 xs={12} sm={6} md={4}>
                            <TextField
                                select
                                id="nbofbpmeds"
                                name="nbofbpmeds"
                                values={NBofBPmedsValues}
                                defaultValue=""
                                label="NBofBPmeds"
                                variant="outlined"
                                required
                                onChange={handleInputChange}
                                value={formInputs.nbofbpmeds}
                                fullWidth>
                                {
                                    NBofBPmedsValues.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid2>
                        <Grid2 xs={12} sm={6} md={4}>
                            <TextField
                                select
                                id="rasblockers"
                                name="rasblockers"
                                values={RASBlockersValues}
                                label="RAS Blockers"
                                defaultValue=""
                                variant="outlined"
                                required
                                onChange={handleInputChange}
                                value={formInputs.rasblockers}
                                fullWidth>
                                {
                                    RASBlockersValues.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid2>
                        <Grid2 xs={12} sm={6} md={4}>
                            <TextField
                                select
                                id="immunotherapies"
                                name="immunotherapies"
                                values={ImmunotherapiesValues}
                                label="Immunotherapies"
                                variant="outlined"
                                defaultValue=""
                                required
                                onChange={handleInputChange}
                                value={formInputs.immunotherapies}
                                fullWidth>
                                {
                                    ImmunotherapiesValues.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid2>
                        <Grid2 xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button className="submit-button" disabled={disableButton} startIcon={<Iconify icon="charm:circle-tick" />} size="medium" variant="contained" onClick={saveFollowup} sx={{ mt: '2rem' }}>Salva follow up</Button>
                        </Grid2>
                    </Grid2>
                    {successAlert && <Alert severity="success" sx={{ mt: '2rem' }}>Follow up salvato con successo!</Alert>}
                </Box>
            </Modal >

        </>
    );
}
