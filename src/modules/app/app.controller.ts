import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { Request } from "express";
import { AuthGuard } from "@nestjs/passport";

/**
 * App Controller
 */
@Controller()
@ApiBearerAuth()
export class AppController {
    /**
     * Constructor
     * @param appService
     */
    constructor(private readonly appService: AppService) {}

    /**
     * Returns the an environment variable from config file
     * @returns {string} the application environment url
     */
    @Get()
    @UseGuards(AuthGuard("jwt"))
    @ApiResponse({ status: 200, description: "Request Received" })
    @ApiResponse({ status: 400, description: "Request Failed" })
    getString(): { root: string } {
        return {
            root: this.appService.root(),
        };
    }

    /**
     * Fetches request metadata
     * @param {Req} req the request body
     * @returns {Partial<Request>} the request user populated from the passport module
     */
    @Get("request/user")
    // @UseGuards(AuthGuard("jwt"))
    @ApiResponse({ status: 200, description: "Request Received" })
    @ApiResponse({ status: 400, description: "Request Failed" })
    getProfile(@Req() req): Partial<Request> {
        return req.user;
    }
}
