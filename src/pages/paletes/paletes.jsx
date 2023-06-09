
import { MainPanel } from "../../components/panel";
import PainelPalete from "../../components/paletes/painelPalete";
import FiltroPalete from "../../components/paletes/filtroPalete";

const Paletes = () => {
    return (
        <MainPanel>
            <PainelPalete />

            <FiltroPalete />
        </MainPanel>
    )
}

export default Paletes;