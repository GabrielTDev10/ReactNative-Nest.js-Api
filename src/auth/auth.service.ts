import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/Usuario/usuario.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { Usuario } from 'src/Usuario/usuario.entity';



@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuarioService, 
    private jwtService: JwtService,
    private tokenService: TokenService
  ) {}

  async validarUsuario(email: string, senha: string): Promise<any> {
    const usuario = await this.usuarioService.findOne(email);
    if (usuario && !bcrypt.compareSync(senha, usuario.password)) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = usuario;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }

  async login(usuario: any){
    const payload = { sub: usuario.id, username: usuario.email };
    const token = await this.jwtService.signAsync(payload)
    this.tokenService.save(token, usuario.email)
    return {
      access_token: token 
    };
  }

  async loginToken(token: string){
   let usuario : Usuario = await this.tokenService.getUsuarioByToken(token)
   if(usuario){
    return this.login(usuario)
   }else{
    return new HttpException({
      errorMessage: 'Toke invalido'
    },HttpStatus.UNAUTHORIZED)
   }
  }

  



}