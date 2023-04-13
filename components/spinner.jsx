import { classNames } from "../scripts/common";

export default function Spinner({display}) {
    return (
        <div className={classNames(display ? "" : "hidden")}>
            <div className="h-20 flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-t-transparent border-gray-800 border-solid rounded-full animate-spin"></div>
            </div>
            <div className="text-center pb-4">The first time loading may take up to a minute (subsequent loads will be quicker).</div>
        </div>
    );
  }
