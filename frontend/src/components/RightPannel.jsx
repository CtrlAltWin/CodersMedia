import React from "react";

const RightPanel = ({ title, message }) => {
  return (
    <div className="flex flex-col justify-between p-6 text-sm text-gray-600 leading-relaxed w-full h-full">
      {/* Top Section: Custom Message */}
      <div>
        {title && <h2 className="text-base font-semibold mb-2">{title}</h2>}
        {message}
      </div>

      {/* Bottom Section: Static Footer */}
      <div className="text-xs border-t pt-4">
        <p className="mb-1">By using Coder's Media, you agree to our</p>
        <p>
          <a className="text-blue-500 underline">Terms</a> and{" "}
          <a className="text-blue-500 underline">Privacy Policy</a>.
        </p>
        <p className="mt-4 text-gray-400">
          © {new Date().getFullYear()} Coder's Media. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default RightPanel;
