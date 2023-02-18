import { API_BASE_URL } from 'config'
import { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Slider
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import useWindowSize from 'hooks/useWindowSize'
import Colors from 'components/Colors'
import Characters from 'components/Characters'
import Endpoint from 'components/Endpoint'
import TerraformsData from 'sketches/TerraformsData'
import TerraformsCustom from 'sketches/TerraformsCustom'

const View = () => {

  // Window dimensions
  const windowSize = useWindowSize()
  
  // Token
  const [tokenId, setTokenId] = useState("5039")
  const updateTokenId = (e: any) => setTimeout(() => { setTokenId(e.target.value) }, 500)

  // Slides
  const [sliderOne, setSliderOne] = useState(1)
  const [sliderTwo, setSliderTwo] = useState(0.4)
  const [sliderThree, setSliderThree] = useState(0.45)
  const updateSliderOne = (e: any) => { setSliderOne(e.target.value) }
  const updateSliderTwo = (e: any) => { setSliderTwo(e.target.value) }
  const updateSliderThree = (e: any) => { setSliderThree(e.target.value) }

  // Data
  const [supplementalData, setSupplementalData] = useState<any | null>(null)
  useEffect(() => {
    fetch(`${API_BASE_URL}/tokenSupplementalData/${tokenId}`, {method: 'GET',headers: {'Content-Type': 'application/json'}})
    .then(data => data.json())
    .then(x => setSupplementalData(x))
  }, [tokenId])

  const [heightmapIndices, setHeightmapIndices] = useState<any | null>(null)
  useEffect(() => {
    fetch(`${API_BASE_URL}/tokenHeightmapIndices/${tokenId}`, {method: 'GET', headers: {'Content-Type': 'application/json'}})
    .then(data => data.json())
    .then(x => setHeightmapIndices(x))
  }, [tokenId])

  const dataReady = supplementalData && heightmapIndices

  return (
    <>
      <Box position='absolute' left={280} top={10}>
        <Button
          sx={{color: '#000010'}}
          onClick={() => {
            window.open('https://github.com/sheIby/terraforms-entropy')
          }}
          >
          <GitHubIcon fontSize='large'/>
        </Button>
      </Box>    
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Box margin={2}>
            <Box margin={1}>
              <Typography fontFamily='Paytone One' fontWeight={500} variant='h5'>Terraforms Entropy</Typography>
            </Box>
            <Box margin={1}>
              <TextField defaultValue={tokenId} placeholder={tokenId} onChange={updateTokenId} margin='dense' label='Token ID' helperText='Enter a token to fetch metadata'/>
            </Box>
            <Box margin={1}>
              <Slider defaultValue={sliderOne} min={0} max={1} step={0.01} onChange={updateSliderOne} aria-label='Default' valueLabelDisplay='auto' sx={{color: 'black'}}/>
            </Box>
            <Box margin={1}>
              <Slider defaultValue={sliderTwo} min={0} max={1} step={0.01} onChange={updateSliderTwo} aria-label='Default' valueLabelDisplay='auto' sx={{color: 'black'}}/>
            </Box>
            <Box margin={1}>
              <Slider defaultValue={sliderThree} min={0} max={1} step={0.01} onChange={updateSliderThree} aria-label='Default' valueLabelDisplay='auto' sx={{color: 'black'}}/>
            </Box>
            {
              supplementalData && 
              (
                <Box margin={1}>
                  <Typography fontFamily='Lato' fontWeight={700} variant='h6'>Characters</Typography>
                  <Characters characters={supplementalData.characters}/>
                </Box>
              )
            }
            {
              supplementalData && 
              (
                <Box margin={1}>
                  <Typography fontFamily='Lato' fontWeight={700} variant='h6'>Colors</Typography>
                  <Colors colors={supplementalData.colors}/>
                </Box>
              )
            }
            {
              dataReady && 
              ( 
                <Box margin={1}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={7}>
                      <Typography fontFamily='Lato' fontWeight={700} variant='h6'>Height</Typography>
                      <TerraformsData heightmapIndices={heightmapIndices} supplementalData={supplementalData} showHeightmap={true}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Typography fontFamily='Lato' fontWeight={700} variant='h6'>Zone</Typography>
                      <TerraformsData heightmapIndices={heightmapIndices} supplementalData={supplementalData} showColors={true}/> 
                    </Grid>
                  </Grid>
                </Box>
              )
            }
            { supplementalData && <Endpoint name='Supplemental Data' endpoint={`${API_BASE_URL}/tokenSupplementalData/${tokenId}`} data={supplementalData}/> }
            { heightmapIndices && <Endpoint name='Heatmap Indices' endpoint={`${API_BASE_URL}/tokenHeatmapIndices/${tokenId}`} data={heightmapIndices}/> }
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box padding={3}>
            {
              dataReady &&
              <TerraformsCustom 
                heightmapIndices={heightmapIndices}
                supplementalData={supplementalData}
                width={windowSize.width*0.6} 
                height={800} 
                sliderOne={sliderOne} 
                sliderTwo={sliderTwo} 
                sliderThree={sliderThree}
              />
            }
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default View
