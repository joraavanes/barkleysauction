import Container from "typedi";
import { ItemsController } from "./items.controller";
import { ItemsService } from "./items.service";
import { routeMapper } from './routeMapper'

const itemsController = Container.get(ItemsController);
const itemsService = Container.get(ItemsService);

export {
    itemsService,
    itemsController,
    routeMapper
}

