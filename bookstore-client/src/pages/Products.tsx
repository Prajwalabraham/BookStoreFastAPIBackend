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

  React.useEffect(() => {
    axios({
      method:'get',
      url:`${endpoint}/search?query=${searchValue}`,
    })
    .then((res)=>{
      console.log(res);
      setBooks(res.data);
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }, [searchValue])
  
  
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