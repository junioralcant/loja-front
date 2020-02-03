import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "unform";
import { Link } from "react-router-dom";
import { parseFromTimeZone, formatToTimeZone } from "date-fns-timezone";

import api from "../../services/api";
import Sidebar from "../../components/Sidebar";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./styles.css";

export default function ClienteForm({ ...props }) {
  const { history, match } = props;
  const [data, setData] = useState({}); //update
  const [error, setError] = useState(""); //update

  async function handleSubmit(data) {
    if (!match.params.id) {
      if (
        !data.nome ||
        !data.endereco ||
        !data.cidade ||
        !data.casa ||
        !data.bairro ||
        !data.numero ||
        !data.estado ||
        !data.rg ||
        !data.cpf ||
        !data.dataNascimento ||
        !data.telefone
      ) {
        setError("Preencha todos os campos obrigatórios (*)");
      } else {
        try {
          await api.postOrPut("/clientes", match.params.id, data);

          history.push("/clientes"); // redireciona o user
        } catch (error) {
          setError(error.response.data.error);
        }
      }
    } else {
      try {
        await api.postOrPut("/clientes", match.params.id, data);

        history.push("/clientes"); // redireciona o user
      } catch (error) {
        setError(error.response.data.error);
      }
    }
  }

  useEffect(() => {
    // update
    async function loadData() {
      const { id } = match.params;
      const response = await api.get(`clientes/${id}`);

      setData(response.data);
    }

    if (match.params.id) {
      loadData();
    }
  }, [match.params, match.params.id]);

  useEffect(
    event => {
      if (match.params.id) {
        const dataNas = parseFromTimeZone(data.dataNascimento, {
          timeZone: "America/Sao_Paulo"
        });

        const dataNascimento = formatToTimeZone(dataNas, "YYYY-MM-DD", {
          timeZone: "Europe/Berlin"
        });

        setData({
          ...data,
          dataNascimento: dataNascimento
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.dataNascimento, match.params.id]
  );

  const options = [
    { id: "Própria", title: "Própria" },
    { id: "Alugada", title: "Alugada" }
  ];

  return (
    <div className="container-fluid">
      <Sidebar {...props} />

      <h1>Cadastro de Cliente</h1>
      <Form className="form-group" initialData={data} onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div className="row">
          <div className="col-md-6">
            <h2>Dados do Cliente</h2>
            <Input className="form-control" name="nome" label="Nome*" />
            <Input className="form-control" name="apelido" label="Apelido" />
            <Input className="form-control" name="rg" label="RG*" />
            <Input className="form-control" name="cpf" label="CPF*" />
            <Input
              className="form-control"
              name="limiteDeCompra"
              label="Limite de compra"
            />

            <Input
              type="date"
              className="form-control"
              name="dataNascimento"
              label="Data Nascimento*"
            />
            <Input
              className="form-control"
              name="profissao"
              label="Profissão"
            />
            <Input
              className="form-control"
              name="nomeDoPai"
              label="Nome do Pai"
            />
            <Input
              className="form-control"
              name="nomeDaMae"
              label="Nome da Mãe"
            />

            <h2>Contatos</h2>
            <Input className="form-control" name="telefone" label="Telefone*" />
            <Input
              className="form-control"
              name="telefoneExtra"
              label="Telefone Secundário"
            />
            <Input className="form-control" name="whatsapp" label="Whatsapp" />
            <Input
              className="form-control"
              name="observacao"
              label="Observação"
            />
          </div>

          <div className="col-md-6">
            <h2>Endereço Principal</h2>
            <Input className="form-control" name="endereco" label="Endereço*" />
            <Input className="form-control" name="cidade" label="Cidade*" />
            <Input className="form-control" name="bairro" label="Bairro*" />
            <Select
              className="form-control"
              value={data.casa}
              name="casa"
              label="Tipo de casa*"
              options={options}
            />
            <Input
              className="form-control"
              name="numero"
              label="Número da casa*"
            />
            <Input className="form-control" name="estado" label="Estado*" />
            <br />
            <br />
            <br />
            <h2>Endereço Secundário</h2>
            <Input className="form-control" name="endereco2" label="Endereço" />
            <Input className="form-control" name="cidade2" label="Cidade" />
            <Input className="form-control" name="bairro2" label="Bairro" />
            <Select
              className="form-control"
              value={data.casa2}
              name="casa2"
              label="Tipo de casa"
              options={options}
            />
            <Input
              className="form-control"
              name="numero2"
              label="Número da casa"
            />
            <Input className="form-control" name="estado2" label="Estado" />
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button
          style={{ marginTop: 13, marginLeft: 5 }}
          type="submit"
          className="btn btn-primary"
        >
          Enviar
        </button>

        <Link
          style={{ marginTop: 13, marginLeft: 15 }}
          className="btn btn-danger"
          to="/clientes"
        >
          Cancelar
        </Link>
      </Form>
    </div>
  );
}
