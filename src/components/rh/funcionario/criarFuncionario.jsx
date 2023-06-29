import { Form, SelectPicker, Grid, Row, Col, useToaster, InputNumber, Panel, Input, InputPicker, DatePicker, Checkbox } from 'rsuite';

import { useContext, useState } from 'react';

import { criarMensagemErro, criarMensagemOk } from '../../../services/mensagem';
import { ChoicesContext } from '../../../providers/choicesProviders';
import { ApiContext } from '../../../providers/apiProviders';

import MainModal from '../../modal';
import { dataParaString, stringParaData } from '../../../services/data';

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

const empresa = ["BORA", "BORBON", "JC", "JSR", "TRANSFOOD"].map(item => ({ label: item, value: item }));

const CriarFuncionarios = ({ abrir, setAbrir, inverteUpdate }) => {
    const { filiais } = useContext(ChoicesContext)
    const { api } = useContext(ApiContext)
    const toaster = useToaster();

    const [form, setForm] = useState({
        nome: '',
        filial: null,
        cargo: '',
        empresa: null,
        cnpj: '',
        data_admi: null,
        ativo: true,
        banco: '',
        agencia: null,
        conta: null,
        pix: '',
        salario: null,
        faculdade: null,
        ajuda_custo: null,
        auxilio_moradia: null,
        credito_convenio: null,
        outros_creditos: null,
        adiantamento: null,
        desconto_convenio: null,
        outros_descontos: null,
        data_pagamento: null
    });


    const enviar = async () => {
        form['complementos'] = {}
        form.nome = form.nome.toUpperCase()
        form.cargo = form.cargo.toUpperCase()
        form.banco = form.banco.toUpperCase()
        form.cnpj = form.cnpj.replaceAll('.', '').replace('-', '').replace('/', '').slice(0, -1)
        if (form.data_admi) form.data_admissao = dataParaString(form.data_admi)

        try {
            form.complementos["salario"] = parseFloat(form.salario) || null
            form.complementos["faculdade"] = parseFloat(form.faculdade) || null
            form.complementos["ajuda_custo"] = parseFloat(form.ajuda_custo) || null
            form.complementos["auxilio_moradia"] = parseFloat(form.auxilio_moradia) || null
            form.complementos["credito_convenio"] = parseFloat(form.credito_convenio) || null
            form.complementos["outros_creditos"] = parseFloat(form.outros_creditos) || null
            form.complementos["adiantamento"] = parseFloat(form.adiantamento) || null
            form.complementos["desconto_convenio"] = parseFloat(form.desconto_convenio) || null
            form.complementos["outros_descontos"] = parseFloat(form.outros_descontos) || null
            if (form.data_pagamento)
                form.complementos["data_pagamento"] = dataParaString(form.data_pagamento)
            form.complementos["autor"] = 1

            // delete form.salario
            // delete form.faculdade
            // delete form.ajuda_custo
            // delete form.auxilio_moradia
            // delete form.credito_convenio
            // delete form.outros_creditos
            // delete form.adiantamento
            // delete form.desconto_convenio
            // delete form.outros_descontos
            // delete form.data_pagamento

        } catch (error) {
            console.log(error)
        }

        form["tipo_contrato"] = "PJ"

        api.post('pj-complementos/', form.complementos).then((response) => {

            form['complemento_funcionario'] = response.data.id

            api.post('funcionarios/', form).then((response) => {
                criarMensagemOk("Sucesso - Funcionário cadastrado.", toaster)
                inverteUpdate()
                fechar()
            }).catch((error) => {
                let listMensagem = {
                    nome: 'Nome',
                    filial: 'Filial',
                    cargo: 'Cargo',
                    empresa: 'Empresa',
                    cnpj: 'CNPJ',
                    data_admissao: 'Data Admissão',
                    ativo: 'Ativo',
                    banco: 'Banco',
                    agencia: 'Agência',
                    conta: 'Conta',
                    pix: 'Pix',
                }
                criarMensagemErro(error, listMensagem, toaster)
            })

        }).catch((error) => {
            let listMensagem = {
                salario: "Salário",
                faculdade: "Faculdade",
                ajuda_custo: "Ajuda Custo",
                auxilio_moradia: "Auxílio Moradia",
                credito_convenio: "Crédito Convênio",
                outros_creditos: "Outros Créditos",
                adiantamento: "Adiantamento",
                desconto_convenio: "Desconto Convênio",
                outros_descontos: "Outros Descontos",
                data_pagamento: "Data Pagamento"
            }
            criarMensagemErro(error, listMensagem, toaster)
        })

    }

    const fechar = () => {
        setAbrir(false)
        setForm({
            nome: '',
            filial: null,
            cargo: '',
            empresa: null,
            cnpj: '',
            data_admi: null,
            ativo: true,
            banco: '',
            agencia: null,
            conta: null,
            pix: '',
            salario: null,
            faculdade: null,
            ajuda_custo: null,
            auxilio_moradia: null,
            credito_convenio: null,
            outros_creditos: null,
            adiantamento: null,
            desconto_convenio: null,
            outros_descontos: null,
            data_pagamento: null
        })
    };

    return (
        <MainModal titulo={'Adicionar Funcionário'} nomeBotao="Criar" size='md' open={abrir}
            enviar={enviar} fechar={fechar} >
            <Grid fluid>
                <Form onChange={setForm} formValue={form}>
                    <Panel header="Informações Pessoais do Funcionário">
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Nome Completo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="nome" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group  >
                                    <Form.ControlLabel>Filial:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="filial" data={filiais} accepter={SelectPicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Cargo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="cargo" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Empresa:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="empresa" data={empresa} accepter={InputPicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>CNPJ:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="cnpj" value={cnpjMask(form.cnpj)} accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Data Admissão:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="data_admi" placeholder="DD-MM-AAAA" format='dd-MM-yyyy' accepter={DatePicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Ativo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="ativo" checked={form.ativo} onChange={(value) => setForm({ ...form, ativo: !value })} accepter={Checkbox} />
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
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Agência:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="agencia" accepter={InputNumber} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Conta:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="conta" accepter={InputNumber} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Pix:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="pix" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
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
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Data Pagamento:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="data_pagamento" placeholder="DD-MM-AAAA" format='dd-MM-yyyy' accepter={DatePicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
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
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Outros Descontos:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="outros_descontos" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Faculdade:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="faculdade" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Panel>
                </Form>
            </Grid >
        </MainModal >
    );
};

export default CriarFuncionarios;