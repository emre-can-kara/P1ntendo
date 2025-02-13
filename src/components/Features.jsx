import arrowGrowth from '../assets/uil_arrow-growth.png'
import carbonBook from '../assets/carbon_book.png'
import bookReader from '../assets/bx_bxs-book-reader.png'

const features = [
  {
    id: 1,
    icon: bookReader,
    title: "Easy Wins",
    description: "Get your best looking smile now!"
  },
  {
    id: 2,
    icon: carbonBook,
    title: "Concrete",
    description: "Defalcate is most focused in helping you discover your most beautiful smile"
  },
  {
    id: 3,
    icon: arrowGrowth,
    title: "Hack Growth",
    description: "Overcome any hurdle or any other problem."
  }
]

function Features() {
  return (
    <div id="product" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="text-base text-blue-500 font-bold">Featured Products</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mt-2">
            THE BEST SERVICES
          </h2>
          <p className="mt-4 max-w-2xl text-base text-gray-500 lg:mx-auto">
            Problems trying to resolve the conflict between
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.id} className="p-6 text-center">
                <img 
                  src={feature.icon} 
                  alt={feature.title}
                  className="w-12 h-12 mb-4 mx-auto"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-base text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features 