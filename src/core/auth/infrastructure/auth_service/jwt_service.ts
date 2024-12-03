import { injectable } from "tsyringe";
import jwt from 'jsonwebtoken';
import { IJwtService } from "../../../../core/auth/application/contract/service/jwt_service";


@injectable()
export default class JwtService implements IJwtService{
    public  encode = (payload: {[key: string]: any}, expiresInSeconds: number, secret: string = "123456789098765432122344567789098876asasadsaxaafafffddddserfgghuuhhgh"): string => {
        return jwt.sign(payload, secret, { expiresIn: expiresInSeconds});
    }

    public  decode<T>(token: string,  secret: string = "123456789098765432122344567789098876asasadsaxaafafffddddserfgghuuhhgh"): T {
        console.log({token})
        return jwt.verify(token, secret) as T;
    }
}