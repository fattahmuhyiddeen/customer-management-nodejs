module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Tasks',
        'description',
        {
          allowNull: true,
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'Tasks',
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
      queryInterface.removeColumn('Tasks', 'description'),
      queryInterface.removeColumn('Tasks', 'status'),
    ]);
  }
};