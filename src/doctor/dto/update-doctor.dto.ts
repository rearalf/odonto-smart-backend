import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateDoctorDto } from './create-doctor.dto';

// Opción 2: Excluir campos que no deberían actualizarse
export class UpdateDoctorDto extends PartialType(
  OmitType(CreateDoctorDto, ['person_type_id'] as const),
) {}
