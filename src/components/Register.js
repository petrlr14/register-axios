import React, { Component } from "react";
import axios from "axios";

const initState = {
  email: "",
  username: "",
  password: ""
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initState };
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(event) {
    const { value, id } = event.target;
    this.setState({
      [id]: value
    });
  }

  //Nuestro metodo debe usar la palabra reservada async antes de su nombre, para poder usar await
  async onSubmitHandler(event) {
    event.preventDefault();
    //Toda sentencia await debe estar encapsulada en un bloque try-catch, para poder capturar errores
    try {
      //la promesa que resuleve axios retorna un objeto response, que lleva consigo en data la informacion devuelta por la api
      //Este paso es para obtener directamente la data, pero podriamos hacer otras cosas con response
      const {
        data
      } = await axios.post(
        "https://reactcourseapi.herokuapp.com/user/register",
        { ...this.state }
      );
      localStorage.setItem("token", data.token);
      this.setState({ ...initState });
    } catch ({ response }) {
      //En lugar de recibir el objeto de error de axios, lo destructuramos y conseguimos response, el cual trae informacion util de la response, como status y data
      const { data } = response; //data contiene el json que manda la api
      console.log(data.message); //message es la pripiedad que queremos loggear
    }
  }

  render() {
    const { email, username, password } = this.state;
    return (
      <form onSubmit={this.onSubmitHandler} className="d-flex flex-column ">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            id="email"
            placeholder="Ingrese su email..."
            onChange={this.onChangeHandler}
            value={email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            type="text"
            id="username"
            placeholder="Ingrese su username..."
            onChange={this.onChangeHandler}
            value={username}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            id="password"
            placeholder="ingrese su password..."
            onChange={this.onChangeHandler}
            value={password}
          />
          <small className="form-text text-muted">
            La contrase&ntilde;a debe llevar una may&uacute;scula, una
            min&uacute;scula y un d&iacute;gito
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign up
        </button>
      </form>
    );
  }
}
