import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter } from 'lucide-react'

const footerSections = [
  {
    title: 'Company Info',
    links: ['About Us', 'Carrier', 'We are hiring', 'Blog']
  },
  {
    title: 'Legal',
    links: ['About Us', 'Carrier', 'We are hiring', 'Blog']
  },
  {
    title: 'Features',
    links: ['Business Marketing', 'User Analytic', 'Live Chat', 'Unlimited Support']
  },
  {
    title: 'Resources',
    links: ['IOS & Android', 'Watch a Demo', 'Customers', 'API']
  }
]

function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Logo ve Sosyal Medya */}
        <div className="flex justify-between items-center mb-10">
          <Link to="/" className="text-xl font-bold text-gray-900">
            P1NTENDO
          </Link>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-500 hover:text-blue-600">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-600">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-600">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Ana Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get In Touch */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Get In Touch</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none"
              />
              <button className="bg-blue-500 text-white px-6 py-2 rounded-r hover:bg-blue-600">
                Subscribe
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Lore imp sum dolor Amit
            </p>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="border-t border-gray-200 mt-10 pt-6">
          <p className="text-gray-500 text-sm">
            Made With Love By Finland All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 