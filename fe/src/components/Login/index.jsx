import * as React from 'react';

import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/image/background.svg';
import { Checkbox } from '@mui/material';

const theme = createTheme();

export default function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5001/user/login', { username, password });
            setLoading(false);
            if (res.data.login) {
                setUsername('');
                setPassword('');
                console.log(res.data);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('id', res.data.id);
                localStorage.setItem('name', res.data.username);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('idPage', res.data.idPage);
                navigate(`/${res.data.role}`);
                window.location.reload();
            } else {
                setError(res.data.msg);
                setPassword('');
            }
        } catch (err) {
            console.log('Login fe failed: ' + err.message);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                    width: '100%',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                }}
            >
                {/* Nội dung khác của bạn */}

                <Grid container sx={{ height: '100%' }}>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            margin: 'auto',
                            width: '25%',
                            height: '88%',
                            paddingX: 5,
                            display: 'flex',
                            flexDirection: 'column',

                            // justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '12px',
                        }}
                    >
                        <img
                            src="../../../src/assets/image/logo.svg"
                            alt="My SVG Image"
                            style={{ marginTop: '40px', height: '70px' }}
                        />
                        <Typography component="h1" variant="h5" mt={5}>
                            Welcome Back!
                        </Typography>
                        <Typography
                            component="h2"
                            mt={1}
                            sx={{ color: '#ABABAB', fontSize: 15, fontWeight: 400, marginLeft: '13px' }}
                        >
                            Sign in continue to yourDigital Library
                        </Typography>
                        <ValidatorForm noValidate style={{ width: '100%', marginTop: '20px' }} onSubmit={handleSubmit}>
                            <TextValidator
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                validators={['required', 'isEmail']}
                                errorMessages={['Email is required.', 'Invalid email']}
                                onFocus={() => setError('')}
                            />
                            <TextValidator
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                validators={['required']}
                                errorMessages={['Password is required.']}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setError('')}
                            />
                            <Typography
                                component="h1"
                                variant="h5"
                                sx={{ color: '#d32f2f', fontSize: 13, marginLeft: '13px' }}
                                mb={2}
                            >
                                {error}
                            </Typography>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Remember me"
                                labelPlacement="end" // Optionally place label after checkbox
                                sx={{
                                    color: 'grey',
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    fontSize: 16,
                                    backgroundColor: '#FA7C22',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#D54A1E',
                                    },
                                }}
                                onClick={() => setError('')}
                            >
                                Login
                            </Button>
                        </ValidatorForm>
                        {loading ? (
                            <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <></>
                        )}
                    </Box>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}
