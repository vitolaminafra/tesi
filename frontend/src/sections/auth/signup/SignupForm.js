import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import axios from 'axios';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  let md5 = require('js-md5');

  const [showPassword, setShowPassword] = useState(false);

  const nomeRef = useRef();
  const cognomeRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if(localStorage.getItem("user") != null) {
      navigate('/pazienti');
    }
   
  }, []);

  const handleClick = () => {
    localStorage.clear();
    if(nomeRef.current.value !== '' &&
        cognomeRef.current.value !== '' &&
        emailRef.current.value !== '' &&
        passwordRef.current.value !== ''
    ) {
      axios({
        method: 'post',
        url: 'http://localhost:5000/signup',
        data: {
            nome: nomeRef.current.value,
            cognome: cognomeRef.current.value,
            email: emailRef.current.value,
            password: md5(passwordRef.current.value)
        }
      }).then(function (response) {
        console.log(response);
        if(response.status === 200) {
          localStorage.setItem("user", response.data.publicid);
          navigate('/pazienti', { replace: true });
        }
      }).catch(function (error) {
          console.log(error);
          localStorage.clear();
      });
    }

  };

  return (
    <>
      <Stack spacing={3}>

        <TextField name="nome" label="Nome" inputRef={nomeRef}/>

        <TextField name="cognome" label="Cognome" inputRef={cognomeRef}/>

        <TextField name="email" label="Indirizzo email" inputRef={emailRef}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          inputRef={passwordRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Registrati
      </LoadingButton>
    </>
  );
}
