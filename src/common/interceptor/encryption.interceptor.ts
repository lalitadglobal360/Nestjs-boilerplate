import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable, tap,map } from "rxjs";
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
//import encryptionData from "./encryptions"
export interface Response<T> {
    data: T;
}
@Injectable()
export class EncryptionInterceptor<T>  implements NestInterceptor<T, Response<T>> {
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<Response<T>>> {
        const body = context.switchToHttp().getRequest().body;
        const request = context.switchToHttp().getRequest();
        console.log("Before reaching the handler");
        //const encrypted = encrypt(body)
        if(!body.data){
            return next.handle().pipe();
        }
        const decrypted = decrypt({data:body.data})
        console.log(`decrypt---${decrypted}`)
        request.body = JSON.parse(decrypted.data)
        console.log("updated body",request.body)
        const now = Date.now();
        return next.handle().pipe(
            //tap(() => console.log(`Response Lag...${Date.now() - now}ms`))
            //map(data => ({ data }))
            map((res) => {
               const encryptedResponse = encrypt(res)
                res.enc = encryptedResponse;
                return res;
              })
        );
    }
}

let encrypt = (reqData)=>{
    const algorithm = process.env.CRYPTO_ALGORITHM;
        const secretKey = process.env.CRYPTO_SECRET;
        const iv = Buffer.from(process.env.CRYPTO_IV, 'hex');
        const cipher = createCipheriv(algorithm, secretKey, iv);
        const encrypted =  Buffer.concat([cipher.update(JSON.stringify(reqData)), cipher.final()]);
        return encrypted.toString('hex')
}

let decrypt = (reqData)=>{
    const algorithm = process.env.CRYPTO_ALGORITHM;
        const secretKey = process.env.CRYPTO_SECRET;
        const hash = reqData.data
        console.log(`hash---${hash}`)
        const iv = Buffer.from(process.env.CRYPTO_IV, 'hex');
        const decipher = createDecipheriv(algorithm, secretKey, Buffer.from(iv.toString('hex'), 'hex'));
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);
        return {
            data:decrpyted.toString()
        }
}