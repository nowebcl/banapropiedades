import { Property, PROPERTIES } from '../data/properties';
import { sendLeadToJetBrokers } from './jetbrokers';

export const POCKETBASE_URL = 'https://bana.noweb.cl';

const TOKEN_KEY = 'bana_admin_pb_token';
const USER_KEY = 'bana_admin_pb_user';

export interface MessageRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  propertyCode?: string;
  propertyTitle?: string;
  subject?: string;
  message: string;
  status?: 'unread' | 'read' | 'archived';
  source?: string;
  created: string;
}

// -------------------------------------------------------------
// Authentication
// -------------------------------------------------------------
export const getAdminToken = (): string | null => {
  return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
};

export const isAdminAuthenticated = (): boolean => {
  return !!getAdminToken();
};

export const loginAdmin = async (identity: string, password: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const res = await fetch(`${POCKETBASE_URL}/api/collections/_superusers/auth-with-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity: identity.trim(), password }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return {
        success: false,
        error: errData.message || 'Credenciales inválidas. Verifica tu correo y contraseña.',
      };
    }

    const data = await res.json();
    if (data.token) {
      sessionStorage.setItem(TOKEN_KEY, data.token);
      sessionStorage.setItem(USER_KEY, JSON.stringify(data.record || {}));
      return { success: true };
    }

    return { success: false, error: 'No se recibió token de sesión.' };
  } catch (err: any) {
    return {
      success: false,
      error: 'Error de conexión con el servidor de base de datos.',
    };
  }
};

export const logoutAdmin = (): void => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// -------------------------------------------------------------
// Property Mapping Helpers
// -------------------------------------------------------------
const mapRecordToProperty = (rec: any): Property => {
  return {
    id: rec.id,
    code: rec.code || `BANA-${rec.id.substring(0, 4).toUpperCase()}`,
    title: rec.title || 'Propiedad sin título',
    slug: rec.slug || (rec.title || 'propiedad').toLowerCase().replace(/\s+/g, '-'),
    tagline: rec.tagline || '',
    region: (rec.region as any) || 'RM',
    regionName: rec.regionName || (rec.region === 'V_REGION' ? 'Quinta Región' : 'Región Metropolitana'),
    comuna: rec.comuna || 'Santiago',
    sector: rec.sector || '',
    addressApprox: rec.addressApprox || '',
    operation: (rec.operation as any) || 'Venta',
    propertyType: (rec.propertyType as any) || 'Casa',
    condition: (rec.condition as any) || 'Usada',
    priceUF: Number(rec.priceUF) || 0,
    priceCLP: Number(rec.priceCLP) || (Number(rec.priceUF) || 0) * 39450,
    featured: Boolean(rec.featured),
    badge: rec.badge || '',
    bedrooms: Number(rec.bedrooms) || 0,
    bathrooms: Number(rec.bathrooms) || 0,
    parking: Number(rec.parking) || 0,
    storage: Number(rec.storage) || 0,
    surfaceUseful: Number(rec.surfaceUseful) || 0,
    surfaceTotal: Number(rec.surfaceTotal) || 0,
    surfaceLand: Number(rec.surfaceLand) || 0,
    gastosComunesUF: Number(rec.gastosComunesUF) || 0,
    coordinates: typeof rec.coordinates === 'object' && rec.coordinates !== null ? rec.coordinates : { lat: '-33.401', lng: '-70.589' },
    images: Array.isArray(rec.images) && rec.images.length > 0 ? rec.images : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
    description: rec.description || '',
    highlights: Array.isArray(rec.highlights) ? rec.highlights : [],
    amenities: Array.isArray(rec.amenities) ? rec.amenities : [],
    orientation: rec.orientation || 'Nor-Oriente',
    agent: typeof rec.agent === 'object' && rec.agent !== null ? rec.agent : {
      name: 'Giovanna González',
      role: 'Directora & Broker Senior',
      phone: '+56 9 2380 7285',
      email: 'contacto@banapropiedades.cl',
      avatar: '/giovanna-gonzalez.png'
    },
  };
};

// -------------------------------------------------------------
// Properties CRUD
// -------------------------------------------------------------
export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const res = await fetch(`${POCKETBASE_URL}/api/collections/properties/records?page=1&perPage=100&sort=-created`);
    if (!res.ok) {
      console.warn('PocketBase fetch failed, using fallback properties');
      return PROPERTIES;
    }
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      return data.items.map(mapRecordToProperty);
    }
    return PROPERTIES;
  } catch (err) {
    console.warn('Network error fetching properties, using fallback:', err);
    return PROPERTIES;
  }
};

export const createProperty = async (property: Partial<Property>): Promise<{ success: boolean; data?: Property; error?: string }> => {
  const token = getAdminToken();
  if (!token) return { success: false, error: 'No autorizado. Inicia sesión como administrador.' };

  try {
    const payload = {
      code: property.code || `BANA-${Date.now().toString().slice(-4)}`,
      title: property.title || 'Nueva Propiedad',
      slug: property.slug || (property.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: property.tagline || '',
      region: property.region || 'RM',
      regionName: property.regionName || (property.region === 'V_REGION' ? 'Quinta Región' : 'Región Metropolitana'),
      comuna: property.comuna || 'Vitacura',
      sector: property.sector || '',
      addressApprox: property.addressApprox || '',
      operation: property.operation || 'Venta',
      propertyType: property.propertyType || 'Casa',
      condition: property.condition || 'Usada',
      priceUF: Number(property.priceUF) || 0,
      priceCLP: Number(property.priceCLP) || (Number(property.priceUF) || 0) * 39450,
      featured: Boolean(property.featured),
      badge: property.badge || '',
      bedrooms: Number(property.bedrooms) || 0,
      bathrooms: Number(property.bathrooms) || 0,
      parking: Number(property.parking) || 0,
      storage: Number(property.storage) || 0,
      surfaceUseful: Number(property.surfaceUseful) || 0,
      surfaceTotal: Number(property.surfaceTotal) || 0,
      surfaceLand: Number(property.surfaceLand) || 0,
      gastosComunesUF: Number(property.gastosComunesUF) || 0,
      orientation: property.orientation || '',
      coordinates: property.coordinates || { lat: '-33.40', lng: '-70.58' },
      images: property.images && property.images.length > 0 ? property.images : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
      description: property.description || '',
      highlights: property.highlights || [],
      amenities: property.amenities || [],
      agent: property.agent || {
        name: 'Giovanna González',
        role: 'Directora & Broker Senior',
        phone: '+56 9 2380 7285',
        email: 'contacto@banapropiedades.cl',
        avatar: '/giovanna-gonzalez.png'
      }
    };

    const res = await fetch(`${POCKETBASE_URL}/api/collections/properties/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, error: err.message || 'Error al crear la propiedad en PocketBase.' };
    }

    const createdRec = await res.json();
    return { success: true, data: mapRecordToProperty(createdRec) };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error de conexión.' };
  }
};

export const updateProperty = async (id: string, property: Partial<Property>): Promise<{ success: boolean; data?: Property; error?: string }> => {
  const token = getAdminToken();
  if (!token) return { success: false, error: 'No autorizado. Inicia sesión como administrador.' };

  try {
    const payload: any = { ...property };
    if (payload.priceUF && !payload.priceCLP) {
      payload.priceCLP = payload.priceUF * 39450;
    }

    const res = await fetch(`${POCKETBASE_URL}/api/collections/properties/records/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, error: err.message || 'Error al actualizar la propiedad.' };
    }

    const updatedRec = await res.json();
    return { success: true, data: mapRecordToProperty(updatedRec) };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error de conexión.' };
  }
};

export const deleteProperty = async (id: string): Promise<{ success: boolean; error?: string }> => {
  const token = getAdminToken();
  if (!token) return { success: false, error: 'No autorizado. Inicia sesión como administrador.' };

  try {
    const res = await fetch(`${POCKETBASE_URL}/api/collections/properties/records/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': token },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, error: err.message || 'Error al eliminar la propiedad.' };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error de conexión.' };
  }
};

// -------------------------------------------------------------
// Messages CRUD
// -------------------------------------------------------------
export const sendContactMessage = async (msg: {
  name: string;
  email: string;
  phone?: string;
  propertyCode?: string;
  propertyTitle?: string;
  subject?: string;
  message: string;
  source?: string;
}): Promise<{ success: boolean; error?: string }> => {
  try {
    const res = await fetch(`${POCKETBASE_URL}/api/collections/messages/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...msg,
        status: 'unread',
        source: msg.source || 'web_contact',
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, error: err.message || 'No se pudo registrar el mensaje.' };
    }

    // Despachar en paralelo al CRM de JetBrokers
    sendLeadToJetBrokers({
      fullName: msg.name,
      email: msg.email,
      mobile: msg.phone,
      campaign: msg.propertyTitle ? `${msg.propertyTitle} (${msg.propertyCode})` : (msg.subject || 'Web Baná'),
      comments: msg.message + (msg.propertyCode ? ` [Código: ${msg.propertyCode}]` : ''),
      origin: 'Sitio Web Baná Propiedades',
    }).catch((e) => console.warn('JetBrokers lead dispatch error:', e));

    return { success: true };
  } catch (err: any) {
    return { success: false, error: 'Error de red al enviar el mensaje.' };
  }
};

export const fetchMessages = async (): Promise<MessageRecord[]> => {
  const token = getAdminToken();
  if (!token) return [];

  try {
    const res = await fetch(`${POCKETBASE_URL}/api/collections/messages/records?page=1&perPage=100&sort=-created`, {
      headers: { 'Authorization': token },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.error('Error fetching messages:', err);
    return [];
  }
};

export const updateMessageStatus = async (id: string, status: 'unread' | 'read' | 'archived'): Promise<boolean> => {
  const token = getAdminToken();
  if (!token) return false;

  try {
    const res = await fetch(`${POCKETBASE_URL}/api/collections/messages/records/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ status }),
    });

    return res.ok;
  } catch {
    return false;
  }
};

export const deleteMessage = async (id: string): Promise<boolean> => {
  const token = getAdminToken();
  if (!token) return false;

  try {
    const res = await fetch(`${POCKETBASE_URL}/api/collections/messages/records/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': token },
    });

    return res.ok;
  } catch {
    return false;
  }
};

// -------------------------------------------------------------
// Media & File Upload
// -------------------------------------------------------------
export const uploadMediaFile = async (
  file: File
): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const token = getAdminToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = token;
    }

    const res = await fetch(`${POCKETBASE_URL}/api/collections/media/records`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = err.data?.file?.message || err.message || 'Error al subir la imagen al servidor.';
      return { success: false, error: msg };
    }

    const data = await res.json();
    const publicUrl = `${POCKETBASE_URL}/api/files/${data.collectionId}/${data.id}/${data.file}`;
    return { success: true, url: publicUrl };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error de conexión al subir la imagen.' };
  }
};

