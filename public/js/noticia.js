const form_noticia = document.getElementById("noticiaform");

form_noticia.addEventListener("submit", async (event) => {
    event.preventDefault();

    const titulo = document.getElementById("titulo-noticia").value;
    const descricao = document.getElementById("conteudo-noticia").value;
    const id_usuario = await PuxarId();
    try {
        const response = await fetch("/noticia", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario, titulo, descricao })
        });
        if (response.ok) {
            alert('Notícia adicionado com sucesso!');
            form_parceiro.reset();
            trocarDiv('cadastrar-noticia','ver-noticias');
            CarregarNoticias();
        } else {
            alert('Erro ao cadastrar notícia. Tente novamente.');
        }
    }
    catch (error) {
        console.error('Erro na requisição:', error);
        //alert('Erro ao conectar ao servidor.');
    }
})

//Puxar imoveis para tabela
async function CarregarNoticias(){
    try {

        const resposta = await fetch('/noticia', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (resposta.ok) {
            const noticias = await resposta.json();
            const tabela = document.getElementById('tabela-noticias');
            tabela.innerHTML = '';
            //console.log(imoveis.STATUS);
            noticias.forEach(noticia => {
                const linha = document.createElement('tr');

                linha.innerHTML = `<td>${noticia.TITULO}</td>
                                <td>${noticia.DESCRICAO}</td>
                                <td>${noticia.DATA_PUBLICACAO}</td>
                                <td>
                                    <button type="button" onclick="DeletarNoticia(${noticia.ID})" class="btn-delete"><img src="./images/excluir.png" style="width: 20px"> </button>
                                    <button type="button" onclick="EditarNoticia(${noticia.ID})" class="btn-edit"><img src="./images/editar.png" style="width: 20px"></button>
                                </td>`;
                tabela.appendChild(linha);
            });

        } else {
            alert("Erro buscar notícias");
        }
    } catch (erro) {
        console.error("erro ao buscar noticias: " + erro.message);
    }
};

if(window.getComputedStyle(document.getElementById('ver-noticias')).display === 'block'){
    CarregarNoticias();
}

async function PuxarId() {
    const responseToken = BuscarCookie("userToken");
    let token;
    await responseToken.then(response => token = response)
    //console.log(token)

    try {
        const response = await fetch(`/protected`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if (response.ok) {
            const res = await response.json();
            return res.user.id;
        }
        else {
            console.log('Falha ao puxar token!');
        }
    }
    catch (erro) {
        console.error('Erro na requisição:', erro);
        //alert('Erro ao conectar ao servidor.');
    }
};

async function BuscarCookie(name) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

async function EditarNoticia(idNoticia) {
    //funcão para alterar visibilidade passando duas divs, da 1° para a segunda 2°
    document.getElementById('ver-noticias').style.display= "none";
    document.getElementById('editar-noticia').style.display= "block";

    console.log(idNoticia)
    try {

        const resposta = await fetch(`/noticia/${idNoticia}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (resposta.ok) {
            const noticia = await resposta.json();
            
            document.getElementById("id-noticia").value = noticia.ID;
            document.getElementById('editar-titulo-noticia').value = noticia.TITULO;
            document.getElementById('editar-conteudo-noticia').value = noticia.DESCRICAO;

        } else {
            alert("Erro ao editar notícia!");
        }
    } catch (erro) {
        console.error("erro ao editar notícia': " + erro);
    }
}

document.getElementById("editar-noticia-form").addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const idNoticia = document.getElementById("id-noticia").value;
    const titulo = document.getElementById("editar-titulo-noticia").value;
    const descricao = document.getElementById("editar-conteudo-noticia").value;
    console.log(titulo, descricao)

    try {
        const response = await fetch(`/noticia/${idNoticia}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, descricao })
        })
        if (response.ok) {
            document.getElementById("editar-noticia-form").reset();
            trocarDiv('editar-noticia','ver-noticias');
            CarregarNoticias();
        }
        else {
            console.log('Erro ao atualizar notícia. Tente novamente.');
        }
    }
    catch (erro) {
        console.error('Erro na requisição:', erro);
        //alert('Erro ao conectar ao servidor.');
    }
});

async function DeletarNoticia(idNoticia) {
    try {

        const resposta = await fetch(`/noticia/${idNoticia}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (resposta.ok) {
            alert("Delete concluido");
            CarregarNoticias();
        } else {
            alert("Erro ao deletar");
        }
    } catch (erro) {
        console.error("erro ao deletar imovel arquivo 'cadatroimovel.js': " + erro);
    }
};

function trocarDiv(div1, div2) {
    document.getElementById(div1).style.display= "none";
    document.getElementById(div2).style.display= "block";
}