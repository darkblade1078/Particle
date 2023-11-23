import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Server {
    
    @PrimaryColumn()
    serverId: string;
}