import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CountryModule } from './presentation/modules/country.module';
import { ProvinceModule } from './presentation/modules/province.module';

@Module({
  imports: [CountryModule, ProvinceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
