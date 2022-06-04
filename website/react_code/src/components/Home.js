import React, { useEffect, useState } from "react";
import "../styles/Home.css"
import Modal from "./Modal";
import ApiFetchData from "./ApiFetchData";
import PlantAddForm from "./PlantAddForm";

export function Component(props) {
  return <div> {props.data} {props.whatever} </div>
}

export default function Home() {
  const [modalButton, setShowModal] = useState(false);
  const [modalPlant, setModelPlant] = useState(null);

  const [addFormOpen, setAddFormOpen] = useState(false);

  const [plantInfo, setPlantInfo] = useState([]);

  useEffect(() => {
    fetch('https://plantdb.azurewebsites.net/plants')
      .then(res => res.json())
      .then(data => {
        setPlantInfo(data.plants)
      })
  }, [])

  return (
    <div className="home">
      <div className="headerContainer">
        <h1> Plant Database </h1>
        <ApiFetchData />
      </div>

    <Modal trigger={modalButton} setTrigger={setShowModal} scientificName={modalPlant}></Modal>
    {addFormOpen && <PlantAddForm setTrigger={setAddFormOpen} />}

    <div>
      <button onClick={() => setAddFormOpen(true)}>Add plant</button>
    </div>

    <div className="plantTable"> 
      <table>
        <thead>
          <tr>
            <th>Plant Name</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {plantInfo.map(pi => (
            <tr key={pi.scientificName}>
              <td>
                <button onClick={() => {
                  setModelPlant(pi.scientificName);
                  setShowModal(true);
                }}>{pi.commonName}</button>
              </td>
              <td>
                {pi.region}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </div>
  );
}



