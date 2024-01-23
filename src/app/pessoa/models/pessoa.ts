export interface Endereco {
  id: string;
  logradouro: string;
  complemento: string;
  numero: number;
  cidade: string;
  cep: string;
  estado: string;
  pessoaFisicaId: string;
}

export interface Contato {
  id: string;
  nome: string;
  telefoneOuEmail: string;
  tipoContato: string;
  pessoaFisicaId: string;
}

export interface Pessoa {
  id: string;
  nome: string;
  sobreNome: string;
  dataNascimento: string;
  email: string;
  cpf: string;
  rg: string;
  enderecos: Endereco[];
  contatos: Contato[];
}

