import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';
import { UsuarioResultadoDto } from 'src/Dto/usuarioresultado.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private UsuarioRepository: Repository<Usuario>,
  ) {}

  async listar(): Promise<Usuario[]> {
    return this.UsuarioRepository.find();
  }

  async cadastrar(data: UsuarioCadastrarDto): Promise<UsuarioResultadoDto>{
        let usuario = new Usuario()
        usuario.nome = data.nome
        usuario.email = data.email
        usuario.password = bcrypt.hashSync(data.password,8)
        usuario.cpf = data.cpf
        usuario.telefone = data.telefone
        return  this.UsuarioRepository.save(usuario)
        .then((result) =>{
          return <UsuarioResultadoDto>{
            status: true,
            mensagem: 'Salvou'
        }
        })
        .catch((error) =>{
          return <UsuarioResultadoDto>{
            status: false,
            mensagem: 'Não Salvou'
        }
        }) 
  }

  async findOne(email: string): Promise<Usuario | undefined> {
    const usuarios = await this.UsuarioRepository.find();
    return usuarios.find(usuario => usuario.email === email);
  }

}