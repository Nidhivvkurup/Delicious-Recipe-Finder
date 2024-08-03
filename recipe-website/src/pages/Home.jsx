import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline'
import Header from './../Components/Header/Header'
import Ingredients from './../Components/Ingredients/Ingredients';
import Recipe from './../Components/Recipe/Recipe';

function App() {
    return (
      <div className='App'>
      <CssBaseline />
      <Header />
      <Grid container  style={{width: '100%'}}>
        <Grid  items xs={12} sm={6} md={3} >
          <Ingredients />
        </Grid>
        <Grid items xs={12} sm={6} md={9}>
          <Recipe />
        </Grid>
      </Grid>
      </div>
    );
  }
  
  export default App;