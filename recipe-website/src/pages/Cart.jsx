import { Container, Grid,TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline'
import Header from './../Components/Header/Header'
import Ingredients from './../Components/Ingredients/Ingredients';
import { useSelector, useDispatch } from "react-redux"
import add from './../actions/action';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
  
function Cart() {
    const { cart } = useSelector(state => state.updateCart)
    const dispatch = useDispatch()
    console.log(cart)
    const send = (data) => {
        dispatch(add(data))
      }
      const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpandClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };
    return (
      <div className='App'>
      <CssBaseline />
      <Header />
      <Grid container  style={{width: '100%'}}>
        <Grid  items xs={12} sm={6} md={3} >
          <Ingredients />
        </Grid>
        <Grid items xs={12} sm={6} md={9}>
    <Container >
      <Typography variant='h3' textAlign={'center'} fontFamily={'-moz-initial'} paddingBottom={'25px'}>Favorites</Typography>
      <Grid container spacing={4} maxWidth={"lg"}>

      {cart.map((data,index)=> {
        return (
          
		<Grid item key={index} xs={12} sm={6} md={4}>
		<Card sx={{ maxWidth: '100%' }}>
        <CardMedia
        component="img"
        height="194"
        image= {data.image}
        alt="dish"/>

      <CardContent>
        <Typography variant="body1" color="text.secondary">
        {data.recipe_name}
        </Typography>
		    <Typography variant="body2" color="text.secondary">
          {data.IngredientList}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
       <DeleteIcon onClick={() => send(data)}/>
        <ExpandMore
                expand={index === expandedIndex}
                onClick={() => handleExpandClick(index)}
                aria-expanded={index === expandedIndex}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={index === expandedIndex} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Number of servings: {data.serves}</Typography>
                <Typography paragraph>Instructions for cooking: {data.cooking_method}</Typography>
              </CardContent>
            </Collapse>
    </Card>
	</Grid>
        )
  })}
      
    </Grid>
    </Container>
        </Grid>
      </Grid>
      </div>
    );
  }
  
  export default Cart;