import Dropdown from './dropdown.jsx';
import { generateListDropdowns } from '../scripts/filter';

export default function FilterDropdowns({values, router}) {
    return (
      <form>
        <div className="">
        {
          values.map((entry, index)=>{
            return <Dropdown router={router} label={Object.keys(entry)} options={Object.values(entry)[0]} key={index}/>
          })
        }
        </div>
      </form>
    );
  }
