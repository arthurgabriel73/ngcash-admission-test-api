import { DataSource } from 'typeorm';
import { Transaction } from './entities/transactions.entity';

export const transactionsProviders = [
    {
        provide: 'TRANSACTIONS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Transaction),
        inject: ['DATA_SOURCE'],
    },
]