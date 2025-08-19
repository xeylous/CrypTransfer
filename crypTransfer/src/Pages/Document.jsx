import React from 'react'
import Navbar from '../components/Navbar'
import Docs from '../components/Docs'
import Footer from '../components/Footer'

const Document = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-500 to-blue-500">
        <Navbar />
        <main className="flex-1">
          <Docs />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Document
