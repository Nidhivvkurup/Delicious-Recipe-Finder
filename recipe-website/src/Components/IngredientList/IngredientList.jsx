import React from 'react'
import Card from '@mui/material/Card';
// // import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const IngredientList = ({list}) => {
  return (
    <div className='list'>
      <Card elevation={6} >
        <CardContent>
            <Typography variant='h6' textAlign={'center'}>{list.name} </Typography>
        </CardContent>
        <CardContent>
            
        <Button variant="outlined" size="small">{list.buttons}</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default IngredientList

