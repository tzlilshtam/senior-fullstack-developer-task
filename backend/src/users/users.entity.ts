import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserStatus {
  ENABLED = 'Enabled',
  DISABLED = 'Disabled',
  DELETED = 'Deleted'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'simple-json'}) 
  roles: string[];

  @Column({type: 'text', default: UserStatus.ENABLED})
  status: UserStatus;
}
