import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PasswordResetFlow = () => {
  const [step, setStep] = useState(1); // 1 pour l'email, 2 pour la réinitialisation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    //logique pour envoyer l'email
    // Si succès, passer à l'étape suivante
    setStep(2);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // logique pour réinitialiser le mot de passe
    console.log('Mot de passe réinitialisé pour', email);
  };

  return (
    <>
      {step === 1 ? (
        <div className="flex justify-center items-center h-screen bg-[#1c1b23]">
          <div className="flex-1 flex items-center justify-center px-8 py-6 md:py-12 overflow-y-auto">
            <div className="w-full max-w-md my-auto">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                Email de récupération de mot de passe
              </h2>
              <p className="text-sm text-gray-400 mb-6 text-center">
                Veuillez saisir votre email pour recevoir un lien de réinitialisation de mot de passe.
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-[#2e2d3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 transform focus:scale-105"
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="px-6 py-3 bg-[#4335C4] text-white rounded-md hover:bg-[#5a4fd4] transition-colors duration-200">
                    Valider l'email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen bg-[#1c1b23]">
          <div className="flex-1 flex items-center justify-center px-8 py-6 md:py-12 overflow-y-auto">
            <div className="w-full max-w-md my-auto">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                Réinitialisation Mot de Passe
              </h2>
              <p className="text-sm text-gray-400 mb-6 text-center">
                Veuillez saisir un nouveau mot de passe et le confirmer.
              </p>

              <form onSubmit={handlePasswordReset} className="space-y-6">
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Nouveau Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-[#2e2d3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 transform focus:scale-105"
                    required
                  />
                </div>

                <div>
                  <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirmer Nouveau Mot de Passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-[#2e2d3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 transform focus:scale-105"
                    required
                  />
                </div>

                <div className="flex justify-center">
                  <button type="submit" className="px-6 py-3 bg-[#4335C4] text-white rounded-md hover:bg-[#5a4fd4] transition-colors duration-200">
                    Réinitialiser votre mot de passe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordResetFlow;