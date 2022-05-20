import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';

@Module({
  providers: [BidsService],
  controllers: [BidsController]
})
export class BidsModule {}
