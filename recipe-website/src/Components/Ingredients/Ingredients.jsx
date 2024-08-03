import React, { useState } from 'react'
import { Card, CardContent, Grid, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import Box from '@mui/material/Box';
// import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import axios from "axios";
import { useEffect } from 'react';
import api from '../../api';



const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));


function Ingredients() {

  const category = [
    { name: 'Pantry essentials' , buttons : ['milk','butter','salt','corn','cheese','egg','garlic','onion','sugar','flour','potato','honey','peanut butter','tomato','carrot','chicken','rice','oil']},
    { name: 'Vegetables' ,buttons : ['carrot','brinjal','cucumber','beetroot','beans','broccoli','sprouts','dill','fennel','garlic','lettuce','mushrooms','onion','peas','radish','potatoes','turnips','yam','spinach','pumpkin','gourd','capsicum',]},
    { name: 'Fruits' ,buttons : ['apple','almond','avocado','apricot','blueberry','bananas','blackberry','cherry','coconut','date','dragonfruit','durian','fig','feijoa','gooseberry','grape','raisin','guava','jackfruit','kiwi','lime','lychee','lemon','mango','mangosteen','macopa','muskmelon','mulberry','orange','papaya','passionfruit','peach','pear','plum','prune','pineapple','pomegranate','rambutan','strawberry','squash','tomato','walnut','watermelon',]},
    { name: 'Dairy Products' ,buttons : ['butter','ghee','milk','egg','whey','yogurt','cheese','cream','icecream','custard','casein','curd','lassi','paneer']},
    { name: 'Meats' ,buttons : ['chicken breast','beef','bacon','pork chops','beef roast','sausage','pepperoni','pancetta','lamb','mutton','ground bison','beef liver','pork ribs','goat meat','ham steak','chicken leg','chicken wings','duck']},
    { name: 'Fish and Seafood' ,buttons : ['salmon','tuna','crab','lobster','catfish','swordfish','shark','mackerel','caviar','pollock','cuttlefish','eel','smoked tuna','shrimp','oyster','crawfish','octopus','squid','jellyfish']},
    { name: 'Seasonings & Spice Blends' ,buttons : ['pepper','coriander','meat powder','cinnamon','chilli powder','paprika','clove','cumin','thyme','parsley','saffron','fish masala','garam masala','mustard powder','turmeric','']},
    { name: 'Grains & Cereals' ,buttons : ['rice','wheat','flour','semolina','oats','quinoa','barley','grits','millet','bran','muesli','flakes','']}
  ];

// const ingredients = [
//   { label: 'Write list of ingredients' },
//   { label: 'a' },
//   { label: 'b' },
//   { label: 'c' },
// ]


  const [inglist, setInglist] = useState([]);

  const handlelist = (event, updatedlist) => {
    setInglist(updatedlist);
    console.log(updatedlist)
    // console.log(inglist)
  }

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Check if the cookie name matches the pattern we're looking for
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          // Extract and decode the cookie value
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const handleallDelete = () => {
    setInglist([])
    console.log(inglist)
  }

  const handleDelete = (index) => () => {
    setInglist((chips) => chips.filter((chip, chipIndex) => chipIndex !== index))
    console.log(inglist)
  }

  useEffect(() => {
    // Fetch CSRF token from Django's cookies
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
  }, []);

  const handleSubmit = (e) => {
    try{
      e.preventDefault()
      api.post("http://127.0.0.1:8000/endpoint/show/", inglist).then((response)=>{
      console.log(response.data)
    });
    }
  catch (error) {
    console.error('Error:', error);
  }
};
  
  return (
    <div className='ingredient' >
    <Box >

      <Grid display={'flex'} paddingTop={1.8} spacing={3}  >
      <Typography variant="h3" textAlign={'center'} fontFamily={'-moz-initial'} px={5}  gutterBottom>
      Ingredients 
      </Typography>

      <div className='del-icon'>
          <IconButton  aria-label="delete">
              <DeleteIcon onClick={handleallDelete} sx={{fontSize: '2rem'}}/>
          </IconButton>
          
      </div>
      </Grid>
    {/* <Autocomplete disablePortal id="combo-box-demo"
    options={ingredients} sx={{px:5,py:1, width: '100%', }}
    renderInput={(params) =>
    <TextField {...params} label="Add Ingredients" />}/> */}
    <Grid align={'center'}>
    <Button onClick={handleSubmit} variant="outlined"  endIcon={<SendIcon />}>
        Submit
      </Button>
    </Grid>

<Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul">
      
      {inglist.map((data,index) => {
        return (
          <ListItem key={index}>
            <Chip
              label={data}
              onDelete={handleDelete(index)}
            />
          </ListItem>
        );
      })}
    </Paper>

<Grid
  container overflow={'auto'} 
  height={'70vh'}>

{category.map((list)=>(
  <Grid item key={list.name} xs={12}>
    <Card elevation={6} >
        <CardContent>
          <Typography variant='h6' textAlign={'center'}>{list.name} </Typography>
          {list.buttons.map((button,index)=>(
            <ToggleButtonGroup
            value={inglist}
            onChange={handlelist}
            aria-label="text formatting">
            <ToggleButton key={index} value={button}>
              {button}
          </ToggleButton>
          </ToggleButtonGroup>
      ))}
        </CardContent>       
    </Card>
  </Grid>
))}
</Grid>
  </Box>
  </div>
  );
}

export default Ingredients;
