import React from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'

function NoteCard(props) {

    const { id, title, body, setIsNotesLoading, setNotes, notes, setInfoSnackbar, setOpenSnackbar } = props
    const authToken = localStorage.getItem('authToken');

    const deleteNoteHandler = async () => {
        setIsNotesLoading(true)
        try {
            let res = await axios.delete(`/api/notes/${id}`, { params: { authToken: authToken } });
            if (res.data.success) {
                setNotes(notes.filter(n => n.id != id))
            }
            setInfoSnackbar({ success: res.data.success, msg: res.data.message })
        } catch (err) {
            setInfoSnackbar({ success: false, msg: 'Unexpected Error, Try again later' })
        }
        setOpenSnackbar(true)
        setIsNotesLoading(false)
    }

    return (
        <Card sx={{ margin: '0.5em 2em' }} id={id} variant="outlined">
            <CardHeader title={title} />
            <CardContent>
                <Typography>{body}</Typography>
            </CardContent>
            <CardActions>
                <Button variant='outlined' color='error' onClick={deleteNoteHandler}>Delete</Button>
            </CardActions>
        </Card>
    )
}

export default NoteCard
