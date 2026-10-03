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
    id: 'prop-01',
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
      name: 'Camila Montes Baná',
      role: 'Directora Asociada RM',
      phone: '+56 9 8452 9100',
      email: 'camila@banapropiedades.cl',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prop-02',
    code: 'BANA-V-402',
    title: 'Villa Primera Línea Beranda',
    slug: 'villa-beranda-zapallar-cachagua',
    tagline: 'Arquitectura bioclimática sobre acantilado con acceso privado a la caleta y al mar',
    region: 'V_REGION',
    regionName: 'Quinta Región',
    comuna: 'Zapallar',
    sector: 'Beranda / Cachagua',
    addressApprox: 'Camino Beranda, Zapallar',
    operation: 'Venta',
    propertyType: 'Villa',
    priceUF: 38000,
    priceCLP: 38000 * UF_VALUE,
    featured: true,
    badge: 'PRIMERA LÍNEA',
    bedrooms: 6,
    bathrooms: 7,
    parking: 5,
    storage: 2,
    surfaceUseful: 520,
    surfaceTotal: 680,
    surfaceLand: 2400,
    coordinates: {
      lat: '-32.5539° S',
      lng: '-71.4589° W',
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Majestuosa propiedad costera diseñada en hormigón visto, piedra local y maderas nobles. Emplazada en el exclusivo sector de Beranda, ofrece una vista ininterrumpida de 270 grados al Océano Pacífico, piscina infinity desbordante hacia el rompiente, jardines xerófitos nativos y terrazas protegidas del viento.',
    highlights: [
      'Vista oceánica infinita sin interferencias visuales',
      'Piscina sinfín temperada sobre el acantilado',
      'Master suite independiente con terraza privada y sauna seco',
      'Sendero privado con acceso directo a roqueríos y playa'
    ],
    amenities: [
      'Piscina Infinity',
      'Acceso a Playa',
      'Sauna & Spa',
      'Cava Subterránea',
      'Casa de Huéspedes',
      'Generador Autónomo',
      'Calefacción Geotérmica',
      'Seguridad Perimetral'
    ],
    orientation: 'Poniente / Nor-Poniente',
    agent: {
      name: 'Matías Baná Larraín',
      role: 'Socio Director V Región',
      phone: '+56 9 9123 4872',
      email: 'matias@banapropiedades.cl',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prop-03',
    code: 'BANA-RM-915',
    title: 'Residencia Moderna San Damián',
    slug: 'residencia-moderna-san-damian-las-condes',
    tagline: 'Casa estilo minimalista contemporáneo en parcela consolidada con parque privado',
    region: 'RM',
    regionName: 'Región Metropolitana',
    comuna: 'Las Condes',
    sector: 'San Damián / Quinchamalí',
    addressApprox: 'Av. San Damián, Las Condes',
    operation: 'Venta',
    propertyType: 'Casa',
    priceUF: 34900,
    priceCLP: 34900 * UF_VALUE,
    featured: true,
    badge: 'NUEVA EN MERCADO',
    bedrooms: 5,
    bathrooms: 6,
    parking: 4,
    storage: 3,
    surfaceUseful: 490,
    surfaceTotal: 620,
    surfaceLand: 1850,
    coordinates: {
      lat: '-33.3768° S',
      lng: '-70.5281° W',
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Arquitectura vanguardista firmada por connotado estudio chileno. Grandes volúmenes flotantes integrados a un paisajismo frondoso con árboles añosos. Espacios interiores con pisos de roble europeo, ventanales de piso a cielo con rotura de puente térmico y sistema de climatización VRV inverter de máxima eficiencia.',
    highlights: [
      'Terreno plano de 1.850 m² con paisajismo consolidado y riego automático',
      'Pabellón de quincho techado cerrado con paneles vidriados móviles',
      'Gimnasio climatizado con vista al jardín y sala de cine integrada',
      'Dormitorio de servicio doble con baño y logia ampliada'
    ],
    amenities: [
      'Parque Privado',
      'Piscina con Deck',
      'Quincho Panorámico',
      'Sala de Cine',
      'Gimnasio',
      'Calefacción Central VRV',
      'Sistema de Cámaras AI',
      'Estacionamiento Subterráneo'
    ],
    orientation: 'Norte',
    agent: {
      name: 'Camila Montes Baná',
      role: 'Directora Asociada RM',
      phone: '+56 9 8452 9100',
      email: 'camila@banapropiedades.cl',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prop-04',
    code: 'BANA-V-210',
    title: 'Penthouse Costa de Montemar',
    slug: 'penthouse-costa-montemar-concon',
    tagline: 'Terraza perimetral con jacuzzi privado sobre el campo dunar y el Pacífico',
    region: 'V_REGION',
    regionName: 'Quinta Región',
    comuna: 'Concón',
    sector: 'Costa de Montemar',
    addressApprox: 'Av. Las Golondrinas, Concón',
    operation: 'Venta',
    propertyType: 'Penthouse',
    priceUF: 12800,
    priceCLP: 12800 * UF_VALUE,
    featured: false,
    badge: 'VISTA AL MAR',
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    storage: 1,
    surfaceUseful: 165,
    surfaceTotal: 240,
    gastosComunesUF: 6.8,
    coordinates: {
      lat: '-32.9341° S',
      lng: '-71.5392° W',
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Exclusivo penthouse ubicado en la cima de Costa de Montemar en Concón. Diseñado para maximizar la entrada de luz natural y disfrutar de las puestas de sol sobre la bahía. Amplio living comedor con cocina integrada tipo americana con cubierta de cuarzo y terraza panorámica con cierre de cristal plegable.',
    highlights: [
      'Terraza panorámica de 75 m² con jacuzzi exterior',
      'Cierre de cristal Glasstec para uso todo el año',
      'A minutos de la playa La Boca, clubes deportivos y polo gastronómico',
      'Edificio de solo 18 unidades con piscina temperada y conserjería 24/7'
    ],
    amenities: [
      'Jacuzzi en Terraza',
      'Vista al Mar',
      'Piscina Temperada',
      'Quincho Equipado',
      'Estacionamiento Techado',
      'Conserjería 24/7',
      'Gimnasio',
      'Bicicletero'
    ],
    orientation: 'Nor-Poniente',
    agent: {
      name: 'Matías Baná Larraín',
      role: 'Socio Director V Región',
      phone: '+56 9 9123 4872',
      email: 'matias@banapropiedades.cl',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prop-05',
    code: 'BANA-RM-530',
    title: 'Casa Los Trapenses con Vista a Los Andes',
    slug: 'casa-los-trapenses-lo-barnechea',
    tagline: 'Privilegiada arquitectura en desniveles rodeada de naturaleza y máxima seguridad',
    region: 'RM',
    regionName: 'Región Metropolitana',
    comuna: 'Lo Barnechea',
    sector: 'Los Trapenses / Los Quillayes',
    addressApprox: 'Av. El Golf de Manquehue, Lo Barnechea',
    operation: 'Venta',
    propertyType: 'Casa',
    priceUF: 29800,
    priceCLP: 29800 * UF_VALUE,
    featured: false,
    badge: 'EXCLUSIVIDAD',
    bedrooms: 5,
    bathrooms: 5,
    parking: 4,
    storage: 2,
    surfaceUseful: 420,
    surfaceTotal: 530,
    surfaceLand: 1400,
    coordinates: {
      lat: '-33.3421° S',
      lng: '-70.5218° W',
    },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Residencia familiar de alto estándar en exclusivo condominio cerrado de Los Trapenses. Cuenta con amplios recibos independientes, cocina con isla central y comedor de diario, sala de estar familiar, piscina con reja retráctil y quincho rústico moderno con horno a leña.',
    highlights: [
      'Condominio cerrado con control de acceso y patrullaje permanente',
      'Cercana a colegios Everest, Santiago College y Craighouse',
      'Piscina con bomba de calor y jardín diseñado por paisajista',
      'Termopanel en toda la casa y caldera a gas de condensación'
    ],
    amenities: [
      'Condominio Cerrado',
      'Piscina Climatizada',
      'Quincho con Horno a Leña',
      'Sala de Juegos',
      'Losa Radiante',
      'Estacionamiento de Visitas',
      'Bodega de Vinos',
      'Portón Eléctrico'
    ],
    orientation: 'Nor-Oriente',
    agent: {
      name: 'Camila Montes Baná',
      role: 'Directora Asociada RM',
      phone: '+56 9 8452 9100',
      email: 'camila@banapropiedades.cl',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prop-06',
    code: 'BANA-V-740',
    title: 'Refugio de Playa en Maitencillo Norte',
    slug: 'refugio-playa-maitencillo-puchuncavi',
    tagline: 'Casa en bosque de pinos a 400m de la playa con arquitectura cálida en ciprés',
    region: 'V_REGION',
    regionName: 'Quinta Región',
    comuna: 'Puchuncaví',
    sector: 'Maitencillo / Aguas Blancas',
    addressApprox: 'Av. del Mar, Maitencillo',
    operation: 'Venta',
    propertyType: 'Casa',
    priceUF: 15500,
    priceCLP: 15500 * UF_VALUE,
    featured: false,
    badge: 'PLAYA & BOSQUE',
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    storage: 1,
    surfaceUseful: 210,
    surfaceTotal: 310,
    surfaceLand: 1100,
    coordinates: {
      lat: '-32.6510° S',
      lng: '-71.4312° W',
    },
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Encantadora casa costera rodeada de bosque nativo y a pasos de Playa Aguas Blancas. Estructura de vigas a la vista en pino oregón y ciprés, chimenea de piedra volcánica en living, tina caliente (hot tub) exterior para 8 personas y gran terraza con fogón.',
    highlights: [
      'Hot tub nórdico de madera con calefactor a leña',
      'Terraza perimetral con vistas al bosque y sonido del mar',
      'Excelente rentabilidad en arriendos temporales y vacacionales',
      'Pozo de agua propio más conexión a red sanitaria'
    ],
    amenities: [
      'Hot Tub / Tina Caliente',
      'Fogón Exterior',
      'Chimenea Tradicional',
      'Cocina Abierta Integrada',
      'Bodega para Tablas y Bicicletas',
      'Riego Automático',
      'Alarma Monitoreada',
      'Estacionamiento Múltiple'
    ],
    orientation: 'Poniente',
    agent: {
      name: 'Matías Baná Larraín',
      role: 'Socio Director V Región',
      phone: '+56 9 9123 4872',
      email: 'matias@banapropiedades.cl',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prop-07',
    code: 'BANA-RM-304',
    title: 'Departamento Parque Bicentenario',
    slug: 'departamento-parque-bicentenario-vitacura',
    tagline: 'Frente al parque más emblemático de la capital con terraza vidriada y terminaciones premium',
    region: 'RM',
    regionName: 'Región Metropolitana',
    comuna: 'Vitacura',
    sector: 'Parque Bicentenario',
    addressApprox: 'Av. Bicentenario, Vitacura',
    operation: 'Arriendo',
    propertyType: 'Departamento',
    priceUF: 110, // UF/mes
    priceCLP: 110 * UF_VALUE,
    featured: false,
    badge: 'ARRIENDO PRIME',
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    storage: 1,
    surfaceUseful: 155,
    surfaceTotal: 185,
    gastosComunesUF: 7.2,
    coordinates: {
      lat: '-33.3995° S',
      lng: '-70.6050° W',
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Impecable departamento con vista despejada en primera línea al Parque Bicentenario. Luminoso, con amplios ventanales de suelo a techo, cocina equipada con artefactos empotrados Franke, logia independiente y suite principal con terraza privada.',
    highlights: [
      'Vista despejada perpetua a las áreas verdes del Parque Bicentenario',
      'Edificio boutique de baja densidad con seguridad 24/7 y piscina',
      'A pasos de restaurantes, galerías de arte y centros financieros',
      'Incluye 2 estacionamientos subterráneos y bodega amplia'
    ],
    amenities: [
      'Vista al Parque',
      'Piscina',
      'Sala de Eventos',
      'Gimnasio',
      'Conserjería 24/7',
      'Calefacción Central',
      'Estacionamiento de Visitas',
      'Bicicletero Cerrado'
    ],
    orientation: 'Norte',
    agent: {
      name: 'Camila Montes Baná',
      role: 'Directora Asociada RM',
      phone: '+56 9 8452 9100',
      email: 'camila@banapropiedades.cl',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prop-08',
    code: 'BANA-V-118',
    title: 'Residencia en Acantilado Cochoa',
    slug: 'residencia-cochoa-vina-del-mar',
    tagline: 'Frente a las olas de Reñaca con bajada peatonal y terraza en voladizo',
    region: 'V_REGION',
    regionName: 'Quinta Región',
    comuna: 'Viña del Mar',
    sector: 'Cochoa / Reñaca',
    addressApprox: 'Av. Borgoño, Reñaca',
    operation: 'Venta',
    propertyType: 'Departamento',
    priceUF: 9400,
    priceCLP: 9400 * UF_VALUE,
    featured: false,
    badge: 'FRENTE AL MAR',
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    storage: 1,
    surfaceUseful: 125,
    surfaceTotal: 160,
    gastosComunesUF: 5.5,
    coordinates: {
      lat: '-32.9680° S',
      lng: '-71.5510° W',
    },
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Departamento remodelado con diseño náutico refinado y vista insuperable al oleaje de Cochoa. Terraza panorámica con barandas de cristal templado, pisos de porcelanato rectificado, cocina americana con barra de cuarzo blanco y suite con vista al horizonte.',
    highlights: [
      'Sonido del mar constante y vistas panorámicas a la puesta de sol',
      'Ubicación privilegiada en la mejor costanera gastronómica de la Quinta Región',
      'Alta demanda de arriendo temporal con ROI proyectado del 7.8% anual',
      'Edificio con funicular, piscina sobre el mar y acceso controlado'
    ],
    amenities: [
      'Frente al Mar',
      'Piscina Oceánica',
      'Funicular / Ascensor Inclinado',
      'Seguridad 24 Horas',
      'Estacionamiento Techado',
      'Terraza Panorámica',
      'Lavandería',
      'Bodega Náutica'
    ],
    orientation: 'Poniente',
    agent: {
      name: 'Matías Baná Larraín',
      role: 'Socio Director V Región',
      phone: '+56 9 9123 4872',
      email: 'matias@banapropiedades.cl',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prop-07',
    code: 'BANA-PAR-101',
    title: 'Parcela de Agrado Valle Escondido',
    slug: 'parcela-agrado-valle-escondido-chicureo',
    tagline: '5.000 m² planos con rol propio, empalme de agua potable y luz soterrada',
    region: 'RM',
    regionName: 'Región Metropolitana',
    comuna: 'Chicureo',
    sector: 'Chamisero / Piedra Roja',
    addressApprox: 'Camino Chicureo, Colina',
    operation: 'Venta',
    propertyType: 'Parcela',
    condition: 'Nueva',
    priceUF: 8900,
    priceCLP: 8900 * UF_VALUE,
    featured: true,
    badge: 'OPORTUNIDAD',
    bedrooms: 0,
    bathrooms: 0,
    parking: 4,
    storage: 0,
    surfaceUseful: 0,
    surfaceTotal: 5000,
    surfaceLand: 5000,
    coordinates: {
      lat: '-33.2847° S',
      lng: '-70.6841° W',
    },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Extraordinaria parcela de agrado de 5.000 m² 100% plana en condominio cerrado con seguridad 24/7. Cuenta con rol individual, factibilidad aprobada e instalación de agua y electricidad. Ideal para proyecto de vivienda llave en mano con LCE Construcciones.',
    highlights: [
      'Terreno 100% plano sin pendientes complejas',
      'Rol propio listo para escriturar inmediatamente',
      'Alianza LCE Construcciones para diseño de casa a medida',
      'Excelente conectividad por autopista Nororiente a Vitacura en 15 min'
    ],
    amenities: [
      'Condominio Cerrado',
      'Seguridad 24/7',
      'Agua Potable',
      'Luz Soterrada',
      'Caminos Asfaltados',
      'Portón Eléctrico'
    ],
    orientation: 'Nor-Oriente',
    agent: {
      name: 'Giovanna González',
      role: 'Directora Fundadora',
      phone: '+56 9 2380 7285',
      email: 'giovanna@banapropiedades.cl',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prop-08',
    code: 'BANA-TER-204',
    title: 'Terreno Vista Panorámica Maitencillo',
    slug: 'terreno-vista-panoramica-maitencillo',
    tagline: '1.200 m² urbanizados con vista despejada al mar y lomaje suave',
    region: 'V_REGION',
    regionName: 'Quinta Región',
    comuna: 'Maitencillo',
    sector: 'Cerro Tacna / Maitencillo Norte',
    addressApprox: 'Camino Cerro Tacna, Puchuncaví',
    operation: 'Venta',
    propertyType: 'Terreno',
    condition: 'Nueva',
    priceUF: 6200,
    priceCLP: 6200 * UF_VALUE,
    featured: false,
    badge: 'VISTA AL MAR',
    bedrooms: 0,
    bathrooms: 0,
    parking: 2,
    storage: 0,
    surfaceUseful: 0,
    surfaceTotal: 1200,
    surfaceLand: 1200,
    coordinates: {
      lat: '-32.6512° S',
      lng: '-71.4328° W',
    },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Terreno residencial de 1.200 m² con vista privilegiada al océano y puesta de sol. Urbanización completa, empalme de agua potable rural y energía eléctrica. Factibilidad técnica verificada por equipo LCE Construcciones para desarrollo arquitectónico costero.',
    highlights: [
      'Vista garantizada al mar sin riesgo de bloqueo futuro',
      'Topografía de pendiente suave ideal para terraza voladiza',
      'Suelo certificado para edificación habitacional',
      'A 4 minutos de Playa El Abanico y comercios'
    ],
    amenities: [
      'Vista al Mar',
      'Agua Potable Rural',
      'Luz Eléctrica',
      'Rol Propio',
      'Acceso Pavimentado'
    ],
    orientation: 'Poniente',
    agent: {
      name: 'Matías Baná Larraín',
      role: 'Socio Director V Región',
      phone: '+56 9 9123 4872',
      email: 'matias@banapropiedades.cl',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prop-09',
    code: 'BANA-LOC-305',
    title: 'Local Comercial Corporativo Providencia',
    slug: 'local-comercial-corporativo-providencia',
    tagline: 'Planta libre de 180 m² con vitrina a calle y estacionamientos para clientes',
    region: 'RM',
    regionName: 'Región Metropolitana',
    comuna: 'Providencia',
    sector: 'Metro Tobalaba / Holanda',
    addressApprox: 'Av. Providencia, Providencia',
    operation: 'Arriendo',
    propertyType: 'Local Comercial',
    condition: 'Usada',
    priceUF: 140,
    priceCLP: 140 * UF_VALUE,
    featured: false,
    badge: 'ARRIENDO COMERCIAL',
    bedrooms: 0,
    bathrooms: 2,
    parking: 3,
    storage: 1,
    surfaceUseful: 180,
    surfaceTotal: 180,
    coordinates: {
      lat: '-33.4215° S',
      lng: '-70.6032° W',
    },
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Impecable local comercial u oficina de atención a público en estratégico punto de alto flujo peatonal y vehicular de Providencia. Frente vidriado con cortinas metálicas automatizadas, climatización central inverter y 3 estacionamientos exclusivos.',
    highlights: [
      'Ubicación neurálgica a pasos de Metro Tobalaba',
      'Excelente exposición de marca con 12 metros de frente vidriado',
      'Apto para servicios financieros, consultas médicas, showroom o gastronomía sin humo'
    ],
    amenities: [
      'Vitrina a la Calle',
      'Climatización Central',
      'Estacionamiento Clientes',
      'Red de Datos',
      'Seguridad'
    ],
    orientation: 'Norte',
    agent: {
      name: 'Camila Montes Baná',
      role: 'Directora Asociada RM',
      phone: '+56 9 8452 9100',
      email: 'camila@banapropiedades.cl',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
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
