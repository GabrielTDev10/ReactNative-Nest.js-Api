import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LocationsController } from './locations.controller';
import { LocationsProviders } from './locations.providers';
import { LocationsService } from './locations.service';
import { TokenModule } from 'src/token/token.module';


@Module({
  imports: [DatabaseModule,TokenModule],
  controllers: [LocationsController],
  providers: [
    ...LocationsProviders,
    LocationsService,
  ],
  exports: [LocationsService]
})
export class LocationsModule {}