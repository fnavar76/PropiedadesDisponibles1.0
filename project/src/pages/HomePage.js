import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Home, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';

const API_URL = 'http://localhost:4000/properties';

const HomePage = ({ lang }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setProperties(data);
      } catch (e) {
        setError('Error al cargar propiedades');
      }
      setLoading(false);
    };
    fetchProperties();
  }, []);
  const featuredProperties = properties.filter(p => p.featured).slice(0, 3);
  const texts = {
    en: {
      title: 'Find your',
      dream: 'dream home',
      in: 'in Mexico',
      subtitle: 'Discover the best properties for sale and rent in the most exclusive locations. Your new home is waiting for you.',
      viewProperties: 'View Properties',
      contactAgent: 'Contact Agent',
      featured: 'Featured Properties',
      featuredDesc: 'Special selection of our best available properties',
      loading: 'Loading...',
      noFeatured: 'No featured properties',
      allProperties: 'View All Properties',
      whyChoose: 'Why choose Properties Mexico?',
      proven: 'Proven Experience',
      provenDesc: 'Over 15 years helping families find their ideal home in Mexico.',
      personalized: 'Personalized Attention',
      personalizedDesc: 'Every client is unique. We guide you through the entire buying or renting process.',
      verified: 'Verified Properties',
      verifiedDesc: 'All our properties go through a rigorous verification process.',
      stats: [
        { icon: Home, label: 'Available Properties', value: '500+' },
        { icon: Users, label: 'Happy Clients', value: '1,200+' },
        { icon: Shield, label: 'Years of Experience', value: '15+' },
        { icon: Star, label: 'Average Rating', value: '4.9' }
      ]
    },
    es: {
      title: 'Encuentra tu',
      dream: 'hogar ideal',
      in: 'en México',
      subtitle: 'Descubre las mejores propiedades para compra y renta en las ubicaciones más exclusivas del país. Tu nuevo hogar te está esperando.',
      viewProperties: 'Ver Propiedades',
      contactAgent: 'Contactar Asesor',
      featured: 'Propiedades Destacadas',
      featuredDesc: 'Selección especial de nuestras mejores propiedades disponibles',
      loading: 'Cargando...',
      noFeatured: 'No hay propiedades destacadas',
      allProperties: 'Ver Todas las Propiedades',
      whyChoose: '¿Por qué elegir Propiedades México?',
      proven: 'Experiencia Comprobada',
      provenDesc: 'Más de 15 años ayudando a familias a encontrar su hogar ideal en México.',
      personalized: 'Atención Personalizada',
      personalizedDesc: 'Cada cliente es único. Te acompañamos en todo el proceso de compra o renta.',
      verified: 'Propiedades Verificadas',
      verifiedDesc: 'Todas nuestras propiedades pasan por un riguroso proceso de verificación.',
      stats: [
        { icon: Home, label: 'Propiedades Disponibles', value: '500+' },
        { icon: Users, label: 'Clientes Satisfechos', value: '1,200+' },
        { icon: Shield, label: 'Años de Experiencia', value: '15+' },
        { icon: Star, label: 'Calificación Promedio', value: '4.9' }
      ]
    }
  };
  const t = texts[lang] || texts.en;
  const stats = t.stats;

  return (
    <div className="min-h-screen">
  <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t.title}{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.dream}
              </span>
              {' '}{t.in}
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.subtitle}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link to="/propiedades">
                <motion.button
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.viewProperties}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link to="/contacto">
                <motion.button
                  className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.contactAgent}
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.featured}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.featuredDesc}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {loading ? (
              <div className="text-center col-span-3 text-gray-500">{t.loading}</div>
            ) : error ? (
              <div className="text-center col-span-3 text-red-500">{error}</div>
            ) : featuredProperties.length > 0 ? (
              featuredProperties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                />
              ))
            ) : (
              <div className="text-center col-span-3 text-gray-500">{t.noFeatured}</div>
            )}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link to="/propiedades">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.allProperties}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t.whyChoose}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t.proven}
                    </h3>
                    <p className="text-gray-600">
                      {t.provenDesc}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t.personalized}
                    </h3>
                    <p className="text-gray-600">
                      {t.personalizedDesc}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t.verified}
                    </h3>
                    <p className="text-gray-600">
                      {t.verifiedDesc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600"
                alt="Familia feliz en su nuevo hogar"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-bold text-blue-600 mb-1">4.9/5</div>
                <div className="text-gray-600 font-medium dark:text-gray-300">Average rating</div>
                <div className="flex text-yellow-400 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;