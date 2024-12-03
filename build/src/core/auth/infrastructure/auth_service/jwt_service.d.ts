import { IJwtService } from "../../../../core/auth/application/contract/service/jwt_service";
export default class JwtService implements IJwtService {
    encode: (payload: {
        [key: string]: any;
    }, expiresInSeconds: number, secret?: string) => string;
    decode<T>(token: string, secret?: string): T;
}
