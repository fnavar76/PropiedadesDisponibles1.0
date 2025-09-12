import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share, MapPin, Calendar, User, Star, Eye } from 'lucide-react';
import { formatPrice, formatSurface, formatDate, getPropertyTypeIcon } from '../utils/formatters';
import ContactForm from '../components/ContactForm';

const API_URL = 'http://localhost:4000/properties';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const url = `${API_URL}/${id}`;
        const res = await fetch(url);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`No encontrada. Código: ${res.status}. Respuesta: ${text}`);
        }
        const data = await res.json();
        setProperty(data);
      } catch (e) {
        setError(`Propiedad no encontrada. ID: ${id}. Error: ${e.message}`);
      }
      setLoading(false);
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Cargando...</div>;
  }
  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error al mostrar detalles</h2>
          <div className="text-gray-700 text-sm mb-4 break-all">{error}</div>
          <div className="text-xs text-gray-400 mb-2">ID buscado: <b>{id}</b></div>
          <Link to="/propiedades">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">Regresar</button>
          </Link>
        </div>
      </div>
    );
  }

  const handleContactSubmit = (formData) => {
    console.log('Solicitud de contacto:', formData);
    alert('¡Gracias! Nos pondremos en contacto contigo pronto.');
    setShowContactForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div className="flex items-center gap-4 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/propiedades">
            <motion.button className="p-2 rounded-xl bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </motion.button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mt-1">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
              <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold text-white ${property.operation === 'venta' ? 'bg-green-500' : 'bg-blue-500'}`}>{property.operation === 'venta' ? 'Venta' : 'Renta'}</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full">
                <Eye className="w-4 h-4" />
                {property.views || 0} vistas
              </span>
              {property.createdAt && (
                <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  <Calendar className="w-4 h-4" />
                  Publicado el {formatDate(property.createdAt)}
                </span>
              )}
            </div>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="relative">
                <img src={property.images && property.images.length > 0 ? property.images[currentImageIndex].startsWith('http') ? property.images[currentImageIndex] : `http://localhost:4000${property.images[currentImageIndex]}` : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'} alt={property.title} className="w-full h-96 object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${property.operation === 'venta' ? 'bg-green-500' : 'bg-blue-500'}`}>{property.operation === 'venta' ? 'Venta' : 'Renta'}</span>
                  {property.featured && (
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-500 text-white flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Destacada
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.button className="p-2 rounded-full bg-white/90 text-gray-600 hover:text-red-500 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Heart className="w-5 h-5" />
                  </motion.button>
                  <motion.button className="p-2 rounded-full bg-white/90 text-gray-600 hover:text-blue-500 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Share className="w-5 h-5" />
                  </motion.button>
                </div>
                {property.images && property.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {property.images.map((_, index) => (
                      <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                    ))}
                  </div>
                )}
              </div>
              {property.images && property.images.length > 1 && (
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button key={index} onClick={() => setCurrentImageIndex(index)} className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'}`}>
                        <img src={image.startsWith('http') ? image : `http://localhost:4000${image}`} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {property.location && (
                <div className="mt-8 flex flex-col items-start">
                  <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    Ubicación en el mapa
                  </h3>
                  <div className="w-full rounded-2xl overflow-hidden">
                    <iframe title="Mapa ubicación" width="100%" height="384" style={{ border: 0, minWidth: '100%', minHeight: '384px' }} className="w-full h-96" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}></iframe>
                  </div>
                </div>
              )}
            </motion.div>
            <motion.div className="bg-white rounded-2xl shadow-lg p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="flex items-center justify-between mb-6">
                <div className="text-3xl font-bold text-blue-600">{formatPrice(property.price, property.operation)}</div>
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{property.views} vistas</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl mb-1">{getPropertyTypeIcon(property.type)}</div>
                  <div className="text-sm text-gray-500">Tipo</div>
                  <div className="font-semibold capitalize">{property.type}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">📐</div>
                  <div className="text-sm text-gray-500">Superficie</div>
                  <div className="font-semibold">{formatSurface(property.surface)}</div>
                </div>
                {property.bedrooms > 0 && (
                  <div className="text-center">
                    <div className="text-2xl mb-1">🛏️</div>
                    <div className="text-sm text-gray-500">Recámaras</div>
                    <div className="font-semibold">{property.bedrooms}</div>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-2xl mb-1">🚿</div>
                  <div className="text-sm text-gray-500">Baños</div>
                  <div className="font-semibold">{property.bathrooms}</div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Descripción</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{property.description}</p>
              </div>
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>Publicado el {formatDate(property.createdAt)}</span>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <ContactForm propertyTitle={property.title} onSubmit={handleContactSubmit} />
            </motion.div>
            <motion.div className="bg-white rounded-2xl shadow-lg p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Información Adicional</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">ID de Propiedad:</span>
                  <span className="font-medium">#{property.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Estacionamiento:</span>
                  <span className="font-medium">{property.parking || 'No incluido'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Estado:</span>
                  <span className="font-medium text-green-600">Disponible</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;