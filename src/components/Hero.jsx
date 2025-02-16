import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Hero slider görselleri
const sliderImages = [
  'https://images.unsplash.com/photo-1483985988355-763728e1935b', // Fashion slider 1
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b', // Fashion slider 2
  'https://images.unsplash.com/photo-1445205170230-053b83016050', // Fashion slider 3
  'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93'  // Fashion slider 4
]

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

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      )
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Slider görselleri ve içerik */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={sliderImages[index]}
            alt={`Slider ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Slider içeriği - merkeze hizalı */}
          <div className="absolute inset-0 bg-black bg-opacity-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className="flex items-center justify-center h-full">
                <div className="max-w-xl text-white text-center">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 max-w-2xl">
                    {slide.description}
                  </p>
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slider kontrolleri */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
      >
        <ChevronLeft className="h-6 w-6 text-gray-600" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
      >
        <ChevronRight className="h-6 w-6 text-gray-600" />
      </button>

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