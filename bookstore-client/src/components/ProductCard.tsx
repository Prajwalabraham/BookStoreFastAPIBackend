import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BasicRating from './BasicRating';

export default function ProductCard({book}:any) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 500 }}
        image={book?.cover_image_url}
        title={book?.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.description}
        </Typography>
            Price: ₹{book.price}
        <BasicRating rate={book.average_rating} />
        <Typography variant="body2" color="text.secondary">
          {book.author}
          </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{color: 'black', border:'1px solid #FB635D' }} variant="outlined" size="large">Buy Now</Button>
        <Button sx={{color: 'white', backgroundColor:'#FB635D' }} variant="contained" size="large">Add to Cart</Button>
      </CardActions>
    </Card>
  );
}