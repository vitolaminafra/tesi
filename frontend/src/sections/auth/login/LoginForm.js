import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Alert, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import axios from 'axios';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  let md5 = require('js-md5');

  const [showPassword, setShowPassword] = useState(false);

  const [failedLogin, setFailedLogin] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if(localStorage.getItem("user") != null) {
      navigate('/pazienti');
    }
   
  }, []);

  const handleClick = () => {
    localStorage.clear();
    axios({
      method: 'post',
      url: 'http://localhost:5000/login',
      data: {
          email: emailRef.current.value,
          password: md5(passwordRef.current.value)
      }
    }).then(function (response) {
      console.log(response);
      if(response.status === 200) {
        console.log(response.data.publicid)
        localStorage.setItem("user", response.data.publicid);
        navigate('/pazienti', { replace: true });
      }
      
    }).catch(function (error) {
      console.log(error);
      setFailedLogin(true);
      localStorage.clear();
    });
  };

  return (
    <>
      <Stack spacing={3}>
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

      { failedLogin && <Alert severity="error">Credenziali errate o medico non registrato</Alert>}
  
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Accedi
      </LoadingButton>
    </>
  );
}
