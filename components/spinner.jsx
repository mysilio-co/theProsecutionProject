function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Spinner({display}) {
    return (
        <div className={classNames(display ? "" : "hidden", "h-20 flex justify-center items-center")}>
            <div className="w-12 h-12 border-4 border-t-transparent border-gray-800 border-solid rounded-full animate-spin"></div>
        </div>
    );
  }
