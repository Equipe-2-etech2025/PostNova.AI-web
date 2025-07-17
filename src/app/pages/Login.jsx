import React from "react";
import galaxy from '../../assets/galaxy.png';
import { Button } from '../../components/Button';

const Login = () => {

  return (
    <div className="h-screen w-full bg-[#1c1b23] text-white flex flex-col md:flex-row overflow-hidden">
      {/*Left Section*/}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center">Se connecter</h2>
          <p className="text-center text-sm text-gray-400">
            Lorem ipsum dolor sit amet consectetur. Vitae lectus natoque eget sed neque at tempus.
          </p>

          <form className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md bg-[#2e2d3b] text-[#4335C4] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4335C4] transition-all duration-300 transform focus:scale-105"
            />
            <div className="relative">
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full px-4 py-3 rounded-md bg-[#2e2d3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4335C4] transition-all duration-300 transform focus:scale-105"
            />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-300">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Se souvenir de moi
              </label>
              <a href="#" className="text-gray-400 hover:text-white">
                Mot de passe oublié ?
              </a>
            </div>

            <div className="flex justify-center">
              <Button>Se connecter</Button>
            </div>

          </form>
        </div>
      </div>

      {/*Right Section*/}
      <div className="flex-1 relative p-4 h-64 md:h-auto">
        <img
          src={galaxy}
          alt="galaxy"
          className="w-full h-full object-cover opacity-90 rounded-2xl"
        />
        <div className="absolute bottom-16 left-0 right-0 text-center">
          <h2 className="text-white text-xl md:text-4xl font-semibold">
            Une <span className="text-[#4335C4] animate-pulse">idée</span>
            <br />
            une <span className="text-[#4335C4] animate-pulse">campagne</span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;