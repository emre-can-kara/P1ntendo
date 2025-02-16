import { useState, useEffect } from 'react'
import bgImage from '../assets/shop-hero-3-product-slide-2.jpg'

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "BLACK FRIDAY",
      description: "We know how large objects will act, but things on a small scale just do not act that way.",
      buttonText: "Start Now"
    },
    {
      title: "WINTER COLLECTION",
      description: "Discover our winter collection with amazing discounts.",
      buttonText: "Shop Now"
    },
    {
      title: "NEW ARRIVALS",
      description: "Check out our latest collection for this season.",
      buttonText: "Explore"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      )
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)
  }

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
  }

  return (
    <div id="home" className="relative h-[640px] w-full overflow-hidden">
      <div 
        className="h-full transition-transform duration-500 ease-out flex"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={index}
            className="w-full h-full flex-shrink-0 relative"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center w-full"
              style={{ 
                backgroundImage: `url(${bgImage})`
              }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 max-w-7xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl text-center">
                {slide.description}
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-md transition-colors">
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Line Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-white' 
                : 'w-4 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero 