module.exports = (sequelize, DataTypes) => {
  const Respondedor = sequelize.define('Respondedor', {
      nome: DataTypes.STRING,
      cod_acesso: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      // define the table's name
      tableName: 'respondedores',
    });

  return Respondedor;
};