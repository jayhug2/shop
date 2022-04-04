import React from 'react';
import { Table } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';



function Cart(props){

  let state = useSelector((state) => state.reducer);
  let dispatch = useDispatch();

  return (
    <div>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          { state.map((item,i) => (
              <tr key={i}>
                <td>{i}</td>
                <td>{ item.name }</td>
                <td>{ item.quan }</td>
                <td>
                  <button onClick={() => { dispatch( { type : '수량증가', 데이터 : item.id}) }}>+</button>
                  <button onClick={() => { dispatch( { type : '수량감소', 데이터 : item.id}) }}>-</button>
                </td>
              </tr>
            )) }
        </tbody>
      </Table>
      { props.alert열렸니
        ? (<div className="my-alert2">
            <p>지금 구매하시면 신규할인 20%</p>
            <button onClick={ () => props.dispatch( { type : 'alert닫기' })}>닫기</button>
          </div>)
        : null
      }

    </div>
  )
}

/* function state를props화({reducer, reducer2}){
  
  return {
    state : reducer,
    alert열렸니 : reducer2
  }
}

export default connect(state를props화)(Cart) */

export default Cart;