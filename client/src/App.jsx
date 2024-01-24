// import { Card } from "./components/card"
import { LogIn } from "./components/login"
// import { Register } from "./components/register"


function App() {

//   const obj = {
//     name:"rexxy",
//     age:24
//   }

  return (
    <>
    <h1 
    className="bg-green-400 text-black text-center p-2 rounded-lg">
      My Todo
    </h1>

    <LogIn />
    {/* <Register /> */}

{/* 
    <Card name="Rexxy" myObj={obj}/>
    <Card />
    <Card /> */}


    </>
  )
}

export default App
