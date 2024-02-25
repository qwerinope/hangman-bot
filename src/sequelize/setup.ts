import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/data.sqlite'
})

export async function setup() {
    Promise.all([
        import('./models/index.js')
    ]).then(() => {
        sequelize.sync().then(() => {
            console.log('Database and tables synchronized.');
        });
    })
}