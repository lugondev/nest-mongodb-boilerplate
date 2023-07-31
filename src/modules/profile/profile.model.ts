import { Document, Schema } from "mongoose";
import { AppRoles } from "modules/app/app.roles";

/**
 * Mongoose Profile Schema
 */
export const Profile = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    roles: [{ type: String }],

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

/**
 * Mongoose Profile Document
 */
export interface IProfile extends Document {
    /**
     * UUID
     */
    readonly _id: Schema.Types.ObjectId;
    /**
     * Username
     */
    readonly username: string;
    /**
     * Email
     */
    readonly email: string;
    /**
     * Name
     */
    readonly name: string;
    /**
     * Password
     */
    password: string;
    /**
     * Gravatar
     */
    readonly avatar: string;
    /**
     * Roles
     */
    readonly roles: AppRoles;
    /**
     * Date
     */
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
