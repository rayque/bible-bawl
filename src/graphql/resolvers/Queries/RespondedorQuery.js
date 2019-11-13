const { Respondedor } = require('./../../../models');

module.exports = {
  getRespondedores() {
    return Respondedor
      .findAll()
      .then((respondedores) => respondedores.map((resp) => ({
        id: resp.id,
        nome: resp.nome,
        cod_acesso: resp.cod_acesso,
      })))
      .catch((err) => {
        throw new Error('Erro ao buscar usuários');
      });
  },
};
