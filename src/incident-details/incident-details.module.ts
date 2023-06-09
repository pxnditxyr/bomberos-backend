import { Module } from '@nestjs/common';
import { IncidentDetailsService } from './incident-details.service';
import { IncidentDetailsController } from './incident-details.controller';

@Module({
  controllers: [IncidentDetailsController],
  providers: [IncidentDetailsService]
})
export class IncidentDetailsModule {}
