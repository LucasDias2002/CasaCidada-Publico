const conexao = require("../database/conexao");

const ImovelModel = {
    Listar: async () => {
        const sql = "SELECT * FROM IMOVEL;";

        return new Promise((resolve, reject) => {
            conexao.query(sql, (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar imovel Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log('Listando imóvel Model!')
            })
        })
    },
    ListarPorID: async (id) => {
        const sql = "SELECT * FROM IMOVEL WHERE id= ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao listar por ID: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log("Listando Imovel por id!");
            })
        })
    },
    Inserir: async (imovel) => {
        const sql = "INSERT INTO IMOVEL (cep,endereco,complemento,num_residencia,num_proprietario,telefone) VALUES (?,?,?,?,?,?)";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [imovel.cep,imovel.endereco,imovel.complemento,imovel.num_residencia,imovel.nome_proprietario,imovel.telefone], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao Inserir Imovel Model: ${erro}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log("Inserindo Ímovel Model " + resposta.InsertId);
            })
        })
    },
    Update: async (id, imovel) => {
        const sql = "UPDATE IMOVEL SET cep=?, endereco=?,complemento=?,num_residencia=?,nome_proprietario=?,telefone=? WHERE id=?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [imovel.cep,imovel.endereco,imovel.complemento,imovel.num_residencia,imovel.nome_proprietario,imovel.telefone,id], (erro, resposta) => {
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
        const sql = "DELETE FROM IMOVEL WHERE id = ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (erro, resposta) => {
                if (erro) {
                    console.log(`Erro ao deletar Ímovel Model: ${id}`);
                    return reject(erro);
                }
                resolve(resposta);
                console.log(`Deletando ímovel Model: ${id}`);
            })
        })
    }
}

module.exports = ImovelModel;