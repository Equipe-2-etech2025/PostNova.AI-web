import React from "react";

const PlatformSelector = ({ selectedPlatform, handlePlatformChange }) => {
  const platforms = ["tiktok", "x", "linkedin"];

  return (
    <>
      {/* Sélection de la plateforme */}
      <div className="flex flex-row justify-center gap-6 mt-4 mb-4">
        {platforms.map((platform) => (
          <label key={platform} className="flex items-center space-x-2">
            <input
              type="radio"
              name="platform"
              value={platform}
              checked={selectedPlatform === platform}
              onChange={handlePlatformChange}
              className={`
                w-5 h-5 appearance-none rounded-full border border-gray-400 
                cursor-pointer relative 
                checked:border-violet-600
                checked:after:content-[''] checked:after:block checked:after:w-3 checked:after:h-3
                checked:after:rounded-full checked:after:bg-violet-600
                checked:after:absolute checked:after:top-1/2 checked:after:left-1/2
                checked:after:-translate-x-1/2 checked:after:-translate-y-1/2
              `}
            />
            <span className="capitalize">{platform}</span>
          </label>
        ))}
      </div>
    </>
  );
};

export default PlatformSelector;