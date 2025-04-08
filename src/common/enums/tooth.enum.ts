export enum TOOTH_STATE {
  HEALTHY = 'healthy', // El diente está en buen estado, sin caries ni restauraciones.
  DECAYED = 'decayed', // El diente tiene caries (cavidades) y puede requerir tratamiento.
  EXTRACTION = 'extraction', // El diente está en proceso de extracción.
  EXTRACTION_DONE = 'extraction_done', // El diente ha sido extraído con éxito.
  MISSING = 'missing', // El diente está ausente, ya sea por causas naturales o por extracción previa.
  FILLING = 'filling', // El diente tiene un empaste para restaurarlo.
  CROWN = 'crown', // El diente tiene una corona colocada para cubrirlo y protegerlo.
  ROOT_CANAL = 'root_canal', // El diente ha recibido tratamiento de conductos radiculares.
  IMPLANTED = 'implanted', // El diente ha sido reemplazado por un implante.
  BRIDGE_ABUTMENT = 'bridge_abutment', // El diente actúa como pilar para un puente dental.
  BRIDGE_PONTIC = 'bridge_pontic', // El diente ha sido reemplazado por un pontic (diente falso) como parte de un puente.
}

export enum TOOTH_FACE_AFFECTION {
  HEALTHY = 'healthy', // La cara está en buen estado, sin caries ni restauraciones.
  DECAY = 'decay', // Caries en la cara específica del diente.
  FILLING = 'filling', // Relleno o empaste en la cara específica del diente.
  CROWN = 'crown', // Corona colocada en la cara específica del diente.
  FRACTURE = 'fracture', // Fractura o fisura en la cara específica del diente.
  SEALANT = 'sealant', // Sellado en la cara específica (por ejemplo, sellante de fosas y fisuras).
  BRIDGE = 'bridge', // Reemplazo de diente con puente en la cara específica del diente.
  IMPLANT = 'implant', // Implante colocado en la cara específica del diente.
  ABSCESS = 'abscess', // Absceso o infección en la cara específica del diente.
  WEAR = 'wear', // Desgaste en la cara específica del diente (por ejemplo, por bruxismo).
  EROSION = 'erosion', // Erosión del esmalte en la cara específica del diente debido a ácidos.
  STAIN = 'stain', // Manchas o decoloración en la cara específica del diente.
  CHIPPED = 'chipped', // Diente astillado o con fragmentos rotos en la cara específica.
  SENSITIVE = 'sensitive', // Sensibilidad en la cara específica del diente.
}

export const VALID_TOOTH_NUMBERS = [
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18, // Cuadrante 1
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28, // Cuadrante 2
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38, // Cuadrante 3
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48, // Cuadrante 4
  51,
  52,
  53,
  54,
  55, // Dientes temporales superiores
  61,
  62,
  63,
  64,
  65, // Dientes temporales superiores
  71,
  72,
  73,
  74,
  75, // Dientes temporales inferiores
  81,
  82,
  83,
  84,
  85, // Dientes temporales inferiores
];
