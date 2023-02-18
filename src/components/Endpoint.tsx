import {
  Box,
  Typography
} from '@mui/material'

interface Props {
  name?: string
  endpoint?: string
  data?: any
}

const Endpoint = ({ name, endpoint, data }: Props) => {
  return (
  <Box margin={1}>
    <Typography fontFamily='Lato' fontWeight={700} variant='h6'>
      {name}
    </Typography>
    <Typography fontFamily='Montserrat' fontWeight={500} fontSize={12}>
      {endpoint}
    </Typography>
    <Box maxHeight='200px' overflow='auto' padding={2} marginTop={1} borderRadius='10px' whiteSpace='pre' sx={{backgroundColor: '#00000010', '&::-webkit-scrollbar': {display: 'none'}}}>
      <Typography fontFamily='Montserrat' fontWeight={500} fontSize={11}>
        {JSON.stringify(data, null, 4)}
      </Typography>
    </Box>
  </Box>
  )
}

export default Endpoint


