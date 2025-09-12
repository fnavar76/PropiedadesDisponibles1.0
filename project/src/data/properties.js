export const properties = [
  {
    id: '1',
    title: 'Casa Moderna en Polanco',
    type: 'casa',
    operation: 'venta',
    price: 8500000,
    surface: 280,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    location: 'Polanco, CDMX',
    description: 'Hermosa casa moderna con acabados de lujo, jardín privado y ubicación privilegiada en una de las mejores zonas de la ciudad.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
    ],
    featured: true,
    views: 245,
    createdAt: '2025-01-15'
  },
  {
    id: '2',
    title: 'Departamento Ejecutivo Roma Norte',
    type: 'departamento',
    operation: 'renta',
    price: 25000,
    surface: 120,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    location: 'Roma Norte, CDMX',
    description: 'Departamento completamente amueblado en edificio boutique, ideal para ejecutivos. Incluye gimnasio y roof garden.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    featured: false,
    views: 189,
    createdAt: '2025-01-14'
  },
  {
    id: '3',
    title: 'Local Comercial Zona Rosa',
    type: 'local',
    operation: 'renta',
    price: 45000,
    surface: 85,
    bedrooms: 0,
    bathrooms: 2,
    parking: 0,
    location: 'Zona Rosa, CDMX',
    description: 'Local comercial en planta baja con excelente ubicación, perfecto para restaurante o boutique. Alto flujo peatonal.',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'
    ],
    featured: false,
    views: 156,
    createdAt: '2025-01-13'
  },
  {
    id: '4',
    title: 'Penthouse Condesa',
    type: 'departamento',
    operation: 'venta',
    price: 12000000,
    surface: 180,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    location: 'Condesa, CDMX',
    description: 'Espectacular penthouse con terraza privada de 60m², vista panorámica y acabados premium. Edificio con amenidades completas.',
    images: [
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    featured: true,
    views: 312,
    createdAt: '2025-01-12'
  },
  {
    id: '5',
    title: 'Casa Familiar Satelite',
    type: 'casa',
    operation: 'venta',
    price: 4200000,
    surface: 220,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    location: 'Ciudad Satélite, Edo. México',
    description: 'Casa familiar en fraccionamiento privado con seguridad 24/7, jardín amplio y cerca de escuelas y centros comerciales.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
    ],
    featured: false,
    views: 98,
    createdAt: '2025-01-11'
  },
  {
    id: '6',
    title: 'Oficina Corporativa Santa Fe',
    type: 'oficina',
    operation: 'renta',
    price: 35000,
    surface: 150,
    bedrooms: 0,
    bathrooms: 2,
    parking: 3,
    location: 'Santa Fe, CDMX',
    description: 'Oficina en torre corporativa clase A+, completamente equipada con mobiliario moderno y tecnología de punta.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    ],
    featured: false,
    views: 167,
    createdAt: '2025-01-10'
  }
];

export const propertyTypes = [
  { value: 'casa', label: 'Casa' },
  { value: 'departamento', label: 'Departamento' },
  { value: 'local', label: 'Local Comercial' },
  { value: 'oficina', label: 'Oficina' },
  { value: 'terreno', label: 'Terreno' }
];

export const operations = [
  { value: 'venta', label: 'Venta' },
  { value: 'renta', label: 'Renta' }
];