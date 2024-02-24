import axios from 'axios'
import { FcSearch } from "react-icons/fc";
import { useRecoilState, useSetRecoilState } from "recoil";
import { searchAtom,todoAtom } from "../assets/store/atoms/TodoAtom";
import { useEffect } from 'react';


export const Search = () => { 
    const setsearchInput = useSetRecoilState(searchAtom);
    const setTodos = useSetRecoilState(todoAtom)

    useEffect(()=>{
        axios.get('https://my-api').then((res)=>{
            const data = res.data;
            setTodos(data)
        })
    },[])
        
    return  <div style={{marginTop:20,position:'relative'}}>
    <FcSearch style={{fontSize:50,position:'absolute',bottom:0}}/>
    <input onChange={e=>setsearchInput(e.target.value)} type='text' style={{padding:10,fontSize:17,width:300,height:20,borderRadius:5,border:"solid 1px white",marginTop:30,marginLeft:66}}/>
    </div> 

}