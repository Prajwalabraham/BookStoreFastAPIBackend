import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function BasicRating({rate}:any) {
  const [value, setValue] = React.useState<number | null>(rate);
    React.useEffect(() => {
        setValue(rate);
    }, [rate])

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
    <Rating name="read-only" value={value} readOnly />
    </Box>
  );
}