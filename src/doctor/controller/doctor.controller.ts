import {
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Response as ResponseExpress } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseInterceptors,
  Param,
  Delete,
  Query,
  Response,
} from '@nestjs/common';

import { DoctorService } from '../services/doctor.service';

import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { UpdateDoctorDto } from '../dto/update-doctor.dto';
import { FilterDoctorDto } from '../dto/filter-doctor.dto';
import { IDoctorResponse } from '@/common/dto/doctor.dto';

import { Specialty } from '../entities/specialty.entity';
import { Doctor } from '../entities/doctor.entity';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(AnyFilesInterceptor())
  @ApiOperation({
    summary: 'Create a doctor',
    description: 'Returns a new doctor.',
  })
  @ApiOkResponse({
    description: 'The doctor has been created.',
  })
  async create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return await this.doctorService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve a list of doctors',
    description:
      'Returns a list of doctors with basic information, including their main specialty, secondary specialties, qualification, and contact details.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the list of doctors.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          specialty: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 2 },
              name: { type: 'string', example: 'Orthodontics' },
              description: {
                type: 'string',
                example: 'Aligning teeth and jaws',
              },
            },
          },
          secondary_specialties: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 3 },
                name: { type: 'string', example: 'Periodontics' },
                description: {
                  type: 'string',
                  example: 'Gum disease treatment',
                },
              },
            },
          },
          qualification: {
            type: 'string',
            example:
              'Graduated from X University with a specialty in Orthodontics.',
          },
          profile_picture: {
            type: 'string',
            example: 'https://example.com/images/profile.jpg',
          },
          full_name: {
            type: 'string',
            example: 'Dr. John Smith',
          },
          email: {
            type: 'string',
            example: 'john.smith@example.com',
          },
        },
      },
    },
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search keyword to filter doctors by name or email.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page.',
  })
  async findAll(
    @Query() filterDoctorDto: FilterDoctorDto,
    @Response() res: ResponseExpress,
  ): Promise<
    ResponseExpress<
      {
        id: number;
        specialty: {
          id: number;
          name: string;
          description: string;
        };
        secondary_specialties: Specialty[];
        qualification: string;
        profile_picture: string;
        full_name: string;
        email: string;
      }[]
    >
  > {
    const response = await this.doctorService.findAll(filterDoctorDto, res);
    return res.json(response);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get only one doctor',
    description:
      'Returns all the information about a doctor by id, except user information.',
  })
  @ApiOkResponse({
    description:
      'Get all the information about a doctor by id, except user information.',
  })
  async findOne(@Param('id') id: number): Promise<IDoctorResponse> {
    return await this.doctorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a doctor',
    description: 'Returns the minimum data about the updated doctor by id.',
  })
  @ApiOkResponse({
    description: 'Returns the minimum data about the updated doctor by id.',
  })
  update(
    @Param('id') id: number,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ): string {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Soft removed of a doctor',
    description: 'Soft delete of a doctor by id, this operation is permanent.',
  })
  @ApiOkResponse({
    description: 'Returns the string.',
  })
  remove(@Param('id') id: number): string {
    return this.doctorService.remove(id);
  }
}
