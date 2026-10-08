import { Property, UF_VALUE } from '../data/properties';

export const JETBROKERS_ORG_ID = '2YQ1H1Xv';
export const JETBROKERS_BROKER_ID = 'CplXtfnQ';
export const JETBROKERS_API_URL = 'https://api.jetbrokers.io/api/gallery';

export const JETBROKERS_ACTIVE_PROJECT_IDS = [
  'WaP1GdJU', // Guillermo Mann 1305 (Empresas Socovesa - Ñuñoa)
  'ZmG0Q5t6', // Optimus (Inmobiliaria Incoviba - Ñuñoa)
];

export interface JetModel {
  name: string;
  rooms: string;
  bathrooms: string;
  blueprintId?: string;
  discountRate?: number;
  discountRateMax?: number;
  discountRateMin?: number;
  facing?: string[];
  surfaceTotal?: string[];
  surfaceInterior?: string[];
  surfaceTerrace?: string[];
  surfaceLogia?: string[];
  surfaceGarden?: string[];
  priceBase?: number;
  priceFinal?: number;
  apartmentsAvailable?: number;
}

export interface JetFile {
  id: string;
  type: string;
  mime: string;
  details?: string | null;
}

export interface JetProjectRaw {
  name: string;
  slug: string;
  address: string;
  locality: string;
  perks: string[];
  perksNearby: string[];
  perksCommonAreas: string[];
  dateOfDelivery: string;
  yearOfDelivery: number;
  stage: string;
  description: string;
  gpsLat: string;
  gpsLon: string;
  coverId: string;
  developerName: string;
  developerCoverId?: string;
  apartmentFrom: number;
  apartmentTo: number;
  reserveCLP: string;
  brokerName?: string;
  brokerEmail?: string;
  brokerPhone?: string;
  brokerAvatarId?: string;
  organizationName?: string;
  organizationLogoId?: string;
  buildingCompany?: string;
  models: JetModel[];
  files: JetFile[];
  videoPresentationUrl?: string;
  fee?: string;
  installmentsPreEntrega?: number;
  [key: string]: any;
}

// -------------------------------------------------------------
// Image helper
// -------------------------------------------------------------
export const getJetImageUrl = (fileId: string, width?: number, height?: number): string => {
  if (!fileId) return '';
  if (width && height) {
    return `${JETBROKERS_API_URL}/download/${JETBROKERS_ORG_ID}/${fileId}/${width}/${height}`;
  }
  return `${JETBROKERS_API_URL}/download/${JETBROKERS_ORG_ID}/${fileId}`;
};

// -------------------------------------------------------------
// Fetch single project from JetBrokers API
// -------------------------------------------------------------
export const fetchJetProject = async (
  projectId: string,
  brokerId: string = JETBROKERS_BROKER_ID
): Promise<JetProjectRaw | null> => {
  try {
    const url = `${JETBROKERS_API_URL}/details/${JETBROKERS_ORG_ID}/${projectId}/${brokerId}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`JetBrokers API error (${res.status}) for project ${projectId}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error('Error fetching JetBrokers project:', err);
    return null;
  }
};

// -------------------------------------------------------------
// Map JetBrokers raw project to Baná Propiedades Property interface
// -------------------------------------------------------------
export const mapJetProjectToProperty = (
  raw: JetProjectRaw,
  projectId: string
): Property => {
  // Extract images from presentation and files
  const presentationFiles = (raw.files || [])
    .filter((f) => f.mime && f.mime.startsWith('image/'))
    .map((f) => getJetImageUrl(f.id));

  const coverUrl = raw.coverId ? getJetImageUrl(raw.coverId) : '';
  const images = coverUrl
    ? [coverUrl, ...presentationFiles.filter((img) => img !== coverUrl)]
    : presentationFiles;

  // Find min/max rooms and surface
  const validModels = raw.models || [];
  const rooms = validModels.map((m) => Number(m.rooms) || 0).filter((r) => r > 0);
  const baths = validModels.map((m) => Number(m.bathrooms) || 0).filter((b) => b > 0);
  const totals = validModels
    .flatMap((m) => m.surfaceTotal || [])
    .map(Number)
    .filter((n) => !isNaN(n) && n > 0);
  const interiors = validModels
    .flatMap((m) => m.surfaceInterior || [])
    .map(Number)
    .filter((n) => !isNaN(n) && n > 0);

  const minBedrooms = rooms.length > 0 ? Math.min(...rooms) : 1;
  const minBathrooms = baths.length > 0 ? Math.min(...baths) : 1;
  const surfaceUseful = interiors.length > 0 ? Math.min(...interiors) : 36;
  const surfaceTotal = totals.length > 0 ? Math.max(...totals) : 65;

  const priceUF = raw.apartmentFrom || 3000;
  const priceCLP = Math.round(priceUF * UF_VALUE);

  const highlights = [
    ...(raw.perks || []).slice(0, 3),
    raw.developerName ? `Desarrollado por ${raw.developerName}` : '',
    raw.installmentsPreEntrega ? `Hasta ${raw.installmentsPreEntrega} cuotas de pago` : '',
    raw.dateOfDelivery ? `Entrega: ${raw.dateOfDelivery}` : '',
  ].filter(Boolean);

  const amenities = [
    ...(raw.perksCommonAreas || []),
    ...(raw.perks || []),
  ].slice(0, 10);

  return {
    id: `jet-${projectId}`,
    code: `JB-${raw.locality ? raw.locality.substring(0, 3).toUpperCase() : 'PRO'}-${projectId.substring(0, 4).toUpperCase()}`,
    title: raw.name || 'Proyecto Inmobiliario',
    slug: raw.slug || `proyecto-${projectId.toLowerCase()}`,
    tagline: `Proyecto nuevo en ${raw.locality || 'Santiago'} por ${raw.developerName || 'Inmobiliaria'}. Desde ${Math.round(priceUF).toLocaleString('es-CL')} UF`,
    region: 'RM',
    regionName: 'Región Metropolitana',
    comuna: raw.locality || 'Ñuñoa',
    sector: raw.address || raw.locality || 'Ñuñoa',
    addressApprox: raw.address || 'Ubicación privilegiada',
    operation: 'Venta',
    propertyType: 'Departamento',
    condition: 'Nueva',
    priceUF: Math.round(priceUF),
    priceCLP,
    featured: true,
    badge: raw.stage === 'deliveryReady' ? 'ENTREGA INMEDIATA' : 'PROYECTO EN VERDE',
    bedrooms: minBedrooms,
    bathrooms: minBathrooms,
    parking: 1,
    storage: 1,
    surfaceUseful: Math.round(surfaceUseful),
    surfaceTotal: Math.round(surfaceTotal),
    coordinates: {
      lat: raw.gpsLat ? `${raw.gpsLat}° S` : '-33.4569° S',
      lng: raw.gpsLon ? `${raw.gpsLon}° W` : '-70.6483° W',
    },
    images: images.length > 0 ? images : [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80'
    ],
    description: raw.description || `${raw.name} es un nuevo desarrollo residencial ubicado en ${raw.locality}.`,
    highlights,
    amenities,
    orientation: 'Nor-Oriente',
    agent: {
      name: raw.brokerName || 'Giovanna González',
      role: 'Directora & Asesora Inmobiliaria',
      phone: raw.brokerPhone ? `+56 ${raw.brokerPhone}` : '+56 9 2380 7285',
      email: raw.brokerEmail || 'contacto@banapropiedades.cl',
      avatar: raw.brokerAvatarId
        ? getJetImageUrl(raw.brokerAvatarId)
        : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
  };
};

// -------------------------------------------------------------
// Fetch all active JetBrokers projects for Baná Propiedades
// -------------------------------------------------------------
export const fetchAllJetProjects = async (): Promise<Property[]> => {
  try {
    const promises = JETBROKERS_ACTIVE_PROJECT_IDS.map(async (id) => {
      const raw = await fetchJetProject(id);
      if (!raw) return null;
      return mapJetProjectToProperty(raw, id);
    });

    const results = await Promise.all(promises);
    return results.filter((p): p is Property => p !== null);
  } catch (err) {
    console.error('Error fetching all JetBrokers projects:', err);
    return [];
  }
};

// -------------------------------------------------------------
// Send Lead directly to JetBrokers Customer API
// -------------------------------------------------------------
export interface JetLeadPayload {
  fullName: string;
  email?: string;
  mobile?: string;
  taxId?: string; // RUT
  comments?: string;
  campaign?: string; // Project title or campaign
  origin?: string;
  marketSegment?: string;
  assignedTo?: string; // Broker id or email
  referredBy?: string;
  tags?: string;
}

export const sendLeadToJetBrokers = async (
  lead: JetLeadPayload
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const payload = {
      fullName: lead.fullName.trim(),
      email: lead.email ? lead.email.trim() : undefined,
      mobile: lead.mobile ? lead.mobile.trim() : undefined,
      taxId: lead.taxId ? lead.taxId.trim() : undefined,
      comments: lead.comments ? lead.comments.trim() : undefined,
      campaign: lead.campaign || 'Web Baná Propiedades',
      origin: lead.origin || 'Sitio Web Baná Propiedades',
      assignedTo: lead.assignedTo || JETBROKERS_BROKER_ID,
      referredBy: lead.referredBy || 'Web Directa',
      tags: lead.tags || 'web,inversion,interesado',
    };

    const res = await fetch(`${JETBROKERS_API_URL}/customer/${JETBROKERS_ORG_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.warn('JetBrokers Customer API response:', res.status, err);
      return { success: false, error: err.message || 'Error al enviar lead a JetBrokers' };
    }

    const data = await res.json().catch(() => ({}));
    return { success: true, data };
  } catch (err: any) {
    console.error('Error in sendLeadToJetBrokers:', err);
    return { success: false, error: err.message || 'Error de conexión con JetBrokers' };
  }
};
