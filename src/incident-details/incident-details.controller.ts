import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncidentDetailsService } from './incident-details.service';
import { CreateIncidentDetailDto } from './dto/create-incident-detail.dto';
import { UpdateIncidentDetailDto } from './dto/update-incident-detail.dto';

@Controller('incident-details')
export class IncidentDetailsController {
  constructor(private readonly incidentDetailsService: IncidentDetailsService) {}

  @Post()
  create(@Body() createIncidentDetailDto: CreateIncidentDetailDto) {
    return this.incidentDetailsService.create(createIncidentDetailDto);
  }

  @Get()
  findAll() {
    return this.incidentDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incidentDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncidentDetailDto: UpdateIncidentDetailDto) {
    return this.incidentDetailsService.update(+id, updateIncidentDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incidentDetailsService.remove(+id);
  }
}
