const {Pergunta, StatusPergunta} = require('../../../models');

module.exports = {
    getPerguntaAtual() {
        return Pergunta
            .findAll({where: {pergunta_atual: 1}})
            .then(perguntas => {
                if (!perguntas.length) {
                    return 0;
                }

                return perguntas[0].id;
            })
            .catch(() => {
                throw new Error('Erro ao buscar pergunta atual');
            });
    },
    async getPrimeiraPerguntaNaoRespondida() {
        try {
        const statusNaoResp = await StatusPergunta.findAll(
            {
                where: {
                    nome: 'n_respondido',
                }
            });

        return Pergunta
            .findAll({where: {status_id: statusNaoResp[0].id}})
            .then(perguntas => {
                if (!perguntas.length) {
                    return 0;
                }

                return perguntas[0].id;
            })
            .catch(() => {
                throw new Error('Erro ao buscar primeira pergunta não respondida');
            });
        } catch (e) {
            if (transaction) {
                transaction.rollback();
            }
            throw new Error(e);
        }
    },

    async getperguntasRespondidas() {
        try {
            const statusRep = await StatusPergunta.findAll(
                {
                    where: {
                        nome: 'respondido',
                    }
                }
            );

            return Pergunta
                .findAll({
                        where: {status_id: statusRep[0].id},
                        include: [
                            { association: 'status' },
                        ]
                    }
                )
                .then(perguntas => {
                    if (!perguntas.length) {
                        return [];
                    }

                    return perguntas.map(pergunta => {
                        return {
                            id: pergunta.id,
                            pergunta_atual: pergunta.pergunta_atual,
                            status : {
                                id: pergunta.status.id,
                                nome: pergunta.status.nome,
                                descricao: pergunta.status.descricao,
                            }
                        }
                    });
                })
                .catch(() => {
                    throw new Error('Erro ao buscar perguntas respondidas');
                });
        } catch (e) {
            if (transaction) {
                transaction.rollback();
            }
            throw new Error(e);
        }
    },

};