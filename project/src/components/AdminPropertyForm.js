import React, { useState, useEffect, useRef } from 'react';

const initialState = {
  title: '',
  type: '',
  operation: '',
  price: '',
  surface: '',
  bedrooms: '',
  bathrooms: '',
  parking: '',
  location: '',
  description: '',
  images: '',
  featured: false
};

export default function AdminPropertyForm({ open, onClose, onSave, property }) {
  const [form, setForm] = useState(initialState);
  const fileInputRef = useRef();
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    if (property) {
      setForm({ ...property, images: (property.images || []).join(', '), featured: !!property.featured });
    } else {
      setForm(initialState);
    }
  }, [property, open]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    const uploadedUrls = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) uploadedUrls.push(data.url);
    }
    setForm(f => ({ ...f, images: f.images ? f.images + ', ' + uploadedUrls.join(', ') : uploadedUrls.join(', ') }));
    setUploading(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      ...form,
      price: Number(form.price),
      surface: Number(form.surface),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      parking: Number(form.parking),
      images: form.images.split(',').map(s => s.trim()).filter(Boolean),
      featured: !!form.featured
    };
    if (!property) {
      data.createdAt = new Date().toISOString();
    }
    delete data.imageFiles;
    onSave(data);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg space-y-4 relative">
        <button type="button" onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
        <h2 className="text-xl font-bold mb-2">{property ? 'Editar' : 'Agregar'} Propiedad</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="border rounded p-2" required />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border rounded p-2"
            required
          >
            <option value="">Selecciona tipo de inmueble</option>
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
            <option value="local">Local</option>
            <option value="oficina">Oficina</option>
            <option value="terreno">Terreno</option>
            <option value="bodega">Bodega</option>
            <option value="otro">Otro</option>
          </select>
          <select
            name="operation"
            value={form.operation}
            onChange={handleChange}
            className="border rounded p-2"
            required
          >
            <option value="">Selecciona operación</option>
            <option value="venta">Venta</option>
            <option value="renta">Renta</option>
          </select>
          <input name="price" value={form.price} onChange={handleChange} placeholder="Precio" type="number" className="border rounded p-2" required />
          <input name="surface" value={form.surface} onChange={handleChange} placeholder="Superficie (m2)" type="number" className="border rounded p-2" />
          <input name="bedrooms" value={form.bedrooms} onChange={handleChange} placeholder="Recámaras" type="number" className="border rounded p-2" />
          <input name="bathrooms" value={form.bathrooms} onChange={handleChange} placeholder="Baños" type="number" className="border rounded p-2" />
          <input name="parking" value={form.parking} onChange={handleChange} placeholder="Estacionamientos" type="number" className="border rounded p-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación (dirección exacta)</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Ejemplo: Leona Vicario 950, Casa 11, San Mateo Atenco"
            className="border rounded p-2 w-full mb-2"
            autoComplete="off"
          />
          {form.location && (
            <div className="rounded-2xl overflow-hidden border border-blue-200 shadow mb-2">
              <iframe
                title="Mapa de ubicación"
                width="100%"
                height="220"
                style={{ border: 0, minWidth: '100%', minHeight: '220px' }}
                className="w-full h-[220px]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(form.location)}&output=embed`}
              ></iframe>
            </div>
          )}
          <div className="text-xs text-gray-500">Escribe la dirección y confirma visualmente en el mapa antes de guardar.</div>
        </div>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descripción" className="border rounded p-2 w-full" />
        <div className="flex items-center gap-2">
          <input type="checkbox" id="featured" name="featured" checked={!!form.featured} onChange={handleChange} />
          <label htmlFor="featured" className="text-sm">¿Propiedad destacada?</label>
        </div>
        <div className="flex flex-col gap-2">
          <input name="images" value={form.images} onChange={handleChange} placeholder="URLs de imágenes (separadas por coma)" className="border rounded p-2 w-full" />
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="px-3 py-2 rounded bg-gray-100 hover:bg-blue-100 text-blue-700 border border-blue-200"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              disabled={uploading}
            >
              {uploading ? 'Subiendo...' : 'Seleccionar Imágenes'}
            </button>
            <span className="text-xs text-gray-500">{form.images && form.images.split(',').length} seleccionada(s)</span>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancelar</button>
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Guardar</button>
        </div>
      </form>
    </div>
  );
}
