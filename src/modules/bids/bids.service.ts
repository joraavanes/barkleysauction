import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { ItemsRepository } from "../items/items.repository";
import { UsersRepository } from '../auth/users.respository';
import { BidsRepository } from "./bids.repository";
import { CreateBidDto } from './dtos/createBid.dto';
import { Bid } from './bid.model';
import { Pagination } from '@/src/db/types';

@Service()
export class BidsService {
  constructor(
    private bidsRepo: BidsRepository,
    private usersRepo: UsersRepository,
    private itemsRepo: ItemsRepository
  ) { }

  /**
   * 
   * @param itemId 
   * @returns Highest bid registered for the item
   */
  async getHighestBid(itemId: string) {
    const bids = await this.getBidsOfItem(itemId, {
      limit: Number.MAX_SAFE_INTEGER,
      offset: 0
    });
    const bidPrices = bids.map(bid => bid.price);
    return Math.max(...bidPrices);
  }

  /**
   * 
   * @param dto Dto object to add a new bid
   * @returns Returns bid insert result
   */
  async addBidToItem(dto: CreateBidDto) {
    const item = await this.itemsRepo.findOne({ _id: new ObjectId(dto.item) });
    const user = await this.usersRepo.findOne({ _id: new ObjectId(dto.bidder) });

    if (!item || !user) throw new Error('Item not found');

    const topBid = await this.getHighestBid(dto.item);

    if (topBid >= dto.price) {
      throw new Error('You must bid higher than the current highest bid.')
    }

    const model: Bid = {
      ...dto,
      price: dto.price,
      createdAt: new Date(),
      item: item._id,
      bidder: user._id
    } as Bid;

    return this.bidsRepo.create(model);
  }

  /**
   * 
   * @param bidId Bid id
   * @returns Returns deletion result
   */
  async delete(bidId: string) {
    const bid = await this.bidsRepo.findOne({ _id: new ObjectId(bidId) })

    if (!bid) throw new Error('Bid is not registered.');

    return this.bidsRepo.delete({ _id: new ObjectId(bidId) })
  }

  /**
   * 
   * @param itemId Item id
   * @param pagination pagination data to specify the data length
   * @returns List of bids for specific item
   */
  async getBidsOfItem(itemId: string, { limit, offset }: Pagination) {
    const bids = await this.bidsRepo.filter({ item: new ObjectId(itemId) }, { limit, offset });

    const bidsPayload = bids.length ? await Promise.all(bids.map(async bid => {
      const user = await this.usersRepo.findOne({ _id: new ObjectId(bid.bidder) });

      if (!user) return bid;

      return {
        ...bid,
        bidder: user?.firstname
      };
    })) : bids;

    return bidsPayload;
  }
}