import { Panel } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';


export const MainPanel = ({ title, children }) => {
    return (
        <Panel header={title} style={{ margin: "20px auto", width: "95%", }} shaded >
            {children}
        </Panel>
    )
}

export const MainPanelCollapsible = ({ title, children }) => {
    return (
        <>
            <Panel header={title} style={{ margin: "20px auto", width: "100%", }} collapsible bordered>
                {children}
            </Panel>
        </>
    )
}
