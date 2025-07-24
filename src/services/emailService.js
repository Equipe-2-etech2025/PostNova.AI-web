import api from './api.js';

export const emailService = {
  async sendVerificationEmail() {
    try {
      const response = await api.post('/email/verification-notification');
      console.log('Email de vérification envoyé:', response.data);
      return {
        success: true,
        message: response.data.message || 'Email de vérification envoyé.'
      };
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de vérification:', error);

      if (error.code === 'ERR_NETWORK') {
        return {
          success: false,
          message: 'Impossible de se connecter au serveur.',
          errors: {}
        };
      }

      return {
        success: false,
        message: error.response?.data?.message || 'Erreur d\'envoi de l\'email.',
        errors: error.response?.data?.errors || {}
      };
    }
  },

  async resendVerificationEmail() {
    try {
      const response = await api.post('/email/verification-notification');
      console.log('Email de vérification renvoyé:', response.data);
      return {
        success: true,
        message: response.data.message || 'Email renvoyé.'
      };
    } catch (error) {
      console.error('Erreur renvoi mail:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur de renvoi',
        errors: error.response?.data?.errors || {}
      };
    }
  },

  async verifyEmail(params) {
    try {
      const response = await api.post('auth/email/verify', params);
      console.log('Email vérifié avec succès:', response.data);
      return {
        success: true,
        token: response.data.data.token,
        message: response.data.message,
        user: response.data.data.user,
      };
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'email:', error);

      if (error.code === 'ERR_NETWORK') {
        return {
          success: false,
          message: 'Impossible de se connecter au serveur.',
          errors: {}
        };
      }

      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la vérification.',
        errors: error.response?.data?.errors || {}
      };
    }
  },

  async checkVerificationStatus() {
    try {
      const response = await api.get('/email//verify/status');
      console.log('Statut de vérification récupéré:', response.data);
      return {
        success: true,
        verified: response.data.verified,
        email: response.data.email,
        verifiedAt: response.data.verified_at
      };
    } catch (error) {
      console.error('Erreur lors de la récupération du statut de vérification:', error);

      if (error.code === 'ERR_NETWORK') {
        return {
          success: false,
          message: 'Impossible de se connecter au serveur.',
          errors: {}
        };
      }

      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération du statut.',
        errors: error.response?.data?.errors || {}
      };
    }
  }
};
