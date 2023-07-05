import { Panel } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';


export const MainPanel = ({ title, children }) => {
    return (
        <Panel header={title} style={{ margin: "20px auto", width: "95%", }} shaded >
            {children}
        </Panel>
    )
}

export const MainPanelCollapsible = ({ title, collapsible = true, width = 100, children }) => {
    return (
        <>
            <Panel header={title} style={{ margin: "20px auto", width: `${width}%`, }} collapsible={collapsible} bordered>
                {children}
            </Panel>
        </>
    )
}
