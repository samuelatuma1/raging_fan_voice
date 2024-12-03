export interface IJwtService {
    encode (payload: {[key: string]: any}, expiresInSeconds: number, secret?: string): string
    decode<T>(token: string,  secret?: string): T
}

export const IIJwtService = "IJwtService"