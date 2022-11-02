import {useEffect, useState} from 'react'
import { Grid, Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material'
import getDog from './utils/getDog';


function App() {
  
  const [dog, setDog] = useState({name:'', img:''})
  const [aceptados, setAceptados] = useState([])
  const [rechazados, setRechazados] = useState([])

  const generadorNombre = (num) => { // Función asíncrona para generar nombres de perros
    const caracteres ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let n= ' ';
    const charactersLength = caracteres.length;
    for ( let i = 0; i < num; i++ ) {
        n += caracteres.charAt(Math.floor(Math.random() * charactersLength));
    }
    return n;
}

  useEffect(() => {
    getDog().then((data) => {
      setDog({name: generadorNombre(6), img: data.message})    
    }
  )}, [])

    const handleClickAceptar = () => {
      setAceptados((perrosAnteriores)=>[...perrosAnteriores,dog])

      getDog().then((data) => {
        setDog({name: generadorNombre(6), img: data.message})
      })
    }

    const handleClickRechazar = () => {
      setRechazados((perrosAnteriores)=>[...perrosAnteriores,dog])

      getDog().then((data) => {
        setDog({name: generadorNombre(6), img: data.message})
      })
    }

  return (
  
      <Grid container spacing={2}>  
        <Grid item md={4}>
          <Typography variant="h4">RECHAZADOS</Typography>
          {rechazados.map((rechazado) => (
            <Card key={dog.nombre}>
            <CardMedia
              component="img"
              height="140"
              image={rechazado.img}
              alt={rechazado.name}
              />
            <CardContent> 
              <Typography gutterBottom variant="h5" component="div">
                {rechazado.name}
              </Typography>
            </CardContent>
           </Card>))}
        </Grid>
        
        <Grid item md={4}>
          <Card>
              <CardMedia
              component="img"
              height="300"
              image={dog.img}
              alt="DOGO"
              />
              <CardContent> 
                  <Typography gutterBottom variant="h5" component="div">
                      {dog.name}
                  </Typography>
              </CardContent>
              <CardActions>
                  <Button size="small" onClick={handleClickAceptar}>aceptar</Button>
                  <Button size="small" onClick={handleClickRechazar}>rechazar</Button>
              </CardActions>
          </Card>
        </Grid>

        <Grid item md={4} key={dog.nombre}>
          <Typography variant="h4">ACEPTADOS</Typography>
            {aceptados.map((aceptado) => (
            <Card key={dog.nombre}>
            <CardMedia
              component="img"
              height="140"
              image={aceptado.img}
              alt={aceptado.name}
              />
            <CardContent> 
              <Typography gutterBottom variant="h5" component="div">
                {aceptado.name}
              </Typography>
            </CardContent>
           </Card>))}
        </Grid>
      </Grid>
  );
};

export default App;