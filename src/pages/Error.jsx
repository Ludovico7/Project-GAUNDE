import { useRouteError } from "react-router-dom";



export default function ErrorPage(){
  let error = useRouteError();

  console.log(error)
  if(error.status === 404){
    return <div>{error.statusText}</div>
  } else if (error.status === 500){
    return <div>Server Error</div>
  }
}