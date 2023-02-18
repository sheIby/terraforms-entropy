import Sketch from 'react-p5'

interface Props {
  heightmapIndices?: any
  supplementalData?: any
  width?: number
  height?: number
  sliderOne?: number
  sliderTwo?: number
  sliderThree?: number
}

const TerraformsCustom = ({ 
  heightmapIndices,
  supplementalData,
  width=150,
  height=200,
  sliderOne=0.5,
  sliderTwo=0.5,
  sliderThree=0.5
}: Props) => {

  let draw_vertices = (p5: any, v: any, c: string) => {
    p5.fill(c)
    p5.beginShape()
    for (let i=0; i<v.length; i++) p5.vertex(v[i][0], v[i][1])
    p5.endShape(p5.CLOSE)
  }

  let draw_polygon = (p5: any, p1: any, p2: any, p3: any, p4: any, t: number, r: number, c: string) => {
    draw_vertices(p5, [p1, p2, p3, p4], c)
    draw_vertices(p5, [p2, [p2[0]+r, p2[1]-t], [p3[0]+r, p3[1]-t], p3], c)
    draw_vertices(p5, [p1, [p1[0]+r, p1[1]-t], [p2[0]+r, p2[1]-t], p2], c)
  }

  let draw_shape = (p5: any, x: any, y: any, w: any, h: any, s1: number, s2: number, s3: number, s4: number, t: number, r: number, c: string) => {
    draw_polygon(p5, [x+s1, y], [x+w+s2, y], [x+w+s3, y+h], [x+s4, y+h], t, r, c)
  }

  let draw_structure = (p5: any, x: any, y: any, h: any, c: any) => {
    let m1 = (h**(1.2)+0.2)*p5.map(sliderOne, 0, 1, 0, 40)
    let m2 = p5.map(sliderThree, 0, 1, -50, 50)
    draw_shape(
      p5,
      x-(m1*p5.map(sliderOne, 0, 1, 0, 2.5)), 
      y+(m1*p5.map(sliderOne, 0, 1, 0, 1.1)), 
      p5.map(sliderTwo, 0, 1, 1, 20), 
      p5.map(sliderTwo, 0, 1, 1, 20),
      m2, m2, 0, 0,
      m1*1.3*p5.map(sliderOne, 0, 1, 0, 1.2),  
      m1*3.1*p5.map(sliderOne, 0, 1, 0, 1.7),
      c
    )
  }

  let setup = (p5: any, canvasParentRef: any) => {
    p5.createCanvas(width, height).parent(canvasParentRef)
    p5.frameRate(20)
    p5.strokeJoin(p5.BEVEL)
  }

  let draw = (p5: any) => {
    p5.background('#E0D3D3')
    let cx = 32
    let cy = 32
    let x = width*0.15
    let y = 40
    let w = 350
    let h = 580
    let xn = w/(cx)
    let yn = h/(cy)
    for (let j=cy-1; j>=0; j--) {
      for (let i=0; i<cx; i++) {
        let x1 = x+(xn/2)+xn*i
        let y1 = y+(yn/2)+yn*j
        let height = heightmapIndices[j][i]
        let color = supplementalData.colors[height]
        let heightNormalized = p5.map(height, 0, 10, 0, 1)
        draw_structure(p5, x1, y1, heightNormalized, color)
      }
    }
  }

  return (
    <Sketch setup={setup} draw={draw}/>
  )
}

export default TerraformsCustom