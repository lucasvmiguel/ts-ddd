import * as typeorm from 'typeorm';

/*

IMPORTANT!
TODO: This whole file shouldn't know about typeorm, but it's gonna take a lot of time to create all the abstraction

*/

export class Repository<T> extends typeorm.Repository<T> { }

export const Entity = typeorm.Entity;

export const Column = typeorm.Column;

export const PrimaryGeneratedColumn = typeorm.PrimaryGeneratedColumn;

export const createConnection = typeorm.createConnection;