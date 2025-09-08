import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { ToothDto } from '../dto/tooth.dto';
import { Tooth } from '../entities/tooth.entity';
import { TOOTH_FACE_AFFECTION, TOOTH_STATE } from '@/common/enums/tooth.enum';

@Injectable()
export class ToothService {
  async applyTeethModifications(
    manager: EntityManager,
    odontogram_id: number,
    teeth: ToothDto[],
  ): Promise<void> {
    for (const tooth of teeth) {
      const existingTooth = await manager.getRepository(Tooth).findOne({
        where: { odontogram_id, tooth_number: tooth.tooth_number },
      });

      const allHealthy =
        tooth.general_state === TOOTH_STATE.HEALTHY &&
        tooth.palatina === TOOTH_FACE_AFFECTION.HEALTHY &&
        tooth.distal === TOOTH_FACE_AFFECTION.HEALTHY &&
        tooth.mesial === TOOTH_FACE_AFFECTION.HEALTHY &&
        tooth.vestibular === TOOTH_FACE_AFFECTION.HEALTHY &&
        tooth.oclusal === TOOTH_FACE_AFFECTION.HEALTHY;

      if (existingTooth) {
        if (allHealthy) {
          await manager.getRepository(Tooth).delete(existingTooth.id);
        } else {
          await manager
            .getRepository(Tooth)
            .save({ ...existingTooth, ...tooth });
        }
      } else {
        if (!allHealthy) {
          await manager.getRepository(Tooth).save({
            odontogram_id,
            ...tooth,
          });
        }
      }
    }
  }
}
