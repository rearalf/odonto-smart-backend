import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { ToothDto } from '../dto/tooth.dto';
import { Tooth } from '../entities/tooth.entity';
import { TOOTH_FACE_AFFECTION, TOOTH_STATE } from '@/common/enums/tooth.enum';

@Injectable()
export class ToothService {
  async applyTeethModifications(
    manager: EntityManager,
    appointmentOdontogramId: number,
    generalOdontogramId: number,
    teeth: ToothDto[],
  ): Promise<void> {
    const generalTeeth = await manager.getRepository(Tooth).find({
      where: { odontogram_id: generalOdontogramId },
    });

    const generalMap = new Map<number, Tooth>();
    generalTeeth.forEach((t) => generalMap.set(t.tooth_number, t));

    const teethToInsert: Partial<Tooth>[] = [];
    const teethToDelete: number[] = [];

    for (const tooth of teeth) {
      const allHealthy =
        tooth.general_state === TOOTH_STATE.HEALTHY &&
        tooth.palatina === TOOTH_FACE_AFFECTION.HEALTHY &&
        tooth.distal === TOOTH_FACE_AFFECTION.HEALTHY &&
        tooth.mesial === TOOTH_FACE_AFFECTION.HEALTHY &&
        tooth.vestibular === TOOTH_FACE_AFFECTION.HEALTHY &&
        tooth.oclusal === TOOTH_FACE_AFFECTION.HEALTHY;

      const prev = generalMap.get(tooth.tooth_number);

      const unchanged =
        prev &&
        prev.general_state === tooth.general_state &&
        prev.palatina === tooth.palatina &&
        prev.distal === tooth.distal &&
        prev.mesial === tooth.mesial &&
        prev.vestibular === tooth.vestibular &&
        prev.oclusal === tooth.oclusal;

      if (unchanged) continue;

      if (allHealthy && prev) {
        teethToDelete.push(prev.id);
        continue;
      }

      teethToInsert.push({
        odontogram_id: appointmentOdontogramId,
        tooth_number: tooth.tooth_number,
        general_state: tooth.general_state,
        palatina: tooth.palatina,
        distal: tooth.distal,
        mesial: tooth.mesial,
        vestibular: tooth.vestibular,
        oclusal: tooth.oclusal,
      });

      if (prev) {
        await manager.getRepository(Tooth).update(prev.id, tooth);
      } else if (!allHealthy) {
        await manager.getRepository(Tooth).save({
          odontogram_id: generalOdontogramId,
          tooth_number: tooth.tooth_number,
          general_state: tooth.general_state,
          palatina: tooth.palatina,
          distal: tooth.distal,
          mesial: tooth.mesial,
          vestibular: tooth.vestibular,
          oclusal: tooth.oclusal,
        });
      }
    }

    if (teethToDelete.length) {
      await manager.getRepository(Tooth).delete(teethToDelete);
    }

    if (teethToInsert.length) {
      await manager.getRepository(Tooth).save(teethToInsert);
    }
  }
}
