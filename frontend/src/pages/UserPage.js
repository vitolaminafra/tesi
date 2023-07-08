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
  Chip
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead } from '../sections/@dashboard/user';
import MaleRoundedIcon from '@mui/icons-material/MaleRounded';
import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';

import useForm from 'src/hooks/UseForm';
import TextField from '@mui/material/TextField'
import Grid2 from '@mui/material/Unstable_Grid2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import axios from 'axios';

import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const TABLE_HEAD = [
  { id: 'fullName', label: 'Nome e cognome', alignRight: false },
  { id: 'data', label: 'Data di nascita', alignRight: false },
  { id: 'sesso', label: 'Sesso', alignRight: false },
  { id: '' }
];

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

const sex = [
  {
    value: 'male',
    label: 'Maschio'
  }, {
    value: 'female',
    label: 'Femmina'
  }
];



// ----------------------------------------------------------------------


export default function UserPage() {
  const [dateValue, setDateValue] = useState(null);
  var { formInputs, handleInputChange, resetFormInputs } = useForm();

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [successAlert, setSuccessAlert] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const [pazienti, setPazienti] = useState({});
  const [pazientiSize, setPazientiSize] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate('/login');
    }

    getAllPazienti();

  }, []);

  function getAllPazienti() {
    axios({
      method: 'post',
      url: 'http://localhost:5000/all_pazienti',
      data: {
        publicid: localStorage.getItem('user')
      }
    }).then(function (response) {
      if (response.status === 200) {
        setPazienti(response.data);
        setPazientiSize(Object.entries(pazienti).length)

        setLoaded(true);
      }
    }).catch(function (error) {
      
    });
  }

  function savePaziente() {
    if(formInputs.nome !== '' && formInputs.cognome !== '' &&
        dateValue !== null && formInputs.sesso !== undefined) {
          axios({
            method: 'post',
            url: 'http://localhost:5000/save_paziente',
            data: {
              nome: formInputs.nome,
              cognome: formInputs.cognome,
              data: dateValue.format("DD/MM/YYYY"),
              sesso: formInputs.sesso,
              publicid: localStorage.getItem('user')
            }
          }).then(function (response) {
            if (response.status === 200) {
              getAllPazienti();
      
              setSuccessAlert(true);
              setDisableButton(true);
      
              setTimeout(() => {
                handleCloseModal();
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

  function getSexString(sex) {
    if(sex === 'male')
      return 'Maschio'
    else
      return 'Femmina'
  }

  function getSexIcon(sex) {
    if(sex === 'male')
      return <MaleRoundedIcon />
    else
      return <FemaleRoundedIcon />
  }

  function goToPazientePage(id) {
    navigate('/paziente/' + id);
  }

  return (
    <>
      <Helmet>
        <title> Pazienti </title>
      </Helmet>

      <Container style={{maxWidth: '1000px'}}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tutti i tuoi pazienti
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenModal}>
            Aggiungi paziente
          </Button>
        </Stack>

        <Card>

          {
            loaded &&

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    headLabel={TABLE_HEAD}
                    rowCount={pazientiSize}
                    onRequestSort={() => {}}
                  />
                  <TableBody>
                    {pazienti.map((row) => {
                      return (
                        <TableRow hover key={row.id} tabIndex={-1}>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2} style={{ marginLeft: 1 + 'em' }}>
                              <Avatar alt={row.nome + " " + row.cognome} src={'/assets/images/avatars/' + row.sesso + '.jpg'}/>
                              <Typography variant="subtitle2" noWrap>
                                {row.nome + " " + row.cognome}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{row.data}</TableCell>

                          <TableCell align="left">
                            <ThemeProvider theme={theme}>
                              <Chip label={getSexString(row.sesso)} icon={getSexIcon(row.sesso)} color={row.sesso}></Chip >
                            </ThemeProvider>
                            </TableCell>

                          <TableCell align="right">
                            <IconButton size="large" color="inherit" onClick={() => goToPazientePage(row.id)}>
                              <Iconify icon={'octicon:chevron-right-16'} />
                            </IconButton>
                          </TableCell>

                        </TableRow>
                      )
                    })}
                  </TableBody>

                </Table>
              </TableContainer>
            </Scrollbar>
          }
        </Card>
      </Container>

      <Modal
        open={openModal}
        //onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '2rem' }}>
            <Typography variant="h4" gutterBottom>
              Inserisci i dati del paziente
            </Typography>
            <IconButton aria-label="close" onClick={handleCloseModal}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          <Grid2 container="container" spacing={2}>
            <Grid2 xs={12} sm={6}>
              <TextField
                id="nome"
                name="nome"
                label="Nome"
                variant="outlined"
                required
                fullWidth
                onChange={handleInputChange}
                value={formInputs.nome} />
            </Grid2>
            <Grid2 xs={12} sm={6}>
              <TextField
                id="cognome"
                name="cognome"
                label="Cognome"
                variant="outlined"
                required
                fullWidth
                onChange={handleInputChange}
                value={formInputs.cognome} />
            </Grid2>
            <Grid2 xs={12} sm={6}>
              <TextField
                select
                id="sesso"
                name="sesso"
                defaultValue=""
                values={sex}
                onChange={handleInputChange}
                value={formInputs.sesso}
                label="Sesso"
                variant="outlined"
                required
                fullWidth>
                {
                  sex.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                }
              </TextField>
            </Grid2>
            <Grid2 xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Data di nascita"
                  name="data"
                  format='DD/MM/YYYY'
                  value={dateValue}
                  slotProps={{ textField: { fullWidth: true } }}
                  onChange={(newValue) => {
                    setDateValue(newValue);
                  }
                  }
                />
              </LocalizationProvider>
            </Grid2>
            <Grid2 xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button className="submit-button" disabled={disableButton} startIcon={<Iconify icon="charm:circle-tick" />} size="medium" variant="contained" onClick={savePaziente} sx={{ mt: '2rem' }}>Salva paziente</Button>
            </Grid2>
          </Grid2>
          {successAlert && <Alert severity="success" sx={{ mt: '2rem' }}>Dati del paziente salvati con successo!</Alert>}
        </Box>
      </Modal>

    </>
  );
}
