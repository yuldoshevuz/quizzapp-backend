import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RequestWithUser } from "src/common/interfaces/request-with-user.interface";
import { LibraryRepository } from "src/repository/library.repository";
import { LibraryResponseDto } from "./dto/library.dto";
import { CreateLibraryDto } from "./dto/create-library.dto";
import { CardRepository } from "src/repository/card.repository";

@Injectable()
export class LibraryService {
  constructor(
    private readonly libraryRepository: LibraryRepository,
    private readonly cardRepository: CardRepository
  ) {}

  async getAll(req: RequestWithUser): Promise<LibraryResponseDto> {
    const userId = req.user.id;
    const library = await this.libraryRepository.findAll(userId, { card: { isPublic: true } });

    return { library }
  }

  async createNewItem(req: RequestWithUser, dto: CreateLibraryDto): Promise<LibraryResponseDto> {
    const userId = req.user.id;
    const cardId = dto.cardId;

    const existsItem = await this.libraryRepository.findOne({AND: [{cardId}, {userId}]});
    if (existsItem) throw new BadRequestException('This card is already in your library');
    
    const existsCard = await this.cardRepository.findOne({ id: cardId, isPublic: true });
    if (!existsCard) throw new NotFoundException('Card not found with this id');
    
    await this.libraryRepository.create({ cardId, userId });
    return this.getAll(req);
  }
}