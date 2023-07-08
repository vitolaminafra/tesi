import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';

import axios from 'axios';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();

  const StyledAccount = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center'
  }));


  const logout = () =>  {
    localStorage.clear();
    navigate('/login');
  }

  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost:5000/medico',
      data: {
          publicid: localStorage.getItem('user'),
      }
    }).then(function (response) {
      if(response.status === 200) {
        setNome(response.data.nome);
        setCognome(response.data.cognome);
        setEmail(response.data.email);
      }
    }).catch(function (error) {
    });
   
  }, []);

  return (
    <>

    <Box >
        <Link underline="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2}}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                { "Dr. " + nome + " " + cognome}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {email}
              </Typography>
            </Box>
            <IconButton
                sx={{color: 'text.primary', ml: '2rem'}}
                onClick={logout}>
                <Iconify icon="material-symbols:logout-rounded" />
              </IconButton>
          </StyledAccount>
        </Link>
      </Box>

    </>
  );
}
