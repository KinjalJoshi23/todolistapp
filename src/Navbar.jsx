const Navbar = () => {
  return (
    <nav className="bg-linear-to-r from-violet-600 to-indigo-600 shadow-lg">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h1 className="text-white font-bold text-lg sm:text-xl tracking-wide">To Do App</h1>
      </div>
    </nav>
  );
};

export default Navbar;
