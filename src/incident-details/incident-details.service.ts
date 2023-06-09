import { Injectable } from '@nestjs/common';
import { CreateIncidentDetailDto } from './dto/create-incident-detail.dto';
import { UpdateIncidentDetailDto } from './dto/update-incident-detail.dto';

@Injectable()
export class IncidentDetailsService {
  create(createIncidentDetailDto: CreateIncidentDetailDto) {
    return 'This action adds a new incidentDetail';
  }

  findAll() {
    return `This action returns all incidentDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incidentDetail`;
  }

  update(id: number, updateIncidentDetailDto: UpdateIncidentDetailDto) {
    return `This action updates a #${id} incidentDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} incidentDetail`;
  }
}
