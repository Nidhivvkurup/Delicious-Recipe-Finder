import { useEffect } from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Autocomplete from '@mui/material/Autocomplete';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container, Grid } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import api from '../../api';
import { useSelector, useDispatch } from "react-redux"
import add from './../../actions/action';


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

// const ingredients = [
//   { label: 'Write list of ingredients' },
//   { label: 'a' },
//   { label: 'b' },
//   { label: 'c' },
// ]

function Recipe() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpandClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const { cart } = useSelector(state => state.updateCart)
  const dispatch = useDispatch()
  console.log(cart)

  // const [checked, setChecked] = useState(false);
  // const handleChange = (e) => {
  //   setChecked(e.target.checked);
  //   if (!checked) {
  //     console.log(datas)
  //   }
  // };
  const send = (data) => {
    dispatch(add(data))
  }

  const [datas,setdata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await api.get('http://127.0.0.1:8000/endpoint/show/')
            setdata(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
  });

  return (
    <div className='Recipe'>
    <Container >
    <Typography variant='h3' textAlign={'center'} fontFamily={'-moz-initial'} paddingBottom={'25px'}>Recipes</Typography>
      <Grid container spacing={4} maxWidth={"lg"}>
      {/* <Autocomplete disablePortal id="combo-box-demo"
    options={ingredients} sx={{px:5,paddingTop:6, width: '100%', }}
    renderInput={(params) =>
      <TextField {...params} label="Search Recipe" />}/> */}

      
      {datas.map((data,index)=> {
        return (
		<Grid item key={index} xs={12} sm={6} md={4}>
      
		<Card sx={{ maxWidth: '100%' }}>
        <CardMedia
        component="img"
        height="194"
        // image= {`./Images/${data.Image_Name}.jpg`}
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
      <Checkbox {...label}  
      // onChange={handleChange}
      onClick={() => send(data)}
       icon={<FavoriteBorder />} 
       checkedIcon={<Favorite />} />
        {/* <IconButton aria-label="link"> */}
          {/* <LaunchTwoToneIcon /> */}
        {/* </IconButton> */}
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
    </div>
  );
}

export default Recipe