import { Module } from "@nestjs/common";
import UserRepository from "./user.repository";
import { DatabaseModule } from "src/common/database/database.module";

@Module({
    imports: [DatabaseModule],
    providers: [UserRepository],
    exports: [UserRepository]
})
export class RepositoryModule {}