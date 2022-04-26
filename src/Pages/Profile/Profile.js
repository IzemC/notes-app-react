import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import ProfileIcon from '@mui/icons-material/AccountBoxOutlined'
import EmailIcon from '@mui/icons-material/EmailOutlined'
import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined'
import EventIcon from '@mui/icons-material/EventOutlined'
import Button from '@mui/material/Button'

function Login() {

    const firstName = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
    const email = localStorage.getItem('email')
    const createAt = new Date(localStorage.getItem('createdAt'))
    const UpdatedAt = new Date(localStorage.getItem('updatedAt'))

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1em' }}>

            <Typography variant='h2' >Profile</Typography>
            <Button sx={{ alignSelf: 'end' }} href='/' variant='outlined'>Go Home</Button>
            <Card sx={{ marginTop: '2em' }} variant="outlined">
                <CardHeader title='Personal Informations' />
                <CardContent>
                    <Grid container direction='column' spacing={2}>
                        <Grid item>
                            <div style={{ display: 'flex', alignItems: 'center', }}><EmailIcon sx={{ marginRight: '0.5em' }} /> Email : {email} </div>
                        </Grid>
                        <Grid item>
                            <div style={{ display: 'flex', alignItems: 'center', }}> <ProfileIcon sx={{ marginRight: '0.5em' }} />  Name : {(!firstName && !lastName) ? "Not specified" : `${firstName}  ${lastName}`}</div>
                        </Grid>
                        <Grid item>
                            <div style={{ display: 'flex', alignItems: 'center', }}><CalendarIcon sx={{ marginRight: '0.5em' }} /> Account creation : {createAt.toISOString().split('T')[0]}</div>
                        </Grid>
                        <Grid item>
                            <div style={{ display: 'flex', alignItems: 'center', }}><EventIcon sx={{ marginRight: '0.5em' }} /> Last updated : {UpdatedAt.toISOString().split('T')[0]} </div>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </Container >
    )
}

export default Login