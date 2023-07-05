import { Form, DatePicker, Grid, Row, Col, InputPicker, Input, Panel, Checkbox, useToaster, SelectPicker, InputNumber, Message } from 'rsuite';

import { useContext } from 'react';

import { criarMensagemErro, criarMensagemOk } from '../../../services/mensagem';
import { ChoicesContext } from '../../../providers/choicesProviders';
import { ApiContext } from '../../../providers/apiProviders';

import MainModal from '../../modal';

const styles = {
    titulo: {
        marginBottom: 20,
    },
    input: {
        width: 250,
        textTransform: 'uppercase',
        span: {
            display: "none"
        }
    },
    row: {
        marginBottom: 10,
    },
    iconBu: {
        width: "3vw",
        height: "7vh",
        padding: 0,
        margin: 0
    },
    observacao: {
        textTransform: 'uppercase'
    }
}

const cnpjMask = (value) => {
    if (value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }
}

const cpfMask = value => {
    if (value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }
}

const tipo_contrato = ["PJ", "CLT"].map(item => ({ label: item, value: item }));

const EditarFuncionario = ({ form, setForm, abrir, setAbrir, inverteUpdate }) => {
    const { filiais } = useContext(ChoicesContext)
    // const { usuarios, choiceUser, auth } = useContext(UsuarioContext)
    const { api } = useContext(ApiContext)
    const toaster = useToaster();

    const enviar = async () => {
        try {
            form.pj_complementos.salario = parseFloat(form.salario)
            form.pj_complementos.faculdade = parseFloat(form.faculdade)
            form.pj_complementos.ajuda_custo = parseFloat(form.ajuda_custo)
            form.pj_complementos.auxilio_moradia = parseFloat(form.auxilio_moradia)
            form.pj_complementos.credito_convenio = parseFloat(form.credito_convenio)
            form.pj_complementos.outros_creditos = parseFloat(form.outros_creditos)
            form.pj_complementos.adiantamento = parseFloat(form.adiantamento)
            form.pj_complementos.desconto_convenio = parseFloat(form.desconto_convenio)
            form.pj_complementos.outros_descontos = parseFloat(form.outros_descontos)

            delete form.salario
            delete form.faculdade
            delete form.ajuda_custo
            delete form.auxilio_moradia
            delete form.credito_convenio
            delete form.outros_creditos
            delete form.adiantamento
            delete form.desconto_convenio
            delete form.outros_descontos

        } catch (error) {
            console.log(error)
        }

        delete form.nome
        delete form.cnpj
        delete form.cpf
        delete form.data_admissao
        delete form.dados_bancarios

        await api.patch(`funcionarios/${form.id}/`, form).then(async (response) => {
            criarMensagemOk("Sucesso - Funcionário atualizado.", toaster)

            // const data = stringParaData(form.pj_complementos.data_pagamento)
            // form.pj_complementos = form.pj_complementos.data_pagamento = data
            delete form.pj_complementos.data_pagamento
            delete form.pj_complementos.data_emissao

            await api.patch(`pj-complementos/${form.pj_complementos.id}/`, form.pj_complementos).then((response) => {
                fechar()
            }).catch((error) => {
                let mensagem = (
                    <Message showIcon type="error" closable >
                        Erro - Ocorreu um erro salvar os Valores.
                    </Message>
                )
                toaster.push(mensagem, { placement: "topEnd", duration: 4000 })
            })
        }).catch((error) => {
            let listMensagem = {
            }
            criarMensagemErro(error, listMensagem, toaster)
        })
    }

    const fechar = () => {
        setAbrir(false)
        inverteUpdate()
    };

    return (
        <MainModal titulo={form.nome ? `Editar Funcionário ${form.nome.split(' ')[0]}` : 'Editar Funcionário'} nomeBotao="Editar" size='md' open={abrir}
            enviar={enviar} fechar={fechar} overflow={true} >
            <Grid fluid>
                <Form fluid onChange={setForm} formValue={form}>
                    <Panel header="Informações Pessoais do Funcionário">
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Nome Completo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="nome" accepter={Input} disabled />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group  >
                                    <Form.ControlLabel>Filial:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="filial" data={filiais} accepter={SelectPicker} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Cargo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="cargo" accepter={Input} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Tipo Contrato:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="tipo_contrato" data={tipo_contrato} accepter={InputPicker} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>{form.tipo_contrato === "PJ" ? "CNPJ" : "CPF"}:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="cnpj"
                                        value={form.tipo_contrato === "PJ" ? cnpjMask(form.cnpj) || '' : cpfMask(form.cpf)}
                                        // onChange={(value) => form.tipo_contrato === "PJ" ? setForm({ ...form, cnpj: value }) : setForm({ ...form, cpf: value })}
                                        accepter={Input} disabled />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Email:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="email" accepter={Input} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Ativo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="ativo" checked={form.ativo ? form.ativo : false} onChange={(value) => setForm({ ...form, ativo: !value })} accepter={Checkbox} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Admissão:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="data_admissao" placeholder="DD-MM-AAAA" format='dd-MM-yyyy' accepter={DatePicker} disabled />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="Informações Bancárias do Funcionário">
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Banco:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="banco" accepter={Input} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Agência:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="agencia" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Conta:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="conta" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Pix:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="pix" accepter={Input} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="Informações de Valores do Funcionário">
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Salário:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="salario" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Faculdade:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="faculdade" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Ajuda de Custo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="ajuda_custo" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Auxílio Moradia:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="auxilio_moradia" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Crédito Convênio:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="credito_convenio" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Outros Créditos:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="outros_creditos" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Adiantamento:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="adiantamento" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Desconto Convênio:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="desconto_convenio" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={24}>
                                <Form.Group >
                                    <Form.ControlLabel>Outros Descontos:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="outros_descontos" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Panel>
                </Form>
            </Grid >
        </MainModal >
    );
};

export default EditarFuncionario;