import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CountryModule } from './presentation/modules/country.module';
import { ProvinceModule } from './presentation/modules/province.module';
import { LocalityModule } from './presentation/modules/locality.module';

@Module({
  imports: [CountryModule, ProvinceModule, LocalityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
