import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductsService {
    constructor(
        private usersSerivce: UsersService
    ) { }
}
