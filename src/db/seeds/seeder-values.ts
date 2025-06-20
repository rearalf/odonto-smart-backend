import { PERMISSIONS_ENUM, TABLES_ENUM } from '@/common/enums/permission.enum';
import {
  IPerson,
  IBasicSeeds,
  IPermissions,
  IRolePermissionSeed,
} from './seeders.interface';

export const personTypeSeeds: IBasicSeeds[] = [
  {
    id: 1,
    name: 'Administrador',
    description: 'Persona con permisos administrativos generales.',
  },
  {
    id: 2,
    name: 'Recepcionista',
    description: 'Persona que agenda citas y gestiona la clínica.',
  },
  {
    id: 3,
    name: 'Asistente Dental',
    description: 'Persona que asiste al profesional de salud.',
  },
  {
    id: 4,
    name: 'Doctor',
    description: 'Profesional de la salud que atiende a los pacientes.',
  },
  {
    id: 5,
    name: 'Paciente',
    description: 'Persona que recibe tratamiento en la clínica.',
  },
];

export const specialtiesSeeds: IBasicSeeds[] = [
  {
    id: 1,
    name: 'Ortodoncia',
    description:
      'Se enfoca en la corrección de los dientes y mandíbulas desalineadas, utilizando aparatos como frenillos, alineadores y otros dispositivos.',
  },
  {
    id: 2,
    name: 'Periodoncia',
    description:
      'Trata enfermedades de las encías y otros tejidos que soportan los dientes, como la gingivitis y la periodontitis.',
  },
  {
    id: 3,
    name: 'Endodoncia',
    description:
      'Se especializa en los tratamientos del conducto radicular, es decir, la extracción o tratamiento de los nervios infectados de los dientes.',
  },
  {
    id: 4,
    name: 'Prostodoncia',
    description:
      'Se encarga de la restauración y reemplazo de dientes perdidos o dañados con prótesis dentales, coronas, puentes, dentaduras y otros dispositivos.',
  },
  {
    id: 5,
    name: 'Odontopediatría',
    description:
      'Se dedica al cuidado dental infantil, abarcando desde los dientes temporales hasta los permanentes, con un enfoque en la prevención y el tratamiento.',
  },
  {
    id: 6,
    name: 'Cirugía Oral y Maxilofacial',
    description:
      'Se ocupa de procedimientos quirúrgicos relacionados con los dientes, encías, mandíbula y otros componentes de la cavidad bucal.',
  },
  {
    id: 7,
    name: 'Radiología Oral y Maxilofacial',
    description:
      'Se especializa en el uso de imágenes diagnósticas (radiografías, tomografías, etc.) para evaluar enfermedades y condiciones dentales..',
  },
  {
    id: 8,
    name: 'Odontología Estética',
    description:
      'Se centra en mejorar la apariencia de los dientes, con procedimientos como blanqueo dental, carillas, y otros tratamientos estéticos.',
  },
  {
    id: 9,
    name: 'Medicina Oral',
    description:
      'Diagnóstico y tratamiento de enfermedades no quirúrgicas que afectan los tejidos blandos de la boca, como úlceras, infecciones y trastornos orales.',
  },
  {
    id: 10,
    name: 'Odontología Forense',
    description:
      'Aplicación de la odontología para resolver casos legales, como la identificación de personas a partir de restos dentales.',
  },
  {
    id: 11,
    name: 'Geriatría Odontológica',
    description:
      'Se ocupa de los problemas dentales y orales relacionados con el envejecimiento y el cuidado dental de personas mayores.',
  },
];

export const permissionSeeds: IPermissions[] = [
  // DOCTOR
  {
    id: 1,
    name: `${PERMISSIONS_ENUM.CREATE}_${TABLES_ENUM.DOCTOR}`,
    description: 'Permite crear doctores',
    label: 'Crear doctores',
  },
  {
    id: 2,
    name: `${PERMISSIONS_ENUM.VIEW_ONE}_${TABLES_ENUM.DOCTOR}`,
    description: 'Permite consultar un perfil de doctor',
    label: 'Ver perfil de doctor',
  },
  {
    id: 3,
    name: `${PERMISSIONS_ENUM.VIEW_ALL}_${TABLES_ENUM.DOCTOR}`,
    description: 'Permite consultar todos los doctores',
    label: 'Ver todos los doctores',
  },
  {
    id: 4,
    name: `${PERMISSIONS_ENUM.UPDATE}_${TABLES_ENUM.DOCTOR}`,
    description: 'Permite actualizar doctores',
    label: 'Actualizar doctores',
  },
  {
    id: 5,
    name: `${PERMISSIONS_ENUM.DELETE}_${TABLES_ENUM.DOCTOR}`,
    description: 'Permite eliminar doctores',
    label: 'Eliminar doctores',
  },

  // ROLE
  {
    id: 6,
    name: `${PERMISSIONS_ENUM.CREATE}_${TABLES_ENUM.ROLE}`,
    description: 'Permite crear roles',
    label: 'Crear roles',
  },
  {
    id: 7,
    name: `${PERMISSIONS_ENUM.VIEW_ONE}_${TABLES_ENUM.ROLE}`,
    description: 'Permite consultar un perfil de rol',
    label: 'Ver perfil de rol',
  },
  {
    id: 8,
    name: `${PERMISSIONS_ENUM.VIEW_ALL}_${TABLES_ENUM.ROLE}`,
    description: 'Permite consultar todos los roles',
    label: 'Ver todos los roles',
  },
  {
    id: 9,
    name: `${PERMISSIONS_ENUM.UPDATE}_${TABLES_ENUM.ROLE}`,
    description: 'Permite actualizar roles',
    label: 'Actualizar roles',
  },
  {
    id: 10,
    name: `${PERMISSIONS_ENUM.DELETE}_${TABLES_ENUM.ROLE}`,
    description: 'Permite eliminar roles',
    label: 'Eliminar roles',
  },
];

export const roleSeeds: IBasicSeeds[] = [
  {
    id: 1,
    name: 'GOD',
    description: 'Tiene todos los permisos',
  },
];

export const rolePermissionSeeds: IRolePermissionSeed[] = [
  {
    id: 1,
    role_id: 1,
    permission_id: 1,
  },
  {
    id: 1,
    role_id: 1,
    permission_id: 2,
  },
  {
    id: 1,
    role_id: 1,
    permission_id: 3,
  },
  {
    id: 1,
    role_id: 1,
    permission_id: 4,
  },
  {
    id: 1,
    role_id: 1,
    permission_id: 5,
  },
  {
    id: 1,
    role_id: 1,
    permission_id: 6,
  },
  {
    id: 1,
    role_id: 1,
    permission_id: 7,
  },
  {
    id: 1,
    role_id: 1,
    permission_id: 8,
  },
  {
    id: 1,
    role_id: 1,
    permission_id: 9,
  },
  {
    id: 1,
    role_id: 1,
    permission_id: 10,
  },
];

export const personSeeds: IPerson[] = [
  {
    id: 1,
    first_name: 'Admin',
    last_name: 'Admin',
    person_type_id: 1,
    user_id: 1,
  },
];
