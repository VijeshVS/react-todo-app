
import { FcSearch } from "react-icons/fc";

export const Search = () => { 

    return  <div style={{marginTop:20,position:'relative'}}>
    <FcSearch style={{fontSize:50,position:'absolute',bottom:0}}/>
    <input type='text' style={{padding:10,fontSize:17,width:300,height:20,borderRadius:5,border:"solid 1px white",marginTop:30,marginLeft:66}}/>
    </div> 

}