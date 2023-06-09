import { PartialType } from '@nestjs/mapped-types';
import { CreateIncidentDetailDto } from './create-incident-detail.dto';

export class UpdateIncidentDetailDto extends PartialType(CreateIncidentDetailDto) {}
