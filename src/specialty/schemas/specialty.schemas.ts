import { ApiResponseOptions } from '@nestjs/swagger';

export const getAllSpecialtiesSchema: ApiResponseOptions = {
  description: 'Endpoint to finding all specialties',
  schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        name: { type: 'string', example: 'Ortodoncia' },
        description: {
          type: 'string',
          example:
            'Se enfoca en la corrección de los dientes y mandíbulas desalineadas, utilizando aparatos como frenillos, alineadores y otros dispositivos.',
        },
      },
    },
  },
};

export const getSpecialByIdSchema: ApiResponseOptions = {
  description: 'Endpoint to finding specialty by Id',
  schema: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      name: { type: 'string', example: 'Ortodoncia' },
      description: {
        type: 'string',
        example:
          'Se enfoca en la corrección de los dientes y mandíbulas desalineadas, utilizando aparatos como frenillos, alineadores y otros dispositivos.',
      },
      created_at: { type: 'date', example: '2025-02-06T16:01:14.448Z' },
      updated_at: { type: 'date', example: '2025-02-06T16:01:14.448Z' },
    },
  },
};

const sharedShemca = {
  affected: { type: 'number', example: 1 },
  specialty: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      name: { type: 'string', example: 'Ortodoncia' },
      description: {
        type: 'string',
        example:
          'Se enfoca en la corrección de los dientes y mandíbulas desalineadas, utilizando aparatos como frenillos, alineadores y otros dispositivos.',
      },
      created_at: { type: 'date', example: '2025-02-06T16:01:14.448Z' },
      updated_at: { type: 'date', example: '2025-02-06T16:01:14.448Z' },
    },
  },
};

export const updateSpecialtySchema: ApiResponseOptions = {
  description: 'Endpoint to updating specialty data.',
  schema: {
    type: 'object',
    properties: sharedShemca,
  },
};

export const deleteSpecialtySchema: ApiResponseOptions = {
  description: 'Endpoint to deleting specialty',
  schema: {
    type: 'object',
    properties: sharedShemca,
  },
};
