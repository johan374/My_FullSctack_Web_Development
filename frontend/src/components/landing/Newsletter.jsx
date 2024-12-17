import React from "react";

const Newsletter = () => {
  return (
    // Outer Container
    // w-full: Width 100% of parent container
    // py-16: Padding top and bottom of 4rem (64px)
    // text-white: Text color white
    // px-4: Padding left and right of 1rem (16px)
    <div className="w-full py-16 text-white px-4">

      {/* Inner Wrapper */}
     {/* max-w-[1240px]: Maximum width of 1240px
      // mx-auto: Margin auto left and right (centers the container)
      // grid: Creates a CSS Grid container
      // lg:grid-cols-3: On large screens, creates 3 equal columns */}
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">

        {/* Text Content Section */}
        {/* lg:col-span-2: On large screens, spans 2 columns of the grid*/}
        <div className="lg:col-span-2">
          {/* Heading */}
          {/* md:text-4xl: On medium screens, font size of 2.25rem (36px)
          // sm:text-3xl: On small screens, font size of 1.875rem (30px)
          // text-2xl: Base font size of 1.5rem (24px)
          // font-bold: Font weight 700
          // py-2: Padding top and bottom of 0.5rem (8px)*/}
          <h1 className="md:text-4xl sm:text-3x text-2xl font-bold py-2">
            Want tips & tricks to optimize your flow?
          </h1>
          <p>Sign up to our newsletter and stay up to date.</p>
        </div>

        {/* Form Section */}
        {/* my-4: Margin top and bottom of 1rem (16px)*/}
        <div className="my-4">
          {/* Form Container */}
          {/* flex: Creates a flexbox container
          // flex-col: Stack children vertically (mobile)
          // sm:flex-row: Stack children horizontally on small screens
          // items-center: Center items on cross axis
          // justify-between: Space between items on main axis
          // w-full: Width 100%*/}
          <div className="flex flex-col sm:flex-row items-center justify-center justify-between w-full">
            {/* Email Input */}
            {/* p-3: Padding of 0.75rem (12px) all around
            // flex: Makes the input a flex item
            // w-full: Width 100%
            // rounded-md: Border radius of 0.375rem (6px)
            // text-black: Text color black*/}
            <input
              className="p-3 flex w-full rounded-md text-black"
              type="email"
              placeholder="Enter Email"
            />
            {/* Submit Button */}
            {/* bg-[#00df9a]: Custom background color
            // text-black: Text color black
            // rounded-md: Border radius of 0.375rem (6px)
            // font-medium: Font weight 500
            // w-[200px]: Fixed width of 200px
            // ml-4: Margin left of 1rem (16px)
            // my-6: Margin top and bottom of 1.5rem (24px)
            // px-6: Padding left and right of 1.5rem (24px)
            // py-3: Padding top and bottom of 0.75rem (12px)*/}
            <button 
            className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black 
            hover:bg-blue-400 transition-colors duration-500 delay-200 hover:scale-105"
            onClick={() => navigate('/register')}
            >
            Notify me
            </button>
          </div>
        </div>

        {/* Privacy Text */}
        <p>
          we care bout the proctection of your data. Read our{" "}
          {/* Privacy Link */}
          {/* text-[#00df9a]: Custom text color matching button*/}
          <span className="text-[#00df9a]">Privacy Policy.</span>
        </p>
      </div>
    </div>
  );
};

export default Newsletter;