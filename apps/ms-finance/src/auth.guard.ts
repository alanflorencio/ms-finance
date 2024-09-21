import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from './modules/database/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}

  async canActivate(context: any): Promise<boolean> {
    const request = context.switchToRpc().getData();
    const { authorization, ...rest } = request;

    if (!authorization) {
      throw new RpcException('missing authorization');
    }

    const [clientId, secretId] = atob(authorization).split(':');

    const tenant = await this.prismaService.tenant.findMany({
      where: {
        clientId,
        secretId,
      },
    });
    console.log(clientId);
    console.log(secretId);
    console.log(tenant);
    if (!tenant) {
      throw new RpcException('tenant not found');
    }

    return { ...rest };
  }
}
