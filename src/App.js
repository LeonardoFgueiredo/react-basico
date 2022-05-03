import { Component } from 'react';
import './App.css';
import Comentario from './Components/Comentario';

class App extends Component {

  state = {
    comentarios: [
      {
        nome: "Leonardo",
        email: "leo@gmail.com",
        data: new Date(2022, 3, 19, 12, 15, 0),
        mensagem: "Olá. tudo bem?"
      },
    ],
    novoComentario: {
      nome: '',
      email: '',
      mensagem: ''
    }
  }

  adicionarComentario = evento => {
    evento.preventDefault();
    const novoComentario = { ...this.state.novoComentario, data: new Date() };

    this.setState({
      comentarios: [...this.state.comentarios, novoComentario],
      novoComentario: { nome: '', email: '', mensagem: '' }
    })

    //copia do array, e adiciona um novo elemento
    this.setState({
      comentarios: [...this.state.comentarios, novoComentario]
    })
  }

  removerComentario = comentario =>{
    let lista = this.state.comentarios;
    lista = lista.filter(c => c !== comentario);
    this.setState({comentarios: lista});
  }

  digitacao = evento => {
    const { name, value } = evento.target;
    this.setState({ novoComentario: { ...this.state.novoComentario, [name]: value } })
  }

  render() {
    return (
      <div className="App">
        <h1>Meu projeto em ReactJs</h1>

        {this.state.comentarios.map((comentario, indice) => (
          <Comentario
            key={indice}
            nome={comentario.nome}
            email={comentario.email}
            data={comentario.data} 
            onRemove={this.removerComentario.bind(this, comentario)}>
            {comentario.mensagem}
          </Comentario>
        ))}

        <form method='post' onSubmit={this.adicionarComentario} className='Novo-comentario'>
          <h2>Adicionar Comentário</h2>
          <div>
            <input type='text'
              name='nome'
              value={this.state.novoComentario.nome}
              onChange={this.digitacao}
              placeholder='Digite seu nome'
              required>
            </input>
          </div>

          <div>
            <input type='email'
              name='email'
              value={this.state.novoComentario.email}
              onChange={this.digitacao}
              placeholder='Digite seu email'
              required>
            </input>
          </div>

          <div>
            <textarea name='mensagem'
              rows='4'
              value={this.state.novoComentario.mensagem}
              onChange={this.digitacao}
              placeholder='Digite sua mensagem'
              required
            />
          </div>

          <button type='submit'>Adicionar Comentário</button>

        </form>
      </div>
    );
  }

}

export default App;
