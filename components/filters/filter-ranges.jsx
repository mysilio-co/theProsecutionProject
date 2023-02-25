import Dropdown from './dropdown.jsx';
import NumericFilter from './numeric-filter.jsx';

export default function FilterRanges({values, router, isLoading, hasError}) {
    return (
        <div className="pt-5 px-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
        {
          values ? values.map((entry, index)=>{
            return <NumericFilter 
              label={entry.key} 
              min={entry.value[0]} 
              max={entry.value[1]} 
              router={router} 
              isLoading={isLoading} 
              hasError={hasError}
              key={index}/>
          }) : ""
        } 
        </div>
    );
  }
