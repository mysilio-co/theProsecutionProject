import Dropdown from './dropdown.jsx';
import { generateListDropdowns } from '../scripts/filter';

export default function SearchForm({data}) {
    return (
      <form>
        {
          generateListDropdowns(data).map((entry, index)=>{
            return <Dropdown label={Object.keys(entry)} options={Object.values(entry)[0]} key={index}/>
          })
        }
        <input type="submit" value="Submit" />
      </form>
    );
  }
