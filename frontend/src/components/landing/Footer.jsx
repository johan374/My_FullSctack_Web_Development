import React from 'react';
// Importing social media icons from react-icons
// Note: FaGithubSquare is the correct import (not FaGitSquare as in previous version)
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

const Footer = () => {
  return (
    // Main footer container
    // max-w-[1240px]: Sets maximum width
    // mx-auto: Centers the container horizontally
    // py-16: Adds vertical padding (top and bottom)
    // px-4: Adds horizontal padding
    // grid: Creates a grid container
    // lg:grid-cols-3: Creates 3 columns on large screens
    // gap-8: Adds gap between grid items
    // text-gray-300: Sets text color to light gray
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
      
      {/* First Column - Brand Section */}
      <div>
        {/* Company logo/name with custom green color */}
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>REACT.</h1>
        {/* Company description */}
        <p className='py-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id odit ullam iste repellat consequatur libero reiciendis, blanditiis accusantium.</p>
        
        {/* Social Media Icons Container */}
        {/* flex justify-between: Spreads icons evenly
            md:w-[75%]: Sets width to 75% on medium screens and up */}
        <div className='flex justify-between md:w-[75%] my-6'>
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
            <FaGithubSquare size={30} />
            <FaDribbbleSquare size={30} />
        </div>
      </div>

      {/* Second and Third Columns - Links Section */}
      {/* lg:col-span-2: Spans 2 columns on large screens
          flex justify-between: Spreads the link groups evenly */}
      <div className='lg:col-span-2 flex justify-between mt-6'>
        {/* Solutions Links */}
        <div>
            <h6 className='font-medium text-gray-400'>Solutions</h6>
            <ul>
                <li className='py-2 text-sm'>Analytics</li>
                <li className='py-2 text-sm'>Marketing</li>
                <li className='py-2 text-sm'>Commerce</li>
                <li className='py-2 text-sm'>Insights</li>
            </ul>
        </div>

        {/* Support Links */}
        <div>
            <h6 className='font-medium text-gray-400'>Support</h6>
            <ul>
                <li className='py-2 text-sm'>Pricing</li>
                <li className='py-2 text-sm'>Documentation</li>
                <li className='py-2 text-sm'>Guides</li>
                <li className='py-2 text-sm'>API Status</li>
            </ul>
        </div>

        {/* Company Links */}
        <div>
            <h6 className='font-medium text-gray-400'>Company</h6>
            <ul>
                <li className='py-2 text-sm'>About</li>
                <li className='py-2 text-sm'>Blog</li>
                <li className='py-2 text-sm'>Jobs</li>
                <li className='py-2 text-sm'>Press</li>
                <li className='py-2 text-sm'>Careers</li>
            </ul>
        </div>

        {/* Legal Links */}
        <div>
            <h6 className='font-medium text-gray-400'>Legal</h6>
            <ul>
                <li className='py-2 text-sm'>Claim</li>
                <li className='py-2 text-sm'>Policy</li>
                <li className='py-2 text-sm'>Terms</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;