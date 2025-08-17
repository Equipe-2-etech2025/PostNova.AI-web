import React, { useState } from 'react';
import { BsPersonCircle, BsRocket, BsPencil } from 'react-icons/bs';
import SectionBlock from "@layouts/SectionBlock";
import Button from '@shared/Button';

const ProfileInfo = ({ user, tarif, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    onSave?.(formData);
    setIsEditing(false);
  };

  return (
    <div className="lg:col-span-2">
      <SectionBlock 
        title="Informations du profil" 
        icon={<BsPersonCircle />} 
        action={
          <BsPencil 
            className="cursor-pointer" 
            onClick={() => setIsEditing(!isEditing)} 
          />
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-500 dark:text-gray-400 text-sm mb-2">
                Nom
              </label>
              {isEditing ? (
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 border border-gray-300 dark:border-gray-700">
                  {formData.name}
                </div>
              )}
            </div>
            <div>
              <label className="block text-gray-500 dark:text-gray-400 text-sm mb-2">
                Email
              </label>
              {isEditing ? (
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 border border-gray-300 dark:border-gray-700">
                  {formData.email}
                </div>
              )}
            </div>
          </div>

          {tarif && tarif.tarif ? (
            <div>
              <label className="block text-gray-500 dark:text-gray-400 text-sm mb-2">
                Plan actuel
              </label>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg text-white flex items-center gap-2">
                    <BsRocket />
                    {tarif.tarif.name}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm text-white">
                    Actif
                  </span>
                </div>
                <p className="text-blue-100 mt-2">
                  {tarif.tarif.description ||
                    "Accès aux fonctionnalités personnalisées selon le plan"}
                </p>
                <Button
                  variant="outline"
                  className="mt-3 text-white border-white hover:bg-white hover:text-purple-600"
                >
                  Changer de plan
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-gray-500 dark:text-gray-400 text-sm mb-2">
                Plan actuel
              </label>
              <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 text-gray-500 dark:text-gray-400">
                Aucun plan actif
              </div>
            </div>
          )}

          {isEditing && (
            <div className="flex gap-3 mt-4">
              <Button onClick={handleSave}>Enregistrer</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Annuler
              </Button>
            </div>
          )}
        </div>
      </SectionBlock>
    </div>
  );
};

export default ProfileInfo;
