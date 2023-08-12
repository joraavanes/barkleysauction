import Container from "typedi";
import { BidsController } from "./bids.controller";
import { routeMapper } from './routeMapper';
import { BidsRepository } from "./bids.repository";

const bidsController = Container.get(BidsController);
const bidsRepository = Container.get(BidsRepository);

export {
  bidsController,
  bidsRepository,
  routeMapper
}