// typings for btoa are incorrect
import { RequestContext } from "../http/http";
import { injectable, inject, named } from "inversify";
import { AbstractTokenProvider } from "../services/configuration";

/**
 * Interface authentication schemes.
 */
export interface SecurityAuthentication {
    /*
     * @return returns the name of the security authentication as specified in OAI
     */
    getName(): string;

    /**
     * Applies the authentication scheme to the request context
     *
     * @params context the request context which should use this authentication scheme
     */
    applySecurityAuthentication(context: RequestContext): void | Promise<void>;
}

export const AuthApiKey = Symbol("auth.api_key");
export const AuthUsername = Symbol("auth.username");
export const AuthPassword = Symbol("auth.password");

export interface TokenProvider {
  getToken(): Promise<string> | string;
}


export type AuthMethods = {
}

export const authMethodServices = {
}

export type ApiKeyConfiguration = string;
export type HttpBasicConfiguration = { "username": string, "password": string };
export type HttpBearerConfiguration = { tokenProvider: TokenProvider };
export type OAuth2Configuration = { accessToken: string };

export type AuthMethodsConfiguration = {
}

/**
 * Creates the authentication methods from a swagger description.
 *
 */
export function configureAuthMethods(config: AuthMethodsConfiguration | undefined): AuthMethods {
    let authMethods: AuthMethods = {}

    if (!config) {
        return authMethods;
    }

    return authMethods;
}