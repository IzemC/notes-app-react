import React, { useState, useContext } from 'react'
import axios from 'axios'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import AuthContext from '../../contexts/authContext'

function Login() {

  const { setAuthState } = useContext(AuthContext);

  const [isAlert, setIsAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState('');
  const [isError, setIsError] = useState(false);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true);
    try {
      let res = await axios.get('/api/auth/login', {
        params: {
          email,
          password
        },
      });
      if (res.data.success) {
        setIsError(false);
        localStorage.setItem('authToken', res.data.authToken);
        localStorage.setItem('firstName', res.data.user.firstName);
        localStorage.setItem('lastName', res.data.user.lastName);
        localStorage.setItem('email', res.data.user.email);
        localStorage.setItem('createdAt', res.data.user.createdAt);
        localStorage.setItem('updatedAt', res.data.user.updatedAt);
        setAuthState({ isAuth: true, token: res.data.user.authToken });
      }
      else
        setIsError(true);

      setIsAlert(true);
      setMsgAlert(res.data.message);

    } catch (err) {
      setIsAlert(true);
      setIsError(true);
      setMsgAlert('Server Error');
    }
    setIsLoading(false);
  }
  return (

    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Modal
        open={isLoading}
      >
        <Box sx={{ margin: 0, position: "absolute", top: "50%", left: "50%" }}
        >
          <CircularProgress />
        </Box>

      </Modal>
      <Typography variant='h2' sx={{ margin: '1em 0' }}>Notes App</Typography>
      <Typography variant='h3'>Sign in</Typography>
      <form onSubmit={handleSubmit} >
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div style={{ minHeight: '48px' }}>
            {isAlert && <Alert variant='filled' severity={isError ? 'error' : 'success'} onClose={() => setIsAlert(false)}>{msgAlert}</Alert>}
          </div>
          <div>
            <TextField sx={{ width: '350px' }} onChange={(e) => setEmail(e.target.value)} value={email} variant="outlined" type="email" name="email" label="Email" id="email" required />
          </div>
          <div>
            <TextField sx={{ width: '350px' }} onChange={(e) => setPassword(e.target.value)} value={password} variant="outlined" type="password" name="password" label="Password" id="password" required />
          </div>
          <Button variant='outlined' type="submit">Login</Button>
          <Link href='/signup'>Create an account</Link>
        </Stack>
      </form>
    </Container>
  )
}

export default Login