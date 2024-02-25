import { sequelize } from '../setup.js'
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare userId: string;
    declare gamesStarted: CreationOptional<number>;
}

User.init({
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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