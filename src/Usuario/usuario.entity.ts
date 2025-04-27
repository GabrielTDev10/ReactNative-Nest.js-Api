import { Locations } from 'src/locations/locations.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Usuario{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 20 })
  cpf: string;

  @Column({ length: 30 })
  telefone: string;

 @OneToMany(()=> Locations,locations => locations.usuario)
 locations: Locations[];
}