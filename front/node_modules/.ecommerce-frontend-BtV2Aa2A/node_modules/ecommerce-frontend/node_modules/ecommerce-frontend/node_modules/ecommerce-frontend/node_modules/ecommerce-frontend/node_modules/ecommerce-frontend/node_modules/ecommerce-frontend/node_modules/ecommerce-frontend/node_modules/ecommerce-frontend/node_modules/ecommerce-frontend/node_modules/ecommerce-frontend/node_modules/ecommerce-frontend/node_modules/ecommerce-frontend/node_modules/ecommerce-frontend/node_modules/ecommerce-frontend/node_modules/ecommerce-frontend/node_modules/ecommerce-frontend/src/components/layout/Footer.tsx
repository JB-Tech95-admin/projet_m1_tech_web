import { Instagram, Twitter, Youtube } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
            <img src="http://localhost:3001/images/products/icon.png" alt="" />
            </div>
            <span className="text-xl font-bold">SUN CO.</span>
          </div>

          <div className="text-sm text-gray-400 mb-4 md:mb-0">© 2023 dot cards text task. All rights reserved.</div>

          <div className="flex space-x-4">
            <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
