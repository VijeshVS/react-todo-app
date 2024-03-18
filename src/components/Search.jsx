
import { FcSearch } from "react-icons/fc";

export const Search = () => { 
    
    return  <div className="flex mt-8 justify-center">
    <FcSearch className="text-3xl"/> <input placeholder="Search Todos" className='ml-3 w-96 h-9 border-2 rounded-xl pl-2 text-md border-gray-400' type='text'/>
    </div> 

}