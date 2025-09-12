export const formatPrice = (price, operation = 'sale') => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  const formattedPrice = formatter.format(price);
  return operation === 'rent' ? `${formattedPrice}/month` : formattedPrice;
};

export const formatSurface = (surface) => {
  return `${surface} m²`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const generateWhatsAppLink = (phone, propertyTitle, clientName = '', clientPhone = '') => {
  const message = `Hello! I'm interested in the property: ${propertyTitle}${clientName ? `\n\nMy info:\nName: ${clientName}` : ''}${clientPhone ? `\nPhone: ${clientPhone}` : ''}\n\nCould you give me more information?`;
  return `https://wa.me/52${phone}?text=${encodeURIComponent(message)}`;
};

export const getPropertyTypeIcon = (type) => {
  const icons = {
    house: '🏠',
    apartment: '🏢',
    store: '🏪',
    office: '🏢',
    land: '🌍',
    casa: '🏠',
    departamento: '🏢',
    local: '🏪',
    oficina: '🏢',
    terreno: '🌍'
  };
  return icons[type] || '🏠';
};