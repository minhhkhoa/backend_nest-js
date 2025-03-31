import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TestGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //- logic truoc khi cho phép truy cập vào route
    //- ví dụ như kiểm tra token, kiểm tra quyền truy cập, ...
    return false;
  }
}
