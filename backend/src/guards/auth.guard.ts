import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate{

    // constructor(private readonly authService)

    async canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest()

        const { authorization } = req.headers

        try{
            const data = this.
        }
    }
}