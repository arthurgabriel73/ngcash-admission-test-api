import { DataSource } from 'typeorm';
import {Account} from "./entities/accounts.entity";


export const accountsProviders = [
    {
        provide: 'ACCOUNTS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Account),
        inject: ['DATA_SOURCE'],
    },
]