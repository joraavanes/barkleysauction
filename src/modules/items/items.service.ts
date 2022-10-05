import { Service } from "typedi";

@Service()
export class ItemsService {
    constructor() { }

    getItems() {
        return [{
            id: 1,
            title: 'Product 1',
            price: 19.99
        }, {
            id: 2,
            title: 'Product 2',
            price: 29.99
        }];
    }
}