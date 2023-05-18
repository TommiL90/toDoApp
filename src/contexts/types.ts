export interface iChildrenProps {
  children: React.ReactNode;
}

export interface iDataLogin {
  email: string;
  password: string;
}

export interface iDataRegister {
  name: string;
  email: string;
  password: string;
}
export interface iUserProps{
  email: string;
  name: string;
  id: string;
  password?: string;
}

export interface iAuthContext {
  loginUser: (data: iDataLogin) => Promise<void>;
  loading: boolean;
  registerUser:(data: iDataRegister) => Promise<void>;
  isModalSuccessOpen:  boolean;
  onModalSuccessClose: () => void;
  isModalErrorOpen: boolean;
  onModalErrorClose: () => void;
  user: iUserProps
}

// ---->
// export interface iOperationItem{
//     value: number;
//     type: "sum" | "sub"
// }

// const[count, setCount] = useState(0)
// const [value, setValue] = useState([] as iOperationItem[])

// function operation (operationItem : iOperationItem){

//     if(operationItem.type === "sum"){
//         setCount(count + operationItem.value)
//     }else if (operationItem.type === "sub"){
//         setCount(count - operationItem.value)
//     }

//     setValue([...value, operationItem])
// }

// function resetCount (){
//     setCount(0)
//     setValue([])
// }

// ()=> tipaeje pra funcoes que nao tem retorno
