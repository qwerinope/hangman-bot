import { DataTypes } from 'sequelize';
import { sequelize } from '../setup.js';

const User = sequelize.define('User', {
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
});

export default User
