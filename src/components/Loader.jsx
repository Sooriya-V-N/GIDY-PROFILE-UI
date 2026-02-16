function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        
        {/* Spinning Ring */}
        <div className="
          w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28
          border-4 border-gray-200 border-t-black rounded-full animate-spin
        "></div>

        {/* Center Text */}
        <div className="
          absolute text-xl sm:text-2xl md:text-3xl lg:text-4xl 
          font-bold text-gray-900 tracking-wide
        ">
          Gidy
        </div>

      </div>
    </div>
  );
}

export default Loader;
