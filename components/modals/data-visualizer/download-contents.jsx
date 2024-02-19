import { classNames } from '../../../scripts/common';
import { useState, useEffect } from 'react';
import domtoimage from 'dom-to-image';
import { RadioGroup } from '@headlessui/react';
import * as DataVisualizerConstants from '../../../scripts/data-visualizer-constants';
import CitationContents from './citation-contents';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

export default function DownloadContents({
  display,
  allVisualsId,
  visualElementsId,
  tableElementsId,
}) {
  const [selected, setSelected] = useState('');
  const [displayNoSelectionMessage, setDisplayNoSelectionMessage] =
    useState(false);
  const idMap = {
    [DataVisualizerConstants.CHART_ONLY]: visualElementsId,
    [DataVisualizerConstants.TABLE_ONLY]: tableElementsId,
    [DataVisualizerConstants.ALL_CONTENTS]: allVisualsId,
  };

  useEffect(() => {
    if (displayNoSelectionMessage) {
      setDisplayNoSelectionMessage(false);
    }
  }, [selected]);

  function saveVisualsAsPng(activeId) {
    const scale = 3;
    const domNode = document.getElementById(activeId);
    domtoimage
      .toBlob(domNode, {
        width: domNode.clientWidth * scale,
        height: domNode.clientHeight * scale,
        bgcolor: 'white',
        style: {
          transform: 'scale(' + scale + ')',
          transformOrigin: 'top left',
        },
      })
      .then(function (blob) {
        window.saveAs(blob, 'tPP-visual.png');
      });
  }
  return (
    <div
      className={classNames(
        display ? 'block' : 'hidden',
        'my-2 mx-4 text-start',
      )}
    >
      <CitationContents display={display} />
      <div
        onChange={e => {
          setActiveId(e.target.value);
        }}
      >
        <div className='w-full'>
          <div className='w-full'>
            <RadioGroup value={selected} onChange={setSelected}>
              <RadioGroup.Label className='sr-only'>
                Server size
              </RadioGroup.Label>
              <div className='md:flex'>
                {DataVisualizerConstants.DOWNLOAD_OPTIONS.map((option, i) => (
                  <RadioGroup.Option
                    key={i}
                    value={option.name}
                    className={({ active, checked }) =>
                      `${
                        active
                          ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-gray-300'
                          : ''
                      }
                  ${checked ? 'bg-gray-800 text-white' : 'bg-white'}
                    relative flex w-full cursor-pointer rounded-lg px-5 py-4 my-2 md:my-0 md:mx-2 shadow-md focus:outline-none`
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className='flex w-full items-center justify-between'>
                          <div className='flex items-center'>
                            <div className='text-sm'>
                              <RadioGroup.Label
                                as='p'
                                className={`font-medium  ${
                                  checked ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {option.name}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as='span'
                                className={`inline ${
                                  checked ? 'text-sky-100' : 'text-gray-500'
                                }`}
                              >
                                <span>{option.description}</span>
                              </RadioGroup.Description>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      <div className='mt-2 mx-4 text-start'>
        <p className='text-sm text-gray-500'>
          * The downloaded image is dependent on the window currently being
          displayed, including the title and active filters sections. Try
          increasing the window size or downloading on a larger screen if the
          chart comes out cropped.
        </p>
      </div>
      {displayNoSelectionMessage ? (
        <div className='w-full text-center flex justify-start items-center mx-2 mt-5'>
          <ExclamationCircleIcon
            className='block h-5 w-5 text-gray-400 mr-2'
            aria-hidden='true'
          />
          <p className='text-lg text-gray-500'>
            Please select a download option
          </p>
        </div>
      ) : (
        ''
      )}
      <div className='flex'>
        <button
          onClick={function () {
            if (!selected) {
              setDisplayNoSelectionMessage(true);
            } else {
              saveVisualsAsPng(idMap[selected]);
            }
          }}
          className='relative h-38px w-full md:w-40 mt-5 mb-5 md:mx-2 whitespace-nowrap bg-gray-800 hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 text-white rounded'
        >
          Download
        </button>
      </div>
    </div>
  );
}
