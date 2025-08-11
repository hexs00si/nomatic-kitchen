import Navbar from '@/components/layout/Navbar'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      
      {/* Test Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            Nomatic Kitchens
          </h1>
          <p className="text-xl text-gray-600">
            Testing Navbar Animation - Move your mouse and wait 3 seconds to see fade effect
          </p>
        </div>
      </div>
    </main>
  )
}
