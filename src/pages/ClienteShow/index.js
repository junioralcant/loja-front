import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { parseFromTimeZone, formatToTimeZone } from "date-fns-timezone";

import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import Sidebar from "../../components/Sidebar";
import "./styles.css";

export default function ClienteShow({ ...props }) {
  const { match } = props;

  const [cliente, setCliente] = useState({});
  useEffect(() => {
    async function loadCliente() {
      const { id } = match.params;
      const response = await api.get(`clientes/${id}`);

      setCliente(response.data);
    }

    loadCliente();
  }, [match.params]);

  const dataNas = parseFromTimeZone(cliente.dataNascimento, {
    timeZone: "America/Sao_Paulo"
  });

  const dataNascimento = formatToTimeZone(dataNas, "DD/MM/YYYY", {
    timeZone: "Europe/Berlin"
  });

  return (
    <div className="container-fluid">
      <div className="col-md-12">
        <Sidebar {...props} />
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <dl>
            <h3>Dados do Cliente</h3>
            <dt>Nome:</dt>
            <dd>{cliente.nome}</dd>
            <dt>Apelido:</dt>
            <dd>{cliente.apelido}</dd>
            <dt>Limite de compra:</dt>
            <dd>{cliente.limiteDeCompra} R$</dd>
            <dt>Nome do Pai:</dt>
            <dd>{cliente.nomeDoPai}</dd>
            <dt>Nome da Mãe:</dt>
            <dd>{cliente.nomeDaMae}</dd>
            <dt>CPF:</dt>
            <dd>{cliente.cpf}</dd>
            <dt>RG:</dt>
            <dd>{cliente.rg}</dd>
            <dt>Data Nascimento:</dt>
            <dd>{dataNascimento}</dd>
            <dt>Data Nascimento:</dt>
            <dd>{cliente.dataNasc}</dd>
            <dt>Profissão:</dt>
            <dd>{cliente.profissao}</dd>
          </dl>

          <dl>
            <h3>Endereço Principal</h3>
            <dt>Tipo de casa:</dt>
            <dd>{cliente.casa}</dd>
            <dt>Rua:</dt>
            <dd>{cliente.endereco}</dd>
            <dt>Cidade:</dt>
            <dd>{cliente.cidade}</dd>
            <dt>Bairro:</dt>
            <dd>{cliente.bairro}</dd>
            <dt>Número da casa:</dt>
            <dd>{cliente.numero}</dd>
            <dt>Estado:</dt>
            <dd>{cliente.estado}</dd>
          </dl>
        </div>
        <div className="col-md-6">
          <dl>
            <h3>Contatos</h3>
            <dt>Telefone:</dt>
            <dd>{cliente.telefone}</dd>
            <dt>Telefone Extra:</dt>
            <dd>{cliente.telefoneExtra}</dd>
            <dt>Whatsapp:</dt>
            <dd>{cliente.whatsapp}</dd>
          </dl>

          <dl>
            <h3>Loja de cadastro</h3>
            <dt>Loja:</dt>
            <dd>{cliente.usuario}</dd>
          </dl>

          <dl>
            <h3>Endereço Secundário</h3>
            <dt>Tipo de casa:</dt>
            <dd>{cliente.casa2}</dd>
            <dt>Rua:</dt>
            <dd>{cliente.endereco2}</dd>
            <dt>Cidade:</dt>
            <dd>{cliente.cidade2}</dd>
            <dt>Bairro:</dt>
            <dd>{cliente.bairro2}</dd>
            <dt>Número da casa:</dt>
            <dd>{cliente.numero2}</dd>
            <dt>Estado:</dt>
            <dd>{cliente.estado2}</dd>
          </dl>

          <dl>
            <h3>Observações</h3>
            <dt>Observação:</dt>
            <dd>{cliente.observacao}</dd>
          </dl>
        </div>

        <div className="col-md-6">
          <Link
            style={{ marginTop: 13, marginBottom: 15 }}
            className="btn btn-danger"
            to="/clientes"
          >
            Voltar
          </Link>
        </div>

        <div className="col-md-6"></div>
      </div>
    </div>
  );
}
