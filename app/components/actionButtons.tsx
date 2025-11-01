

export default function ActionButtons() {
  return (
    <div className="flex items-center gap-3">
      <button className="flex items-center gap-2 px-4 py-3 bg-[var(--primary-color)] text-white rounded-lg  transition-colors duration-200">

        <span className="text-sm font-medium">Sign Up</span>
      </button>
      {/* Login Button */}
      <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
        <span className="text-sm font-medium">Login</span>
      </button>

      {/* Sign Up Button */}

    </div>
  );
}
