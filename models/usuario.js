'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.belongsTo(models.Rol, { foreignKey: 'rol_id' });
    }
  }
  Usuario.init({
    nombre: { type: DataTypes.STRING(150), allowNull: false },
    correo: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    rolId: { type: DataTypes.INTEGER, allowNull: false, field: 'rol_id' },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    intentosFallidos: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'intentos_fallidos' },
    bloqueadoHasta: { type: DataTypes.DATE, allowNull: true, field: 'bloqueado_hasta' },
  }, { sequelize, modelName: 'Usuario', tableName: 'usuarios', underscored: true });
  return Usuario;
};