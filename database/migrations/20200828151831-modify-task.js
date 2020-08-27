module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Task',
        'description',
        {
          allowNull: true,
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'Task',
        'status',
        {
          allowNull: true,
          type: Sequelize.STRING
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Task', 'description'),
      queryInterface.removeColumn('Task', 'status'),
    ]);
  }
};