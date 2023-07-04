import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Navbar from './../components/Navbar';
import axios from 'axios';
import ProductCard from './../components/ProductCard';


function Home() {
  const endpoint = import.meta.env.VITE_ENDPOINT;
  const [books, setBooks] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  
  React.useEffect(() => {
    axios({
      method:'get',
      url:`${endpoint}/books`,
    })
    .then((res)=>{
      console.log(res);
      setBooks(res.data);
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }, [])

  // React.useEffect(() => {
  //   axios({
  //     method:'get',
  //     url:`${endpoint}/search?query=${searchValue}`,
  //   })
  //   .then((res)=>{
  //     console.log(res);
  //     setBooks(res.data);
  //   })
  //   .catch((err)=>{
  //     console.log(err);
      
  //   })
  // }, [searchValue])
  
  
  const handleDataChange = (e) => {
    // Do something in the parent component when the data changes
    setSearchValue(e);
  };



  return (
    <>
    <Navbar onDataChange={handleDataChange} />
    <Divider/>
    <Box
      sx={{
        height: '100%',
        backgroundColor: 'white',
        color:'#121212',
        p:5,
        justifyContent:'space-between',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
        <h1 style={{
          marginLeft:"10px",
          fontSize:'5.5vw',
        }}>Buy and sell your
          textbooks for the
          best price.</h1>
          <Button variant="Outlined" size="large" style={{
            width:'50%',
            height:'60px',
            marginLeft:'50px',
            backgroundColor:'#ffffff',
            color:'#121212',
            border:'1px solid #FB635D',
            borderRadius:'20px',
            '&:hover':{
              backgroundColor:'#FB635D',
              color:'#66C1F4',
            }
          }}>
            Learn More
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
      <img
        style={{
          width:'80%',
          float:'right'
        }}
        src="https://github.com/Prajwalabraham/MohithCanteenSpringBackend/assets/74299799/b8316c05-c84f-49db-8d51-c9fad4a0c9fb" alt="" />
        </Grid>
        <Divider/>
        {books?.map((book:any,index:any) => {
          return(
          <Grid xs={12} md={6} lg={4} xl={3}
            sx={{mt:5}}
          >
            <ProductCard book={book} key={index}/>  
          </Grid>
        )})}
    </Grid> 
    </Box>
  </>
  )
}

export default Home