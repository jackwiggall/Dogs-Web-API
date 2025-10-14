import Masonry from "react-masonry-css";
import dogsJson from "./dogs.json"
import './App.css';

/*Converts json list into readable numbered object*/
const dogs = [];
Object.entries(dogsJson).forEach(([key, values]) => {
  if (Array.isArray(values)) {
    dogs.push([key,...values])
  }else {
    dogs.push(key)
  }

});


const breakpointColumnsObj = {
  default: 5,
  1800: 5,
  1400: 4,
  1200: 3,
  700: 2,
  500: 1
};
// Convert array to JSX items
const dogView = dogs.map(function(dog) {
  if (dog.length===1) {
  return <div className="masonry-item">
  <div className="grid-item m-3">
    <div className="card bg-light text-dark">
      <div className="card-header"><strong>
        {dog[0]}
      </strong></div>
    </div></div></div>}else {
      var forEachData = [];
      dog.forEach((d,index) => {if (d!=dog[0]) {forEachData.push(<li className="list-group-item" key={index}>{d}</li>)}});

      return <div className="masonry-item">
      <div className="grid-item m-3">
        <div className="card bg-light text-dark">
          <div className="card-header"><strong>
            {dog[0]}
          </strong></div>
          <ul className="list-group list-group-flush">
          {forEachData.map(d => {return d})}
          </ul>
        </div></div></div>
    }
});

function App() {
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

          </div>
          </div>

      </header>
    </div>
  );
}

export default App;
