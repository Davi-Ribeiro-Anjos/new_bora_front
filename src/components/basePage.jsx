import { useState } from "react"
import MainNavBar from "./header/navBar"
import { Container, Content, Footer, Header } from "rsuite"
import RoutesMain from "../routes"
import MainSideBar from "./header/sideBar"


const BasePage = () => {
    const [mobile, setMobile] = useState(false)
    return (
        <>
            {mobile ? (
                <Container>
                    <Header>
                        <MainSideBar />
                    </Header>
                    <Content>
                        <RoutesMain />
                    </Content>
                    <Footer>
                        Opa
                    </Footer>
                </Container>) : (
                <Container>
                    <Header>
                        < MainNavBar />
                    </Header>
                    <Content>
                        <RoutesMain />
                    </Content>
                    {/* <Footer>
                        Opa
                    </Footer> */}
                </Container>
            )
            }
        </>
    )
}

export default BasePage