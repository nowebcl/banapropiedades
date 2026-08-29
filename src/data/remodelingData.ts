export interface RemodelingProject {
  id: string;
  title: string;
  category: 'departamento' | 'cocina' | 'living' | 'bano' | 'terraza';
  categoryLabel: string;
  location: string;
  comuna: string;
  surface: number; // m²
  durationWeeks: number;
  valueAddedPercent: number; // Plusvalía %
  estimatedBudgetUF: number;
  beforeImage: string;
  afterImage: string;
  beforeDescription: string;
  afterDescription: string;
  keyImprovements: string[];
  nobleMaterials: string[];
  testimonial?: {
    client: string;
    role: string;
    quote: string;
  };
}

export const REMODELING_PROJECTS: RemodelingProject[] = [
  {
    id: 'remod-01',
    title: 'Penthouse Alonso de Córdova: Concepto Abierto & Lujo Nórdico',
    category: 'departamento',
    categoryLabel: 'Departamento Completo',
    location: 'Av. Alonso de Córdova, Vitacura',
    comuna: 'Vitacura',
    surface: 185,
    durationWeeks: 8,
    valueAddedPercent: 36,
    estimatedBudgetUF: 1450,
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    beforeDescription: 'Departamento de los años 90 con espacios compartimentados, pisos desgastados, poca iluminación natural y cocina aislada y oscura.',
    afterDescription: 'Integración total de cocina-comedor-living, ventanales de piso a cielo con termopanel acústico, porcelanato italiano de gran formato y sistema de domótica Lutron.',
    keyImprovements: [
      'Demolición de 3 tabiques no estructurales para crear planta libre',
      'Cocina con isla central de 3.20m en Neolith Calacatta Gold',
      'Pisos de madera de ingeniería en roble europeo cepillado',
      'Iluminación escénica indirecta LED 2700K dimerizable'
    ],
    nobleMaterials: ['Mármol Neolith', 'Roble Europeo', 'Termopanel Doble Low-E', 'Grifería Hansgrohe'],
    testimonial: {
      client: 'Ignacio & Marcela Valdés',
      role: 'Propietarios en Vitacura',
      quote: 'Baná transformó por completo nuestro departamento. El proceso fue limpio, dentro del plazo exacto y el valor de tasación subió más de un 35% de inmediato.'
    }
  },
  {
    id: 'remod-02',
    title: 'Cocina de Autor con Isla de Cuarzo & Iluminación Escénica',
    category: 'cocina',
    categoryLabel: 'Cocina & Gourmet',
    location: 'San Damián, Las Condes',
    comuna: 'Las Condes',
    surface: 38,
    durationWeeks: 4,
    valueAddedPercent: 28,
    estimatedBudgetUF: 620,
    beforeImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
    beforeDescription: 'Muebles de melamina tradicionales desgastados, cubierta de granito antiguo, distribución poco eficiente y falta de almacenamiento.',
    afterDescription: 'Diseño ultra contemporáneo con muebles sin tiradores en laca mate anti-huellas, cubierta de cuarzo negro marquina y cava de vinos empotrada.',
    keyImprovements: [
      'Muebles termoestructurados con herrajes Blum de cierre suave',
      'Artefactos integrados Miele y campana oculta de alta succión',
      'Iluminación bajo muebles y en zócalos con perfiles de aluminio negro',
      'Despensa extraíble de altura completa y torre de hornos'
    ],
    nobleMaterials: ['Cuarzo Marquina', 'Laca Anti-Huellas', 'Herrajes Blum Austria', 'Electrodomésticos Miele'],
    testimonial: {
      client: 'Catalina Echeverría',
      role: 'Chef & Propietaria',
      quote: 'La funcionalidad y estética que lograron es de nivel internacional. Cocinar y recibir amigos aquí es un placer absoluto.'
    }
  },
  {
    id: 'remod-03',
    title: 'Master Suite & Baño Principal Estilo Spa Hotelero',
    category: 'bano',
    categoryLabel: 'Baño & Spa',
    location: 'La Dehesa, Lo Barnechea',
    comuna: 'Lo Barnechea',
    surface: 42,
    durationWeeks: 3,
    valueAddedPercent: 24,
    estimatedBudgetUF: 480,
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80',
    beforeDescription: 'Baño cerrado con cerámica tradicional, tina estrecha y poca iluminación.',
    afterDescription: 'Suite de relajación con tina exenta freestanding, ducha doble a ras de suelo con lluvia cenital y revestimiento de mármol travertino.',
    keyImprovements: [
      'Ducha walk-in con mampara de cristal templado de 10mm antical',
      'Espejo retroiluminado con sistema desempañante táctil',
      'Vanitorio suspendido de madera maciza de nogal con doble bacha',
      'Piso radiante eléctrico programable por app móvil'
    ],
    nobleMaterials: ['Mármol Travertino', 'Nogal Natural', 'Grifería Empotrada Dorada', 'Cristal Templado 10mm'],
    testimonial: {
      client: 'Dr. Rodrigo Undurraga',
      role: 'Médico Cirujano',
      quote: 'Llegar a casa después de una jornada intensa y disfrutar de este baño es como estar en un hotel 5 estrellas.'
    }
  },
  {
    id: 'remod-04',
    title: 'Living & Comedor con Doble Altura y Muro Revestido en Piedra',
    category: 'living',
    categoryLabel: 'Living & Áreas Sociales',
    location: 'Santa María de Manquehue, Vitacura',
    comuna: 'Vitacura',
    surface: 95,
    durationWeeks: 5,
    valueAddedPercent: 31,
    estimatedBudgetUF: 890,
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
    beforeDescription: 'Espacio oscuro con terminaciones anticuadas, vigas a la vista en tono oscuro y cielo bajo.',
    afterDescription: 'Apertura hacia el jardín, muro focal revestido en piedra pizarra natural, biochimenea empotrada y ventanales correderos que desaparecen en el muro.',
    keyImprovements: [
      'Biochimenea de etanol ecológica de 2.00m con control remoto',
      'Apertura panorámica hacia el jardín con perfilería ultra delgada',
      'Acústica optimizada mediante paneles de listones de madera natural',
      'Sistema de sonido envolvente Sonos integrado en cielo'
    ],
    nobleMaterials: ['Piedra Pizarra Natural', 'Listones de Roble', 'Vidrio Laminado Acústico', 'Biochimenea Acero Inox'],
    testimonial: {
      client: 'Familia Larraín Silva',
      role: 'Residentes en Vitacura',
      quote: 'El cambio de luz y espacialidad fue radical. La casa rejuveneció 20 años y se convirtió en el punto de encuentro familiar.'
    }
  },
  {
    id: 'remod-05',
    title: 'Terraza Panorámica, Quincho Gourmet & Cierre de Cristal',
    category: 'terraza',
    categoryLabel: 'Terraza & Quincho',
    location: 'Bosques de Montemar, Concón',
    comuna: 'Concón',
    surface: 65,
    durationWeeks: 4,
    valueAddedPercent: 34,
    estimatedBudgetUF: 590,
    beforeImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    beforeDescription: 'Terraza expuesta al viento costero, sin protección solar ni comodidades para cocinar al aire libre.',
    afterDescription: 'Quincho premium techado con cierre vidriado plegable sin perfiles verticales, parrilla a carbón y gas en acero inoxidable, y fogón a gas exterior.',
    keyImprovements: [
      'Cortinas de cristal plegables 100% herméticas al viento y lluvia',
      'Mueble de quincho en granito negro San Gabriel con lavacopas',
      'Deck ecológico de WPC libre de mantenimiento y resistente a la salinidad',
      'Calefactores infrarrojos empotrados en cielo con sensor de presencia'
    ],
    nobleMaterials: ['Cristal Plegable Sin Marco', 'Granito San Gabriel', 'Deck WPC Premium', 'Acero Marino 316'],
    testimonial: {
      client: 'Gonzalo Matte',
      role: 'Inversionista',
      quote: 'Ahora usamos la terraza todo el año, incluso en invierno. La vista al mar con el cierre de cristal es inmejorable.'
    }
  }
];

export const REMODELING_SERVICES = [
  {
    id: 'srv-01',
    icon: 'Sparkles',
    title: 'Remodelación Integral Llave en Mano',
    description: 'Transformación total de tu propiedad sin preocupaciones. Nos encargamos del proyecto de arquitectura, compras, permisos, dirección de obra y entrega final limpia y garantizada.',
    badge: 'MÁS POPULAR',
    tags: ['Arquitectura 3D', 'Permisos Municipales', 'Garantía 2 Años']
  },
  {
    id: 'srv-02',
    icon: 'TrendingUp',
    title: 'Remodelación para Venta & Plusvalía (Home Staging)',
    description: 'Intervenciones estratégicas de alto impacto diseñadas para maximizar el valor de tasación y venta hasta en un 35% y acelerar los tiempos de colocación en el mercado.',
    badge: 'ROI GARANTIZADO',
    tags: ['Alta Rentabilidad', 'Rápida Ejecución', 'Asesoría Inmobiliaria']
  },
  {
    id: 'srv-03',
    icon: 'ChefHat',
    title: 'Cocinas & Baños de Alta Gama',
    description: 'Renovación de los dos espacios de mayor valor de la vivienda. Cubiertas de cuarzo y mármol, carpintería a medida con herrajes europeos y artefactos de última generación.',
    badge: 'ESPECIALIDAD',
    tags: ['Cubiertas Neolith', 'Griferías de Lujo', 'Diseño a Medida']
  },
  {
    id: 'srv-04',
    icon: 'Maximize',
    title: 'Terrazas, Quinchos & Rooftops',
    description: 'Ampliación de tus áreas sociales al exterior con cierres de cristal termopanel, quinchos gourmet, decks térmicos, fogones e iluminación paisajística.',
    badge: 'CONFORT EXTERIOR',
    tags: ['Cierre de Cristal', 'Parrillas Inox', 'Fogones a Gas']
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Diagnóstico & Visita Técnica Gratuita',
    description: 'Visitamos tu propiedad en Santiago o la V Región para evaluar el estado estructural, instalaciones, requerimientos y oportunidades de mejora.'
  },
  {
    step: '02',
    title: 'Diseño 3D & Presupuesto Cerrado',
    description: 'Presentamos renders fotorrealistas de cómo quedará cada espacio y un presupuesto itemizado sin costos ocultos ni sorpresas.'
  },
  {
    step: '03',
    title: 'Ejecución & Supervisión Diaria',
    description: 'Nuestros arquitectos y constructores dirigen la obra con estándares de limpieza, seguridad y reporte semanal con fotos y avances.'
  },
  {
    step: '04',
    title: 'Entrega Llave en Mano & Garantía',
    description: 'Entregamos tu propiedad impecable y lista para habitar o vender, respaldada con 2 años de garantía escrita de Baná Propiedades.'
  }
];
