import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Button } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
//
import AccountPopover from './AccountPopover';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};



export default function Header({ onOpenNav }) {
  const navigate = useNavigate();


  function goToPazientiPage() {
    navigate('/pazienti');
  }
  return (
    <StyledRoot style={{ width: '100%' }}>
      <StyledToolbar>
        {typeof window.location.pathname.split('/')[2] === 'string' &&
          <Button variant="text" startIcon={<ArrowBackIosIcon />} onClick={() => goToPazientiPage()}>
            Ritorna alla lista pazienti
          </Button>
        }


        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
