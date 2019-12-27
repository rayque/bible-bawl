const { Op } = require('sequelize');
const moment = require('moment');
const { Equipe } = require('./../../../models');
const { Participante, Categoria } = require('./../../../models');
const EquipeService = require('../../../services/equipeService');



module.exports = {
  async novaEquipe(_, dados) {
    return await EquipeService.novaEquipe(dados);
  },
};
