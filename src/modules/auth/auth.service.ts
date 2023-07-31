import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "../config/config.service";
import {IProfile} from "../profile/profile.model";
import {ProfileService} from "../profile/profile.service";
import {LoginPayload} from "./payload/login.payload";

/**
 * Models a typical Login/Register route return body
 */
export interface ITokenReturnBody {
    /**
     * When the token is to expire in seconds
     */
    expires: string;
    /**
     * A human-readable format of expires
     */
    expiresPrettyPrint: string;
    /**
     * The Bearer token
     */
    token: string;
}

/**
 * Authentication Service
 */
@Injectable()
export class AuthService {
    /**
     * Time in seconds when the token is to expire
     * @type {string}
     */
    private readonly expiration: string;

    /**
     * Constructor
     * @param {JwtService} jwtService jwt service
     * @param {ConfigService} configService
     * @param {ProfileService} profileService profile service
     */
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly profileService: ProfileService,
    ) {
        this.expiration = this.configService.get("WEBTOKEN_EXPIRATION_TIME");
    }

    /**
     * Formats the time in seconds into human-readable format
     * @param {string} time
     * @returns {string} hrf time
     */
    private static prettyPrintSeconds(time: string): string {
        const nTime = Number(time);
        const hours = Math.floor(nTime / 3600);
        const minutes = Math.floor((nTime % 3600) / 60);
        const seconds = Math.floor((nTime % 3600) % 60);

        const times = [];
        if (hours > 0) {
            times.push(`${hours}h`);
        }
        if (minutes > 0) {
            times.push(`${minutes}m`);
        }
        if (seconds > 0) {
            times.push(`${seconds}s`);
        }
        return times.join(" ").trim();
    }

    /**
     * Creates a signed jwt token based on IProfile payload
     * @param {Profile} param dto to generate token from
     * @returns {Promise<ITokenReturnBody>} token body
     */
    async createToken({
                          _id,
                          username,
                          email,
                          avatar,
                      }: IProfile): Promise<ITokenReturnBody> {
        return {
            expires: this.expiration,
            expiresPrettyPrint: AuthService.prettyPrintSeconds(this.expiration),
            token: this.jwtService.sign({_id, username, email, avatar}),
        };
    }

    /**
     * Validates whether or not the profile exists in the database
     * @param {LoginPayload} payload login payload to authenticate with
     * @returns {Promise<IProfile>} registered profile
     */
    async validateUser(payload: LoginPayload): Promise<IProfile> {
        const user = await this.profileService.getByUsernameAndPass(
            payload.username,
            payload.password,
        );
        if (!user) {
            throw new UnauthorizedException(
                "Could not authenticate. Please try again.",
            );
        }
        return user;
    }
}
