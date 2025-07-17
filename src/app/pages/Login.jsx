import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import galaxy from '../../assets/galaxy.png';
import { Button } from '../../components/Button';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  
  // États pour le formulaire
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  
  // États pour les erreurs et messages
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gérer les changements dans les inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setMessage('');
    setErrors({});
    
    try {
      const result = await login({
        email: formData.email,
        password: formData.password
      });
      
      if (result.success) {
        setMessage('Connexion réussie ! Redirection...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setMessage(result.message || 'Erreur de connexion');
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#1c1b23] text-white flex flex-col md:flex-row overflow-hidden">
      {/*Left Section*/}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center">Se connecter</h2>
          <p className="text-center text-sm text-gray-400">
            Connectez-vous à votre compte PostNova.AI pour accéder à vos campagnes.
          </p>
          
          {/* Message de succès/erreur */}
          {message && (
            <div className={`p-3 rounded-md text-center text-sm ${
              message.includes('réussie') 
                ? 'bg-green-600/20 text-green-400 border border-green-600/30' 
                : 'bg-red-600/20 text-red-400 border border-red-600/30'
            }`}>
              {message}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
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
                disabled={isSubmitting || loading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Mot de passe */}
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
                disabled={isSubmitting || loading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm text-gray-300">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="mr-2 rounded bg-[#2e2d3b] border-gray-600 text-[#4335C4] focus:ring-[#4335C4]"
                  disabled={isSubmitting || loading}
                />
                Se souvenir de moi
              </label>
              <Link 
                to="/forgot-password" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Bouton de connexion */}
            <div className="flex justify-center">
              <Button 
                type="submit" 
                disabled={isSubmitting || loading}
                className={`${isSubmitting || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting || loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion...
                  </div>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </div>
          </form>

          {/* Lien vers l'inscription */}
          <div className="text-center text-sm text-gray-400">
            Pas encore de compte ?{' '}
            <Link 
              to="/register" 
              className="text-[#4335C4] hover:text-[#5a4fd4] transition-colors font-medium"
            >
              S'inscrire
            </Link>
          </div>
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
};

export default Login;
