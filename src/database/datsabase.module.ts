
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/enum/entity/user.entity";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
      useFactory: async (
        ConfigService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'mysql',
        host: ConfigService.get('MYSQL_HOST'),
        port: ConfigService.get('MYSQL_PORT'),
        username: ConfigService.get('MYSQL_USER'),
        password: ConfigService.get('MYSQL_PASSWORD'),
        database: ConfigService.get('DB_NAME'),
        entities: [User],
        synchronize: true,
      }),
                inject: [ConfigService]
            }),
        ]
        }) 
        export class DatabaseModule {}