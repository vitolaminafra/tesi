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
    Divider,
    List,
    Paper,
    Checkbox,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse

} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
// components
import Iconify from '../components/iconify';
// sections
import MaleRoundedIcon from '@mui/icons-material/MaleRounded';
import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';

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
import { identity } from 'lodash';

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

    const [biopsia, setBiopsia] = useState({});
    const [isBiopsia, setIsBiopsia] = useState(false);

    const [followup, setFollowup] = useState({});
    const [followupSize, setFollowupSize] = useState(0);
    const [followupLoaded, setFollowupLoaded] = useState(false);

    const [open, setOpen] = useState(new Map());

    const [selected, setSelected] = useState(0);

    const handleClick = (id) => {
        let o = new Map();
    
        o.set(id, !open.get(id));
        
        setOpen(o);

    };

    const checkboxClick = (e) => {
        e.stopPropagation();
    
        if(e.target.checked) {
            setSelected(selected + 1);
        } else {
            setSelected(selected - 1);
        }
    }

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
        document.body.style.overflow = 'hidden';

        if (localStorage.getItem("user") === null) {
            navigate('/login');
        }

        getPaziente();

        getBiopsia();

        getFollowup();

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

            if (response.status === 200) {
                setPaziente(response.data);

            }
        }).catch(function (error) {
            
        });
    }

    function getBiopsia() {
        let id = window.location.pathname.split('/')[2];

        axios({
            method: 'post',
            url: 'http://localhost:5000/get_biopsia',
            data: {
                id: id
            }
        }).then(function (response) {
            if (response.status === 200) {

                setBiopsia(response.data);

                setIsBiopsia(true);

            }
        }).catch(function (error) {
            
        });
    }


    function saveBiopsia() {
        let id = window.location.pathname.split('/')[2];

        if(dateValue !== null && formInputs.m !== undefined &&
            formInputs.e !== undefined && formInputs.s !== undefined &&
            formInputs.t !== undefined && formInputs.c !== undefined) {

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
        
                    if (response.status === 200) {
        
                        setSuccessAlert(true);
                        setDisableButton(true);
        
                        getBiopsia();
        
                        setTimeout(() => {
                            handleCloseBiopsiaModal();
                            setDisableButton(false);
                            setSuccessAlert(false);
        
                            resetFormInputs();
                            setDateValue(null);
        
                        }, 3000);
                    }
                }).catch(function (error) {
                    
                });
        
            }
    }

    function saveFollowup() {
        let id = window.location.pathname.split('/')[2];

        if(dateValue !== null && formInputs.altezza !== ''&&
            formInputs.peso !== ''&&
            formInputs.systolic !== ''&&
            formInputs.diastolic !== ''&&
            formInputs.creatinine !== ''&&
            formInputs.uprotein !== '' && 
            formInputs.nbofbpmeds !== undefined &&
            formInputs.rasblockers !== undefined &&
            formInputs.immunotherapies !== undefined) {

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
        
                    if (response.status === 200) {
        
                        setSuccessAlert(true);
                        setDisableButton(true);
        
                        getFollowup();
        
                        setTimeout(() => {
                            handleCloseFollowUpModal();
                            setDisableButton(false);
                            setSuccessAlert(false);
        
                            resetFormInputs();
                            setDateValue(null);
        
                        }, 3000);
                    }
                }).catch(function (error) {
                    
                });
            }

    }

    function getFollowup() {
        let id = window.location.pathname.split('/')[2];

        axios({
            method: 'post',
            url: 'http://localhost:5000/get_followup',
            data: {
                id: id
            }
        }).then(function (response) {
            if (response.status === 200) {
                setFollowup(response.data);
                setFollowupSize(response.data.length);

                setFollowupLoaded(true);

            }
        }).catch(function (error) {
            
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

    function getBooleanString(bool) {
        if (bool)
            return 'Si';
        else
            return 'No';
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
                        {!isBiopsia &&
                            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenBiopsiaModal}>
                                Aggiungi biopsia
                            </Button>
                        }
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
                                <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'block' }}>Data di nascita: <b>{paziente.data}</b></Typography>
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
                    {isBiopsia &&
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}>Svolta in data  <b>{biopsia.data}</b></Typography>
                            <div style={{ display: 'inline-block' }}>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <ThemeProvider theme={theme}>
                                        <Chip variant="outlined" color="primary" label={getBooleanString(biopsia.m)} icon={<Iconify icon="tabler:circle-letter-m" />} />

                                        <Chip variant="outlined" color="primary" label={getBooleanString(biopsia.e)} icon={<Iconify icon="tabler:circle-letter-e" />} />

                                        <Chip variant="outlined" color="primary" label={getBooleanString(biopsia.s)} icon={<Iconify icon="tabler:circle-letter-s" />} />

                                        <Chip variant="outlined" color="primary" label={biopsia.t} icon={<Iconify icon="tabler:circle-letter-t" />} />

                                        <Chip variant="outlined" color="primary" label={getBooleanString(biopsia.c)} icon={<Iconify icon="tabler:circle-letter-c" />} />
                                    </ThemeProvider>
                                </div>
                            </div>
                        </div>
                    }

                    {!isBiopsia &&

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}>Dati relativi alla biopsia non ancora inseriti</Typography>
                        </div>

                    }
                    <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />

                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Typography variant='h6' gutterBottom>Tutti i follow up</Typography>
                            {followupSize > 0 ? 
                                <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}>Seleziona i follow up per la predizione</Typography> : 
                                <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}>Nessun follow up salvato</Typography>
                            }
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Button className="submit-button" disabled={selected < 2 || !isBiopsia} startIcon={<InsightsRoundedIcon />} size="medium" variant="contained">
                                { (!isBiopsia && 'Nessuna biopsia inserita') ||
                                 (selected < 2 && 'Seleziona almeno due follow up') ||
                                 (selected >= 2 && isBiopsia && 'Predizione')}
                            </Button>
                        </div>
                    </div>
                    <Paper sx={{ maxHeight: '35vh', overflow: 'auto' }}>
                        <List sx={{ width: '100%' }}>
                            {followupLoaded && followup.map((row) => {
                                return (
                                    <div key={row.id}>
                                        <ListItemButton disableRipple onClick={() => handleClick(row.id)}>
                                            <ListItemIcon>
                                                <Checkbox
                                                    onClick={(e) => checkboxClick(e, row.id)}
                                                    edge="start"
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <span style={{ display: 'contents', fontWeight: 800 }}>
                                                <ListItemText primary={"Follow up del " + row.data}/>
                                                {open.get(row.id) ? <ExpandLess /> : <ExpandMore />}
                                            </span>
                                        </ListItemButton>
                                        <Collapse in={open.get(row.id)} timeout="auto" unmountOnExit>
                                            <div style={{ marginLeft: '4.5rem' }}>
                                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.3rem' }}>
                                                    <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}><b>Altezza:</b> {row.altezza}cm</Typography>
                                                    <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}> - </Typography>
                                                    <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}><b>Peso:</b> {row.peso}kg</Typography>
                                                </div>
                                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.3rem' }}>
                                                    <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}><b>Systolic:</b> {row.systolic}</Typography>
                                                    <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}> - </Typography>
                                                    <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}><b>Diastolic:</b> {row.diastolic}</Typography>
                                                    <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}> - </Typography>
                                                    <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}><b>Creatinine:</b> {row.creatinine}</Typography>
                                                    <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}> - </Typography>
                                                    <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}><b>Uprotein:</b> {row.uprotein}</Typography>
                                                </div>
                                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.3rem' }}>
                                                    <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}><b>NBofBPmeds:</b> {row.nbofbpmeds}</Typography>
                                                    <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}> - </Typography>
                                                    <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}><b>Ras Blockers:</b> {row.ras}</Typography>
                                                    <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}> - </Typography>
                                                    <Typography variant="body" sx={{ color: 'text.secondary' }} style={{ display: 'inline' }}><b>Immunotherapies:</b> {getBooleanString(row.immunotherapies)}</Typography>
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>

                                )
                            })}

                        </List>

                    </Paper>


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
                                    label="Data follow up*"
                                    format='DD/MM/YYYY'
                                    value={dateValue}
                                    required
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
                                type='number'
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
                                type='number'
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
                                type='number'
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
                                type='number'
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
                                type='number'
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
                                type='number'
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
