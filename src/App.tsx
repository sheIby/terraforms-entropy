import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import View from 'pages/View'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<View/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App