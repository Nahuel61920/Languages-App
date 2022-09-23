import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';

function App() {
  const baseUrl="http://localhost:81/lenguages/";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEdit, setModalEdit]=useState(false);
  const [modalDelete, setModalDelete]=useState(false);

  const [lenguageSeleccionado, setLenguageSeleccionado]=useState({
    id: '',
    name: '',
    launch: '',
    developer: '',
    img: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setLenguageSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }));
    console.log(lenguageSeleccionado);
  }


  const openCloseModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const openCloseModalEdit=()=>{
    setModalEdit(!modalEdit);
  }

  const openCloseModalDelete=()=>{
    setModalDelete(!modalDelete);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    let f=new FormData();
    f.append("name", lenguageSeleccionado.name);
    f.append("launch", lenguageSeleccionado.launch);
    f.append("developer", lenguageSeleccionado.developer);
    f.append("img", lenguageSeleccionado.img);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
      .then(response=>{
        setData(data.concat(response.data));
        openCloseModalInsertar();
      }).catch(error=>{
        console.log(error);
      })
  }

  const peticionPut=async()=>{
    let f=new FormData();
    f.append("name", lenguageSeleccionado.name);
    f.append("launch", lenguageSeleccionado.launch);
    f.append("developer", lenguageSeleccionado.developer);
    f.append("img", lenguageSeleccionado.img);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: lenguageSeleccionado.id}})
      .then(response=>{
        let dataNueva=data;
        dataNueva.map(lenguage=>{
          if(lenguage.id===lenguageSeleccionado.id){
            lenguage.name=lenguageSeleccionado.name;
            lenguage.launch=lenguageSeleccionado.launch;
            lenguage.developer=lenguageSeleccionado.developer;
            lenguage.img=lenguageSeleccionado.img;
          }
        });
        setData(dataNueva);
        openCloseModalEdit();
      }).catch(error=>{
        console.log(error);
      })
  }

  const peticionDelete=async()=>{
    let f=new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: lenguageSeleccionado.id}})
      .then(response=>{
        setData(data.filter(lenguage=>lenguage.id!==response.data));
        openCloseModalDelete();
      }).catch(error=>{
        console.log(error);
      })
  }

  const selectPutandDelete = (lenguage, caso)=>{
    setLenguageSeleccionado(lenguage);
    (caso==="Edit") ? openCloseModalEdit() : openCloseModalDelete()
  }


  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div style={{textAlign: 'center'}} className="container-fluid">
      <div>
      <h1>Lenguages of programming</h1>

<button className="btn btn-success" onClick={()=>openCloseModalInsertar()}>Insertar</button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Launch</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(lenguage=>(
            <tr key={lenguage.id}>
              <td>{lenguage.id}</td>
              <td className='d-flex px-3'><img src={lenguage.img} className='mx-5' width="50" height="50" alt=""/><p className="f-5 text-center">{lenguage.name}</p></td>
              <td>{lenguage.launch}</td>
              <td>{lenguage.developer}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>selectPutandDelete(lenguage, "Edit")}>Edit</button> {"   "}
                <button className="btn btn-danger" onClick={()=>selectPutandDelete(lenguage, "Delete")}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insert Lenguage</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Name</label>
            <br/>
            <input type="text" className="form-control" name="name" onChange={handleChange}/>
            <br/>
            <label>Launch</label>
            <br/>
            <input type="text" className="form-control" name="launch" onChange={handleChange}/>
            <br/>
            <label>Author</label>
            <br/>
            <input type="text" className="form-control" name="developer" onChange={handleChange}/>
            <br/>
            <label>Image</label>
            <br/>
            <input type="text" className="form-control" name="img" onChange={handleChange}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPost()}>Insert</button>{"   "}
          <button className="btn btn-danger" onClick={()=>openCloseModalInsertar()}>Cancel</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdit}>
        <ModalHeader>
          <div>
            <h3>Insert Lenguage</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Name</label>
            <br/>
            <input type="text" className="form-control" name="name" onChange={handleChange} value={lenguageSeleccionado && lenguageSeleccionado.name}/>
            <br/>
            <label>Launch</label>
            <br/>
            <input type="text" className="form-control" name="launch" onChange={handleChange} value={lenguageSeleccionado && lenguageSeleccionado.launch}/>
            <br/>
            <label>Author</label>
            <br/>
            <input type="text" className="form-control" name="developer" onChange={handleChange} value={lenguageSeleccionado && lenguageSeleccionado.developer}/>
            <br/>
            <label>Image</label>
            <br/>
            <input type="text" className="form-control" name="img" onChange={handleChange} value={lenguageSeleccionado && lenguageSeleccionado.img}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPut()}>Insert</button>{"   "}
          <button className="btn btn-danger" onClick={()=>openCloseModalEdit()}>Cancel</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete}>
        <ModalBody>
          Are you sure you want to remove the language {lenguageSeleccionado && lenguageSeleccionado.name}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>Sí</button>
          <button className="btn btn-secondary" onClick={()=>openCloseModalDelete()}>No</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
