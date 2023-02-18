import Sketch from 'react-p5'

interface Props {
  heightmapIndices?: any
  supplementalData?: any
  width?: number
  height?: number
  showHeightmap?: boolean
  showCharacters?: boolean
  showColors?: boolean
}

const TerraformsData = ({ 
  heightmapIndices,
  supplementalData,
  width=150,
  height=200,
  showHeightmap=false,
  showCharacters=false,
  showColors=false
}: Props) => {

  let setup = (p5: any, canvasParentRef: any) => {
    p5.createCanvas(width, height).parent(canvasParentRef)
    p5.frameRate(10)
  }

  let draw = (p5: any) => {
    p5.background('#E0D3D3')
    let cx = 32
    let cy = 32
    let cw = 5
    let ch = 7
    let x = 0
    let y = 0
    let w = width-cw
    let h = height-ch
    let xn = w/(cx)
    let yn = h/(cy)
    for (let j=0; j<cy; j++) {
      for (let i=0; i<cx; i++) {
        let x1 = x+(xn/2)+xn*i
        let y1 = y+(yn/2)+yn*j
        let height = heightmapIndices[j][i]
        let color = supplementalData.colors[height]
        let character = supplementalData.characters[height]
        if (showColors) {
          p5.fill(color)
          p5.noStroke()
          p5.rect(x1, y1, cw, ch)
        }
        if (showHeightmap) {
          let heightNormalized = p5.map(height, 0, 10, 1, 7)
          p5.stroke(0)
          p5.strokeWeight(heightNormalized)
          p5.point(x1+(cw/2), y1+(ch/2))
        }
        if (showCharacters) {
          p5.noFill()
          p5.stroke(0)
          p5.textSize(1)
          p5.textAlign(p5.CENTER, p5.CENTER)
          p5.strokeWeight(1)
          p5.text(character, x1+(cw/2), y1+(ch/2))
        }
      }
    }
  }
  return (
    <Sketch setup={setup} draw={draw}/>
  )
}

export default TerraformsData