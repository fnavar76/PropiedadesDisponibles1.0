import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Phone, MessageCircle } from 'lucide-react';
import { generateWhatsAppLink } from '../utils/formatters';

const ContactForm = ({ propertyTitle = '', onSubmit = () => {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: propertyTitle ? `Me interesa la propiedad: ${propertyTitle}` : ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1000);
  };

  const handleWhatsAppContact = () => {
    const whatsappLink = generateWhatsAppLink(
      '5531504223',
      propertyTitle,
      formData.name,
      formData.phone
    );
    window.open(whatsappLink, '_blank');
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Solicitar Información
        </h3>
        <p className="text-gray-600">
          Completa el formulario y nos pondremos en contacto contigo
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            required
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            required
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Tu número de teléfono"
            required
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="relative">
          <MessageCircle className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Cuéntanos qué te interesa..."
            rows={4}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
          </motion.button>

          <motion.button
            type="button"
            onClick={handleWhatsAppContact}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </motion.button>
        </div>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            También puedes contactarnos directamente:
          </p>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">
              📧 hildamontppellier@gmail.com
            </p>
            <p className="text-sm font-medium text-gray-900">
              📱 55 3150 4223
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm;