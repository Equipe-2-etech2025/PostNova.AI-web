import React from "react";
import galaxy from '../../assets/galaxy.png'
import { Button } from '../../components/Button'

const Register = () => {


  return (
    <div className="h-screen w-full bg-[#1c1b23] text-white flex flex-col md:flex-row overflow-hidden">
      {/*Left*/}
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
          

      {/*Right*/}
      <div className="flex-1 flex items-center justify-center px-8 py-6 md:py-12 overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center animate-fade-in">
            S'inscrire
          </h2>
          <p className="text-sm text-gray-400 mb-6 text-center">
            Lorem ipsum dolor sit amet consectetur. Vitae lectus natoque eget sed neque et tempus.
          </p>

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              className="w-full px-4 py-3 rounded-md bg-[#2e2d3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4335C4] transition-all duration-300 transform focus:scale-105"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md bg-[#2e2d3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4335C4] transition-all duration-300 transform focus:scale-105"
            />
            
            <div className="relative">
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full px-4 py-3 rounded-md bg-[#2e2d3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4335C4] transition-all duration-300 transform focus:scale-105"
            />
            </div>

            <div className="relative">
            <input
              type="password"
              placeholder="Confirmer Mot de Passe"
              className="w-full px-4 py-3 rounded-md bg-[#2e2d3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4335C4] transition-all duration-300 transform focus:scale-105"
            />
            </div>


            <div className="flex justify-center">
              <Button>
                S'inscrire
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;