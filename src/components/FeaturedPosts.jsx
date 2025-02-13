import sanFrancisco from '../assets/sanfrancisco.png'
import chicago from '../assets/chicago.png'

const posts = [
  {
    id: 1,
    image: sanFrancisco,
    department: "English Department",
    title: "Graphic Design",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    sales: "15 Sales",
    oldPrice: "$16.48",
    newPrice: "$6.48",
    duration: "22h...",
    lessons: "64 Lessons",
    progress: "Progress"
  },
  {
    id: 2,
    image: chicago,
    department: "English Department",
    title: "Graphic Design",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    sales: "15 Sales",
    oldPrice: "$16.48",
    newPrice: "$6.48",
    duration: "22h...",
    lessons: "64 Lessons",
    progress: "Progress"
  }
]

function FeaturedPosts() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-12">
          <p className="text-blue-500 font-bold mb-2">Practice Advice</p>
          <h2 className="text-3xl font-bold text-gray-900">Featured Posts</h2>
        </div>

        {/* Post Grid */}
        <div className="flex justify-center gap-12">
          {posts.map(post => (
            <div key={post.id} className="flex gap-8">
              {/* Resim Alanı */}
              <div className="relative w-[280px] h-[450px]">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">Sale</span>
                </div>
                <img src={post.image} alt={post.title} className="w-full h-full object-cover rounded-lg shadow-md" />
                <div className="absolute bottom-6 left-6 flex flex-col space-y-3">
                  <button className="p-3.5 bg-white rounded-full hover:bg-gray-100 shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button className="p-3.5 bg-white rounded-full hover:bg-gray-100 shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                  <button className="p-3.5 bg-white rounded-full hover:bg-gray-100 shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* İçerik */}
              <div className="flex flex-col justify-between py-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-blue-500 font-bold">{post.department}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="text-sm text-gray-500 ml-1">4.9</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{post.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-sm text-gray-500 font-bold">{post.sales}</p>
                    <svg 
                      className="w-4 h-4 text-gray-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </div>
                </div>

                <div>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <span className="mr-4">{post.duration}</span>
                    <span className="mr-4">{post.lessons}</span>
                    <span>{post.progress}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 line-through text-sm">{post.oldPrice}</span>
                      <span className="text-blue-500 font-bold">{post.newPrice}</span>
                    </div>
                    <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedPosts 