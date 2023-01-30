module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("event", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        end: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    });
    return Event;
}