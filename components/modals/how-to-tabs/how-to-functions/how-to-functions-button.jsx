import classNames from 'classnames';

export default function HowToFunctionsButtons({
  func,
  selectedFunction,
  setSelectedFunction,
}) {
  return (
    <button
      type='button'
      onClick={() => {
        setSelectedFunction(func);
      }}
    >
      <a
        key={func}
        className={classNames(
          func === selectedFunction
            ? 'bg-gray-900 text-white hover:text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
          'whitespace-nowrap rounded-md py-2 px-2 inline-flex items-center text-sm font-medium hover:no-underline',
        )}
        aria-current={func === selectedFunction ? 'page' : undefined}
      >
        {func}
      </a>
    </button>
  );
}
