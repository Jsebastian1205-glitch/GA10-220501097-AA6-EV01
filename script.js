// Cambia la vista activa entre las páginas del sitio
function showPage(page) {
  // Protege las páginas que requieren sesión (o rol ADMIN) de un acceso
  // directo: si auth.js todavía no cargó, se asume que no hay sesión.
  if (page === 'cuenta' && !(window.estaAutenticado && window.estaAutenticado())) {
    if (typeof mostrarError === 'function') mostrarError('Inicia sesión para ver tu cuenta.');
    toggleLogin(true);
    return;
  }
  if (page === 'admin' && !(window.esAdmin && window.esAdmin())) {
    if (typeof mostrarError === 'function') mostrarError('No tienes permisos de administrador.');
    page = 'inicio';
  }

  const pages = document.querySelectorAll('.page');
  pages.forEach((panel) => panel.classList.remove('active'));

  const targetPage = document.getElementById(`page-${page}`);
  if (targetPage) {
    targetPage.classList.add('active');
  } else {
    document.getElementById('page-inicio')?.classList.add('active');
  }
  // El fondo cambia según la página (en el Inicio no va el chip pequeño)
  document.body.dataset.pagina = targetPage ? page : 'inicio';

  document.querySelectorAll('.nav-link').forEach((button) => {
    button.classList.remove('active');
  });

  const activeButton = document.getElementById(`nav-${page}`);
  if (activeButton) {
    activeButton.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Muestra u oculta el modal de inicio de sesión
function toggleLogin(show) {
  const modal = document.getElementById('login-modal');
  if (!modal) return;

  modal.classList.toggle('active', show);
  document.body.style.overflow = show ? 'hidden' : '';
}

// Muestra u oculta el modal de registro
function toggleRegister(show) {
  const modal = document.getElementById('register-modal');
  if (!modal) return;

  modal.classList.toggle('active', show);
  document.body.style.overflow = show ? 'hidden' : '';
}

// Muestra u oculta el modal de lectura de artículos
function toggleArticle(show) {
  const modal = document.getElementById('article-modal');
  if (!modal) return;

  modal.classList.toggle('active', show);
  document.body.style.overflow = show ? 'hidden' : '';
}

// Llena el modal de artículo con el contenido correspondiente y lo abre
function openArticle(articleId) {
  const article = ARTICLES[articleId];
  if (!article) return;

  document.getElementById('article-icon').textContent = article.icon;
  document.getElementById('article-tag').textContent = article.tag;
  document.getElementById('article-title').textContent = article.title;
  document.getElementById('article-body').textContent = article.body;

  toggleArticle(true);
}

// Datos locales de productos. Al cargar la página, catalogo.js los
// reemplaza por los productos reales de la API (GET /api/productos) y usa
// estos como referencia de precio y estadísticas; si el backend no está
// disponible, la página sigue funcionando con estos datos.
const PRODUCTS = [
  { id: 'i5-14600k', category: 'cpu', brand: 'Intel', name: 'Core i5-14600K', price: 320000, icon: '🕹️',
    stats: { potencia: 78, eficiencia: 70, valor: 88, popularidad: 90 } },
  { id: 'i7-14700k', category: 'cpu', brand: 'Intel', name: 'Core i7-14700K', price: 480000, icon: '🕹️',
    stats: { potencia: 88, eficiencia: 65, valor: 75, popularidad: 85 } },
  { id: 'i9-14900k', category: 'cpu', brand: 'Intel', name: 'Core i9-14900K', price: 650000, icon: '🕹️',
    stats: { potencia: 98, eficiencia: 55, valor: 60, popularidad: 80 } },
  { id: 'r5-7600x', category: 'cpu', brand: 'AMD', name: 'Ryzen 5 7600X', price: 300000, icon: '🕹️',
    stats: { potencia: 75, eficiencia: 85, valor: 90, popularidad: 88 } },
  { id: 'r7-7700x', category: 'cpu', brand: 'AMD', name: 'Ryzen 7 7700X', price: 450000, icon: '🕹️',
    stats: { potencia: 90, eficiencia: 88, valor: 82, popularidad: 95 } },

  { id: 'rtx-4060', category: 'gpu', brand: 'NVIDIA', name: 'RTX 4060', price: 1800000, icon: '🎮',
    stats: { potencia: 70, eficiencia: 82, valor: 80, popularidad: 88 } },
  { id: 'rtx-4070', category: 'gpu', brand: 'NVIDIA', name: 'RTX 4070', price: 2600000, icon: '🎮',
    stats: { potencia: 82, eficiencia: 80, valor: 72, popularidad: 85 } },
  { id: 'rtx-4070ti', category: 'gpu', brand: 'NVIDIA', name: 'RTX 4070 Ti', price: 3600000, icon: '🎮',
    stats: { potencia: 90, eficiencia: 75, valor: 60, popularidad: 78 } },
  { id: 'rx-7600', category: 'gpu', brand: 'AMD', name: 'Radeon RX 7600', price: 1500000, icon: '🎮',
    stats: { potencia: 65, eficiencia: 78, valor: 85, popularidad: 75 } },
  { id: 'rx-7800xt', category: 'gpu', brand: 'AMD', name: 'Radeon RX 7800 XT', price: 2900000, icon: '🎮',
    stats: { potencia: 85, eficiencia: 76, valor: 78, popularidad: 82 } },

  { id: 'kingston-fury-16', category: 'ram', brand: 'Kingston', name: 'Fury Beast 16GB 3200MHz', price: 220000, icon: '💾',
    stats: { potencia: 55, eficiencia: 70, valor: 92, popularidad: 85 } },
  { id: 'corsair-vengeance-32', category: 'ram', brand: 'Corsair', name: 'Vengeance 32GB 6000MHz', price: 480000, icon: '💾',
    stats: { potencia: 82, eficiencia: 80, valor: 75, popularidad: 90 } },
  { id: 'gskill-tridentz5-32', category: 'ram', brand: 'G.Skill', name: 'Trident Z5 32GB 6400MHz', price: 620000, icon: '💾',
    stats: { potencia: 90, eficiencia: 78, valor: 60, popularidad: 80 } },
  { id: 'corsair-dominator-64', category: 'ram', brand: 'Corsair', name: 'Dominator Platinum 64GB 5600MHz', price: 950000, icon: '💾',
    stats: { potencia: 88, eficiencia: 85, valor: 55, popularidad: 76 } },

  { id: 'samsung-990pro-1tb', category: 'almacenamiento', brand: 'Samsung', name: '990 PRO 1TB NVMe', price: 520000, icon: '💿',
    stats: { potencia: 95, eficiencia: 85, valor: 72, popularidad: 92 } },
  { id: 'wd-sn770-1tb', category: 'almacenamiento', brand: 'WD', name: 'Black SN770 1TB NVMe', price: 330000, icon: '💿',
    stats: { potencia: 80, eficiencia: 88, valor: 90, popularidad: 86 } },
  { id: 'kingston-nv2-1tb', category: 'almacenamiento', brand: 'Kingston', name: 'NV2 1TB NVMe', price: 250000, icon: '💿',
    stats: { potencia: 65, eficiencia: 80, valor: 94, popularidad: 84 } },
  { id: 'seagate-barracuda-2tb', category: 'almacenamiento', brand: 'Seagate', name: 'BarraCuda 2TB HDD', price: 280000, icon: '💿',
    stats: { potencia: 35, eficiencia: 60, valor: 85, popularidad: 78 } },

  { id: 'asus-b760m', category: 'placas-madre', brand: 'ASUS', name: 'TUF Gaming B760M-Plus WiFi', price: 750000, icon: '🔌',
    stats: { potencia: 72, eficiencia: 80, valor: 85, popularidad: 86 } },
  { id: 'msi-z790', category: 'placas-madre', brand: 'MSI', name: 'MAG Z790 Tomahawk WiFi', price: 1250000, icon: '🔌',
    stats: { potencia: 90, eficiencia: 78, valor: 70, popularidad: 82 } },
  { id: 'gigabyte-b650', category: 'placas-madre', brand: 'Gigabyte', name: 'B650 Aorus Elite AX', price: 950000, icon: '🔌',
    stats: { potencia: 82, eficiencia: 82, valor: 80, popularidad: 88 } },
  { id: 'asrock-x670e', category: 'placas-madre', brand: 'ASRock', name: 'X670E Steel Legend', price: 1350000, icon: '🔌',
    stats: { potencia: 92, eficiencia: 76, valor: 68, popularidad: 74 } },

  { id: 'deepcool-ak400', category: 'refrigeracion', brand: 'DeepCool', name: 'AK400 (aire)', price: 140000, icon: '❄️',
    stats: { potencia: 65, eficiencia: 85, valor: 95, popularidad: 88 } },
  { id: 'noctua-nhd15', category: 'refrigeracion', brand: 'Noctua', name: 'NH-D15 (aire)', price: 520000, icon: '❄️',
    stats: { potencia: 88, eficiencia: 90, valor: 65, popularidad: 84 } },
  { id: 'corsair-h100i', category: 'refrigeracion', brand: 'Corsair', name: 'iCUE H100i Elite 240mm (líquida)', price: 650000, icon: '❄️',
    stats: { potencia: 85, eficiencia: 75, valor: 68, popularidad: 82 } },
  { id: 'arctic-lf3-360', category: 'refrigeracion', brand: 'Arctic', name: 'Liquid Freezer III 360mm (líquida)', price: 480000, icon: '❄️',
    stats: { potencia: 94, eficiencia: 82, valor: 86, popularidad: 80 } },

  { id: 'logitech-g502x', category: 'accesorios', brand: 'Logitech', name: 'Mouse G502 X', price: 280000, icon: '🖱️',
    stats: { potencia: 82, eficiencia: 75, valor: 80, popularidad: 92 } },
  { id: 'razer-deathadder-v3', category: 'accesorios', brand: 'Razer', name: 'Mouse DeathAdder V3', price: 340000, icon: '🖱️',
    stats: { potencia: 88, eficiencia: 80, valor: 74, popularidad: 86 } },
  { id: 'redragon-kumara', category: 'accesorios', brand: 'Redragon', name: 'Teclado Kumara K552', price: 160000, icon: '🖱️',
    stats: { potencia: 60, eficiencia: 70, valor: 94, popularidad: 88 } },
  { id: 'hyperx-cloud3', category: 'accesorios', brand: 'HyperX', name: 'Audífonos Cloud III', price: 420000, icon: '🖱️',
    stats: { potencia: 80, eficiencia: 78, valor: 76, popularidad: 84 } },

  { id: 'corsair-rm750e', category: 'fuentes', brand: 'Corsair', name: 'RM750e 750W 80+ Gold', price: 480000, icon: '🔋',
    stats: { potencia: 75, eficiencia: 88, valor: 85, popularidad: 90 } },
  { id: 'evga-600br', category: 'fuentes', brand: 'EVGA', name: '600 BR 600W 80+ Bronze', price: 260000, icon: '🔋',
    stats: { potencia: 60, eficiencia: 70, valor: 88, popularidad: 78 } },
  { id: 'seasonic-focus-850', category: 'fuentes', brand: 'Seasonic', name: 'Focus GX-850 850W 80+ Gold', price: 620000, icon: '🔋',
    stats: { potencia: 85, eficiencia: 90, valor: 78, popularidad: 84 } },
  { id: 'msi-a1000g', category: 'fuentes', brand: 'MSI', name: 'MPG A1000G 1000W 80+ Gold', price: 850000, icon: '🔋',
    stats: { potencia: 95, eficiencia: 88, valor: 70, popularidad: 76 } },

  { id: 'lg-27gp850', category: 'monitores', brand: 'LG', name: 'UltraGear 27" QHD 180Hz', price: 1400000, icon: '🖥️',
    stats: { potencia: 85, eficiencia: 78, valor: 80, popularidad: 88 } },
  { id: 'samsung-odyssey-g5', category: 'monitores', brand: 'Samsung', name: 'Odyssey G5 32" QHD 165Hz', price: 1250000, icon: '🖥️',
    stats: { potencia: 80, eficiencia: 75, valor: 84, popularidad: 85 } },
  { id: 'asus-vg249q', category: 'monitores', brand: 'ASUS', name: 'TUF VG249Q 24" FHD 165Hz', price: 750000, icon: '🖥️',
    stats: { potencia: 68, eficiencia: 82, valor: 92, popularidad: 87 } },
  { id: 'aoc-q27g3xmn', category: 'monitores', brand: 'AOC', name: 'Q27G3XMN 27" QHD Mini-LED', price: 1550000, icon: '🖥️',
    stats: { potencia: 90, eficiencia: 80, valor: 82, popularidad: 79 } },
];

// Ficha técnica de cada producto (datos de referencia del fabricante) que se
// muestra al tocar una tarjeta en la página de Productos. Los productos de
// la API usan la ficha del producto local con la misma marca y nombre
// (catalogo.js guarda ese id en `refId`).
const PRODUCT_SPECS = {
  'i5-14600k': [['Núcleos', '14 (6 de rendimiento + 8 de eficiencia)'], ['Hilos', '20'], ['Frecuencia máxima', '5,3 GHz'], ['Caché', '24 MB'], ['Socket', 'LGA 1700'], ['Consumo base (TDP)', '125 W'], ['Gráficos integrados', 'Intel UHD 770']],
  'i7-14700k': [['Núcleos', '20 (8 de rendimiento + 12 de eficiencia)'], ['Hilos', '28'], ['Frecuencia máxima', '5,6 GHz'], ['Caché', '33 MB'], ['Socket', 'LGA 1700'], ['Consumo base (TDP)', '125 W'], ['Gráficos integrados', 'Intel UHD 770']],
  'i9-14900k': [['Núcleos', '24 (8 de rendimiento + 16 de eficiencia)'], ['Hilos', '32'], ['Frecuencia máxima', '6,0 GHz'], ['Caché', '36 MB'], ['Socket', 'LGA 1700'], ['Consumo base (TDP)', '125 W'], ['Gráficos integrados', 'Intel UHD 770']],
  'r5-7600x': [['Núcleos', '6'], ['Hilos', '12'], ['Frecuencia máxima', '5,3 GHz'], ['Caché L3', '32 MB'], ['Socket', 'AM5'], ['Consumo (TDP)', '105 W'], ['Gráficos integrados', 'AMD Radeon (2 núcleos)']],
  'r7-7700x': [['Núcleos', '8'], ['Hilos', '16'], ['Frecuencia máxima', '5,4 GHz'], ['Caché L3', '32 MB'], ['Socket', 'AM5'], ['Consumo (TDP)', '105 W'], ['Gráficos integrados', 'AMD Radeon (2 núcleos)']],

  'rtx-4060': [['Memoria', '8 GB GDDR6'], ['Bus de memoria', '128 bits'], ['Núcleos CUDA', '3.072'], ['Frecuencia boost', '2.460 MHz'], ['Consumo', '115 W'], ['Interfaz', 'PCIe 4.0 x8'], ['Fuente recomendada', '550 W']],
  'rtx-4070': [['Memoria', '12 GB GDDR6X'], ['Bus de memoria', '192 bits'], ['Núcleos CUDA', '5.888'], ['Frecuencia boost', '2.475 MHz'], ['Consumo', '200 W'], ['Interfaz', 'PCIe 4.0 x16'], ['Fuente recomendada', '650 W']],
  'rtx-4070ti': [['Memoria', '12 GB GDDR6X'], ['Bus de memoria', '192 bits'], ['Núcleos CUDA', '7.680'], ['Frecuencia boost', '2.610 MHz'], ['Consumo', '285 W'], ['Interfaz', 'PCIe 4.0 x16'], ['Fuente recomendada', '700 W']],
  'rx-7600': [['Memoria', '8 GB GDDR6'], ['Bus de memoria', '128 bits'], ['Unidades de cómputo', '32 (2.048 procesadores)'], ['Frecuencia boost', '2.655 MHz'], ['Consumo', '165 W'], ['Interfaz', 'PCIe 4.0 x8'], ['Fuente recomendada', '550 W']],
  'rx-7800xt': [['Memoria', '16 GB GDDR6'], ['Bus de memoria', '256 bits'], ['Unidades de cómputo', '60 (3.840 procesadores)'], ['Frecuencia boost', '2.430 MHz'], ['Consumo', '263 W'], ['Interfaz', 'PCIe 4.0 x16'], ['Fuente recomendada', '700 W']],

  'kingston-fury-16': [['Tipo', 'DDR4'], ['Capacidad', '16 GB (1 × 16 GB)'], ['Velocidad', '3.200 MT/s'], ['Latencia', 'CL16'], ['Voltaje', '1,35 V'], ['Perfil', 'Intel XMP']],
  'corsair-vengeance-32': [['Tipo', 'DDR5'], ['Capacidad', '32 GB (2 × 16 GB)'], ['Velocidad', '6.000 MT/s'], ['Latencia', 'CL36'], ['Voltaje', '1,35 V'], ['Perfil', 'Intel XMP 3.0']],
  'gskill-tridentz5-32': [['Tipo', 'DDR5'], ['Capacidad', '32 GB (2 × 16 GB)'], ['Velocidad', '6.400 MT/s'], ['Latencia', 'CL32'], ['Voltaje', '1,40 V'], ['Iluminación', 'RGB']],
  'corsair-dominator-64': [['Tipo', 'DDR5'], ['Capacidad', '64 GB (2 × 32 GB)'], ['Velocidad', '5.600 MT/s'], ['Latencia', 'CL40'], ['Voltaje', '1,25 V'], ['Iluminación', 'RGB']],

  'samsung-990pro-1tb': [['Tipo', 'SSD NVMe'], ['Capacidad', '1 TB'], ['Interfaz', 'PCIe 4.0 x4'], ['Formato', 'M.2 2280'], ['Lectura', 'hasta 7.450 MB/s'], ['Escritura', 'hasta 6.900 MB/s'], ['Garantía', '5 años']],
  'wd-sn770-1tb': [['Tipo', 'SSD NVMe'], ['Capacidad', '1 TB'], ['Interfaz', 'PCIe 4.0 x4'], ['Formato', 'M.2 2280'], ['Lectura', 'hasta 5.150 MB/s'], ['Escritura', 'hasta 4.900 MB/s'], ['Garantía', '5 años']],
  'kingston-nv2-1tb': [['Tipo', 'SSD NVMe'], ['Capacidad', '1 TB'], ['Interfaz', 'PCIe 4.0 x4'], ['Formato', 'M.2 2280'], ['Lectura', 'hasta 3.500 MB/s'], ['Escritura', 'hasta 2.100 MB/s'], ['Garantía', '3 años']],
  'seagate-barracuda-2tb': [['Tipo', 'Disco duro (HDD)'], ['Capacidad', '2 TB'], ['Interfaz', 'SATA 6 Gb/s'], ['Formato', '3,5 pulgadas'], ['Velocidad de giro', '7.200 RPM'], ['Caché', '256 MB'], ['Transferencia', 'hasta 220 MB/s']],

  'asus-b760m': [['Socket', 'LGA 1700 (Intel 12.ª a 14.ª gen.)'], ['Chipset', 'Intel B760'], ['Formato', 'Micro-ATX'], ['Memoria', '4 ranuras DDR5'], ['Red', 'Wi-Fi 6 + LAN 2,5 Gb']],
  'msi-z790': [['Socket', 'LGA 1700 (Intel 12.ª a 14.ª gen.)'], ['Chipset', 'Intel Z790'], ['Formato', 'ATX'], ['Memoria', '4 ranuras DDR5'], ['Red', 'Wi-Fi 6E + LAN 2,5 Gb']],
  'gigabyte-b650': [['Socket', 'AM5 (Ryzen 7000 y posteriores)'], ['Chipset', 'AMD B650'], ['Formato', 'ATX'], ['Memoria', '4 ranuras DDR5'], ['Red', 'Wi-Fi 6E + LAN 2,5 Gb']],
  'asrock-x670e': [['Socket', 'AM5 (Ryzen 7000 y posteriores)'], ['Chipset', 'AMD X670E'], ['Formato', 'ATX'], ['Memoria', '4 ranuras DDR5'], ['Red', 'Wi-Fi 6E + LAN 2,5 Gb']],

  'deepcool-ak400': [['Tipo', 'Disipador por aire (una torre)'], ['Ventiladores', '1 × 120 mm'], ['Heatpipes', '4'], ['Altura', '155 mm'], ['Disipa hasta', '220 W'], ['Compatibilidad', 'Intel LGA 1700 y AMD AM5/AM4']],
  'noctua-nhd15': [['Tipo', 'Disipador por aire (doble torre)'], ['Ventiladores', '2 × 140 mm'], ['Heatpipes', '6'], ['Altura', '165 mm'], ['Compatibilidad', 'Intel LGA 1700 y AMD AM5/AM4']],
  'corsair-h100i': [['Tipo', 'Refrigeración líquida (AIO)'], ['Radiador', '240 mm'], ['Ventiladores', '2 × 120 mm'], ['Iluminación', 'RGB'], ['Compatibilidad', 'Intel LGA 1700 y AMD AM5/AM4']],
  'arctic-lf3-360': [['Tipo', 'Refrigeración líquida (AIO)'], ['Radiador', '360 mm'], ['Ventiladores', '3 × 120 mm'], ['Extra', 'Ventilador para la zona de VRM'], ['Compatibilidad', 'Intel LGA 1700 y AMD AM5/AM4']],

  'logitech-g502x': [['Tipo', 'Mouse gamer con cable'], ['Sensor', 'HERO 25K'], ['Resolución', 'hasta 25.600 DPI'], ['Botones', '13 programables'], ['Interruptores', 'LIGHTFORCE híbridos'], ['Peso', '89 g']],
  'razer-deathadder-v3': [['Tipo', 'Mouse gamer con cable'], ['Sensor', 'Focus Pro 30K'], ['Resolución', 'hasta 30.000 DPI'], ['Interruptores', 'Ópticos de 3.ª generación'], ['Peso', '59 g']],
  'redragon-kumara': [['Tipo', 'Teclado mecánico'], ['Formato', 'TKL (87 teclas, sin teclado numérico)'], ['Interruptores', 'Mecánicos Outemu'], ['Iluminación', 'Retroiluminado'], ['Conexión', 'USB con cable']],
  'hyperx-cloud3': [['Tipo', 'Audífonos gamer con cable'], ['Parlantes', '53 mm'], ['Micrófono', 'Desmontable con cancelación de ruido'], ['Audio espacial', 'DTS Headphone:X'], ['Conexión', '3,5 mm, USB-C y USB-A']],

  'corsair-rm750e': [['Potencia', '750 W'], ['Certificación', '80 PLUS Gold'], ['Cables', 'Totalmente modular'], ['Norma', 'ATX 3.0'], ['Ventilador', '120 mm'], ['Garantía', '7 años']],
  'evga-600br': [['Potencia', '600 W'], ['Certificación', '80 PLUS Bronze'], ['Cables', 'No modular'], ['Ventilador', '120 mm'], ['Garantía', '3 años']],
  'seasonic-focus-850': [['Potencia', '850 W'], ['Certificación', '80 PLUS Gold'], ['Cables', 'Totalmente modular'], ['Ventilador', '120 mm'], ['Garantía', '10 años']],
  'msi-a1000g': [['Potencia', '1.000 W'], ['Certificación', '80 PLUS Gold'], ['Cables', 'Totalmente modular'], ['Norma', 'ATX 3.0'], ['Ventilador', '135 mm'], ['Garantía', '10 años']],

  'lg-27gp850': [['Tamaño', '27 pulgadas'], ['Resolución', 'QHD 2560 × 1440'], ['Panel', 'Nano IPS'], ['Frecuencia', '180 Hz'], ['Tiempo de respuesta', '1 ms'], ['HDR', 'HDR400']],
  'samsung-odyssey-g5': [['Tamaño', '32 pulgadas (curvo 1000R)'], ['Resolución', 'QHD 2560 × 1440'], ['Panel', 'VA'], ['Frecuencia', '165 Hz'], ['Tiempo de respuesta', '1 ms'], ['Sincronización', 'AMD FreeSync Premium']],
  'asus-vg249q': [['Tamaño', '23,8 pulgadas'], ['Resolución', 'Full HD 1920 × 1080'], ['Panel', 'IPS'], ['Frecuencia', '165 Hz'], ['Tiempo de respuesta', '1 ms'], ['Sincronización', 'AMD FreeSync Premium']],
  'aoc-q27g3xmn': [['Tamaño', '27 pulgadas'], ['Resolución', 'QHD 2560 × 1440'], ['Panel', 'VA Mini-LED (336 zonas)'], ['Frecuencia', '180 Hz'], ['Tiempo de respuesta', '1 ms'], ['HDR', 'HDR1000']],
};

const CATEGORY_LABELS = {
  cpu: 'Procesador', gpu: 'Tarjeta Gráfica', ram: 'Memoria RAM',
  almacenamiento: 'Almacenamiento', 'placas-madre': 'Placa Madre', refrigeracion: 'Refrigeración',
  accesorios: 'Accesorio', fuentes: 'Fuente de Poder', monitores: 'Monitor',
};

// Contenido de prueba de los artículos del blog
const ARTICLES = {
  'cpu-guide': { icon: '🖥️', tag: 'Guías', title: 'Cómo elegir el mejor procesador para tu PC en 2025',
    body: 'Antes de comprar un procesador define primero para qué lo vas a usar: gaming, edición de video o trabajo de oficina. Compara núcleos, hilos y velocidad, y no olvides revisar que sea compatible con tu placa madre antes de decidir.' },
  'build-guide': { icon: '🔧', tag: 'Tutorial', title: 'Guía para armar tu PC paso a paso sin errores',
    body: 'Arma tu PC en orden: primero el procesador y la RAM sobre la placa madre, luego móntala en el gabinete, conecta la fuente de poder y por último la tarjeta gráfica. Revisa cada conexión antes de encender el equipo por primera vez.' },
  'gpu-2025': { icon: '🎮', tag: 'Novedades', title: 'Nuevas GPUs lanzadas en 2025: análisis completo',
    body: 'Este año llegaron tarjetas gráficas con mejoras notables en eficiencia energética y trazado de rayos. Aquí en BuildZone puedes comparar las especificaciones y precios de los modelos más recientes en la sección de Comparador.' },
  'ram-guide': { icon: '💾', tag: 'Guías', title: 'RAM: ¿cuánta necesitas y qué velocidad elegir?',
    body: 'Para uso general 16GB son suficientes, pero si editas video o usas máquinas virtuales, considera 32GB o más. La velocidad en MHz también influye en el rendimiento, especialmente en procesadores AMD.' },
  'cooling-guide': { icon: '❄️', tag: 'Tutorial', title: 'Refrigeración líquida vs aire: cuál conviene más',
    body: 'La refrigeración por aire es más económica y fácil de mantener, mientras que la líquida ofrece mejores temperaturas en procesadores de alto rendimiento. La elección depende de tu presupuesto y de cuánto exijas a tu equipo.' },
  'amd-vs-intel': { icon: '⚖️', tag: 'Comparativas', title: 'AMD vs Intel en 2025: ¿quién gana en relación precio-rendimiento?',
    body: 'AMD suele destacar en relación precio-rendimiento para gaming, mientras que Intel mantiene ventaja en tareas de un solo núcleo. Usa el Comparador de BuildZone para ver las estadísticas lado a lado antes de decidir.' },
};

/** Precio en COP, o un texto si el producto aún no tiene precio registrado. */
function formatProductPrice(price) {
  return typeof price === 'number' ? `$${price.toLocaleString('es-CO')}` : 'Precio por confirmar';
}

let currentDuelCategory = 'cpu';
let currentProductCategory = 'all';
let currentProductSearch = '';

// ── Comparador (duelo por rondas) ──
//
// Cada estadística es una "ronda". Gana el duelo quien gane más rondas;
// si quedan empatados, gana el de mejor puntaje promedio (y si también
// empatan ahí, el más barato). Al final se muestran recomendaciones según
// lo que busque el usuario: potencia, consumo o precio.

/** Íconos de línea por categoría (trazos SVG en una caja de 64×64). Los usan el comparador y Productos. */
const CATEGORY_ICONS = {
  cpu: 'M14 14h36v36H14zM24 24h16v16H24zM20 6v8M28 6v8M36 6v8M44 6v8M20 50v8M28 50v8M36 50v8M44 50v8M6 20h8M6 28h8M6 36h8M6 44h8M50 20h8M50 28h8M50 36h8M50 44h8',
  gpu: 'M4 16h56v28H4zM29 30a9 9 0 1 1-18 0a9 9 0 1 1 18 0zM53 30a9 9 0 1 1-18 0a9 9 0 1 1 18 0zM22 30a2 2 0 1 1-4 0a2 2 0 1 1 4 0zM46 30a2 2 0 1 1-4 0a2 2 0 1 1 4 0zM16 44v6h24v-6',
  ram: 'M4 20h56v20H4zM9 25h9v10H9zM22 25h9v10h-9zM35 25h9v10h-9zM48 25h7v10h-7zM8 40v6M14 40v6M20 40v6M26 40v6M36 40v6M42 40v6M48 40v6M54 40v6',
  almacenamiento: 'M4 24h50v16H4zM10 28h12v8H10zM26 28h12v8H26zM42 28h7v8h-7zM62 32a3 3 0 1 1-6 0a3 3 0 1 1 6 0z',
  'placas-madre': 'M6 6h52v52H6zM14 14h16v16H14zM38 14v16M44 14v16M50 14v16M14 40h34M14 48h26',
  refrigeracion: 'M6 6h52v52H6zM52 32a20 20 0 1 1-40 0a20 20 0 1 1 40 0zM36 32a4 4 0 1 1-8 0a4 4 0 1 1 8 0zM32 28c-2-7 2-12 8-11M36 32c7-2 12 2 11 8M32 36c2 7-2 12-8 11M28 32c-7 2-12-2-11-8',
  accesorios: 'M18 20a14 14 0 0 1 28 0v24a14 14 0 0 1-28 0zM18 26h28M32 6v20M32 12v6',
  fuentes: 'M4 12h56v40H4zM37 32a13 13 0 1 1-26 0a13 13 0 1 1 26 0zM24 19v26M11 32h26M44 20h9v10h-9zM44 36h9v7h-9z',
  monitores: 'M4 8h56v36H4zM32 44v10M20 56h24',
};

/** Las 4 rondas del duelo, en orden, con su ícono (trazos en una caja de 24×24). */
const DUEL_ROUNDS = [
  { key: 'potencia', label: 'Potencia', icon: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z' },
  { key: 'eficiencia', label: 'Eficiencia', icon: 'M11 20A7 7 0 0 1 4 13c0-6 6-9 16-9 0 10-3 16-9 16zM4 20c4-4 7-6 11-8' },
  { key: 'valor', label: 'Valor', icon: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM12 7v10M15 9.5c0-1.4-1.3-2-3-2s-3 .8-3 2 1.3 1.8 3 2 3 .8 3 2-1.3 2-3 2-3-.6-3-2' },
  { key: 'popularidad', label: 'Popularidad', icon: 'M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z' },
];
const DUEL_TROPHY_ICON = 'M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3';
/** Diferencia mínima en una ronda para marcarla como K.O. */
const DUEL_KO_MARGIN = 20;
const DUEL_EMPTY_HTML = '<div class="duel-empty">Selecciona 2 productos para comenzar el duelo ⚔️</div>';

function lineIconSvg(path, viewBox, size, className) {
  return `<svg class="${className}" width="${size}" height="${size}" viewBox="0 0 ${viewBox} ${viewBox}" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"></path></svg>`;
}

/** Ícono SVG de una categoría (usa el color del texto que lo rodea). */
function duelCategoryIcon(category, size) {
  return lineIconSvg(CATEGORY_ICONS[category] || CATEGORY_ICONS.accesorios, 64, size, 'duel-icon-cat');
}

function duelStatIcon(path, size) {
  return lineIconSvg(path, 24, size, 'duel-icon-stat');
}

/** Número con un decimal y coma decimal: 88.75 -> "88,8". */
function duelDecimal(value) {
  return value.toFixed(1).replace('.', ',');
}

function duelAverage(product) {
  return DUEL_ROUNDS.reduce((sum, round) => sum + product.stats[round.key], 0) / DUEL_ROUNDS.length;
}

/** Nombre corto para las rondas: la marca si son de marcas distintas, si no las 2 primeras palabras. */
function duelShortName(product, opponent) {
  if (product.brand !== opponent.brand) return product.brand;
  return product.name.split(' ').slice(0, 2).join(' ');
}

/** Calcula rondas, marcador y ganador de un duelo entre dos productos. */
function analyzeDuel(productA, productB) {
  const rounds = DUEL_ROUNDS.map((round, index) => {
    const a = productA.stats[round.key];
    const b = productB.stats[round.key];
    const side = a === b ? 'empate' : a > b ? 'a' : 'b';
    const diff = Math.abs(a - b);
    let badge = 'GANA';
    if (side === 'empate') badge = 'EMPATE';
    else if (diff >= DUEL_KO_MARGIN) badge = 'K.O.';
    return { ...round, number: index + 1, a, b, side, diff, badge };
  });

  const winsA = rounds.filter((r) => r.side === 'a').length;
  const winsB = rounds.filter((r) => r.side === 'b').length;
  const avgA = duelAverage(productA);
  const avgB = duelAverage(productB);
  const tied = winsA === winsB;

  let winnerIsA;
  if (!tied) winnerIsA = winsA > winsB;
  else if (avgA !== avgB) winnerIsA = avgA > avgB;
  else winnerIsA = (productA.price ?? Infinity) <= (productB.price ?? Infinity);

  return { rounds, winsA, winsB, avgA, avgB, tied, winnerIsA };
}

function buildDuelFighter(product, side, average, isWinner, pillText) {
  const pricePerPoint = typeof product.price === 'number' && average > 0
    ? ` · ${formatProductPrice(Math.round(product.price / average))} por punto`
    : '';
  const pill = isWinner
    ? `<div class="duel-pill">${duelStatIcon(DUEL_TROPHY_ICON, 14)}${pillText}</div>`
    : '';

  return `
    <div class="duel-card duel-fighter duel-fighter-${side} duel-${side}${isWinner ? ' is-winner' : ''}">
      <div class="duel-fighter-icon">${duelCategoryIcon(product.category, 68)}</div>
      <div class="duel-fighter-info">
        ${pill}
        <div class="duel-fighter-kicker">${escaparHtml(product.brand)} · ${escaparHtml(CATEGORY_LABELS[product.category] || '')}</div>
        <div class="duel-fighter-name">${escaparHtml(product.name)}</div>
        <div class="duel-fighter-price">${formatProductPrice(product.price)}</div>
        <div class="duel-fighter-meta">${duelDecimal(average)} pts${pricePerPoint}</div>
      </div>
    </div>`;
}

function buildDuelRound(round, nameA, nameB, category) {
  const result = round.side === 'empate'
    ? 'Empate'
    : `${escaparHtml(round.side === 'a' ? nameA : nameB)} gana por ${round.diff}`;

  return `
    <div class="duel-round duel-${round.side}">
      <div class="duel-round-top">
        <span class="duel-round-number">RONDA ${round.number}</span>
        <span class="duel-round-badge">${round.badge}</span>
      </div>
      <div class="duel-round-title">
        <span class="duel-round-icon">${duelStatIcon(round.icon, 20)}</span>${round.label}
      </div>
      <div class="duel-round-row duel-a${round.side === 'a' ? ' is-win' : ''}">
        <span>${escaparHtml(nameA)}</span><span class="duel-round-value">${round.a}</span>
      </div>
      <div class="duel-round-row duel-b${round.side === 'b' ? ' is-win' : ''}">
        <span>${escaparHtml(nameB)}</span><span class="duel-round-value">${round.b}</span>
      </div>
      <div class="duel-round-result">
        <span class="duel-round-avatar">${duelCategoryIcon(category, 20)}</span>${result}
      </div>
    </div>`;
}

/** Recomendación según la ronda que más le importa al usuario. */
function buildDuelRecommendation(round, need, productA, productB, winnerIsA) {
  const pickA = round.side === 'empate' ? winnerIsA : round.side === 'a';
  const pick = pickA ? productA : productB;
  const other = pickA ? productB : productA;
  const mine = pickA ? round.a : round.b;
  const theirs = pickA ? round.b : round.a;

  let why;
  if (round.side === 'empate') {
    why = `Empatan en ${round.label.toLowerCase()} (${mine}); gana el de mejor puntaje general.`;
  } else if (round.key === 'valor') {
    const cheaper = typeof pick.price === 'number' && typeof other.price === 'number' && pick.price < other.price;
    why = `Gana en valor (${mine} vs ${theirs})${cheaper ? ` y cuesta ${formatProductPrice(other.price - pick.price)} menos` : ''}.`;
  } else if (round.diff >= DUEL_KO_MARGIN) {
    why = `K.O. en ${round.label.toLowerCase()}: ${mine} frente a ${theirs}.`;
  } else {
    why = `Ganó la ronda de ${round.label.toLowerCase()} (${mine} vs ${theirs}).`;
  }

  return `
    <div class="duel-rec duel-${pickA ? 'a' : 'b'}">
      <div class="duel-rec-need">${duelStatIcon(round.icon, 22)}<span>${need}</span></div>
      <div class="duel-rec-pick">
        <span class="duel-rec-avatar">${duelCategoryIcon(pick.category, 28)}</span>
        <span class="duel-rec-name">${escaparHtml(pick.brand)} ${escaparHtml(pick.name)}</span>
      </div>
      <div class="duel-rec-why">${why}</div>
    </div>`;
}

/**
 * Marcador central del duelo dibujado como un procesador: pines alrededor,
 * pistas que llegan desde las dos tarjetas (morado = Componente 1, ámbar =
 * Componente 2) con pulsos de luz, y adentro el VS, el marcador y un ícono por
 * ronda pintado con el color de quien la ganó.
 * Medidas en px: el SVG mide 262 × 174 y sobresale 16 px a cada lado de la
 * columna central (el espacio entre columnas), así las pistas tocan las
 * tarjetas; el chip ocupa de x = 56 a 206 y de y = 12 a 162.
 */
function buildDuelChip(duel) {
  const pinsY = [33, 54.6, 76.2, 97.8, 119.4, 141];
  const pinsX = pinsY.map((y) => y + 44);
  const topBottom = pinsX.map((x) => `M${x},12V0M${x},162V174`).join('');
  const left = pinsY.map((y) => `M56,${y}H44`).join('');
  const right = pinsY.map((y) => `M206,${y}H218`).join('');

  // Cada pista sale de un pin y llega al borde de la tarjeta de su lado
  const inicio = [40, 68, 106, 134];
  const pistas = pinsY.slice(1, 5).flatMap((y, k) => {
    const dx = Math.abs(inicio[k] - y);
    return [
      { d: `M44,${y}H34 L${(34 - dx).toFixed(1)},${inicio[k]} H0`, lado: 'a' },
      { d: `M218,${y}H228 L${(228 + dx).toFixed(1)},${inicio[k]} H262`, lado: 'b' },
    ];
  });
  const trazos = pistas.map((p) => `<path class="duel-chip-trace duel-${p.lado}" d="${p.d}"></path>`).join('');
  const pulsos = pistas.map((p, i) => `<path class="duel-chip-pulse duel-${p.lado}" d="${p.d}" style="animation-delay: ${(-((i * 7) % 16) / 10).toFixed(1)}s"></path>`).join('');
  const iconos = duel.rounds.map((r, i) => `<span class="duel-${r.side}" title="${DUEL_ROUNDS[i].label}">${duelStatIcon(DUEL_ROUNDS[i].icon, 16)}</span>`).join('');

  return `
    <div class="duel-chip">
      <svg class="duel-chip-circuit" width="262" height="174" viewBox="0 0 262 174" aria-hidden="true" focusable="false">
        <g class="duel-chip-traces">${trazos}${pulsos}</g>
        <path class="duel-chip-pins duel-a" d="${topBottom}${left}"></path>
        <path class="duel-chip-pins duel-b" d="${right}"></path>
      </svg>
      <div class="duel-chip-body">
        <div class="duel-score-vs">VS</div>
        <div class="duel-score-num"><span class="duel-a">${duel.winsA}</span><span class="duel-score-sep">—</span><span class="duel-b">${duel.winsB}</span></div>
        <div class="duel-chip-rounds">${iconos}</div>
      </div>
    </div>`;
}

function buildDuelResult(productA, productB) {
  const duel = analyzeDuel(productA, productB);
  const winner = duel.winnerIsA ? productA : productB;
  const nameA = duelShortName(productA, productB);
  const nameB = duelShortName(productB, productA);
  const pillText = duel.tied ? 'GANA EN DESEMPATE' : 'GANADOR';
  const winnerName = `${escaparHtml(winner.brand)} ${escaparHtml(winner.name)}`;
  const headline = duel.tied
    ? `Empate ${duel.winsA} — ${duel.winsB}: ${winnerName} gana por puntaje`
    : `${winnerName} gana ${Math.max(duel.winsA, duel.winsB)} de ${DUEL_ROUNDS.length} rondas`;
  const [potencia, eficiencia, valor] = duel.rounds;

  return `
    <div class="duel-result">
      <h3 class="duel-headline">${headline}</h3>

      <div class="duel-fighters">
        ${buildDuelFighter(productA, 'a', duel.avgA, duel.winnerIsA, pillText)}
        <div class="duel-score">
          ${buildDuelChip(duel)}
          <div class="duel-score-caption">${duel.tied ? 'empate · gana el de mejor puntaje' : 'rondas ganadas'}</div>
        </div>
        ${buildDuelFighter(productB, 'b', duel.avgB, !duel.winnerIsA, pillText)}
      </div>

      <div class="duel-rounds">
        ${duel.rounds.map((round) => buildDuelRound(round, nameA, nameB, productA.category)).join('')}
      </div>

      <div class="duel-recs">
        <h4 class="duel-recs-title">¿Cuál te conviene?</h4>
        <div class="duel-recs-grid">
          ${buildDuelRecommendation(potencia, 'Si buscas potencia pura', productA, productB, duel.winnerIsA)}
          ${buildDuelRecommendation(eficiencia, 'Si te importa el consumo', productA, productB, duel.winnerIsA)}
          ${buildDuelRecommendation(valor, 'Si quieres lo mejor por tu dinero', productA, productB, duel.winnerIsA)}
        </div>
      </div>
    </div>`;
}

function setDuelCategory(category) {
  currentDuelCategory = category;

  document.querySelectorAll('.duel-cat-btn').forEach((btn) => {
    const active = btn.dataset.category === category;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  // Al cambiar de categoría se arranca con los 2 primeros productos de esa categoría.
  populateDuelSelects(true);
}

/**
 * Llena los selectores con los productos de la categoría actual y muestra
 * el duelo. Conserva la elección del usuario si sigue disponible (por
 * ejemplo, cuando catalogo.js recarga los productos desde la API).
 */
function populateDuelSelects(resetSelection = false) {
  const selectA = document.getElementById('duel-select-a');
  const selectB = document.getElementById('duel-select-b');
  if (!selectA || !selectB) return;

  closeDuelLists();
  const previousA = resetSelection ? '' : selectA.value;
  const previousB = resetSelection ? '' : selectB.value;

  // Solo se pueden enfrentar productos que tienen estadísticas de rendimiento.
  const categoryProducts = PRODUCTS.filter((p) => p.category === currentDuelCategory && p.stats);
  const options = ['<option value="">Selecciona un producto…</option>']
    .concat(categoryProducts.map((p) => `<option value="${escaparHtml(p.id)}">${escaparHtml(p.brand)} ${escaparHtml(p.name)}</option>`))
    .join('');

  selectA.innerHTML = options;
  selectB.innerHTML = options;

  const ids = categoryProducts.map((p) => p.id);
  selectA.value = ids.includes(previousA) ? previousA : (ids[0] || '');
  selectB.value = ids.includes(previousB) ? previousB : (ids[1] || '');

  renderDuel();
}

/** Llena la tarjeta de un componente (ícono, nombre, precio y puntaje) con su producto. */
function updateDuelPicker(side, product) {
  const icon = document.getElementById(`duel-picker-icon-${side}`);
  const name = document.getElementById(`duel-picker-name-${side}`);
  const meta = document.getElementById(`duel-picker-meta-${side}`);
  if (!icon || !name || !meta) return;

  icon.innerHTML = duelCategoryIcon(product ? product.category : currentDuelCategory, 28);
  name.textContent = product ? `${product.brand} ${product.name}` : 'Selecciona un producto…';
  meta.textContent = product ? `${formatProductPrice(product.price)} · ${duelDecimal(duelAverage(product))} pts` : '';
}

// ── Lista propia de productos de cada componente ──
// Reemplaza la lista del navegador (que no se puede decorar): cada fila trae
// ícono, nombre, puntaje y precio. El <select> oculto sigue guardando la
// elección, así el resto del código (renderDuel, compareProduct) no cambia.
const DUEL_CHECK_ICON = 'M5 12l5 5 9-10';

function duelOtherSide(side) {
  return side === 'a' ? 'b' : 'a';
}

/** Productos que se pueden enfrentar en la categoría actual (con estadísticas). */
function duelCategoryProducts() {
  return PRODUCTS.filter((p) => p.category === currentDuelCategory && p.stats);
}

/** Dibuja las filas de la lista de un componente según la elección actual. */
function renderDuelList(side) {
  const list = document.getElementById(`duel-list-${side}`);
  const select = document.getElementById(`duel-select-${side}`);
  const other = document.getElementById(`duel-select-${duelOtherSide(side)}`);
  if (!list || !select || !other) return;

  const products = duelCategoryProducts();
  const category = HOME_CATEGORIES.find((c) => c.key === currentDuelCategory);
  const otherTag = side === 'a' ? 'C2' : 'C1';
  const otherName = side === 'a' ? 'Componente 2' : 'Componente 1';
  list.className = `duel-list ${tintClass(currentDuelCategory)}`;

  const rows = products.map((p, i) => {
    const selected = p.id === select.value;
    const taken = p.id === other.value;
    const mark = selected
      ? `<span class="duel-option-check">${duelStatIcon(DUEL_CHECK_ICON, 13)}</span>`
      : taken ? `<span class="duel-option-tag">${otherTag}</span>` : '';
    return `
      <div class="duel-option${selected ? ' is-selected' : ''}" role="option" id="duel-opt-${side}-${i}"
        data-id="${escaparHtml(p.id)}" aria-selected="${selected}"${taken ? ' aria-disabled="true"' : ''}>
        <span class="duel-option-icon">${duelCategoryIcon(p.category, 24)}</span>
        <span class="duel-option-text">
          <span class="duel-option-name">${escaparHtml(p.brand)} ${escaparHtml(p.name)}</span>
          <span class="duel-option-sub">${taken ? `Ya es el ${otherName}` : `${duelDecimal(duelAverage(p))} pts`}</span>
        </span>
        <span class="duel-option-price">${formatProductPrice(p.price)}</span>
        ${mark}
      </div>`;
  }).join('');

  const count = `${products.length} ${products.length === 1 ? 'producto' : (category ? category.plural : 'productos')}`;
  list.innerHTML = `<div class="duel-list-head">${escaparHtml(count)}</div>`
    + (rows || '<div class="duel-list-empty">No hay productos en esta categoría</div>');
}

/** Marca (para el teclado) la fila activa de una lista abierta. */
function setDuelActiveOption(side, option) {
  const list = document.getElementById(`duel-list-${side}`);
  if (!list) return;
  list.querySelectorAll('.duel-option.is-active').forEach((o) => o.classList.remove('is-active'));
  if (option) {
    option.classList.add('is-active');
    list.setAttribute('aria-activedescendant', option.id);
    // Solo se desplaza la lista (no la página) para que la fila activa se vea
    const top = option.offsetTop;
    const bottom = top + option.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  } else {
    list.removeAttribute('aria-activedescendant');
  }
}

function openDuelList(side) {
  closeDuelLists();
  const list = document.getElementById(`duel-list-${side}`);
  const button = document.getElementById(`duel-picker-${side}`);
  if (!list || !button) return;

  renderDuelList(side);
  list.hidden = false;
  button.setAttribute('aria-expanded', 'true');
  button.closest('.duel-select-group')?.classList.add('is-open');
  setDuelActiveOption(side, list.querySelector('.duel-option.is-selected') || list.querySelector('.duel-option:not([aria-disabled])'));
  list.focus({ preventScroll: true });
}

function closeDuelLists() {
  ['a', 'b'].forEach((side) => {
    const list = document.getElementById(`duel-list-${side}`);
    const button = document.getElementById(`duel-picker-${side}`);
    if (list) list.hidden = true;
    if (button) {
      button.setAttribute('aria-expanded', 'false');
      button.closest('.duel-select-group')?.classList.remove('is-open');
    }
  });
}

/** Elige un producto para un componente: actualiza el select oculto y el duelo. */
function chooseDuelOption(side, option) {
  if (!option || option.getAttribute('aria-disabled') === 'true') return;
  const select = document.getElementById(`duel-select-${side}`);
  if (!select) return;
  select.value = option.dataset.id;
  select.dispatchEvent(new Event('change', { bubbles: true }));
  closeDuelLists();
  document.getElementById(`duel-picker-${side}`)?.focus();
}

/** Teclado en la lista: flechas, Inicio/Fin, Enter o Espacio para elegir, Esc para cerrar. */
function handleDuelListKeys(event) {
  const list = event.currentTarget;
  const side = list.id.slice(-1);
  const options = [...list.querySelectorAll('.duel-option:not([aria-disabled])')];
  const current = list.querySelector('.duel-option.is-active');
  const index = options.indexOf(current);

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    const step = event.key === 'ArrowDown' ? 1 : -1;
    setDuelActiveOption(side, options[Math.min(Math.max(index + step, 0), options.length - 1)]);
  } else if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault();
    setDuelActiveOption(side, event.key === 'Home' ? options[0] : options[options.length - 1]);
  } else if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    chooseDuelOption(side, current);
  } else if (event.key === 'Escape') {
    event.preventDefault();
    closeDuelLists();
    document.getElementById(`duel-picker-${side}`)?.focus();
  } else if (event.key === 'Tab') {
    closeDuelLists();
  }
}

/** Conecta los botones de los componentes con sus listas (una sola vez al cargar). */
function initDuelLists() {
  ['a', 'b'].forEach((side) => {
    const button = document.getElementById(`duel-picker-${side}`);
    const list = document.getElementById(`duel-list-${side}`);
    if (!button || !list) return;

    button.addEventListener('click', () => {
      if (list.hidden) openDuelList(side);
      else closeDuelLists();
    });
    button.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        openDuelList(side);
      }
    });
    list.addEventListener('keydown', handleDuelListKeys);
    list.addEventListener('click', (event) => chooseDuelOption(side, event.target.closest('.duel-option')));
    list.addEventListener('mousemove', (event) => {
      const option = event.target.closest('.duel-option:not([aria-disabled])');
      if (option && !option.classList.contains('is-active')) setDuelActiveOption(side, option);
    });
  });

  // Un clic fuera de las tarjetas y sus listas las cierra
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.duel-select-group')) closeDuelLists();
  });
}

function renderDuel() {
  const arena = document.getElementById('duel-arena');
  const selectA = document.getElementById('duel-select-a');
  const selectB = document.getElementById('duel-select-b');
  if (!arena || !selectA || !selectB) return;

  const productA = PRODUCTS.find((p) => p.id === selectA.value);
  const productB = PRODUCTS.find((p) => p.id === selectB.value);
  updateDuelPicker('a', productA);
  updateDuelPicker('b', productB);

  if (!productA || !productB) {
    arena.innerHTML = DUEL_EMPTY_HTML;
    return;
  }

  if (productA.id === productB.id) {
    arena.innerHTML = '<div class="duel-empty">Elige dos productos diferentes para comparar</div>';
    return;
  }

  arena.innerHTML = buildDuelResult(productA, productB);
}

// ── Página de Productos (filtros, búsqueda y vitrina por categoría) ──

/** Íconos extra para distinguir tipos de producto dentro de una misma categoría (caja de 64×64). */
const PRODUCT_TYPE_ICONS = {
  all: 'M8 8h20v20H8zM36 8h20v20H36zM8 36h20v20H8zM36 36h20v20H36z',
  hdd: 'M12 4h40v56H12zM44 26a12 12 0 1 1-24 0a12 12 0 1 1 24 0zM34 26a2 2 0 1 1-4 0a2 2 0 1 1 4 0zM32 26l10 16M20 52h8M36 52h8',
  air: 'M14 6h36v42H14zM14 13h36M14 20h36M14 27h36M14 34h36M14 41h36M22 48v8M32 48v8M42 48v8M16 58h32',
  aio: 'M4 6h56v22H4zM21 17a7 7 0 1 1-14 0a7 7 0 1 1 14 0zM39 17a7 7 0 1 1-14 0a7 7 0 1 1 14 0zM57 17a7 7 0 1 1-14 0a7 7 0 1 1 14 0zM22 28c0 10 2 14 6 18M36 28c0 10-2 14-4 18M22 46h20v12H22z',
  keyboard: 'M4 18h56v28H4zM11 25h2M19 25h2M27 25h2M35 25h2M43 25h2M51 25h2M11 32h2M19 32h2M27 32h2M35 32h2M43 32h2M51 32h2M18 39h28',
  headphones: 'M10 40v-8a22 22 0 0 1 44 0v8M10 40h8v16h-8zM46 40h8v16h-8z',
};

/** Categorías que tienen color propio en Style.css (clases .cat-tint-*). */
const TINTED_CATEGORIES = ['cpu', 'gpu', 'ram', 'almacenamiento', 'placas-madre', 'refrigeracion', 'accesorios', 'fuentes', 'monitores'];

function textoPlano(texto) {
  return String(texto || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Tipo de producto (ícono + etiqueta) según su categoría y su nombre, para
 * que, por ejemplo, un disco duro no se vea igual que un SSD, ni un teclado
 * igual que un mouse.
 */
function productType(product) {
  const texto = textoPlano(`${product.name} ${product.description || ''}`);
  const icono = CATEGORY_ICONS[product.category] || CATEGORY_ICONS.accesorios;

  switch (product.category) {
    case 'cpu': return { icon: icono, label: 'Procesador' };
    case 'gpu': return { icon: icono, label: 'Tarjeta gráfica' };
    case 'ram': return { icon: icono, label: 'Memoria RAM' };
    case 'almacenamiento':
      if (/hdd|disco duro|barracuda/.test(texto)) return { icon: PRODUCT_TYPE_ICONS.hdd, label: 'Disco duro' };
      if (/nvme/.test(texto)) return { icon: icono, label: 'SSD NVMe' };
      return { icon: icono, label: /ssd/.test(texto) ? 'SSD' : 'Almacenamiento' };
    case 'placas-madre': return { icon: icono, label: 'Placa madre' };
    case 'refrigeracion':
      if (/liquid|aio|radiador/.test(texto)) return { icon: PRODUCT_TYPE_ICONS.aio, label: 'Refrigeración líquida' };
      if (/aire|air|disipador/.test(texto)) return { icon: PRODUCT_TYPE_ICONS.air, label: 'Refrigeración por aire' };
      return { icon: icono, label: 'Refrigeración' };
    case 'accesorios':
      if (/teclado|keyboard/.test(texto)) return { icon: PRODUCT_TYPE_ICONS.keyboard, label: 'Teclado' };
      if (/audifono|headset|auricular|diadema/.test(texto)) return { icon: PRODUCT_TYPE_ICONS.headphones, label: 'Audífonos' };
      if (/mouse|raton/.test(texto)) return { icon: icono, label: 'Mouse' };
      return { icon: icono, label: 'Accesorio' };
    case 'fuentes': return { icon: icono, label: 'Fuente de poder' };
    case 'monitores': return { icon: icono, label: 'Monitor' };
    default: return { icon: icono, label: CATEGORY_LABELS[product.category] || 'Producto' };
  }
}

function tintClass(category) {
  return `cat-tint-${TINTED_CATEGORIES.includes(category) ? category : 'otros'}`;
}

function setProductCategory(category) {
  currentProductCategory = category;

  document.querySelectorAll('#products-categories .product-filter').forEach((btn) => {
    const active = btn.dataset.category === category;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  renderProductsGrid();
}

function renderProductsGrid() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const search = currentProductSearch.trim().toLowerCase();
  const filtered = PRODUCTS.filter((p) => {
    const matchesCategory = currentProductCategory === 'all' || p.category === currentProductCategory;
    const matchesSearch = `${p.brand} ${p.name}`.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="products-empty">No encontramos productos con esos filtros. Prueba con otra categoría o búsqueda.</div>';
    return;
  }

  grid.innerHTML = filtered.map((p) => buildProductCard(p)).join('');
}

/**
 * Tarjeta de producto con la vitrina de color de su categoría. Con
 * `featured` se usa en "Productos destacados" del inicio: sin descripción
 * y con un botón para llevar el producto al comparador.
 */
function buildProductCard(p, { featured = false } = {}) {
  const type = productType(p);
  const price = `<div class="product-card-price">${formatProductPrice(p.price)}</div>`;
  const footer = featured
    ? `<div class="product-card-actions">${price}<button class="product-card-compare" data-compare-id="${escaparHtml(p.id)}">Comparar</button></div>`
    : price;

  // En la página de Productos la tarjeta abre la ficha técnica (openProductDetail)
  const openAttrs = featured
    ? ''
    : ` data-product-id="${escaparHtml(p.id)}" role="button" tabindex="0" aria-label="Ver ficha técnica de ${escaparHtml(p.brand)} ${escaparHtml(p.name)}"`;

  return `
    <div class="${featured ? 'featured-card' : 'product-card'} ${tintClass(p.category)}"${openAttrs}>
      <div class="product-card-media">
        <span class="product-card-type">${escaparHtml(type.label)}</span>
        ${lineIconSvg(type.icon, 64, 92, 'product-card-icon')}
      </div>
      <div class="product-card-body">
        <div class="product-card-brand">${escaparHtml(p.brand)}</div>
        <div class="product-card-name">${escaparHtml(p.name)}</div>
        ${!featured && p.description ? `<div class="product-card-desc">${escaparHtml(p.description)}</div>` : ''}
        ${footer}
      </div>
    </div>`;
}

// ── Ficha técnica de un producto (ventana que se abre en Productos) ──

let productDetailTrigger = null;

/** Ficha del producto: la propia o la del producto local equivalente (API). */
function productSpecs(product) {
  return PRODUCT_SPECS[product.id] || (product.refId && PRODUCT_SPECS[product.refId]) || null;
}

function buildProductDetail(product) {
  const type = productType(product);
  const specs = productSpecs(product);
  const hasStats = !!product.stats;
  const score = hasStats ? `${duelDecimal(duelAverage(product))} pts en el comparador` : '';

  const specsHtml = specs
    ? `<dl class="product-specs">${specs.map(([label, value]) => `
        <div class="product-spec"><dt>${escaparHtml(label)}</dt><dd>${escaparHtml(value)}</dd></div>`).join('')}
      </dl>`
    : '<p class="product-detail-empty">La ficha técnica de este producto todavía no está disponible.</p>';

  const statsHtml = hasStats
    ? `<div class="product-detail-section">Rendimiento en el comparador</div>
      <div class="product-stats">${DUEL_ROUNDS.map((round) => {
        const value = product.stats[round.key];
        return `
        <div class="product-stat">
          ${duelStatIcon(round.icon, 15)}
          <span class="product-stat-label">${round.label}</span>
          <span class="product-stat-bar"><span style="width: ${value}%"></span></span>
          <span class="product-stat-value">${value}</span>
        </div>`;
      }).join('')}
      </div>`
    : '';

  return `
    <div class="modal-header product-detail-header">
      <div class="product-detail-icon">${lineIconSvg(type.icon, 64, 28, 'product-detail-svg')}</div>
      <div class="product-detail-tag">${escaparHtml(type.label)} · ${escaparHtml(product.brand)}</div>
      <h2 class="modal-title" id="product-modal-title">${escaparHtml(product.brand)} ${escaparHtml(product.name)}</h2>
      <div class="product-detail-price">${formatProductPrice(product.price)}${score ? `<span>${score}</span>` : ''}</div>
    </div>
    ${product.description ? `<p class="product-detail-desc">${escaparHtml(product.description)}</p>` : ''}
    <div class="product-detail-section">Ficha técnica</div>
    ${specsHtml}
    ${statsHtml}
    ${hasStats ? `<button type="button" class="btn btn-primary btn-full product-detail-compare" data-compare-id="${escaparHtml(product.id)}">Comparar este producto</button>` : ''}
    <p class="product-detail-note">Datos de referencia del fabricante; pueden variar según la versión del producto.</p>`;
}

/** Abre la ventana con la ficha técnica del producto. */
function openProductDetail(productId, trigger) {
  const product = PRODUCTS.find((p) => p.id === productId);
  const modal = document.getElementById('product-modal');
  const box = document.getElementById('product-modal-box');
  const content = document.getElementById('product-modal-content');
  if (!product || !modal || !box || !content) return;

  box.className = `modal product-modal ${tintClass(product.category)}`;
  content.innerHTML = buildProductDetail(product);
  productDetailTrigger = trigger || null;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  box.scrollTop = 0;
  document.getElementById('product-modal-close')?.focus();
}

function closeProductDetail() {
  const modal = document.getElementById('product-modal');
  if (!modal || !modal.classList.contains('active')) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  if (productDetailTrigger && document.body.contains(productDetailTrigger)) productDetailTrigger.focus();
  productDetailTrigger = null;
}

/** Conecta las tarjetas de Productos y la ventana (una sola vez al cargar). */
function initProductDetail() {
  const grid = document.getElementById('products-grid');
  const modal = document.getElementById('product-modal');
  if (!grid || !modal) return;

  grid.addEventListener('click', (event) => {
    const card = event.target.closest('[data-product-id]');
    if (card) openProductDetail(card.dataset.productId, card);
  });
  grid.addEventListener('keydown', (event) => {
    const card = event.target.closest('[data-product-id]');
    if (card && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      openProductDetail(card.dataset.productId, card);
    }
  });

  document.getElementById('product-modal-close')?.addEventListener('click', closeProductDetail);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeProductDetail();
      return;
    }
    const compare = event.target.closest('[data-compare-id]');
    if (compare) {
      productDetailTrigger = null;
      closeProductDetail();
      compareProduct(compare.dataset.compareId);
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeProductDetail();
  });
}

// ── Página de Inicio: categorías, duelo del día y productos destacados ──

/** Categorías en el orden en que se muestran en el inicio. */
const HOME_CATEGORIES = [
  { key: 'cpu', label: 'Procesadores', plural: 'procesadores' },
  { key: 'gpu', label: 'Tarjetas Gráficas', plural: 'tarjetas gráficas' },
  { key: 'ram', label: 'Memorias RAM', plural: 'memorias RAM' },
  { key: 'almacenamiento', label: 'Almacenamiento', plural: 'unidades de almacenamiento' },
  { key: 'placas-madre', label: 'Placas Madre', plural: 'placas madre' },
  { key: 'refrigeracion', label: 'Refrigeración', plural: 'sistemas de refrigeración' },
  { key: 'accesorios', label: 'Accesorios', plural: 'accesorios' },
  { key: 'fuentes', label: 'Fuentes de Poder', plural: 'fuentes de poder' },
  { key: 'monitores', label: 'Monitores', plural: 'monitores' },
];
/** Categorías de las que sale un producto en "Productos destacados". */
const HOME_FEATURED_CATEGORIES = ['cpu', 'gpu', 'almacenamiento', 'monitores'];
const ARROW_ICON = 'M5 12h14M13 6l6 6-6 6';
const BOLT_ICON = 'M13 2L4 14h7l-1 8 9-12h-7l1-8z';

function renderHomeCategories() {
  const grid = document.getElementById('home-categories');
  if (!grid) return;

  grid.innerHTML = HOME_CATEGORIES.map((c) => {
    const count = PRODUCTS.filter((p) => p.category === c.key).length;
    return `
      <button class="home-cat ${tintClass(c.key)}" data-home-category="${c.key}">
        <span class="home-cat-icon">${lineIconSvg(CATEGORY_ICONS[c.key], 64, 40, 'home-cat-svg')}</span>
        <span class="home-cat-text">
          <span class="home-cat-name">${c.label}</span>
          <span class="home-cat-count">${count} ${count === 1 ? 'producto' : 'productos'}</span>
        </span>
        ${lineIconSvg(ARROW_ICON, 24, 20, 'home-cat-arrow')}
      </button>`;
  }).join('');
}

/**
 * Elige el duelo del día: cada día rota entre las categorías que tienen al
 * menos 2 productos comparables y enfrenta a los 2 primeros (los mismos que
 * abre el comparador al elegir esa categoría).
 */
function pickDuelOfDay(date = new Date()) {
  const candidates = HOME_CATEGORIES
    .map((c) => ({ ...c, items: PRODUCTS.filter((p) => p.category === c.key && p.stats) }))
    .filter((c) => c.items.length >= 2);
  if (candidates.length === 0) return null;

  const dayNumber = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
  const pick = candidates[dayNumber % candidates.length];
  return { category: pick.key, plural: pick.plural, productA: pick.items[0], productB: pick.items[1] };
}

function buildHomeDuelFighter(product, side, isWinner, pillText) {
  return `
    <div class="home-duel-fighter duel-${side}${isWinner ? ' is-winner' : ''}">
      <div class="home-duel-icon">${duelCategoryIcon(product.category, 64)}</div>
      <div class="home-duel-name">${escaparHtml(product.name)}</div>
      ${isWinner ? `<div class="duel-pill">${pillText}</div>` : ''}
    </div>`;
}

function renderHomeDuel() {
  const box = document.getElementById('home-duel');
  if (!box) return;

  const pick = pickDuelOfDay();
  if (!pick) {
    box.innerHTML = '';
    return;
  }

  const { productA, productB } = pick;
  const duel = analyzeDuel(productA, productB);
  const nameA = duelShortName(productA, productB);
  const nameB = duelShortName(productB, productA);
  const pillText = duel.tied ? 'GANA EN DESEMPATE' : 'GANADOR';

  const rounds = duel.rounds.map((r) => {
    const result = r.side === 'empate' ? 'Empate' : `+${r.diff} ${escaparHtml(r.side === 'a' ? nameA : nameB)}`;
    return `
      <div class="home-duel-round duel-${r.side}">
        ${duelStatIcon(r.icon, 16)}
        <span class="home-duel-round-label">${r.label}</span>
        <span class="home-duel-round-result">${result}</span>
      </div>`;
  }).join('');

  box.innerHTML = `
    <div class="home-duel-card">
      <div class="home-duel-intro">
        <div class="home-duel-badge">${duelStatIcon(BOLT_ICON, 14)}DUELO DEL DÍA</div>
        <h3 class="home-duel-title">¿${escaparHtml(productA.name)} o ${escaparHtml(productB.name)}?</h3>
        <p class="home-duel-sub">Dos ${pick.plural}, 4 rondas. Mira quién gana y por cuánto.</p>
      </div>
      <div class="home-duel-vs">
        ${buildHomeDuelFighter(productA, 'a', duel.winnerIsA, pillText)}
        <div class="home-duel-score">
          <div class="duel-score-vs">VS</div>
          <div class="duel-score-num"><span class="duel-a">${duel.winsA}</span><span class="duel-score-sep">—</span><span class="duel-b">${duel.winsB}</span></div>
        </div>
        ${buildHomeDuelFighter(productB, 'b', !duel.winnerIsA, pillText)}
      </div>
      <div class="home-duel-rounds">
        ${rounds}
        <button class="btn btn-primary home-duel-btn" data-duel-category="${pick.category}">Ver duelo completo →</button>
      </div>
    </div>`;
}

function renderHomeFeatured() {
  const grid = document.getElementById('home-featured');
  if (!grid) return;

  // El producto más popular de cada categoría (o el primero si no tiene estadísticas).
  const popularidad = (p) => (p.stats ? p.stats.popularidad : -1);
  const picks = HOME_FEATURED_CATEGORIES.map((category) => {
    const items = PRODUCTS.filter((p) => p.category === category);
    return items.length ? items.reduce((best, p) => (popularidad(p) > popularidad(best) ? p : best)) : null;
  }).filter(Boolean);

  grid.innerHTML = picks.map((p) => buildProductCard(p, { featured: true })).join('');
}

/** Portada: las 9 categorías del mosaico y el total de productos. */
function renderHeroMosaic() {
  const cats = document.getElementById('hero-mosaic-cats');
  if (cats) {
    cats.innerHTML = HOME_CATEGORIES.map((c) => {
      const count = PRODUCTS.filter((p) => p.category === c.key).length;
      return `
        <button class="hero-tile ${tintClass(c.key)}" data-home-category="${c.key}">
          ${lineIconSvg(CATEGORY_ICONS[c.key], 64, 36, 'hero-tile-icon')}
          <span class="hero-tile-text">
            <span class="hero-tile-name">${c.label}</span>
            <span class="hero-tile-count">${count} ${count === 1 ? 'producto' : 'productos'}</span>
          </span>
        </button>`;
    }).join('');
  }

  const total = document.getElementById('hero-product-count');
  if (total) total.textContent = PRODUCTS.length;
}

// ── Portada: el mosaico como un chip ──
// Todo se mide en "unidades de diseño": el mosaico ocupa de 0 a 560 en
// ambos ejes, el marco del chip va de -16 a 576 y los pines de -32 a -16
// (y de 576 a 592). Los SVG del chip se escalan junto con el mosaico
// (ver .hero-chip-svg en Style.css), por eso las pistas siempre llegan a
// los pines. A los lados las pistas se cortan con el borde de la ventana;
// las de abajo siguen hacia la sección siguiente y se desvanecen (máscara
// en .hero-chip-svg), así no se ve una división al bajar por el Inicio.
const HERO_CHIP_VIEW = { x: -1356, y: -281, w: 2600, h: 1381 };
/** 21 pines por lado, cada 26 unidades, centrados en el lado del chip. */
const HERO_CHIP_PINS = Array.from({ length: 21 }, (_, i) => 20 + i * 26);
/** Colores de las categorías (los mismos de las fichas del mosaico). */
const HERO_CHIP_COLORS = ['#a78bfa', '#34d399', '#60a5fa', '#f472b6', '#fbbf24', '#22d3ee', '#fb923c', '#a3e635', '#f87171'];

/** Recorridos de las pistas: cada una empieza en un pin y sale hacia afuera. */
function heroChipTraces() {
  const left = HERO_CHIP_VIEW.x;
  const right = HERO_CHIP_VIEW.x + HERO_CHIP_VIEW.w;
  const top = HERO_CHIP_VIEW.y;
  const bottom = HERO_CHIP_VIEW.y + HERO_CHIP_VIEW.h;
  const traces = [];

  // Tres pistas arriba a la izquierda (pasan por encima del texto de la portada)
  [[20, -55, -616], [46, -33, -486], [72, -11, left]].forEach(([pinY, lineY, endX], k) => {
    const bendX = -44 - k * 14;
    traces.push([[-32, pinY], [bendX, pinY], [bendX - (pinY - lineY), lineY], [endX, lineY]]);
  });
  // Tres pistas abajo a la izquierda (pasan por debajo del botón)
  [[540, 615, -596], [514, 593, left], [488, 571, -446]].forEach(([pinY, lineY, endX], k) => {
    const bendX = -44 - k * 14;
    traces.push([[-32, pinY], [bendX, pinY], [bendX - (lineY - pinY), lineY], [endX, lineY]]);
  });
  // Pines de arriba y de abajo (uno sí y uno no) hacia los bordes de la portada
  HERO_CHIP_PINS.filter((_, i) => i % 2 === 0).forEach((x, k) => {
    const dx = k % 2 ? -12 : 12;
    traces.push([[x, -32], [x, -51], [x + dx, -63], [x + dx, top]]);
  });
  HERO_CHIP_PINS.filter((_, i) => i % 2 === 1).forEach((x, k) => {
    const dx = k % 2 ? 12 : -12;
    traces.push([[x, 592], [x, 611], [x + dx, 623], [x + dx, bottom]]);
  });
  // Pines de la derecha hacia el borde derecho
  HERO_CHIP_PINS.filter((_, i) => i % 2 === 0).forEach((y) => traces.push([[592, y], [right, y]]));

  return traces.map((points, i) => ({ points, color: HERO_CHIP_COLORS[i % HERO_CHIP_COLORS.length] }));
}

/** Dibuja pines, pistas y pulsos del chip de la portada (una sola vez). */
function renderHeroChip() {
  const glow = document.getElementById('hero-chip-glow');
  const circuit = document.getElementById('hero-chip-circuit');
  const pulses = document.getElementById('hero-chip-pulses');
  if (!glow || !circuit || !pulses || circuit.childElementCount) return;

  const view = HERO_CHIP_VIEW;
  const pathData = (points) => 'M' + points.map(([x, y]) => `${x},${y}`).join(' L');
  const insideView = ([x, y]) => x > view.x && x < view.x + view.w && y > view.y && y < view.y + view.h;
  const traces = heroChipTraces();

  const pins = HERO_CHIP_PINS.map((p) => `<path d="M${p},-16V-32M${p},576V592M-16,${p}H-32M576,${p}H592"></path>`).join('');
  const lines = traces.map(({ points, color }) => `<path d="${pathData(points)}" stroke="${color}"></path>`).join('');
  const pads = traces.map(({ points, color }) => {
    const bends = points.slice(1, -1)
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5" fill="${color}"></circle>`).join('');
    const end = points[points.length - 1];
    const endPad = insideView(end)
      ? `<circle cx="${end[0]}" cy="${end[1]}" r="5" fill="#07070e" stroke="${color}" stroke-width="2"></circle>`
      : '';
    return bends + endPad;
  }).join('');

  glow.innerHTML = lines;
  circuit.innerHTML = `<g class="hero-chip-pins">${pins}</g><g class="hero-chip-traces">${lines}</g>${pads}`;
  // Cada pulso tiene su propia velocidad y arranque para que no viajen todos juntos
  pulses.innerHTML = traces.map(({ points, color }, i) => {
    const duration = (1.8 + ((i * 7) % 16) / 10).toFixed(1);
    const delay = (-((i * 13) % 30) / 10).toFixed(1);
    const timing = `animation-duration: ${duration}s; animation-delay: ${delay}s`;
    const d = pathData(points);
    return `<path class="hero-chip-halo" d="${d}" stroke="${color}" style="${timing}"></path>`
      + `<path class="hero-chip-pulse" d="${d}" stroke="${color}" style="${timing}"></path>`;
  }).join('');
}

// ── Fondo de circuito de todas las páginas ──
// Chip pequeño arriba a la derecha con pistas de colores. Las coordenadas
// están en un lienzo de 1280 de ancho con el chip centrado en (1100, 165);
// el SVG muestra solo la franja derecha (x de 842 a 1282) y se pega al borde
// derecho de la ventana, así el chip queda siempre a la misma distancia.
const FONDO_CHIP = { x: 1100, y: 165, mitad: 55 };
const FONDO_CHIP_INICIO_X = 842;

/** Recorridos de las pistas del chip del fondo (cada una sale de un pin). */
function fondoChipTraces() {
  const { x: cx, y: cy, mitad } = FONDO_CHIP;
  const izquierda = cx - mitad - 12;
  const derecha = cx + mitad + 12;
  const arriba = cy - mitad - 12;
  const abajo = cy + mitad + 12;
  return [
    // Hacia la izquierda, terminan en un pad junto al título de la página
    [[izquierda, 125], [990, 125], [950, 85], [880, 85]],
    [[izquierda, 141], [976, 141], [946, 111], [858, 111]],
    [[izquierda, 157], [900, 157]],
    [[izquierda, 173], [976, 173], [946, 203], [868, 203]],
    [[izquierda, 189], [990, 189], [950, 229], [892, 229]],
    // Hacia abajo, recorren todo el alto de la ventana
    [[cx - 40, abajo], [1060, 262], [1020, 302], [1020, 1400]],
    [[cx - 8, abajo], [1092, 1400]],
    [[cx + 24, abajo], [1124, 270], [1164, 310], [1164, 1400]],
    [[cx + 40, abajo], [1140, 252], [1196, 308], [1282, 308]],
    // Hacia la derecha y hacia arriba, salen por el borde
    [[derecha, 141], [1282, 141]],
    [[derecha, 173], [1282, 173]],
    [[derecha, 205], [1210, 205], [1240, 235], [1282, 235]],
    [[cx - 24, arriba], [1076, -2]],
    [[cx + 8, arriba], [1108, -2]],
  ];
}

/**
 * Arma el SVG de un grupo de pistas: líneas, puntos en los quiebres, un pad
 * al final (si no termina en el borde) y uno o dos pulsos de luz quietos.
 * `dentro(punto)` dice si un punto está dentro del dibujo (no en el borde) y
 * `altoVisible` limita dónde se ponen los pulsos en las pistas muy largas.
 */
function dibujarPistas(traces, { colorInicial = 0, dentro, altoVisible = Infinity }) {
  const trazo = (points) => 'M' + points.map(([x, y]) => `${x},${y}`).join(' L');
  let lineas = '';
  let puntos = '';
  let pulsos = '';
  traces.forEach((points, i) => {
    const color = HERO_CHIP_COLORS[(colorInicial + i) % HERO_CHIP_COLORS.length];
    lineas += `<path d="${trazo(points)}" stroke="${color}" stroke-width="2" opacity="0.85"></path>`;
    points.slice(1, -1).forEach(([x, y]) => {
      puntos += `<circle cx="${x}" cy="${y}" r="2.5" fill="${color}"></circle>`;
    });
    const fin = points[points.length - 1];
    if (dentro(fin)) {
      puntos += `<circle cx="${fin[0]}" cy="${fin[1]}" r="5" fill="#07070e" stroke="${color}" stroke-width="2"></circle>`;
    }
    // Pulsos sobre el tramo más largo (recortado a la parte visible)
    let tramo = [points[0], points[1]];
    let largo = 0;
    for (let k = 1; k < points.length; k++) {
      const [ax, ay] = points[k - 1];
      const [bx, by] = points[k];
      const finY = Math.min(by, altoVisible);
      const l = Math.hypot(bx - ax, finY - ay);
      if (l > largo) { largo = l; tramo = [[ax, ay], [bx, finY]]; }
    }
    const [[ax, ay], [bx, by]] = tramo;
    (largo > 300 ? [0.3, 0.75] : [0.5]).forEach((t) => {
      const px = Math.round(ax + (bx - ax) * t);
      const py = Math.round(ay + (by - ay) * t);
      pulsos += `<circle cx="${px}" cy="${py}" r="8" fill="${color}" opacity="0.35"></circle>`
        + `<circle cx="${px}" cy="${py}" r="3.5" fill="#ffffff" stroke="${color}" stroke-width="2"></circle>`;
    });
  });
  return { lineas, puntos, pulsos };
}

/** Dibuja el fondo de circuito (chip arriba a la derecha y pistas de la esquina). */
function renderFondoCircuito() {
  const svgChip = document.getElementById('fondo-circuito-chip');
  const svgEsquina = document.getElementById('fondo-circuito-esquina');
  if (!svgChip || !svgEsquina || svgChip.childElementCount) return;

  const { x: cx, y: cy, mitad } = FONDO_CHIP;
  const pistas = dibujarPistas(fondoChipTraces(), {
    dentro: ([x, y]) => x > FONDO_CHIP_INICIO_X && x < 1280 && y > 0 && y < 1400,
    altoVisible: 720,
  });
  const pines = [-40, -24, -8, 8, 24, 40].map((o) => `M${cx + o},${cy - mitad}V${cy - mitad - 12}`
    + `M${cx + o},${cy + mitad}V${cy + mitad + 12}`
    + `M${cx - mitad},${cy + o}H${cx - mitad - 12}`
    + `M${cx + mitad},${cy + o}H${cx + mitad + 12}`).join('');
  const hexagono = Array.from({ length: 6 }, (_, k) => {
    const angulo = (Math.PI / 180) * (-90 + 60 * k);
    return `${(cx + 17 * Math.cos(angulo)).toFixed(1)},${(cy + 17 * Math.sin(angulo)).toFixed(1)}`;
  }).join(' ');
  const cuerpo = `<rect x="${cx - mitad}" y="${cy - mitad}" width="${2 * mitad}" height="${2 * mitad}" rx="12" fill="#0d0d18" stroke="#a855f7" stroke-width="2.5"></rect>`;

  svgChip.innerHTML = `
    <defs><filter id="fondo-brillo" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="6"></feGaussianBlur></filter></defs>
    <g transform="translate(${-FONDO_CHIP_INICIO_X} 0)">
      <g filter="url(#fondo-brillo)" opacity="0.85">${pistas.lineas}${cuerpo}</g>
      <path d="${pines}" stroke="rgba(124,58,237,0.8)" stroke-width="4" stroke-linecap="butt"></path>
      ${pistas.lineas}
      ${cuerpo}
      <rect x="${cx - mitad + 18}" y="${cy - mitad + 18}" width="${2 * mitad - 36}" height="${2 * mitad - 36}" rx="6" fill="none" stroke="rgba(192,132,252,0.45)" stroke-width="1.5"></rect>
      <polygon points="${hexagono}" fill="rgba(124,58,237,0.35)" stroke="#c084fc" stroke-width="2"></polygon>
      <circle cx="${cx - mitad + 10}" cy="${cy - mitad + 10}" r="2.5" fill="#c084fc"></circle>
      ${pistas.puntos}
      ${pistas.pulsos}
    </g>`;

  // Dos pistas cortas que entran por la esquina inferior izquierda
  const esquina = dibujarPistas([
    [[-2, 18], [130, 18], [156, 44], [300, 44]],
    [[-2, 40], [100, 40], [120, 60], [210, 60]],
  ], { colorInicial: 5, dentro: ([x, y]) => x > 0 && x < 310 && y > 0 && y < 72 });
  svgEsquina.innerHTML = esquina.lineas + esquina.puntos + esquina.pulsos;
}

/** Vuelve a dibujar las secciones del inicio que dependen del catálogo. */
function renderHomeSections() {
  renderHeroMosaic();
  renderHomeCategories();
  renderHomeDuel();
  renderHomeFeatured();
}

function goToProductCategory(category) {
  showPage('productos');
  setProductCategory(category);
}

/** Abre el comparador con este producto como Componente 1. */
function compareProduct(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  showPage('comparador');
  setDuelCategory(product.category);

  const selectA = document.getElementById('duel-select-a');
  const selectB = document.getElementById('duel-select-b');
  if (!selectA || !selectB) return;

  const options = [...selectA.options].map((o) => o.value).filter(Boolean);
  if (!options.includes(product.id)) return;
  selectA.value = product.id;
  if (selectB.value === product.id) selectB.value = options.find((id) => id !== product.id) || '';
  renderDuel();
}

// Inicializa los eventos cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', () => {
  // Cierra los modales al hacer clic fuera de su contenido
  const loginModal = document.getElementById('login-modal');
  if (loginModal) {
    loginModal.addEventListener('click', (event) => {
      if (event.target === loginModal) {
        toggleLogin(false);
      }
    });
  }

  const registerModal = document.getElementById('register-modal');
  if (registerModal) {
    registerModal.addEventListener('click', (event) => {
      if (event.target === registerModal) {
        toggleRegister(false);
      }
    });
  }

  const articleModal = document.getElementById('article-modal');
  if (articleModal) {
    articleModal.addEventListener('click', (event) => {
      if (event.target === articleModal) {
        toggleArticle(false);
      }
    });
  }

  document.querySelectorAll('[data-article]').forEach((card) => {
    card.addEventListener('click', () => openArticle(card.dataset.article));
  });

  // Los botones de login pueden abrir el modal directamente, o bien delegar
  // en auth.js (si el usuario ya inició sesión, auth.js reemplaza este
  // comportamiento por el menú desplegable de cuenta).
  document.querySelectorAll('[data-login]').forEach((button) => {
    button.addEventListener('click', () => toggleLogin(true));
  });

  document.querySelectorAll('[data-open-register]').forEach((el) => {
    el.addEventListener('click', () => {
      toggleLogin(false);
      toggleRegister(true);
    });
  });

  document.querySelectorAll('[data-open-login]').forEach((el) => {
    el.addEventListener('click', () => {
      toggleRegister(false);
      toggleLogin(true);
    });
  });

  document.querySelectorAll('.duel-cat-btn').forEach((btn) => {
    btn.classList.add(tintClass(btn.dataset.category));
    btn.insertAdjacentHTML('afterbegin', duelCategoryIcon(btn.dataset.category, 18));
    btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    btn.addEventListener('click', () => setDuelCategory(btn.dataset.category));
  });

  populateDuelSelects();
  initDuelLists();
  initProductDetail();
  const selectDuelA = document.getElementById('duel-select-a');
  const selectDuelB = document.getElementById('duel-select-b');
  if (selectDuelA) selectDuelA.addEventListener('change', renderDuel);
  if (selectDuelB) selectDuelB.addEventListener('change', renderDuel);

  document.querySelectorAll('#products-categories .product-filter').forEach((btn) => {
    const icono = btn.dataset.category === 'all' ? PRODUCT_TYPE_ICONS.all : CATEGORY_ICONS[btn.dataset.category];
    if (icono) btn.insertAdjacentHTML('afterbegin', lineIconSvg(icono, 64, 18, 'product-filter-icon'));
    btn.addEventListener('click', () => setProductCategory(btn.dataset.category));
  });

  const productsSearch = document.getElementById('products-search');
  if (productsSearch) {
    productsSearch.addEventListener('input', (event) => {
      currentProductSearch = event.target.value;
      renderProductsGrid();
    });
  }
  renderProductsGrid();

  // Página de inicio: categorías, duelo del día y destacados se dibujan con
  // los productos del catálogo; los clics se manejan con un solo listener.
  renderFondoCircuito();
  renderHeroChip();
  renderHomeSections();
  const paginaInicio = document.getElementById('page-inicio');
  if (paginaInicio) {
    paginaInicio.addEventListener('click', (event) => {
      const categoria = event.target.closest('[data-home-category]');
      if (categoria) {
        goToProductCategory(categoria.dataset.homeCategory);
        return;
      }
      const duelo = event.target.closest('[data-duel-category]');
      if (duelo) {
        showPage('comparador');
        setDuelCategory(duelo.dataset.duelCategory);
        return;
      }
      const comparar = event.target.closest('[data-compare-id]');
      if (comparar) compareProduct(comparar.dataset.compareId);
    });
  }

  // Formulario de contacto: no hay endpoint de backend para esto todavía,
  // así que solo confirmamos el envío al usuario y limpiamos el formulario.
  const contactoForm = document.getElementById('contacto-form');
  if (contactoForm) {
    contactoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (typeof mostrarExito === 'function') {
        mostrarExito('¡Mensaje enviado! Te responderemos pronto.');
      }
      contactoForm.reset();
    });
  }

  // Punto de enganche para los módulos nuevos (auth.js / planes.js / cuenta.js
  // / admin.js): cada uno expone su propio inicializador solo si el script
  // correspondiente fue cargado, así este archivo no depende directamente
  // de ellos ni se rompe si alguno falta.
  if (typeof window.inicializarAuth === 'function') window.inicializarAuth();
  if (typeof window.inicializarPlanes === 'function') window.inicializarPlanes();
  if (typeof window.inicializarCuenta === 'function') window.inicializarCuenta();
  if (typeof window.inicializarAdmin === 'function') window.inicializarAdmin();
  if (typeof window.inicializarCatalogo === 'function') window.inicializarCatalogo();

  showPage('inicio');
});

window.showPage = showPage;
window.toggleLogin = toggleLogin;
window.toggleRegister = toggleRegister;
window.toggleArticle = toggleArticle;
