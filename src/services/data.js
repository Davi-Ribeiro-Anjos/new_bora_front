export const somaDia = (data, soma = false) => {
    let dia, mes, dataModificada, dataInteira;

    let limite = {
        '01': 31,
        '02': 28,
        '03': 31,
        '04': 30,
        '05': 31,
        '06': 30,
        '07': 31,
        '08': 31,
        '09': 30,
        '10': 31,
        '11': 30,
        '12': 31,
    }

    // console.log("----------------------")
    // console.log(data)


    dataInteira = data.split(' ')
    dataModificada = dataInteira[0];
    dataModificada = dataModificada.split('-');
    mes = dataModificada[1]

    // Verificando se a primeira parte da data é o ano
    if (dataModificada[0].length === 4) {
        dia = parseInt(dataModificada[2])
        if (dia < 10) {
            dia = '0' + dia
        }
        // console.log(dia > 9)
        // console.log(parseInt(dia) < limite[mes])
        // console.log(soma)
        if (dia > 9 && parseInt(dia) < limite[mes] && soma) dataModificada = dataModificada = `${dataModificada[0]}-${dataModificada[1]}-${dia + 1}`
        else dataModificada = `${dataModificada[0]}-${dataModificada[1]}-${dia}`
    } else {
        dia = parseInt(dataModificada[0])
        if (dia < 10) {
            dia = '0' + dia
        }
        // console.log(dia > 9)
        // console.log(parseInt(dia) < limite[mes])
        // console.log(soma)
        if (dia > 9 && parseInt(dia) < limite[mes] && soma) dataModificada = dataModificada = `${dataModificada[2]}-${dataModificada[1]}-${dia + 1}`
        else dataModificada = `${dataModificada[2]}-${dataModificada[1]}-${dia}`
    }
    if (dataInteira.length === 2) {
        dataModificada = dataModificada + ' ' + dataInteira[1]
    }

    // console.log(dataModificada)
    return new Date(dataModificada)
}

export const dataParaString = (data) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');

    const dataFormatada = `${ano}-${mes}-${dia}`;

    return dataFormatada
}