import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss'
import { Nav } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';


const Box = styled.div`
    padding: 20px;
`
const Inbox = styled.h4`
    font-size: 25px;
`

function Detail({shoes, 재고, 재고변경}){
    useEffect(() => {
        let 타이머 = setTimeout(() => {
            alert변경(false);
        },2000)
        return function 어쩌구() {
            clearTimeout(타이머);
        }
    },[])

    let [alert, alert변경] = useState(true);
    let [inputData, inputData변경] = useState('');
    let [누른탭, 누른탭변경] = useState(0)
    let [스위치, 스위치변경] = useState(false);
    let { id } = useParams();
    let history = useHistory();

    return (
        <div className="container">
            <Box>
                <Inbox className="red">Detail</Inbox>
            </Box>
            <input 
              onChange={(e) => { inputData변경(e.target.value) }}
              value={inputData}
            />
            { alert
            ? ( <div className="my-alert">
                <p>재고가 얼마 남지 않았습니다.</p>
                </div>)
            : null }
            
            <div className="row">
                <div className="col-md-6">
                <img src={"https://codingapple1.github.io/shop/shoes"+(Number(id)+1)+".jpg"} width="100%" alt={shoes[id].title}/>
                </div>
                <div className="col-md-6 mt-4">
                <h4 className="pt-5">{shoes[id].title}</h4>
                <p>{shoes[id].content}</p>
                <p>{`${Number(shoes[id].price).toLocaleString()}원`}</p>
                <Info
                  재고={재고}
                  id={id}  
                />

                <button className="btn btn-danger" onClick={() => {
                  let 바뀐재고 = [...재고];
                  바뀐재고[id] -= 1;
                  재고변경(바뀐재고);
                }}>주문하기</button> 
                <button className="btn btn-danger" onClick={() => {
                    history.push('/')
                }}>뒤로가기</button> 
                </div>
            </div>
            <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
              <Nav.Item>
                <Nav.Link eventKey="link-0" onClick={() => { 스위치변경(false); 누른탭변경(0)}}>Active</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={() => { 스위치변경(false); 누른탭변경(1)}}>Option 2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2" onClick={() => { 스위치변경(false); 누른탭변경(2)}}>Option 3</Nav.Link>
              </Nav.Item>
            </Nav>
            <CSSTransition in={스위치} classNames="wow" timeout={500}>
              <TabContent 누른탭={누른탭} 스위치변경={스위치변경}/>
            </CSSTransition>
        </div> 
    )
}

function TabContent({누른탭, 스위치변경}){

  useEffect(() => {
    스위치변경(true);
  })

  if(누른탭===0){
    return <div>0번째 내용입니다.</div>
  } else if(누른탭===1) {
    return <div>1번째 내용입니다.</div>
  } else if(누른탭===2) {
    return <div>2번째 내용입니다.</div>
  }
}




function Info({재고, id}){
  return (
    <p>재고 : {재고[id]}</p>
  )
}

export default Detail;