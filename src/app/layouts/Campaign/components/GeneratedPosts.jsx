import React from "react";
import PostItem from "./PostItem";

const GeneratedPosts = ({ generatedPosts }) => {
  if (generatedPosts.length === 0) return null;

  return (
    <div className="w-full max-h-[60vh] overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 mt-6">
      <h3 className="text-xl font-bold mb-4">Posts générés :</h3>
      {generatedPosts.map((post, idx) => (
        <PostItem key={idx} post={post} index={idx} />
      ))}
    </div>
  );
};

export default GeneratedPosts;