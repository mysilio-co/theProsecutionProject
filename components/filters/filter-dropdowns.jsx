import Dropdown from './dropdown.jsx';
import * as d3 from 'd3';

export default function FilterDropdowns({ values, router }) {
  values = values.sort((a, b) => {
    return d3.ascending(Object.keys(a)[0], Object.keys(b)[0]);
  });
  return (
    <div className='pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {values.map((entry, index) => {
        return (
          <Dropdown
            router={router}
            label={Object.keys(entry)}
            options={Object.values(entry)[0]}
            key={index}
          />
        );
      })}
    </div>
  );
}
