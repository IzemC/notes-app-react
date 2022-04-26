import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Snackbar from '@mui/material/Snackbar'
import CircularProgress from '@mui/material/CircularProgress';
import AuthContext from '../../contexts/authContext'
import NoteCard from '../../Components/Profile/NoteCard'

function Home() {
  const authToken = localStorage.getItem('authToken');
  const { setAuthState } = useContext(AuthContext);

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [infoSnackbar, setInfoSnackbar] = useState({ msg: '' })


  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [notes, setNotes] = useState([])
  const [isNotesLoading, setIsNotesLoading] = useState(true);

  const logOut = () => {
    localStorage.clear()
    setAuthState({ isAuth: false, token: null })
  }
  const addNoteHandler = async (e) => {
    e.preventDefault();
    setIsNotesLoading(true);
    try {

      let res = await axios.post('/api/notes', { title, body }, { params: { authToken: authToken, }, })

      if (res.data.success) setNotes([...notes, res.data.note])

      setInfoSnackbar({ success: res.data.success, msg: res.data.message })

    } catch (err) {

      if (err.response.code == 404) logOut();
      else setInfoSnackbar({ success: false, msg: 'Unexpected Error, Try again later' })

    }
    setOpenSnackbar(true)
    setIsNotesLoading(false);
  }
  const loadNotesHandler = async (e) => {
    setIsNotesLoading(true);
    try {
      let res = await axios.get('/api/notes', { params: { authToken: authToken, }, });
      if (res.data.success) setNotes(res.data.notes);
    } catch (err) {
      if (err.response.status == 404) logOut();
    }
    setIsNotesLoading(false);
  }
  const deleteOldNotesHandler = async () => {
    setIsNotesLoading(true)
    try {
      let res = await axios.delete(`/api/notes/old`, { params: { authToken: authToken } });
      if (res.data.success) {
        let now = new Date().getTime()
        setNotes(notes.filter(n => now - new Date(n.createdAt).getTime() < 3 * 24 * 60 * 60 * 1000))
      }
      setInfoSnackbar({ success: res.data.success, msg: res.data.message })
    } catch (err) {
      console.log(err);
      setInfoSnackbar({ success: false, msg: 'Unexpected Error, Try again later' })
    }
    setOpenSnackbar(true)
    setIsNotesLoading(false)
  }

  const deleteAllNotesHandler = async () => {
    setIsNotesLoading(true)
    try {
      let res = await axios.delete(`/api/notes`, { params: { authToken: authToken } });
      if (res.data.success) setNotes([])
      setInfoSnackbar({ success: res.data.success, msg: res.data.message })
    } catch (err) {
      setInfoSnackbar({ success: false, msg: 'Unexpected Error, Try again later' })
    }
    setOpenSnackbar(true)
    setIsNotesLoading(false)
  }

  useEffect(() => {
    loadNotesHandler();
  }, [])

  return (
    <Container sx={{ display: 'flex', flexDirection: "column" }}>
      <h1 style={{ textAlign: 'center' }}>Notes App</h1>
      <Grid container spacing={2} direction='row' style={{ justifyContent: 'end' }}>
        <Grid item>
          <Button href='/profile' variant='outlined'>Your Profile</Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' color='info' onClick={logOut}>Log out</Button>
        </Grid>
      </Grid>
      <form onSubmit={addNoteHandler}>
        <h2 style={{ padding: '1em 0' }}>Add a new note</h2>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <TextField sx={{ width: '350px' }} label='Title' onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="title" id="title" />
          </div>
          <div>
            <TextField sx={{ width: '350px' }} label='Text body' multiline rows={4} onChange={(e) => setBody(e.target.value)} value={body} fullWidth variant="outlined" type="text" name="body" id="body" />
          </div>
          <Button variant='outlined' type="submit">Add</Button>
        </Stack>
      </form>
      <Grid container direction='row' sx={{ justifyContent: 'center' }} >
        <Box sx={{ height: '350px', minWidth: '400px', margin: '1em 0', flex: '1', overflowY: 'scroll', marginRight: '1em', backgroundColor: '#f0ece9' }}>
          {isNotesLoading ? <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box> :
            (notes.length == 0 ? <div > No notes yet.</div> : notes.map(note => <NoteCard key={note.id} {...note} setIsNotesLoading={setIsNotesLoading} setNotes={setNotes} notes={notes} setOpenSnackbar={setOpenSnackbar} setInfoSnackbar={setInfoSnackbar} />))
          }
        </Box>
        <Stack spacing={2} sx={{ width: 'max-content', alignSelf: 'center' }}>
          <Button variant='outlined' color='success' onClick={deleteOldNotesHandler}>Delete old notes (more than 3 days)</Button>
          <Button variant='outlined' color='error' onClick={deleteAllNotesHandler}>Delete all</Button>
        </Stack>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={infoSnackbar.success ? 'success' : 'error'} sx={{ width: '100%' }}>
          {infoSnackbar.msg}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Home