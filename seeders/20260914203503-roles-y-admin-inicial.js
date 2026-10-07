'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Insertar roles iniciales
    await queryInterface.bulkInsert('roles', [
      {
        nombre: 'administrador',
        descripcion: 'Acceso total al sistema',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'gerente',
        descripcion: 'Acceso a reportes y gestión',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'vendedor',
        descripcion: 'Gestión de clientes y ventas',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

    // 2. Obtener el ID del rol administrador para asociarlo al usuario
    const [roles] = await queryInterface.sequelize.query(
      "SELECT id FROM roles WHERE nombre = 'administrador';"
    );
    const rolAdminId = roles[0].id;

    // 3. Encriptar la contraseña del usuario administrador inicial
    const password = await bcrypt.hash('Admin123', 10);

    // 4. Insertar el usuario administrador inicial
    await queryInterface.bulkInsert('usuarios', [
      {
        nombre: 'Administrador Principal',
        correo: 'admin@crm.local',
        password: password,
        rol_id: rolAdminId,
        activo: true,
        intentos_fallidos: 0,
        bloqueado_hasta: null,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', null, { truncate: true, cascade: true });
    await queryInterface.bulkInsert('roles', null, { truncate: true, cascade: true });
  }
};
