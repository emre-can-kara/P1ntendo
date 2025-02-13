import hooliLogo from '../assets/hooli.png'
import lyftLogo from '../assets/lyft.png'
import cruiseLogo from '../assets/cruise.png'
import stripeLogo from '../assets/stripe.png'
import awsLogo from '../assets/aws.png'
import redditLogo from '../assets/reddit.png'

const brandLogos = [
  {
    id: 1,
    name: 'Hooli',
    src: hooliLogo
  },
  {
    id: 2,
    name: 'Lyft',
    src: lyftLogo
  },
  {
    id: 3,
    name: 'Cruise',
    src: cruiseLogo
  },
  {
    id: 4,
    name: 'Stripe',
    src: stripeLogo
  },
  {
    id: 5,
    name: 'AWS',
    src: awsLogo
  },
  {
    id: 6,
    name: 'Reddit',
    src: redditLogo
  }
]

function BrandLogos() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-6 gap-8 items-center justify-items-center">
          {brandLogos.map((logo) => (
            <img 
              key={logo.id}
              src={logo.src}
              alt={logo.name}
              className="h-12 grayscale opacity-70 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BrandLogos 