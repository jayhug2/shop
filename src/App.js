import './App.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Jumbotron, Button} from 'react-bootstrap';
import React, {useContext, useState} from 'react';
import Data from './data.js';
import { Route, Switch, Link } from 'react-router-dom'
import Detail from './Detail';
import axios from 'axios';
import Cart from './Cart.js'

const Card = ({shoes,i}) => {
  return (
    <div className="col-md-4">
      <Link to={`/detail/${shoes.id}`}>
        <img src={"https://codingapple1.github.io/shop/shoes"+(i+1)+".jpg"} width="100%" alt={shoes.title}/>
        <h4>{shoes.title}</h4>
      </Link>
      <p>{shoes.content}</p>
      <p>{`${Number(shoes.price).toLocaleString()}원`}</p>
      <Test i={i}/>
    </div>
  )
}
const Test = ({i}) => {
  let 재고 = useContext(StockContext);
  return (
    <p>재고 : {`${재고[i]} EA`}</p>
  )
}

let StockContext = React.createContext();



function App() {
  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10,11,12]);


  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to={`/`}>Home</Nav.Link>
            <Nav.Link as={Link} to={`/detail`}>Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <Jumbotron className="background">
            <h1>20% Season Off</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
          <div className="container">

            
            <StockContext.Provider value={재고}>
            <div className="row">
              { shoes.map((p,i) => <Card key={p.id} shoes={p} i={i}/> ) }
            </div>
            </StockContext.Provider>
            
            <button className="btn btn-primary" onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result) => {
                shoes변경([...Data, ...result.data]);
              })
              .catch((error) => { console.log(error) })
            }}>더보기</button>
            
          </div>
        </Route>



        <Route path="/detail/:id">
          <Detail 
            shoes={shoes} 
            재고={재고}
            재고변경={재고변경}  
          />
        </Route>

        <Route path={`/cart`}>
          <Cart />
        </Route>
        <Route paht="/:id">
          <div>아무거나 적었을때 이거보여주세요</div>
        </Route>
      </Switch>
    </div>
  );
}
export default App;
