import Masonry from "react-masonry-css";
import dogsJson from "./dogs.json"
import { useRef, useState } from 'react'
import './App.css';

/*Converts json list into readable numbered object*/
var dogTemp = [];
Object.entries(dogsJson).forEach(([key, values]) => {
  if (Array.isArray(values)) {
    dogTemp.push([key,...values])
  }else {
    dogTemp.push(key)
  }
});
var nextId = dogTemp.length;

const breakpointColumnsObj = {
  default: 5,
  1800: 5,
  1400: 4,
  1200: 3,
  700: 2,
  500: 1
};

function displayDogs(dogList) {
  let dogView = dogList.map(function(dog,index) {
    if (dog.length===1) {
    return <div className="masonry-item" key={index}>
    <div className="grid-item m-3">
      <div className="card bg-light text-dark">
        <div className="card-header"><strong>
          <input style={{width:"70%"}} defaultValue={dog[0]} onChange={e => changeDog(dogList,e.target.value,index,0)} />
        </strong>
        <button className="px-1" style={{border:"none"}} onClick={() => {
          deleteDog(dogList,index);
        }}>X</button>
        <button className="px-1" style={{border:"none"}} onClick={() => {
          newBreed(dogList,index);
        }}>\/</button></div>
      </div></div></div>}else {
        var forEachData = [];
        dog.forEach((d,i) => {if (d!==dog[0]) {forEachData.push(<li className="list-group-item" key={i}><input style={{width:"75%"}} onChange={e => changeDog(dogList,e.target.value,index,i)} defaultValue={d} />
        <button className="px-1 bg-white" style={{border:"none"}} onClick={() => {
          deleteDogBreed(dogList,dog,index,i);
        }}>X</button></li>)}});

        return <div className="masonry-item" key={index}>
        <div className="grid-item m-3">
          <div className="card bg-light text-dark">
            <div className="card-header"><strong>
              <input style={{width:"70%"}} defaultValue={dog[0]} onChange={e => changeDog(dogList,e.target.value,index,0)} />
            </strong>
            <button className="px-1" style={{border:"none"}} onClick={() => {
              deleteDog(dogList,index);
            }}>X</button>
            <button className="px-1" style={{border:"none"}} onClick={() => {
              newBreed(dogList,index);
            }}>\/</button></div>
            <ul className="list-group list-group-flush">
            {forEachData.map(d => {return d})}
            </ul>
          </div></div></div>
      }
  })
  return dogView;
}

function changeDog(list,value,index,i) {
  list[index][i] = value;
  //need to change from page reload to state update
  localStorage.setItem("dogList",JSON.stringify(list));
}

function deleteDogBreed(newList,dogs,index,i) {
  //remove dog breed where the user has clicked from list
  dogs = [...dogs.slice(0, i), ...dogs.slice(i + 1)];
  newList[index] = dogs;

  //need to change from page reload to state update
  localStorage.setItem("dogList",JSON.stringify(newList));
  window.location.reload(false);
}

function deleteDog(newList,index) {
  if (index===0) {
    newList = newList.slice(1, newList.length);
  }else {
    newList = [...newList.slice(0, index), ...newList.slice(index + 1)];
  }
  //need to change from page reload to state update
  localStorage.setItem("dogList",JSON.stringify(newList));
  window.location.reload(false);
}

function newBreed(dogs,index) {
  dogs[index] = [...dogs[index],""];

  localStorage.setItem("dogList",JSON.stringify(dogs));
  window.location.reload(false);
}

function App() {
var run = useRef(false);
const [dogs, setDogs] = useState(dogTemp);
const [dogView, setDogView] = useState();

if (!run.current) {
    //still runs twice, doesnt prevent single run
    run.current = true;
    if (localStorage.getItem("dogList")===null) {
        //list hasnt changed so use json script
        localStorage.setItem("dogList",JSON.stringify(dogTemp));
        setDogView(displayDogs(dogTemp));
      }else {
        //list has been used before so use local build
        setDogView(displayDogs(JSON.parse(localStorage.getItem("dogList"))));
        setDogs(JSON.parse(localStorage.getItem("dogList")));
      }
  }

/*Name of new entry*/
const [name, setName] = useState('');

  return (
    <div className="App">
      <header>

        <div className="w3-main" style={{marginLeft:"10%",marginRight:"10%"}}>

          {/*<!-- Header -->*/}
          <div className="w3-container" style={{marginTop:"80px"}}>
            <h1 className="w3-jumbo text-light"><b>Dog Web API</b></h1>
            {/*<!--Page Title-->*/}
            <hr style={{width:"100%",border:"5px solid red"}} className="w3-round" />
          </div>

          {/*<!-- Results-->*/}
          <div className="w3-container text-light p-2 mt-2" style={{marginTop:"80px",marginLeft:"10%",marginRight:"10%"}}>
            <h2>Dog Breeds:</h2>

              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {dogView}
              </Masonry>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <button onClick={() => {
                localStorage.setItem("dogList",JSON.stringify([...dogs,[name]]));
                setDogs([...dogs,[name]]);
                setDogView([
                  ...dogView,
                  <div className="masonry-item" key={nextId++}>
                  <div className="grid-item m-3">
                    <div className="card bg-light text-dark">
                      <div className="card-header"><strong>
                        <input style={{width:"70%"}} defaultValue={name} onChange={e => changeDog(dogs,e.target.value,nextId,0)} />
                      </strong>
                      <button className="px-1" style={{border:"none"}} onClick={() => {
                        deleteDog(dogs,nextId);
                      }}>X</button>
                      <button className="px-1" style={{border:"none"}} onClick={() => {
                        newBreed(dogs,nextId);
                      }}>\/</button></div>
                    </div></div></div>
                ]);

              }}>Add</button>
          </div>
          </div>

      </header>
    </div>
  );
}

export default App;
