import { Box } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'

interface Props {
  colors?: any
}

const Colors = ({ colors }: Props) => {
  return (
    <Box>
      {colors.map((x: string) => <CircleIcon sx={{color: x}}></CircleIcon>)}
    </Box>
  )
}

export default Colors