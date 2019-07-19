import * as repository from "../../repository";

@repository.Entity()
export class User {
    @repository.PrimaryGeneratedColumn()
    id: number;

    @repository.Column()
    name: string;

    @repository.Column({ nullable: true })
    age: number;
}

export interface ICreateUser {
    name: string;
    age?: number;
}