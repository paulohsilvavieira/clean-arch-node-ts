
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'

import { v4 as uuid } from 'uuid'

@Entity({ name: 'accounts' })

export class Account {
  @PrimaryColumn()
  id: string

  @Column({ nullable: true })
  name: string

  @Column({
    nullable: true
  })
  email: string

  @Column({ nullable: true })
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @BeforeInsert()
  setId () {
    const uuidGenerated = uuid()
    this.id = uuidGenerated
  }
}
