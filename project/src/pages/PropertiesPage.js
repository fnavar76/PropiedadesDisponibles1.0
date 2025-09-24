import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';

const API_URL = 'https://propiedadesbackend.onrender.com/properties';


const PropertiesPage = ({ lang }) => {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    operation: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    location: ''
  });
  const [sortBy, setSortBy] = useState('newest');
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

  const filteredProperties = useMemo(() => {
    let filtered = properties.filter(property => {
      const matchesSearch = !filters.search || 
        property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        (property.location && property.location.toLowerCase().includes(filters.search.toLowerCase())) ||
        (property.description && property.description.toLowerCase().includes(filters.search.toLowerCase()));

      const matchesType = !filters.type || property.type === filters.type;
      const matchesOperation = !filters.operation || property.operation === filters.operation;
      
      const matchesMinPrice = !filters.minPrice || property.price >= parseInt(filters.minPrice);
      const matchesMaxPrice = !filters.maxPrice || property.price <= parseInt(filters.maxPrice);
      
      const matchesBedrooms = !filters.bedrooms || property.bedrooms >= parseInt(filters.bedrooms);
      
      const matchesLocation = !filters.location || 
        (property.location && property.location.toLowerCase().includes(filters.location.toLowerCase()));

      return matchesSearch && matchesType && matchesOperation && 
             matchesMinPrice && matchesMaxPrice && matchesBedrooms && matchesLocation;
    });

    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'surface':
        return filtered.sort((a, b) => b.surface - a.surface);
      case 'views':
        return filtered.sort((a, b) => b.views - a.views);
      default:
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }, [filters, sortBy, properties]);

  // Texts for both languages
  const texts = {
    en: {
      title: 'Available Properties',
      subtitle: 'Explore our full selection of properties for sale and rent',
      showing: 'Showing',
      properties: 'properties',
      sort: {
        newest: 'Newest',
        priceLow: 'Price: low to high',
        priceHigh: 'Price: high to low',
        surface: 'Largest surface',
        views: 'Most viewed'
      },
      notFound: 'No properties found',
      tryAdjust: 'Try adjusting your search filters to see more results',
      clear: 'Clear Filters'
    },
    es: {
      title: 'Propiedades Disponibles',
      subtitle: 'Explora nuestra selección completa de propiedades en venta y renta',
      showing: 'Mostrando',
      properties: 'propiedades',
      sort: {
        newest: 'Más recientes',
        priceLow: 'Precio: menor a mayor',
        priceHigh: 'Precio: mayor a menor',
        surface: 'Mayor superficie',
        views: 'Más vistas'
      },
      notFound: 'No se encontraron propiedades',
      tryAdjust: 'Intenta ajustar tus filtros de búsqueda para ver más resultados',
      clear: 'Limpiar Filtros'
    }
  };
  const t = texts[lang] || texts.en;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <SearchFilters onFiltersChange={setFilters} />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <motion.div
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.showing} {filteredProperties.length} {t.properties}
          </motion.div>

          <motion.select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <option value="newest">{t.sort.newest}</option>
            <option value="price-low">{t.sort.priceLow}</option>
            <option value="price-high">{t.sort.priceHigh}</option>
            <option value="surface">{t.sort.surface}</option>
            <option value="views">{t.sort.views}</option>
          </motion.select>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {t.notFound}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t.tryAdjust}
            </p>
            <motion.button
              onClick={() => setFilters({
                search: '', type: '', operation: '', minPrice: '', 
                maxPrice: '', bedrooms: '', location: ''
              })}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.clear}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;