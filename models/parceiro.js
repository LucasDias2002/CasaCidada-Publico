const conexao = require("../database/conexao");

const ParceiroModel = {
    Listar: async () => {
        const sql = "SELECT * FROM PARCEIRO;";

        return new Promise((resolve, reject) => {
            conexao.query(sql, (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar parceiros Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log('Listando parceiros Model!')
            })
        })
    },
    ListarPorID: async (id) => {
        const sql = "SELECT * FROM PARCEIRO WHERE id= ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar por ID: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log("Listando parceiro por id!");
            })
        })
    },
    Inserir: async (parceiro) => {
        const sql = "INSERT INTO PARCEIRO (nome, email, tipo, cnpj, area_atuacao, telefone) VALUES (?,?,?,?,?,?)";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [parceiro.nome, parceiro.email, parceiro.tipo, parceiro.cnpj, parceiro.area_atuacao, parceiro.telefone], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao Inserir parceiro Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
            })
        })
    },
    Update: async (id, parceiro) => {
        const sql = "UPDATE PARCEIRO SET nome=?, email=?,tipo=?,cnpj=?,area_atuacao=?,telefone=? WHERE id=?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [parceiro.nome, parceiro.email, parceiro.tipo, parceiro.cnpj, parceiro.area_atuacao, parceiro.telefone, id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao Atualizar Imovel Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Atualizando ímovel Model: ${id}`);
            })
        })
    },
    Delete: async (id) => {
        const sql = "DELETE FROM PARCEIRO WHERE id = ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao deletar Parceiro Model: ${id}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Deletando Parceiro Model: ${id}`);
            })
        })
    }
}

module.exports = ParceiroModel;