import { Button, Drawer } from "rsuite"

const styles = {
    body: {
        padding: 15
    }
}

const MainDrawer = ({ open, fechar, titulo, backdrop = "static", size = "sm", children }) => {
    return (
        <Drawer backdrop={backdrop} size={size} open={open} onClose={() => fechar()}>
            <Drawer.Header>
                <Drawer.Title>{titulo}</Drawer.Title>
                <Drawer.Actions>
                    <Button onClick={() => fechar()}>Fechar</Button>
                    {/* <Button onClick={() => setOpen(false)} appearance="primary">
                        Confirm
                    </Button> */}
                </Drawer.Actions>
            </Drawer.Header >
            <Drawer.Body style={styles.body} >
                {children}
            </Drawer.Body>
        </Drawer >
    )
}

export default MainDrawer;