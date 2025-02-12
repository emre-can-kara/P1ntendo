function Features() {
  return (
    <div id="product" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Our Features
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus magnam voluptatum cupiditate.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">Feature {item}</h3>
                <p className="mt-2 text-base text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius.
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