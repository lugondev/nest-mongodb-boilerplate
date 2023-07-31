import {Module} from "@nestjs/common";
import {MongooseModule, MongooseModuleAsyncOptions} from "@nestjs/mongoose";
import {AccessControlModule} from "nest-access-control";
import {LoggerModule} from "nestjs-pino";
import * as winston from "winston";
import * as rotateFile from "winston-daily-rotate-file";
import {AuthModule} from "../auth/auth.module";
import {ConfigModule} from "../config/config.module";
import {ConfigService} from "../config/config.service";
import {ProfileModule} from "../profile/profile.module";
import {WinstonModule} from "../winston/winston.module";
import {AppController} from "./app.controller";
import {roles} from "./app.roles";
import {AppService} from "./app.service";

@Module({
    imports: [
        LoggerModule.forRoot({
            pinoHttp: {
                transport: {
                    target: "pino-pretty",
                    options: {
                        singleLine: true,
                    },
                },
                // redact: ["req.headers", "res.headers"],
                serializers: {
                    req: (req) => ({
                        method: req.method,
                        url: req.url,
                        query: req.query,
                    }),
                    res: (res) => ({
                        statusCode: res.statusCode,
                    }),
                },
            },
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                ({
                    uri: configService.get("DB_URL"),
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                } as MongooseModuleAsyncOptions),
        }),
        WinstonModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return configService.isEnv("dev")
                    ? {
                        level: "info",
                        format: winston.format.json(),
                        defaultMeta: {service: "user-service"},
                        transports: [
                            new winston.transports.Console({
                                format: winston.format.simple(),
                            }),
                        ],
                    }
                    : {
                        level: "info",
                        format: winston.format.json(),
                        defaultMeta: {service: "user-service"},
                        transports: [
                            new winston.transports.File({
                                filename: "logs/error.log",
                                level: "error",
                            }),
                            new winston.transports.Console({
                                format: winston.format.simple(),
                            }),
                            new rotateFile({
                                filename: "logs/application-%DATE%.log",
                                datePattern: "YYYY-MM-DD",
                                zippedArchive: true,
                                maxSize: "20m",
                                maxFiles: "14d",
                            }),
                        ],
                    };
            },
        }),
        AccessControlModule.forRoles(roles),
        ConfigModule,
        AuthModule,
        ProfileModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
