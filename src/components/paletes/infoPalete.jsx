import MainModal from '../modal';

const InfoPalete = ({ abrirInfo, setAbrirInfo }) => {
    const fechar = () => {
        setAbrirInfo(false)
    };

    return (
        <MainModal open={abrirInfo} setOpen={setAbrirInfo} titulo="Quantidade de Paletes por Garagem" nomeBotao="Info" view={true} size='full' fechar={fechar} >

        </MainModal>
    )
}

export default InfoPalete;