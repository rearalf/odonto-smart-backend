import { ApiResponse, ApiSecurity } from '@nestjs/swagger';
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';

// import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
// import { PERMISSIONS_ENUM, TABLES_ENUM } from 'src/config/permissions.config';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Specialty } from './entities/specialty.entity';
import { SpecialtyService } from './specialty.service';
import {
  getSpecialByIdSchema,
  updateSpecialtySchema,
  deleteSpecialtySchema,
  getAllSpecialtiesSchema,
} from './schemas/specialty.schemas';

@ApiSecurity('access_cookie')
@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Post()
  @ApiResponse({ description: 'Create a new specialty', type: Specialty })
  // @RequirePermissions(PERMISSIONS_ENUM.CREATE + TABLES_ENUM.SPECIALTY)
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtyService.create(createSpecialtyDto);
  }

  @Get()
  @ApiResponse(getAllSpecialtiesSchema)
  // @RequirePermissions(PERMISSIONS_ENUM.VIEW + TABLES_ENUM.SPECIALTY)
  findAll() {
    return this.specialtyService.findAll();
  }

  @Get(':id')
  @ApiResponse(getSpecialByIdSchema)
  // @RequirePermissions(PERMISSIONS_ENUM.VIEW + TABLES_ENUM.SPECIALTY)
  findOne(@Param('id') id: string) {
    return this.specialtyService.findOneById(+id);
  }

  @Patch(':id')
  @ApiResponse(updateSpecialtySchema)
  // @RequirePermissions(PERMISSIONS_ENUM.UPDATE + TABLES_ENUM.SPECIALTY)
  update(
    @Param('id') id: number,
    @Body() updateSpecialtyDto: UpdateSpecialtyDto,
  ) {
    return this.specialtyService.update(+id, updateSpecialtyDto);
  }

  @Delete(':id')
  @ApiResponse(deleteSpecialtySchema)
  // @RequirePermissions(PERMISSIONS_ENUM.DELETE + TABLES_ENUM.SPECIALTY)
  remove(@Param('id') id: number) {
    return this.specialtyService.remove(id);
  }
}
