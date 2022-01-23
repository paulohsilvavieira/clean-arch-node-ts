
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
  firstName: string

  @Column({ nullable: true })
  secondName: string

  @Column({
    nullable: true
  })
  email: string

  @Column({
    nullable: true
  })
  tokenConfirmation: string

  @Column({
    nullable: true
  })
  tokenPhoneConfirmation: string

  @Column({
    nullable: true
  })
  dateBirth: string

  @Column({
    nullable: true
  })
  documentType: string

  @Column({
    nullable: true
  })
  phoneNumber: string

  @Column({
    nullable: true
  })
  documentId: string

  @Column({
    nullable: true
  })
  proofIdDocumentFront: string

  @Column({
    nullable: true
  })
  proofIdDocumentBack: string

  @Column({
    nullable: true
  })
  profileImage: string

  @Column({
    nullable: true
  })
  addressFirstLine: string

  @Column({
    nullable: true
  })
  addressSecondLine: string

  @Column({
    nullable: true
  })
  city: string

  @Column({
    nullable: true
  })
  state: string

  @Column({
    nullable: true
  })
  country: string

  @Column({
    nullable: true
  })
  zipOrPostalCode: string

  @Column({
    nullable: true
  })
  proofOfResidence: string

  @Column({ default: 'PENDING' })
  status: string

  @Column({ default: true })
  active: boolean

  @Column({ nullable: true })
  dissapprovedInfo: string

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
