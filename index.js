// importando file system para alterar arquivos json
import { promises as fs } from "fs";

/* 
gerar um novo json a partir de dois arquivos 
*/

//adicionando variaveis globais para leitura dos arquivos json
const dataEmpregadores = JSON.parse(await fs.readFile("./data/cadastro_empregadores.json"));
const dataCnae = JSON.parse(await fs.readFile("./data/cnae_estrutura_detalhada.json"));

// metodo para criar um novo arquivo
criarArquivo();
async function criarArquivo() {
    try {
        // ler dados empregados json 
        // usar forEach quando se quer alterar de algum modo a lista  
        const data = dataEmpregadores.map((empregador) => empregador);
        data.forEach((empregador) => {
            // para cada cadastro de mpregadores, filtrar os cnaes e descricao correspondentes, de acordo com dados estruturdaos cnae
            const file = dataCnae.filter((item) => item.subclasse === empregador.cnae);
            // buscar a descricao da subclasse cnae
            const descricao = file.map((item) => item.sbc_denominacao);
            // converter descricao para string
            const str = descricao.toString();
            // passar como valor do novo elemento da lista de empregadores
            empregador.cnae_descricao = str;
            // console.log(str);
            // gravar lista atualizada como um novo arquivo na pasta dados 
            fs.writeFile("./dados/dados.json", JSON.stringify(data, null, 2));
        });
    } catch (error) {
        console.log(error);
    }
}


