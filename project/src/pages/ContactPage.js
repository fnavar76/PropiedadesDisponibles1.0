import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const ContactPage = ({ lang }) => {
  const texts = {
    en: {
      contactUs: 'Contact Us',
      subtitle: 'We are here to help you find the perfect property. Contact us and we will advise you with no obligation.',
      email: 'Email',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      location: 'Location',
      emailDesc: 'Response within 24 hours',
      phoneDesc: 'Monday to Friday 9:00 AM - 6:00 PM',
      whatsappDesc: 'Available 24/7',
      locationDesc: 'Service in all Mexico City and metropolitan area',
      thankYou: 'Thank you for contacting us! We will get back to you soon.'
    },
    es: {
      contactUs: 'Contáctanos',
      subtitle: 'Estamos aquí para ayudarte a encontrar la propiedad perfecta. Contáctanos y te asesoramos sin compromiso.',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      whatsapp: 'WhatsApp',
      location: 'Ubicación',
      emailDesc: 'Respuesta en menos de 24 horas',
      phoneDesc: 'Lunes a viernes de 9:00 AM a 6:00 PM',
      whatsappDesc: 'Disponible 24/7',
      locationDesc: 'Atención en toda la CDMX y área metropolitana',
      thankYou: '¡Gracias por contactarnos! Pronto nos pondremos en contacto contigo.'
    }
  };
  const t = texts[lang] || texts.en;
  const contactInfo = [
    {
      icon: Mail,
      title: t.email,
      value: 'hildamontppellier@gmail.com',
      description: t.emailDesc
    },
    {
      icon: Phone,
      title: t.phone,
      value: '55 3150 4223',
      description: t.phoneDesc
    },
    {
      icon: MessageCircle,
      title: t.whatsapp,
      value: '55 3150 4223',
      description: t.whatsappDesc
    },
    {
      icon: MapPin,
      title: t.location,
      value: 'Ciudad de México',
      description: t.locationDesc
    }
  ];

  const handleContactSubmit = (formData) => {
    console.log('Formulario de contacto:', formData);
    alert(t.thankYou);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t.contactUs}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-blue-600 font-medium mb-1">
                        {info.value}
                      </p>
                      <p className="text-sm text-gray-600">
                        {info.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Service Hours
                </h3>
              </div>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium">By appointment only</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-3">
                  <span>WhatsApp:</span>
                  <span className="font-medium text-green-600">24/7</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ContactForm onSubmit={handleContactSubmit} />
          </motion.div>
        </div>

        <motion.div
          className="mt-16 bg-white rounded-2xl shadow-lg p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Ready to find your dream home?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Our team of experts is ready to help you every step of the way. From the search to signing the contract, we guide you so you find the perfect property for you and your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="tel:5531504223"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" />
              Call Now
            </motion.a>
            <motion.a
              href="https://wa.me/525531504223?text=Hello! I'm interested in getting information about your available properties."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;