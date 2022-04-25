import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { BidsModule } from './bids/bids.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, ProductsModule, BidsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
