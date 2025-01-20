export default function Footer() {
  return (
    <footer className="py-4 font-serif text-white bg-gray-200">
      {/* Centered Dots Section */}
      <div className="bg-gray-200 h-[20vh] flex justify-center items-center">
        <div className="flex gap-4">
          <span className="w-2 h-2 rounded-full bg-gray-950"></span>
          <span className="w-2 h-2 rounded-full bg-gray-950"></span>
          <span className="w-2 h-2 rounded-full bg-gray-950"></span>
        </div>
      </div>

      <div className="py-5 text-sm tracking-wider text-center text-black uppercase bg-white">
        VIKTÓRIA RÉTFALVI © 2025 ALL RIGHTS RESERVED.
      </div>

      <div className="py-8 text-white bg-black">
        <div className="max-w-screen-xl px-6 mx-auto md:px-12">
          {/* Top Section */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-12">
            {/* Logo and Contact */}
            <div className="space-y-4">
              <h1 className="text-xl tracking-wide">v_hd</h1>
              <div className="flex flex-wrap gap-2">
                <h1 className="text-lg leading-tight md:text-xl">Take the</h1>
                <span className="px-2 text-lg leading-tight text-black bg-white md:text-xl">
                  _space
                </span>
                <div className="flex flex-wrap items-start gap-4">
                  <h1 className="text-sm leading-tight md:text-base">seriously.</h1>
                  <div className="flex flex-col text-xs md:text-sm">
                    <p>HOME</p>
                    <p>VIKTORIA</p>
                    <p>DESIGN</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-white ">
                <p>Viktória Rétfalvi</p>
                <p>hi@vhd.hu</p>
                <div className="flex items-center justify-between text-xs text-white gap-60 md:text-sm">
                  {/* Phone Number */}
                  <p>+36 999 999 999</p>

                  {/* Links */}
                  <div className="flex flex-col gap-4 px-4 text-white md:flex-row md:px-6 whitespace-nowrap">
                    <a href="#" className="hover:text-gray-400">
                      _ Terms and Conditions
                    </a>
                    <a href="#" className="hover:text-gray-400">
                      _ Privacy Policy
                    </a>
                    <a href="#" className="hover:text-gray-400">
                      _ Security
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* About Links */}
            <div className="space-y-2">
              <p className="hover:text-gray-400">_ About me</p>
              <p className="hover:text-gray-400">_ Styles</p>
              <p className="hover:text-gray-400">_ Portfolio</p>
              <p className="hover:text-gray-400">_ Blog</p>
            </div>

            {/* Services Links */}
            <div className="space-y-2">
              <p className="hover:text-gray-400">_ Services</p>
              <p className="hover:text-gray-400">_ Home interior</p>
              <p className="hover:text-gray-400">_ Office design</p>
              <p className="hover:text-gray-400">_ Cafe interior</p>
            </div>

            {/* Products Links */}
            <div className="space-y-2">
              <p className="hover:text-gray-400">_ Products</p>
              <p className="hover:text-gray-400">_ Lights</p>
              <p className="hover:text-gray-400">_ Decoration</p>
              <p className="hover:text-gray-400">_ Textiles</p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 text-sm text-center">
            <p className="text-white">Designed with love by Viktória</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
