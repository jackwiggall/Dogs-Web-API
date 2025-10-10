import Masonry from "react-masonry-css";
import './App.css';

const dogList = [
  {id: 0, title: "Item One",},
  {id: 1, title: "Item Two",},
  {id: 2, title: "Item Three",},
  {id: 3, title: "Item Four",},
  {id: 4, title: "Item Five",},
  {id: 4, title: "Item Six",},
  {id: 4, title: "Item sEven",},
]
const breakpointColumnsObj = {
  default: 5,
  1800: 5,
  1400: 4,
  1200: 3,
  700: 2,
  500: 1
};
// Convert array to JSX items
const dogView = dogList.map(function(dog) {
  return <div className="masonry-item" key={dog.id}>
  <div className="grid-item m-3">
    <div className="card bg-light text-dark">
      <div className="card-header"><strong>
        {dog.title}
      </strong></div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">An item</li>
        <li className="list-group-item">A second item</li>
        <li className="list-group-item">A third item</li>
      </ul>
    </div></div></div>
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
