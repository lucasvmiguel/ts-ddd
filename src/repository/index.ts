import * as typeorm from 'typeorm';

export class Repository<T> extends typeorm.Repository<T> { }

export const Entity = typeorm.Entity;

export const Column = typeorm.Column;

export const PrimaryGeneratedColumn = typeorm.PrimaryGeneratedColumn;