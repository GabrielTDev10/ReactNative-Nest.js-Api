import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { TokenProviders } from './token.providers';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { UsuarioModule } from 'src/Usuario/usuario.module';

@Module({
  imports: [DatabaseModule,forwardRef(() =>AuthModule), UsuarioModule],
  controllers: [TokenController],
  providers: [
    ...TokenProviders,
    TokenService,
  ],
  exports: [TokenService]
})
export class TokenModule {}