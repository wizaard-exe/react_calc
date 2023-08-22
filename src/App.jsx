import { useState } from 'react';
import './index.css';
function App() {
  const [state,setState] = useState({currentOperand:'0',previousOperand:'',operand:'',overwirte:false})
  
  function addDigit(digit)
  {
    if(digit === '0' && state.currentOperand === '0')
    {
      return state;
    }
    if(digit === '.' && state.currentOperand.includes('.'))
    {
      return state;
    }
    if(state.currentOperand === '0' && digit !== '.')
    {
      setState({...state,currentOperand:digit})
    }
    else if(state.currentOperand === '0' && digit === '.')
    {
      setState({...state,currentOperand:state.currentOperand+digit})
    }

    else{
      setState(
        {...state,currentOperand:state.currentOperand+digit}
      )
    }

  }


  function calculate(digit)
  {
    // if(state.currentOperand === '0' && state.previousOperand === ''){return state}
    if(state.previousOperand === '')
    {
      return setState({...state,previousOperand:state.currentOperand,currentOperand:'',operand:digit})
    }
    else if(state.previousOperand !== "" && state.currentOperand === '0')
    {
      return setState({...state,currentOperand:''});
    }
    else
    {
        setState({...state,operand:digit});
        if(evaluate() !== undefined)
        {
          setState({...state,previousOperand:evaluate(),currentOperand:'',operand:digit});    
        }
    }
  }

  
  function equalTo()
  {
    if((state.currentOperand === '0' && state.previousOperand ==="" )|| (state.currentOperand !== "" && state.previousOperand === "" )){return state};
    if(state.currentOperand === ""){setState({...state,currentOperand:state.previousOperand,previousOperand:'',operand:''})}
    else{
      setState({...state,currentOperand:evaluate().toString(),previousOperand:'',operand:''})
    }
  }


function evaluate()
{
        const previous = parseFloat(state.previousOperand);
        const current  = parseFloat(state.currentOperand);

        if(isNaN(previous) || isNaN(current)){return }

        else{
          let  sum;
          switch(state.operand)
          {
            case '+':{
              sum = previous + current;
              break;
            }
            case '-':{
              sum = previous - current;
              break;
            }
            case '*':{
              sum = previous * current;
              break;
            }
            case '÷':{
              sum = previous / current;
              break;
            }
          }
          return sum;
        }
}



  function allClear()
  {
    setState({currentOperand:'0',previousOperand:'',operand:''})
  }

  function remove()
  {
    if(state.currentOperand === "") {return state}
    if(state.currentOperand.length > 1)
    {
      setState({...state,currentOperand:state.currentOperand.slice(0,-1)})
    }
    else{
      setState({...state,currentOperand:'0'})
    }
  }
  const numberFormatter = new Intl.NumberFormat('hi-IN',{minimumFractionDigits:0});

  function formatter(number)
  {
    if(number === ""){ return null}
    else{
      const [integer,decimal] = number.toString().split('.');
      if(decimal === undefined){return numberFormatter.format(integer)}
      else{
        return `${numberFormatter.format(integer)}.${decimal}`;
      }
  }
    
  }

  return(
      <div className='calculator'>

        <div className='output'>
          <div className='previousOperand'>{formatter(state.previousOperand)} {state.operand}</div>
          <div className='currentOperand'>{formatter(state.currentOperand)}</div>
        </div>
        <button className='span-2' onClick={allClear}>AC</button>
        <button onClick={remove}>DEL</button>
        <button onClick={()=>calculate("÷")}>÷</button>
        <button onClick={()=>{addDigit("1")}}>1</button>
        <button onClick={()=>{addDigit("2")}}>2</button>
        <button onClick={()=>{addDigit("3")}}>3</button>
        <button onClick={()=>calculate("*")} >*</button>
        <button onClick={()=>{addDigit("4")}}>4</button>
        <button onClick={()=>{addDigit("5")}}>5</button>
        <button onClick={()=>{addDigit("6")}}>6</button>
        <button onClick={()=>calculate("-")}>-</button>
        <button onClick={()=>{addDigit("7")}}>7</button>
        <button onClick={()=>{addDigit("8")}}>8</button>
        <button onClick={()=>{addDigit("9")}}>9</button>
        <button onClick={()=>calculate("+")}>+</button>
        <button onClick={()=>{addDigit('.')}}>.</button>
        <button onClick={()=>{addDigit('0')}}>0</button>
        <button className='span-2' onClick={equalTo} >=</button>
      </div>
  )
  
}

export default App
