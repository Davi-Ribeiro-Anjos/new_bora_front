export const stringParaData = (data, soma = false) => {
    let dia, dataModificada, dataInteira; //mes;

    // let limite = {
    //     '01': 31,
    //     '02': 28,
    //     '03': 31,
    //     '04': 30,
    //     '05': 31,
    //     '06': 30,
    //     '07': 31,
    //     '08': 31,
    //     '09': 30,
    //     '10': 31,
    //     '11': 30,
    //     '12': 31,
    // }

    dataInteira = data.split(' ')
    dataModificada = dataInteira[0];
    dataModificada = dataModificada.split('-');

    // Verificando se a primeira parte da data é o ano
    if (dataModificada[0].length === 4) {
        dia = parseInt(dataModificada[2])
        if (dia < 10) {
            dia = '0' + dia
        }
        dataModificada = `${dataModificada[0]}-${dataModificada[1]}-${dia}`
    } else {
        dia = parseInt(dataModificada[0])
        if (dia < 10) {
            dia = '0' + dia
        }
        dataModificada = `${dataModificada[2]}-${dataModificada[1]}-${dia}`
    }
    if (dataInteira.length === 2) {
        dataModificada = dataModificada + ' ' + dataInteira[1]
    }

    let dataFinal = new Date(dataModificada)
    if (soma) {
        dataFinal = dataFinal.setDate(dataFinal.getDate() + 1);
    }

    return new Date(dataFinal)
}

export const dataParaString = (data) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');

    const dataFormatada = `${ano}-${mes}-${dia}`;

    return dataFormatada
}