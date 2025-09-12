import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Home, Users, Eye, TrendingUp, Calendar, Bell, Settings, Edit, Trash2 } from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import AdminPropertyForm from '../components/AdminPropertyForm';

const API_URL = 'http://localhost:4000/properties';

const AdminPage = ({ adminUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProperty, setEditProperty] = useState(null);
  const [error, setError] = useState(null);

  // Fetch properties from backend
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

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleAdd = () => {
    setEditProperty(null);
    setShowForm(true);
  };

  const handleEdit = (property) => {
    setEditProperty(property);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas borrar esta propiedad?')) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchProperties();
  };

  const handleSave = async (data) => {
    if (editProperty) {
      await fetch(`${API_URL}/${editProperty.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    }
    setShowForm(false);
    setEditProperty(null);
    fetchProperties();
  };

  const totalProperties = properties.length;
  const forSale = properties.filter(p => p.operation === 'venta').length;
  const forRent = properties.filter(p => p.operation === 'renta').length;
  const totalViews = properties.reduce((sum, p) => sum + (p.views || 0), 0);
  const avgPrice = properties.length ? properties.reduce((sum, p) => sum + (p.price || 0), 0) / properties.length : 0;

  const stats = [
    {
      icon: Home,
      label: 'Total Propiedades',
      value: totalProperties,
      change: '+12%',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: TrendingUp,
      label: 'En Venta',
      value: forSale,
      change: '+8%',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Calendar,
      label: 'En Renta',
      value: forRent,
      change: '+15%',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Eye,
      label: 'Total Vistas',
      value: totalViews.toLocaleString(),
      change: '+23%',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const [recentActivities, setRecentActivities] = useState([]);

  // Fetch activities from backend
  const fetchActivities = async () => {
    try {
      const res = await fetch('http://localhost:4000/activities');
      const data = await res.json();
      setRecentActivities(data);
    } catch (e) {
      setRecentActivities([]);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [showForm, loading]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'properties', label: 'Propiedades', icon: Home },
    { id: 'agents', label: 'Agentes', icon: Users },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];
  // --- Gestión de usuarios/agentes ---
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState(null);
  const [userError, setUserError] = useState('');
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:4000/users');
      setUsers(await res.json());
    } catch {
      setUsers([]);
    }
  };
  useEffect(() => {
    if (activeTab === 'agents') fetchUsers();
  }, [activeTab]);
  const handleUserSave = async (data) => {
    setUserError('');
    try {
      if (userForm && userForm.id) {
        await fetch(`http://localhost:4000/users/${userForm.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
        });
      } else {
        await fetch('http://localhost:4000/users', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
        });
      }
      setUserForm(null);
      fetchUsers();
    } catch (e) { setUserError('Error al guardar usuario'); }
  };
  const handleUserDelete = async (id) => {
    if (!window.confirm('¿Eliminar este agente?')) return;
    await fetch(`http://localhost:4000/users/${id}`, { method: 'DELETE' });
    fetchUsers();
  };
            {activeTab === 'agents' && adminUser?.role === 'admin' && (
              <motion.div className="bg-white rounded-2xl shadow-lg p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Gestión de Agentes</h3>
                  <button onClick={() => setUserForm({})} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-200">Nuevo agente</button>
                </div>
                {userError && <div className="text-red-600 text-sm mb-2">{userError}</div>}
                <table className="w-full mb-4">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Usuario</th>
                      <th className="text-left py-2 px-2">Nombre</th>
                      <th className="text-left py-2 px-2">Rol</th>
                      <th className="text-left py-2 px-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2">{u.username}</td>
                        <td className="py-2 px-2">{u.name}</td>
                        <td className="py-2 px-2">{u.role}</td>
                        <td className="py-2 px-2 flex gap-2">
                          <button onClick={() => setUserForm(u)} className="p-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200">Editar</button>
                          <button onClick={() => handleUserDelete(u.id)} className="p-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {userForm && (
                  <form className="bg-gray-50 p-4 rounded-xl shadow-inner space-y-2 mb-4" onSubmit={e => { e.preventDefault(); handleUserSave(userForm); }}>
                    <div className="flex gap-2">
                      <input className="border rounded p-2 flex-1" placeholder="Usuario" value={userForm.username||''} onChange={e=>setUserForm(f=>({...f,username:e.target.value}))} required />
                      <input className="border rounded p-2 flex-1" placeholder="Nombre" value={userForm.name||''} onChange={e=>setUserForm(f=>({...f,name:e.target.value}))} required />
                    </div>
                    <div className="flex gap-2">
                      <input className="border rounded p-2 flex-1" placeholder="Contraseña" type="password" value={userForm.password||''} onChange={e=>setUserForm(f=>({...f,password:e.target.value}))} required={!userForm.id} />
                      <select className="border rounded p-2" value={userForm.role||'agent'} onChange={e=>setUserForm(f=>({...f,role:e.target.value}))}>
                        <option value="agent">Agente</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button type="button" className="px-3 py-1 bg-gray-200 rounded" onClick={()=>setUserForm(null)}>Cancelar</button>
                      <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Guardar</button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
        {/* Botón de logout visible en admin */}
        {adminUser && (
          <div className="fixed top-4 right-4 z-50">
            <button onClick={onLogout} className="px-4 py-2 bg-red-600 text-white rounded-xl font-semibold shadow hover:bg-red-700">Salir</button>
          </div>
        )}

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Panel Administrativo
          </h1>
          <p className="text-gray-600">
            Gestiona tus propiedades y monitorea el rendimiento de tu negocio
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            className="lg:w-64 bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </motion.div>

          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="bg-white rounded-2xl shadow-lg p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-green-600 text-sm font-medium">
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <motion.div
                    className="bg-white rounded-2xl shadow-lg p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Propiedades Más Vistas
                    </h3>
                    <div className="space-y-4">
                      {properties
                        .sort((a, b) => b.views - a.views)
                        .slice(0, 5)
                        .map((property, index) => (
                          <div key={property.id} className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 font-semibold">
                              #{index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 truncate">
                                {property.title}
                              </div>
                              <div className="text-sm text-gray-600">
                                {property.views} vistas
                              </div>
                            </div>
                            <div className="text-sm font-medium text-blue-600">
                              {formatPrice(property.price, property.operation)}
                            </div>
                          </div>
                        ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-white rounded-2xl shadow-lg p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Actividad Reciente
                      </h3>
                      <button
                        onClick={fetchActivities}
                        className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-200 transition-colors"
                        title="Recargar actividad"
                      >
                        Recargar
                      </button>
                    </div>
                    <div className="space-y-4">
                      {recentActivities.length === 0 && (
                        <div className="text-gray-400 text-sm">No hay actividad reciente.</div>
                      )}
                      {recentActivities.map((activity, index) => {
                        let color = 'bg-orange-500';
                        if (activity.type === 'new_property') color = 'bg-green-500';
                        if (activity.type === 'edit_property') color = 'bg-blue-500';
                        if (activity.type === 'delete_property') color = 'bg-red-500';
                        return (
                          <div key={index} className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${color}`} />
                            <div className="flex-1">
                              <div className="text-sm text-gray-900">
                                {activity.message}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {activity.timestamp ? new Date(activity.timestamp).toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' }) : ''}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {activeTab === 'properties' && (
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Gestión de Propiedades
                  </h3>
                  <motion.button
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdd}
                  >
                    Agregar Propiedad
                  </motion.button>
                </div>
                {error && <div className="text-red-500 mb-2">{error}</div>}
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Cargando propiedades...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Propiedad</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Ubicación</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Tipo</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Precio</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Vistas 👁️</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Fecha publicación</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Estado</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.slice(0, 20).map((property) => (
                          <tr key={property.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="font-medium text-gray-900 truncate max-w-xs">
                                {property.title}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-blue-600 font-semibold">
                              <span role="img" aria-label="ubicacion">📍</span> {property.location}
                            </td>
                            <td className="py-3 px-4 capitalize text-gray-600">
                              {property.type}
                            </td>
                            <td className="py-3 px-4 font-medium text-blue-600">
                              {formatPrice(property.price, property.operation)}
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              <span className="inline-flex items-center gap-1 font-semibold text-blue-700">
                                <Eye className="w-4 h-4 inline-block" />
                                {property.views || 0}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-xs text-gray-500">
                              {property.createdAt ? require('../utils/formatters').formatDate(property.createdAt) : '-'}
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                Activa
                              </span>
                            </td>
                            <td className="py-3 px-4 flex gap-2">
                              <button onClick={() => handleEdit(property)} className="p-2 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-700" title="Editar"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => handleDelete(property.id)} className="p-2 rounded bg-red-100 hover:bg-red-200 text-red-700" title="Borrar"><Trash2 className="w-4 h-4" /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <AdminPropertyForm open={showForm} onClose={() => { setShowForm(false); setEditProperty(null); }} onSave={handleSave} property={editProperty} />
              </motion.div>
            )}

            {activeTab === 'agents' && adminUser?.role === 'admin' && (
              <motion.div className="bg-white rounded-2xl shadow-lg p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Gestión de Agentes</h3>
                  <button onClick={() => setUserForm({})} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-200">Nuevo agente</button>
                </div>
                {userError && <div className="text-red-600 text-sm mb-2">{userError}</div>}
                <table className="w-full mb-4">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Usuario</th>
                      <th className="text-left py-2 px-2">Nombre</th>
                      <th className="text-left py-2 px-2">Rol</th>
                      <th className="text-left py-2 px-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2">{u.username}</td>
                        <td className="py-2 px-2">{u.name}</td>
                        <td className="py-2 px-2">{u.role}</td>
                        <td className="py-2 px-2 flex gap-2">
                          <button onClick={() => setUserForm(u)} className="p-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200">Editar</button>
                          <button onClick={() => handleUserDelete(u.id)} className="p-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {userForm && (
                  <form className="bg-gray-50 p-4 rounded-xl shadow-inner space-y-2 mb-4" onSubmit={e => { e.preventDefault(); handleUserSave(userForm); }}>
                    <div className="flex gap-2">
                      <input className="border rounded p-2 flex-1" placeholder="Usuario" value={userForm.username||''} onChange={e=>setUserForm(f=>({...f,username:e.target.value}))} required />
                      <input className="border rounded p-2 flex-1" placeholder="Nombre" value={userForm.name||''} onChange={e=>setUserForm(f=>({...f,name:e.target.value}))} required />
                    </div>
                    <div className="flex gap-2">
                      <input className="border rounded p-2 flex-1" placeholder="Contraseña" type="password" value={userForm.password||''} onChange={e=>setUserForm(f=>({...f,password:e.target.value}))} required={!userForm.id} />
                      <select className="border rounded p-2" value={userForm.role||'agent'} onChange={e=>setUserForm(f=>({...f,role:e.target.value}))}>
                        <option value="agent">Agente</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button type="button" className="px-3 py-1 bg-gray-200 rounded" onClick={()=>setUserForm(null)}>Cancelar</button>
                      <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Guardar</button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
            {activeTab !== 'dashboard' && activeTab !== 'properties' && activeTab !== 'agents' && (
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Sección en Desarrollo
                </h3>
                <p className="text-gray-600">
                  Esta funcionalidad estará disponible próximamente
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;