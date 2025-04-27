import { Usuario } from 'src/Usuario/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Locations{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 100 })
  descricao: string;

  @Column({ length: 255 })
  latitude: string;

  @Column({ length: 255 })
  longitude: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Usuario,usuario => usuario.locations)
  usuario : Usuario;

}