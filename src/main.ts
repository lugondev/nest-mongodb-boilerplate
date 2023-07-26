import { NestFactory } from "@nestjs/core";
import headers from "helmet";
import rateLimit from "express-rate-limit";
import { AppModule } from "./modules/app/app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

/**
 * The url endpoint for open api ui
 * @type {string}
 */
export const SWAGGER_API_ROOT = "api/docs";
/**
 * The name of the api
 * @type {string}
 */
export const SWAGGER_API_NAME = "API";
/**
 * A short description of the api
 * @type {string}
 */
export const SWAGGER_API_DESCRIPTION = "API Description";
/**
 * Current version of the api
 * @type {string}
 */
export const SWAGGER_API_CURRENT_VERSION = "1.0";

(async () => {
    const app = await NestFactory.create(AppModule, {});
    const options = new DocumentBuilder()
        .setTitle(SWAGGER_API_NAME)
        .setDescription(SWAGGER_API_DESCRIPTION)
        .setVersion(SWAGGER_API_CURRENT_VERSION)
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
    app.enableCors();

    const expressRateLimiter = rateLimit({
        max: 100,
        windowMs: 60000,
    });

    app.use(headers());
    app.use(expressRateLimiter);
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(8080).then(() => {
        console.log("Listening on port 8080");
    });
})();
