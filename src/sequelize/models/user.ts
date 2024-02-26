import { sequelize } from '../setup.js'
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import Game from './game.js';
import Guess from './guess.js';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare userId: string;
    declare gamesStarted: CreationOptional<number>;
}

User.init(
    {
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        gamesStarted: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        }
    },
    {
        tableName: 'User',
        sequelize
    }
)

export default User