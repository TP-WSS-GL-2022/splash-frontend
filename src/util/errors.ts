import { AuthErrorCodes } from "firebase/auth";

export enum AuthErrorResponse {
    Default = "Sign up attempt was unsuccessful",
    CredentialAlreadyInUse = "This email is connected to another service",
    EmailExists = "The email is already in use",
    UserDisabled = "Email has been disabled",
}

export type AuthErrorCode = typeof AuthErrorCodes[keyof typeof AuthErrorCodes];
