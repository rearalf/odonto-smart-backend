import { PERMISSIONS_ENUM, TABLES_ENUM } from 'src/config/permissions.config';

export const roleSeeds: IBasicSeeds[] = [
  {
    name: 'GOD',
    description: 'Tiene todos los permisos',
  },
];

export enum ContactTypeEnum {
  CEL = 'cel',
  TEL = 'tel',
  EMAIL = 'email',
}

export enum GenderEnum {
  MAN = 'man',
  WOMAN = 'women',
}

export const permissionSeeds: IBasicSeeds[] = [
  {
    name: PERMISSIONS_ENUM.CREATE + TABLES_ENUM.USER,
    description: 'Puede crear ususarios',
  },
  {
    name: PERMISSIONS_ENUM.VIEW + TABLES_ENUM.USER,
    description: 'Puede consultar perfiles de ususario',
  },
  {
    name: PERMISSIONS_ENUM.VIEW + TABLES_ENUM.USER + 's',
    description: 'Puede consultar todos los ususarios',
  },
  {
    name: PERMISSIONS_ENUM.UPDATE + TABLES_ENUM.USER,
    description: 'Puede actulizar usuarios',
  },
  {
    name: PERMISSIONS_ENUM.DELETE + TABLES_ENUM.USER,
    description: 'Puede eliminar usuarios',
  },
  {
    name: PERMISSIONS_ENUM.CREATE + TABLES_ENUM.ROLE,
    description: 'Puede crear roles',
  },
  {
    name: PERMISSIONS_ENUM.VIEW + TABLES_ENUM.ROLE,
    description: 'Puede consultar perfiles de rol',
  },
  {
    name: PERMISSIONS_ENUM.VIEW + TABLES_ENUM.ROLE + 's',
    description: 'Puede consultar todos los roles',
  },
  {
    name: PERMISSIONS_ENUM.UPDATE + TABLES_ENUM.ROLE,
    description: 'Puede actulizar roles',
  },
  {
    name: PERMISSIONS_ENUM.DELETE + TABLES_ENUM.ROLE,
    description: 'Puede eliminar roles',
  },
];

export const personTypeSeeds: IBasicSeeds[] = [
  {
    name: 'Administrador',
    description: 'Persona con permisos administrativos generales.',
  },
  {
    name: 'Recepcionista',
    description: 'Persona que agenda citas y gestiona la clínica.',
  },
  {
    name: 'Asistente Dental',
    description: 'Persona que asiste al profesional de salud.',
  },
  {
    name: 'Doctor',
    description: 'Profesional de la salud que atiende a los pacientes.',
  },
  {
    name: 'Paciente',
    description: 'Persona que recibe tratamiento en la clínica.',
  },
];

export const specialtiesSeeds: IBasicSeeds[] = [
  {
    name: 'Ortodoncia',
    description:
      'Se enfoca en la corrección de los dientes y mandíbulas desalineadas, utilizando aparatos como frenillos, alineadores y otros dispositivos.',
  },
  {
    name: 'Periodoncia',
    description:
      'Trata enfermedades de las encías y otros tejidos que soportan los dientes, como la gingivitis y la periodontitis.',
  },
  {
    name: 'Endodoncia',
    description:
      'Se especializa en los tratamientos del conducto radicular, es decir, la extracción o tratamiento de los nervios infectados de los dientes.',
  },
  {
    name: 'Prostodoncia',
    description:
      'Se encarga de la restauración y reemplazo de dientes perdidos o dañados con prótesis dentales, coronas, puentes, dentaduras y otros dispositivos.',
  },
  {
    name: 'Odontopediatría',
    description:
      'Se dedica al cuidado dental infantil, abarcando desde los dientes temporales hasta los permanentes, con un enfoque en la prevención y el tratamiento.',
  },
  {
    name: 'Cirugía Oral y Maxilofacial',
    description:
      'Se ocupa de procedimientos quirúrgicos relacionados con los dientes, encías, mandíbula y otros componentes de la cavidad bucal.',
  },
  {
    name: 'Radiología Oral y Maxilofacial',
    description:
      'Se especializa en el uso de imágenes diagnósticas (radiografías, tomografías, etc.) para evaluar enfermedades y condiciones dentales..',
  },
  {
    name: 'Odontología Estética',
    description:
      'Se centra en mejorar la apariencia de los dientes, con procedimientos como blanqueo dental, carillas, y otros tratamientos estéticos.',
  },
  {
    name: 'Medicina Oral',
    description:
      'Diagnóstico y tratamiento de enfermedades no quirúrgicas que afectan los tejidos blandos de la boca, como úlceras, infecciones y trastornos orales.',
  },
  {
    name: 'Odontología Forense',
    description:
      'Aplicación de la odontología para resolver casos legales, como la identificación de personas a partir de restos dentales.',
  },
  {
    name: 'Geriatría Odontológica',
    description:
      'Se ocupa de los problemas dentales y orales relacionados con el envejecimiento y el cuidado dental de personas mayores.',
  },
];
