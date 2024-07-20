import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap  justify-between">
          <div className="w-full md:w-1/4 mr-[1px]  mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
            <p className="mb-4">Don’t miss any updates of our new products and offers.</p>
            <form className="flex flex-col">
              <input
                type="email"
                className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
              <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">Subscribe</button>
            </form>
          </div>
        
         <div className="w-full md:w-1/5 mb-8  md:mb-0">
            <h3 className="text-xl font-semibold mb-3">Download</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition duration-300">Company</a></li>
              <li><a href="#" className="hover:text-blue-500 transition duration-300">Android App</a></li>
              <li><a href="#" className="hover:text-blue-500 transition duration-300">iOS App</a></li>
              <li><a href="#" className="hover:text-blue-500 transition duration-300">Desktop</a></li>
              <li><a href="#" className="hover:text-blue-500 transition duration-300">Projects</a></li>
              <li><a href="#" className="hover:text-blue-500 transition duration-300">My Tasks</a></li>
            </ul>
         
         </div>
          <div className="w-full md:w-1/5 mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-3">Help</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition duration-300">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-500 transition duration-300">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-blue-500 transition duration-300">Reporting</a></li>
              <li><a href="#" className="hover:text-blue-500 transition duration-300">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-500 transition duration-300">Support Policy</a></li>
              <li><a href="#" className="hover:text-blue-500 transition duration-300">Privacy</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/5 mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-3">Team Solutions</h3>
            <p className="mb-4">We provide top-notch solutions for your e-commerce needs. </p>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition duration-300">Meet Our Team</a></li>
              <li><a href="#" className="hover:text-blue-500 transition duration-300">Our Services</a></li>
              <li><a href="#" className="hover:text-blue-500 transition duration-300">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-500 transition duration-300">Testimonials</a></li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-xl text-gray-700 hover:text-blue-500 transition duration-300"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-xl text-gray-700 hover:text-blue-500 transition duration-300"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-xl text-gray-700 hover:text-blue-500 transition duration-300"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="text-xl text-gray-700 hover:text-blue-500 transition duration-300"><i className="fab fa-pinterest"></i></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300 pt-4">
          <div className="flex flex-wrap justify-between items-center">
            <p className="mb-0">© YourCompany Inc. 2024 All rights reserved.</p>
            <p className="mb-0">Made with <span className="text-red-500">♥</span> by <a href="https://yourcompany.com" className="hover:underline">YourCompany</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
