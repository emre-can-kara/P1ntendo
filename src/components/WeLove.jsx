import girlWithGlasses from '../assets/girl-with-glasses.png'
import girlWithYellowJacket from '../assets/girl-with-yellow-jacket.png'

function WeLove() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 items-center">
          {/* Sol taraftaki resimler */}
          <div className="grid grid-cols-2 gap-4">
            <img 
              src={girlWithGlasses} 
              alt="Girl with glasses" 
              className="w-full h-full object-cover"
            />
            <img 
              src={girlWithYellowJacket} 
              alt="Girl with yellow jacket" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Sağ taraftaki içerik */}
          <div className="max-w-lg">
            <p className="text-blue-500 mb-4 font-bold">Featured Products</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              We love what we do
            </h2>
            <div className="space-y-4">
              <p className="text-gray-500">
                Problems trying to resolve the conflict between 
                the two major realms of Classical physics: 
                Newtonian mechanics
              </p>
              <p className="text-gray-500">
                Problems trying to resolve the conflict between 
                the two major realms of Classical physics: 
                Newtonian mechanics
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeLove 