// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Beranda'

function App() {
  const [currentPage, setCurrentPage] = useState('Beranda')

  return (
    <div className="App min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {currentPage === 'Beranda' && <Home />}
        {/* Halaman lain akan ditambahkan kemudian */}
      </main>
      <Footer />
    </div>
  )
}

export default App