import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Locations } from './locations.entity';
import { locationsCadastrarDto } from './dto/locations.cadastrar.dto';
import { Usuario } from 'src/Usuario/usuario.entity';
import { locationsResultadoDto } from './dto/locations.resultado.dto';


@Injectable()
export class LocationsService {
  constructor(
    @Inject('LOCATIONS_REPOSITORY')
    private locationsRepository: Repository<Locations>,
  ) {}

  async listar(): Promise<Locations[]> {
    return this.locationsRepository.find();
  }


  async cadastrar(data: locationsCadastrarDto, usuario: Usuario): Promise<locationsResultadoDto>{

    let locations = new Locations(); 
    locations.nome = data.nome
    locations.descricao = data.descricao
    locations.latitude = data.latitude
    locations.longitude = data.longitude
    locations.created_at = data.created_at
    locations.usuario = usuario 
    
    return this.locationsRepository.save(locations).then(()=>{
      return <locationsResultadoDto>{
        status: true,
        mensagem: 'Salvou a locations'
    }
    }).catch(()=>{
      return <locationsResultadoDto>{
        status: false,
        mensagem: 'erro não salvou a locations'
    }
    })

  }
  }