import { RangeSlider, InputGroup, InputNumber } from 'rsuite';
import {React, useState, useEffect} from 'react';
import 'rsuite/dist/rsuite.min.css';
import { addQueryParam, removeQueryParam } from '../../scripts/router-handling';

export default function NumericFilter({label, min, max, router, isLoading, hasError}) {
    const [value, setValue] = useState([min, max]);
    const [enabled, setEnabled] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const isDisabled = isLoading && !hasError;

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

    // useEffect(()=>{
    //     if(!isDisabled) {
    //         enabled ? addQueryParam(label, value, router) : removeQueryParam(label, router);
    //     }
    // },[enabled])

    // useEffect(()=>{
    //     if(!isDisabled && enabled) {
    //         addQueryParam(label, value, router);
    //     }
    // },[value])

  return (
    <div>
        <label className="block text-sm pr-2 font-medium text-gray-400">{label}</label>
        <div className="flex items-center">
            <div className="flex items-center mr-6">
                <label className="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" value="" checked={enabled} className="sr-only peer" disabled = {isDisabled}
                    onChange={(e) => {e.target.checked ? setEnabled(true) : setEnabled(false)}} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                {/* <span className="ml-3 text-sm font-sm text-gray-900">Show all columns</span> */}
                </label>
            </div>
            <div className="basis-1/4 mr-6">
                <RangeSlider
                    progress
                    value={value}
                    min={min}
                    max={max}
                    className="pink"
                    disabled={!enabled || isDisabled}
                    onChange={value => {
                        setValue(value);
                    }}
                />
            </div>
            <div className="basis-1/4">
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
