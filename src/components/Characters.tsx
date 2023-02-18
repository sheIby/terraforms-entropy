import {
  Box,
  Typography
} from '@mui/material'

interface Props {
  characters?: any
}

const Characters = ({ characters }: Props) => {
  return (
    <Box>
      <Typography fontFamily='Montserrat' fontSize={19}>
        {characters.join('')}
      </Typography>
    </Box>
  )
}

export default Characters