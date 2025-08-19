import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SupportComp from '../components/SupportComp'

const Support = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-500 to-blue-500">
        <Navbar />
        <main className="flex-1">
          <SupportComp />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Support
