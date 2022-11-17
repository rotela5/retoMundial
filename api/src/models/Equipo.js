const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('equipo', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_fa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   flag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fifa_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    iso2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grupos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
   
   
   
    golesAfavor: {
      type: DataTypes.STRING
    },
    golesEncontra: {
      type: DataTypes.STRING
    },
  });
};
_