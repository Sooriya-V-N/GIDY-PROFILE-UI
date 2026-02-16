function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        
        {/* Spinning Ring */}
        <div className="w-28 h-28 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>

        {/* Center Text */}
        <div className="absolute text-2xl font-bold text-gray-900 tracking-wide">
          Gidy
        </div>

      </div>
    </div>
  );
}

export default Loader;
