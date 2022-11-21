import {useEffect, useState} from 'react'
import { styled } from '@mui/material/styles';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, IconButton, LinearProgress, CircularProgress} from '@mui/material'
import Collapse from '@mui/material/Collapse';
import FavoriteIcon from '@mui/icons-material/Favorite'
import Tooltip from '@mui/material/Tooltip';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'
import RepeatIcon from '@mui/icons-material/Repeat'
import InfoIcon from '@mui/icons-material/Info'
import getDog from './utils/getDog'
import { LoremIpsum } from 'lorem-ipsum';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


function App() {
  const [dog, setDog] = useState({name:'', img:'', descrip :''}) 
  const [aceptados, setAceptados] = useState([])
  const [rechazados, setRechazados] = useState([])
  const [cargando, setCargando] = useState(true)
  const [info, setInfo] = useState(false)

  


  useEffect(() => {
    getDog().then((data) => { // Función asíncrona para obtener la imagen del perro
      setDog({name: generadorNombre(6), img: data.message, descrip: new LoremIpsum().generateSentences(1)}) // Genera un nombre aleatorio y lo asigna a la imagen
      setCargando(false);
    }
  )}, [])

    const handleClickAceptar = () => {
      setCargando(true)
      setAceptados((perrosAnteriores)=>[dog,...perrosAnteriores]) // Agrega el perro a la lista de perros aceptados

      getDog().then((data) => {
        setDog({name: generadorNombre(6), img: data.message, descrip: new LoremIpsum().generateSentences(1)}) // Genera un nuevo perro
        setCargando(false);
      })
    }

    const handleClickRechazar = () => {
      setCargando(true)
      setRechazados((perrosAnteriores)=>[dog,...perrosAnteriores]) // Agrega el perro a la lista de perros rechazados

      getDog().then((data) => {
        setDog({name: generadorNombre(6), img: data.message, descrip: new LoremIpsum().generateSentences(1)}) // Genera un nuevo perro
        setCargando(false);
      })
    }

    const handleClickCambiarA = (dog) => { //funcion para cambiar al perro a aceptados
      const newAceptado = rechazados.filter((perro) => (perro.name !== dog.name))
      setRechazados(newAceptado)
      setAceptados((prev) => ([dog, ...prev]))
      setCargando(false);
    }

    const handleClickCambiarR = (dog) => { //funcion para cambiar al perro a rechazados
      const newRechazado = aceptados.filter((perro) => (perro.name !== dog.name))
      setAceptados(newRechazado)
      setRechazados((prev) => ([dog, ...prev]))
      setCargando(false)
    }
    const handleExpandClick = () => {
      setInfo(!info);
    };

  return (
      <Grid container spacing={10}>  
        <Grid item md={4} sm={12}>
          <Typography
            sx={{color: "black" }} align="center" variant="h2">
            TinderDog
          </Typography>
          {cargando ? (
            <Card>
              <CardMedia
              component="img"
              height="300"    
              image={dog.img}
              alt="DOGO"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <CircularProgress/>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <LinearProgress/>
                </Typography>
              </CardContent>
              <CardActions>
                <Tooltip title="Aceptar">
                  <span>
                    <IconButton
                      disabled = {cargando}
                      color='success'
                      onClick={handleClickAceptar}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Rechazar">
                  <span>
                    <IconButton
                      disabled = {cargando}
                      color='error'
                      onClick={handleClickRechazar}
                    >
                      <DoNotDisturbIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </CardActions>
            </Card>
          ) : (
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
                <Typography variant="body2" color="text.secondary">
                    {dog.descrip}
                </Typography>
            </CardContent>
            <CardActions>
              <Tooltip title="Aceptar">
                <span>
                  <IconButton
                    color='success'
                    onClick={handleClickAceptar}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Rechazar">
                <span>
                  <IconButton
                    color='error'
                    onClick={handleClickRechazar}
                  >
                    <DoNotDisturbIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </CardActions>
          </Card>
        )}
        </Grid>

        <Grid item md={4} sm={6} sx={{ overflowY: 'auto', maxHeight: '85vh' }}>
          <Typography align="center" variant="h5">ACEPTADOS</Typography>
            {aceptados.map((aceptado) => (
            <Card key={aceptado.name} sx={{
              backgroundColor: "green",
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              minWidth: 100,
            }}>
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
              <CardActions>
                <Tooltip title="Cambiar">
                  <span>
                    <IconButton
                      disabled = {cargando}
                      color='info'
                      onClick={() => handleClickCambiarR(aceptado)}
                    >
                      <RepeatIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                  <ExpandMore
                    expand={info}
                    onClick={handleExpandClick}
                    aria-expanded={info}
                    aria-label="show more"
                  >
                    <InfoIcon />
                  </ExpandMore>
                  <Collapse in={info} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Descripcion:</Typography>
                      <Typography paragraph>
                        {aceptado.descrip}
                      </Typography>
                    </CardContent>
                  </Collapse>
              </CardActions>
            </CardContent>
           </Card>))}
        </Grid>

        <Grid item md={4} sm={6} sx={{ overflowY: 'auto', maxHeight: '85vh' }}>
          <Typography align="center" variant="h5">RECHAZADOS</Typography>
          {rechazados.map((rechazado) => (
            <Card key={rechazado.name} sx={{
              backgroundColor: "red",
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              minWidth: 300,
            }}>
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
              <CardActions>
                <Tooltip title="Cambiar">
                    <span>
                      <IconButton
                        disabled = {cargando}
                        color='info'
                        onClick={() => handleClickCambiarA(rechazado)}
                      >
                        <RepeatIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <ExpandMore
                    expand={info}
                    onClick={handleExpandClick}
                    aria-expanded={info}
                    aria-label="show more"
                  >
                    <InfoIcon />
                  </ExpandMore>
                  <Collapse in={info} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Descripcion:</Typography>
                      <Typography paragraph>
                        {rechazado.descrip}
                      </Typography>
                    </CardContent>
                  </Collapse>
              </CardActions>
            </CardContent>
           </Card>))}
        </Grid>
      </Grid>
  );
};

const generadorNombre = (num) => { // Función asíncrona para generar nombres de perros
  const caracteres ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let n= ' ';
  const charactersLength = caracteres.length;
  for ( let i = 0; i < num; i++ ) {
      n += caracteres.charAt(Math.floor(Math.random() * charactersLength));
  }
  return n;

  
}

export default App;