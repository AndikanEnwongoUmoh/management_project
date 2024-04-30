
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { Product } from "src/product/entities/product.entity";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
      useFactory: async (
        ConfigService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'mysql',
        host: ConfigService.getOrThrow('DB_HOST'),
        port: ConfigService.getOrThrow('DB_PORT'),
        username: ConfigService.getOrThrow('DB_USER'),
        password: ConfigService.getOrThrow('DB_PASSWORD'),
        database: ConfigService.getOrThrow('DB_NAME'),
        entities: [User, Product],
        synchronize: false,
        dropSchema: false,
        migrationsRun:true
      }),
                inject: [ConfigService]
            }),
        ]
        }) 
        export class DatabaseModule {}