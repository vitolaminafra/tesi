import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
// sections
import { SignupForm } from 'src/sections/auth/signup';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login', { replace: true });
  };

  return (
    <>
      <Helmet>
        <title> Registrazione </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection style={{display: 'flex', alignItems: 'center'}}>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Benvenuto!
            </Typography>
            <img src="/assets/illustrations/doctor.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Registrazione medico
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Hai già un account? {''}
              <Link variant="subtitle2" onClick={handleClick} style={{cursor: 'pointer'}}>Accedi</Link>
            </Typography>

            <SignupForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
