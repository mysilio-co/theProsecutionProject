import React, { useEffect, useState } from 'react';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import { classNames } from '../../../../scripts/common';

export default function HowToCarousel({ content }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [content]);

  const nextSlide = () => {
    setCurrentSlideIndex(prevIndex => (prevIndex + 1) % content._slides.length);
  };

  const previousSlide = () => {
    setCurrentSlideIndex(
      prevIndex =>
        (prevIndex - 1 + content._slides.length) % content._slides.length,
    );
  };

  const displayPrevArrow = () => {
    return currentSlideIndex == 0 ? 'hidden' : '';
  };

  const displayNextArrow = () => {
    return currentSlideIndex == content._slides.length - 1 ? 'hidden' : '';
  };

  return (
    <div className='carousel flex-column'>
      <div className='mx-5'>
        <h2>{content._title}</h2>
        <p>{content._description}</p>
      </div>
      <div className='justify-center flex w-full my-3'>
        <div className='w-10 flex items-center justify-center'>
          <button
            onClick={previousSlide}
            className={classNames(`${displayPrevArrow()} mx-1`)}
          >
            <ArrowLeftCircleIcon className='h-10 w-10' aria-hidden='true' />
          </button>
        </div>
        <img
          src={
            content._slides[currentSlideIndex]
              ? content._slides[currentSlideIndex]._imgSrc
              : content._slides[0]._imgSrc
          }
          alt='Carousel Slide'
          className='w-5/6'
        />
        <div className='w-10 flex items-center justify-center'>
          <button
            onClick={nextSlide}
            className={classNames(`${displayNextArrow()} mx-1`)}
          >
            <ArrowRightCircleIcon className='h-10 w-10' aria-hidden='true' />
          </button>
        </div>
      </div>
      <div className='my-3 mx-5'>
        <h3>
          {content._slides[currentSlideIndex]
            ? content._slides[currentSlideIndex]._subtitle
            : content._slides[0]._subtitle}
        </h3>
        <p>
          {content._slides[currentSlideIndex]
            ? content._slides[currentSlideIndex]._description
            : content._slides[0]._description}
        </p>
      </div>
    </div>
  );
}
