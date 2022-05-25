import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { verify } from 'jsonwebtoken';
import { AuthData } from "../auth/auth.jwt.strategy";

export interface CustomSocket extends Socket {
  user: AuthData
  active: boolean;
}

@Injectable()
export class SocketAuthGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext) {
    const socket = context.switchToWs().getClient<CustomSocket>();
    const authorization = socket.handshake.headers.authorization;
    let token = ''
    if (authorization) {
      token = authorization.split(' ')[1]
    }
    let active = true
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        active = false
      } else {
        context.switchToHttp().getRequest().user = decoded
      }
    })

    context.switchToHttp().getRequest().active = active

    return active
  }
}
