import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, ArrowRight, Home, User, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice, formatSurface, getPropertyTypeIcon } from '../utils/formatters';

const PropertyCard = ({ property, index = 0 }) => {
  const mainImage = property.images?.[0]
    ? (property.images[0].startsWith('http')
        ? property.images[0]
  : `https://propiedadesbackend.onrender.com${property.images[0]}`)
    : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800';

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            property.operation === 'venta' 
              ? 'bg-green-500' 
              : 'bg-blue-500'
          }`}>
            {property.operation === 'venta' ? 'Venta' : 'Renta'}
          </span>
          {property.featured && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white flex items-center gap-1">
              <Star className="w-3 h-3" />
              Destacada
            </span>
          )}
        </div>

        <motion.button
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className="w-4 h-4" />
        </motion.button>

        <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/70 rounded-lg text-white text-xs">
          {property.images?.length || 1} fotos
        </div>
      </div>

      <div className="p-6">

        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{getPropertyTypeIcon(property.type)}</span>
          <span className="text-sm font-medium text-gray-500 capitalize">
            {property.type}
          </span>
          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold text-white ${
            property.operation === 'venta' ? 'bg-green-500' : 'bg-blue-500'
          }`}>
            {property.operation === 'venta' ? 'Venta' : 'Renta'}
          </span>
        </div>


        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
          {property.title}
        </h3>
        {property.createdAt && (
          <div className="text-xs text-gray-500 mb-2">
            Publicado el {require('../utils/formatters').formatDate(property.createdAt)}
          </div>
        )}
        <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold mb-2">
          <span role="img" aria-label="ubicacion">📍</span>
          <span className="truncate">{property.location}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-blue-600">
            {formatPrice(property.price, property.operation)}
          </div>
          <div className="text-sm text-gray-500">
            {formatSurface(property.surface)}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <Home className="w-4 h-4" />
              <span>{property.bedrooms} rec</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <span>🚿</span>
            <span>{property.bathrooms} baños</span>
          </div>
          {property.parking > 0 && (
            <div className="flex items-center gap-1">
              <span>🚗</span>
              <span>{property.parking} est</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Eye className="w-4 h-4" />
            <span>{property.views || 0} vistas</span>
          </div>
          <Link to={`/propiedad/${property.id}`}>
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver detalles
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;