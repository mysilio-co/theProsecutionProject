import {
  DATASET,
  FILTER,
  DOWNLOAD,
  SAVE,
  SEARCH,
  SORT,
  VISUALIZE,
  HOW_TO_CONTENT,
} from '../../../scripts/how-to-content';
import HowToCarousel from './how-to-functions/how-to-carousel';
import { useEffect, useState } from 'react';
import HowToFunctionsButtons from './how-to-functions/how-to-functions-button';

export default function HowToFunctions() {
  const [selectedFunction, setSelectedFunction] = useState(DATASET);

  useEffect(() => {
    console.log(selectedFunction);
  }, [selectedFunction]);

  return (
    <div>
      <div className='bg-gray-800 border-t border-gray-700'>
        <nav className='px-2 md:py-2 md:space-x-6' aria-label='Global'>
          <HowToFunctionsButtons
            func={DATASET}
            setSelectedFunction={setSelectedFunction}
            selectedFunction={selectedFunction}
          />
          <HowToFunctionsButtons
            func={SEARCH}
            setSelectedFunction={setSelectedFunction}
            selectedFunction={selectedFunction}
          />
          <HowToFunctionsButtons
            func={SORT}
            setSelectedFunction={setSelectedFunction}
            selectedFunction={selectedFunction}
          />
          <HowToFunctionsButtons
            func={FILTER}
            setSelectedFunction={setSelectedFunction}
            selectedFunction={selectedFunction}
          />
          <HowToFunctionsButtons
            func={VISUALIZE}
            setSelectedFunction={setSelectedFunction}
            selectedFunction={selectedFunction}
          />
          <HowToFunctionsButtons
            func={DOWNLOAD}
            setSelectedFunction={setSelectedFunction}
            selectedFunction={selectedFunction}
          />
          <HowToFunctionsButtons
            func={SAVE}
            setSelectedFunction={setSelectedFunction}
            selectedFunction={selectedFunction}
          />
        </nav>
      </div>
      <HowToCarousel content={HOW_TO_CONTENT[selectedFunction]} />
    </div>
  );
}
