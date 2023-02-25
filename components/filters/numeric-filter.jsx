import { RangeSlider, InputGroup, InputNumber } from 'rsuite';
import {React, useState, useEffect} from 'react';
import 'rsuite/dist/rsuite.min.css';
import { addQueryParam, removeQueryParam } from '../../scripts/router-handling';
import { classNames } from '../../scripts/common';

export default function NumericFilter({label, min, max, router, isLoading, hasError}) {
    const [value, setValue] = useState([min, max]);
    const [enabled, setEnabled] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const isDisabled = isLoading && !hasError;
    let noSelection = value[0] === value[1];

    useEffect(()=>{
        if(!isDisabled && router.query[label]) {
            setValue(router.query[label].split(',').map(Number));
            setEnabled(true);
        }
        setInitialLoad(false);
    },[isDisabled])

    useEffect(()=>{
        if(!isDisabled && !initialLoad) {
            enabled ? addQueryParam(label, value, router) : removeQueryParam(label, router);
        }
    },[value, enabled])

  return (
    <div>
        <label className="block text-sm pr-2 font-medium text-gray-400">{label}</label>
        <div className="flex items-center w-full">
            <div className="flex items-center mr-6">
                <label className={classNames(
                        noSelection
                          ? "cursor-no-drop"
                          : "cursor-pointer",
                        "inline-flex relative items-center"
                )}>
                <input type="checkbox" value="" checked={enabled} className="sr-only peer" disabled = {isDisabled || noSelection}
                    onChange={(e) => {e.target.checked ? setEnabled(true) : setEnabled(false)}} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
            </div>
            <div className="basis-1/2 mr-6">
                <RangeSlider
                    progress
                    value={value}
                    min={min}
                    max={max}
                    step={max-min<20 ? 1 : Math.floor(max/20)}
                    className="pink"
                    disabled={!enabled || isDisabled}
                    onChange={value => {
                        setValue(value);
                    }}
                />
            </div>
            <div className="basis-1/3">
                <InputGroup>
                <InputNumber
                    min={min}
                    max={max}
                    value={Number(value[0])}
                    disabled={!enabled || isDisabled}
                    onChange={nextValue => {
                    const [start, end] = value;
                    if (nextValue > end) {
                        return;
                    }
                    setValue([Number(nextValue), end]);
                    }}
                />
                <InputGroup.Addon>to</InputGroup.Addon>
                <InputNumber
                    min={min}
                    max={max}
                    value={Number(value[1])}
                    disabled={!enabled || isDisabled}
                    onChange={nextValue => {
                    const [start, end] = value;
                    if (start > nextValue) {
                        return;
                    }
                    setValue([start, Number(nextValue)]);
                    }}
                />
                </InputGroup>
            </div>
        </div>
    </div>
  );
  }
