import { useState } from "react";

function App() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          MERN Interview App
        </h1>

        <button
          onClick={() => setShowProfile(!showProfile)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-300"
        >
          View Profile
        </button>

        {showProfile && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
            <h2 className="text-xl font-semibold text-gray-700">
              Sooriya
            </h2>
            <p className="text-gray-500">Full Stack MERN Developer</p>
            <p className="text-gray-500 mt-2">
              Skilled in React, Node.js, Express, MongoDB & Tailwind CSS
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
