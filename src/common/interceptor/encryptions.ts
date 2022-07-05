import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
@Injectable()
export class encryptionData {
    constructor(){}
    encryptRequest(resBody:any)
    {
       console.log(`enc----- ${resBody}`)
       return {body:resBody}
    }

    decryptRequest(reqBody:any)
    {
       console.log(`dec --- ${reqBody}`)
       return {body:reqBody}
    }
}