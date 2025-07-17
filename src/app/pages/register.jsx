import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import galaxy from '../../assets/galaxy.png';
import { Button } from '../../components/Button';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    if (!formData.password_confirmation) {
      newErrors.password_confirmation = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Les mots de passe ne correspondent pas';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    const result = await register(formData);
    
    if (result.success) {
      setMessage(result.message);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      setMessage(result.message);
      if (result.errors) {
        setErrors(result.errors);
      }
    }
  };

  return (
    <div className="h-screen w-full bg-[#1c1b23] text-white flex flex-col md:flex-row overflow-hidden">
      {/* Left */}
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

      {/* Right */}
      <div className="flex-1 flex items-center justify-center px-8 py-6 md:py-12 overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center animate-fade-in">
            S'inscrire
          </h2>
          <p className="text-sm text-gray-400 mb-6 text-center">
            Créez votre compte pour commencer à créer des campagnes innovantes.
          </p>

          {message && (
            <div className={`mb-4 p-3 rounded-md text-center ${
              message.includes('réussie') || message.includes('succès')
                ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                : 'bg-red-600/20 text-red-400 border border-red-600/30'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nom d'utilisateur"
                className={`w-full px-4 py-3 rounded-md bg-[#2e2d3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 transform focus:scale-105 ${
                  errors.name 
                    ? 'focus:ring-red-500 border border-red-500' 
                    : 'focus:ring-[#4335C4]'
                }`}
                disabled={loading}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full px-4 py-3 rounded-md bg-[#2e2d3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 transform focus:scale-105 ${
                  errors.email 
                    ? 'focus:ring-red-500 border border-red-500' 
                    : 'focus:ring-[#4335C4]'
                }`}
                disabled={loading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                className={`w-full px-4 py-3 rounded-md bg-[#2e2d3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 transform focus:scale-105 ${
                  errors.password 
                    ? 'focus:ring-red-500 border border-red-500' 
                    : 'focus:ring-[#4335C4]'
                }`}
                disabled={loading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Confirmer Mot de Passe"
                className={`w-full px-4 py-3 rounded-md bg-[#2e2d3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 transform focus:scale-105 ${
                  errors.password_confirmation 
                    ? 'focus:ring-red-500 border border-red-500' 
                    : 'focus:ring-[#4335C4]'
                }`}
                disabled={loading}
              />
              {errors.password_confirmation && (
                <p className="mt-1 text-sm text-red-400">{errors.password_confirmation}</p>
              )}
            </div>

            <div className="flex justify-center">
              <Button 
                type="submit" 
                disabled={loading}
                className={`${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Inscription...
                  </div>
                ) : (
                  'S\'inscrire'
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Déjà un compte ?{' '}
              <Link 
                to="/login" 
                className="text-[#4335C4] hover:text-[#5a4fd4] transition-colors duration-200"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
