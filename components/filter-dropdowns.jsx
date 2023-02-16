import Dropdown from './dropdown.jsx';
import { generateListDropdowns } from '../scripts/filter';

export default function FilterDropdowns({values, router}) {
    return (
        <div className="pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {
          values.map((entry, index)=>{
            return <Dropdown router={router} label={Object.keys(entry)} options={Object.values(entry)[0]} key={index}/>
          })
        }
        </div>
    );
  }
