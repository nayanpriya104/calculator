import React, {useState} from "react";
import Wrapper from "./Components/Wrapper";
import Screen from "./Components/Screen";
import ButtonBox from "./Components/ButtonBox";
import Button from "./Components/Button";


const btnValues = [
  ['C', '-+', '%', '/'],
  ['7', '8', '9', 'X'],
  ['4', '5', '6', '-'],
  ['3', '2', '1', '+'],
  ['0', '.', '='],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

function App() {
  let [calc, setCalc] = useState({
                          sign: "",
                          num: 0,
                          res: 0,
                        });

  const numClickHandler = (e) => {
    e.preventDefault();

    const value = e.target.innerHTML;

    if(removeSpaces(calc.num).length < 16){
      setCalc({
        ...calc,
        num: 
          calc.num === 0 && value === "0"
          ? "0"
          : removeSpaces(calc.num) % 1 === 0
          ? toLocaleString(Number(removeSpaces(calc.num + value)))
          : toLocaleString(calc.num + value),
      res: !calc.sign ? 0 : calc.res,
      });
    }
  }


  const commaClickHandler = (e) => {
    e.preventDefault();

    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  }


  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: 0,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
    })
  }


  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickHandler = (e) => {
    e.preventDefault();

    setCalc({
      ...calc,
      sign: "",
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
    });
  }


  const percentClickHanlder = () => {
    let num = calc.num ? parseFloat(calc.num) : 0;
    let res = calc.res ? parseFloat(calc.res) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100,1)),
      rs: (res /= Math.pow(100, 1)),
      sign: "",
    });
  }

  const resetClickhandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  }

  return (
    <React.Fragment>
    <h1>Start Calculating.....</h1>
    <p>&nbsp;</p>
      <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res}/>
        <ButtonBox>
        {
        btnValues.flat().map((btn, i) => {
        return (
          <Button 
          key ={i}
          className={btn === "=" ? "equals": ""}
          value={btn}
          onClick={
          btn === "C"
            ? resetClickhandler
            : btn === "+-"
            ? invertClickHandler
            : btn === "%"
            ? percentClickHanlder
            : btn === "="
            ? equalsClickHandler
            : btn === "/" || btn === "X" || btn === "+" || btn === "-"
            ? signClickHandler
            : btn === "."
            ? commaClickHandler
            : numClickHandler 

          }
          />
          );
        })
        }
        </ButtonBox>
    </Wrapper>
    </React.Fragment>
  );
}

export default App;