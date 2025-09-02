import React from "react";
import { BsEnvelope, BsPhone, BsGeoAlt, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import Button from "@shared/Button";

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-gray-100 dark:bg-gray-900/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Contactez-nous</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Formulaire de contact */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-5">Envoyez-nous un message</h3>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">Nom</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Votre email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block mb-2 font-medium">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Sujet de votre message"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Votre message"
                ></textarea>
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 border-purple-600">
                Envoyer le message
              </Button>
            </form>
          </div>

          {/* Informations de contact */}
          <div className="space-y-7">
            <div>
              <h3 className="text-xl font-bold mb-5">Nos coordonnées</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                N'hésitez pas à nous contacter pour toute question. Notre équipe est là pour vous aider.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                  <BsEnvelope className="text-purple-600 dark:text-purple-400" size={18} />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600 dark:text-gray-300">contact@postnova.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <BsPhone className="text-blue-600 dark:text-blue-400" size={18} />
                </div>
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p className="text-gray-600 dark:text-gray-300">+261 33 00 000 00</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <BsGeoAlt className="text-green-600 dark:text-green-400" size={18} />
                </div>
                <div>
                  <p className="font-medium">Adresse</p>
                  <p className="text-gray-600 dark:text-gray-300">Trade Tower Etech</p>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div>
              <h4 className="text-lg font-bold mb-4">Suivez-nous</h4>
              <div className="flex gap-3">
                <a href="#" className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-purple-600 hover:text-white transition-colors">
                  <BsInstagram size={18} />
                </a>
                <a href="#" className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-blue-400 hover:text-white transition-colors">
                  <BsTwitter size={18} />
                </a>
                <a href="#" className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                  <BsLinkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
