import { sequelize } from '../setup.js'
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManySetAssociationsMixin, NonAttribute, Association } from "sequelize";
import Game from './game.js';
import Guess from './guess.js';

class User extends Model<InferAttributes<User, {omit: 'games'}>, InferCreationAttributes<User, {omit: 'games'}>> {
    declare userId: string;
    declare gamesStarted: CreationOptional<number>;

    declare games?: NonAttribute<Game[]>
    declare guesses?: NonAttribute<Guess[]>
    declare static associations: {
        games: Association<User, Game>
    };
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
