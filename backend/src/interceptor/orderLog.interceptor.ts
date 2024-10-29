import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class OrderLog implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const response = context.switchToHttp().getRequest()

        return next.handle().pipe(
            tap(() => {
                console.log(response);
                console.log('after teste');
                
            })
        )
    }
}