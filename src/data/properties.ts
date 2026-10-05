export interface Property {
  id: string;
  code: string;
  title: string;
  slug: string;
  tagline: string;
  region: 'RM' | 'V_REGION';
  regionName: string;
  comuna: string;
  sector: string;
  addressApprox: string;
  operation: 'Venta' | 'Arriendo' | 'Inversion';
  propertyType: 'Casa' | 'Penthouse' | 'Departamento' | 'Villa' | 'Parcela' | 'Terreno' | 'Local Comercial';
  condition?: 'Nueva' | 'Usada';
  priceUF: number;
  priceCLP: number;
  featured: boolean;
  badge?: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  storage: number;
  surfaceUseful: number;
  surfaceTotal: number;
  surfaceLand?: number;
  gastosComunesUF?: number;
  coordinates: {
    lat: string;
    lng: string;
  };
  images: string[];
  description: string;
  highlights: string[];
  amenities: string[];
  orientation: string;
  agent: {
    name: string;
    role: string;
    phone: string;
    email: string;
    avatar: string;
  };
}

export const UF_VALUE = 39450; // Valor UF referencial en CLP

export const PROPERTIES: Property[] = [
  {
    id: 'gwh0rgdi66fuhpx',
    code: 'BANA-RM-801',
    title: 'Penthouse Exclusivo Nueva Costanera',
    slug: 'penthouse-nueva-costanera-vitacura',
    tagline: 'Rooftop privado de 140 m² con vista panorámica a la Cordillera y Parque Bicentenario',
    region: 'RM',
    regionName: 'Región Metropolitana',
    comuna: 'Vitacura',
    sector: 'Nueva Costanera / Alonso de Córdova',
    addressApprox: 'Av. Nueva Costanera, Vitacura',
    operation: 'Venta',
    propertyType: 'Penthouse',
    priceUF: 26500,
    priceCLP: 26500 * UF_VALUE,
    featured: true,
    badge: 'DESTACADA',
    bedrooms: 4,
    bathrooms: 5,
    parking: 3,
    storage: 2,
    surfaceUseful: 285,
    surfaceTotal: 425,
    gastosComunesUF: 14.5,
    coordinates: {
      lat: '-33.3982° S',
      lng: '-70.5984° W',
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Impresionante Penthouse dúplex de autor situado en el eje gastronómico y cultural más sofisticado de Vitacura. Cuenta con ascensor directo a palier privado, doble altura en living-comedor, cocina italiana Poliform equipada con artefactos Miele, y un rooftop exclusivo con piscina temperada, zona de lounge y fogón exterior.',
    highlights: [
      'Doble altura de 4.8m con ventanales termopanel acústico',
      'Rooftop privado con deck de teka, piscina climatizada y quincho gourmet',
      'Dormitorio principal con doble walk-in closet y spa room',
      'Domótica integral Lutron para iluminación, climatización y audio'
    ],
    amenities: [
      'Piscina Privada',
      'Quincho Gourmet',
      'Ascensor Directo',
      'Seguridad 24/7',
      'Calefacción Losa Radiante',
      'Domótica Lutron',
      'Bodega Doble',
      'Gimnasio del Edificio'
    ],
    orientation: 'Nor-Oriente',
    agent: {
      name: 'Giovanna González',
      role: 'Directora & Broker Senior',
      phone: '+56 9 2380 7285',
      email: 'contacto@banapropiedades.cl',
      avatar: '/giovanna-gonzalez.png'
    }
  }
];

export const REGIONS = [
  { id: 'ALL', name: 'Todas las Regiones' },
  { id: 'RM', name: 'Región Metropolitana', comunas: ['Vitacura', 'Las Condes', 'Lo Barnechea', 'Providencia', 'Chicureo', 'La Reina'] },
  { id: 'V_REGION', name: 'Quinta Región Costa', comunas: ['Zapallar', 'Cachagua', 'Maitencillo', 'Concón', 'Viña del Mar', 'Reñaca'] }
];

export const COMUNAS = [
  'Todas las comunas',
  'Vitacura',
  'Las Condes',
  'Lo Barnechea',
  'Providencia',
  'Chicureo',
  'Zapallar',
  'Cachagua',
  'Maitencillo',
  'Concón',
  'Viña del Mar'
];

export const PROPERTY_TYPES = ['Todos los tipos', 'Casas', 'Parcelas', 'Terrenos', 'Departamentos', 'Locales Comerciales'];
export const PROPERTY_CONDITIONS = ['Todas', 'Nueva', 'Usada'];
