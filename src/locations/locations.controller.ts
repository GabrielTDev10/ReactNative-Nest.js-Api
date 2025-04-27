import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { locationsCadastrarDto } from './dto/locations.cadastrar.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TokenService } from 'src/token/token.service';
import { locationsResultadoDto } from './dto/locations.resultado.dto';
import { Locations } from './locations.entity';



@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService,
      private readonly usuarioservice: TokenService
     
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('listar')
  async listar(): Promise<Locations[]>{

      return this.locationsService.listar()
  }



  @UseGuards(JwtAuthGuard)
  @Post('cadastrar')
    async cadastrar(@Body() data: locationsCadastrarDto, @Req() req): Promise<locationsResultadoDto>{
       let token = req.headers.authorization
       let usuario=  await this.usuarioservice.getUsuarioByToken(token)
       if(usuario){
         return this.locationsService.cadastrar(data,usuario)  
       }else{
         throw new HttpException({
            errorMessage: 'Toke invalido'
          },HttpStatus.UNAUTHORIZED)
       }
         
    }

  }


