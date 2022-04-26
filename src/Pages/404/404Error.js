import React from 'react'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ErrorIcon from '@mui/icons-material/ErrorOutlineRounded'
function ErrorPage() {
  return (<Container sx={{ display: 'flex', boxSizing: 'border-box', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
    <Grid container direction='column' spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }} >
      <Grid item>
        <ErrorIcon sx={{ fontSize: '3em' }} color='error' />
      </Grid>
      <Grid item>
        <div style={{ fontSize: '1.2em' }}>Page not found</div>
      </Grid>
      <Grid item>
        <Button variant='outlined' href='/'>Go Home</Button>
      </Grid>
    </Grid>
  </Container>
  )
}

export default ErrorPage