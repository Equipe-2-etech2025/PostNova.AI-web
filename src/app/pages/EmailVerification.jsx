import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from '../../components/Button';
import MessageNotification from '../../components/MessageNotification';
import { useNotification } from '../../hooks/useNotification';

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, updateUser, logout } = useAuth();
  const { notification, showSuccess, showError, hideNotification } = useNotification();

  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  // Vérifier l'authentification et la vérification email
  useEffect(() => {
    if (loading) return; // Attendre que le loading soit terminé

    if (!user) {
      navigate('/login');
      return;
    }

    // Si l'email est déjà vérifié, rediriger vers dashboard
    if (user.email_verified_at) {
      navigate('/dashboard');
      return;
    }

    // Vérifier s'il y a des paramètres de vérification dans l'URL
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get('id');
    const hash = urlParams.get('hash');
    const expires = urlParams.get('expires');
    const signature = urlParams.get('signature');

    if (id && hash && expires && signature) {
      handleEmailVerification(id, hash, expires, signature);
    }
  }, [user, loading, location, navigate]);

  // Gérer le cooldown
  useEffect(() => {
    let interval;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleEmailVerification = async (id, hash, expires, signature) => {
    setIsVerifying(true);
    
    try {
      const response = await fetch('/api/email/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({ id, hash, expires, signature })
      });

      const data = await response.json();

      if (data.success) {
        // ✅ Mettre à jour les données utilisateur avec email_verified_at
        updateUser({ 
          email_verified_at: new Date().toISOString() 
        });
        
        showSuccess('Email vérifié avec succès ! Redirection...', {
          duration: 3000,
          position: 'top-center'
        });
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        showError(data.message || 'Erreur lors de la vérification', {
          duration: 5000,
          position: 'top-center'
        });
      }
    } catch (error) {
      console.error('Erreur de vérification:', error);
      showError('Une erreur est survenue lors de la vérification', {
        duration: 5000,
        position: 'top-center'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendEmail = async () => {
    if (resendCooldown > 0) return;

    setIsResending(true);

    try {
      const response = await fetch('/api/email/verification-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        }
      });

      const data = await response.json();

      if (data.success) {
        showSuccess('Email de vérification envoyé !', {
          duration: 4000,
          position: 'top-center'
        });
        setResendCooldown(60);
      } else {
        showError(data.message || 'Erreur lors de l\'envoi', {
          duration: 5000,
          position: 'top-center'
        });
      }
    } catch (error) {
      console.error('Erreur d\'envoi:', error);
      showError('Une erreur est survenue lors de l\'envoi', {
        duration: 5000,
        position: 'top-center'
      });
    } finally {
      setIsResending(false);
    }
  };

  // Afficher un loader pendant le chargement initial
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#1c1b23] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4335C4]"></div>
      </div>
    );
  }

  // Si pas d'utilisateur, ne rien afficher (la redirection va se faire)
  if (!user) {
    return null;
  }

  return (
    <>
      <MessageNotification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
        autoHide={true}
        duration={5000}
        position="top-center"
        showProgressBar={true}
      />

      <div className="min-h-screen w-full bg-[#1c1b23] text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-[#2e2d3b] rounded-2xl shadow-2xl p-8 border border-gray-700/50">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#4335C4] to-[#5a4fd4] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                Vérifiez votre email
              </h1>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                Nous avons envoyé un lien de vérification à
              </p>
              <p className="text-[#4335C4] font-medium mt-1">
                {user?.email}
              </p>
            </div>

            {/* Status de vérification */}
            {isVerifying && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400 mr-3"></div>
                  <span className="text-blue-300 text-sm">Vérification en cours...</span>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
              <h3 className="text-white font-medium mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#4335C4]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Instructions
              </h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Vérifiez votre boîte de réception</li>
                <li>• Cliquez sur le lien de vérification</li>
                <li>• Vérifiez aussi vos spams</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              {/* Bouton renvoyer */}
              <Button
                onClick={handleResendEmail}
                disabled={isResending || resendCooldown > 0}
                className={`w-full ${
                  isResending || resendCooldown > 0
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:shadow-lg hover:shadow-[#4335C4]/25 transform hover:scale-105'
                } transition-all duration-300`}
                variant="primary"
              >
                {isResending ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Envoi en cours...
                  </div>
                ) : resendCooldown > 0 ? (
                  `Renvoyer dans ${resendCooldown}s`
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Renvoyer l'email
                  </span>
                )}
              </Button>

              {/* Bouton changer d'email */}
              <button
                onClick={() => navigate('/profile/email')}
                className="w-full px-4 py-3 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-all duration-300 hover:bg-gray-700/30"
              >
                Changer d'adresse email
              </button>

              {/* Bouton déconnexion */}
              <button
                onClick={logout}
                className="w-full px-4 py-3 text-gray-400 hover:text-red-400 border border-gray-700 hover:border-red-500/50 rounded-lg transition-all duration-300 hover:bg-red-500/10"
              >
                Se déconnecter
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <p className="text-center text-xs text-gray-500">
                Vous n'avez pas reçu l'email ? Vérifiez vos spams ou{' '}
                <button
                  onClick={handleResendEmail}
                  disabled={resendCooldown > 0}
                  className="text-[#4335C4] hover:text-[#5a4fd4] transition-colors underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  renvoyez-le
                </button>
              </p>
            </div>
          </div>

          {/* Lien retour */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/login')}
              className="text-gray-400 hover:text-white transition-colors text-sm flex items-center justify-center mx-auto"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à la connexion
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;

