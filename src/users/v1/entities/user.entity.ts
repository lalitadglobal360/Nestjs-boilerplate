import { ObjectIdColumn,Entity, ObjectID,Column,PrimaryGeneratedColumn,BeforeInsert } from 'typeorm';
const bcrypt = require('bcrypt');

@Entity('users')
 class Users {
  @ObjectIdColumn() id: ObjectID;
   
    @Column({ unique: true })
    public email: string;
   
    @Column()
    public name: string;

    @Column()
    public role: string;
   
    @Column()
    public password: string;
    @BeforeInsert()
   async hashPassword() {
      this.password = await bcrypt.hash(this.password, Number(process.env.HASH_SALT));
   }
  }
  export default Users;