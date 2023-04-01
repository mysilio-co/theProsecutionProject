import { useEffect } from "react";
import { classNames } from "../scripts/common";

export default function Footer({isMobile, isInitiallyLoaded}) {

    return (
        <div>
            <div className={classNames((!isMobile && isInitiallyLoaded ? 'flex' : 'hidden'), "justify-between mx-8")}>
                <div className="flex-1 px-2 flex items-center justify-start sm:inset-0 bg-gray-800">
                    <div className="relative">
                        <a href="https://theprosecutionproject.org/" target="_blank">
                        <img
                            className="block h-24"
                            src="https://i0.wp.com/theprosecutionproject.org/wp-content/uploads/2020/08/Illustration-Hiking-Website-Email-Header-2.png?w=600&ssl=1"
                            alt="The Prosecution Project"
                        />
                        </a>
                    </div>
                    </div>
                    <div className="flex-1 px-2 flex items-center justify-end sm:inset-0 bg-gray-800">
                    <div className="mx-5">
                        <a href="mailto:michael@theprosecutionproject.org" target="_blank">
                        <img
                            className="block h-10"
                            src="/mail.png"
                            alt="email icon"
                        />
                        </a>
                    </div>
                    <div className="mx-5">
                        <a href="https://twitter.com/ProsecutionProj" target="_blank">
                        <img
                            className="block h-10"
                            src="/twitter.png"
                            alt="twitter logo"
                        />
                        </a>
                    </div>
                    <div className="mx-5">
                        <a href="https://www.linkedin.com/company/the-prosecution-project/" target="_blank">
                        <img
                            className="block h-10"
                            src="/linkedin.png"
                            alt="linkedin logo"
                        />
                        </a>
                    </div>
                </div>
            </div>
            <div className={classNames((isMobile || !isInitiallyLoaded ? 'block' : 'hidden'))}>
                <div className="flex-1 px-2 pt-6 pb-3 flex items-center justify-center sm:inset-0 bg-gray-800">
                    <div className="relative">
                        <a href="https://theprosecutionproject.org/" target="_blank">
                            <img
                            className="block h-24"
                            src="https://i0.wp.com/theprosecutionproject.org/wp-content/uploads/2020/08/Illustration-Hiking-Website-Email-Header-2.png?w=600&ssl=1"
                            alt="The Prosecution Project"
                            />
                        </a>
                    </div>
                </div>
                <div className="flex-1 px-2 pt-6 pb-12 flex items-center justify-center sm:inset-0 bg-gray-800">
                    <div className="mx-5">
                        <a href="mailto:michael@theprosecutionproject.org" target="_blank">
                            <img
                            className="block h-10"
                            src="/mail.png"
                            alt="email icon"
                            />
                        </a>
                    </div>
                    <div className="mx-5">
                        <a href="https://twitter.com/ProsecutionProj" target="_blank">
                            <img
                            className="block h-10"
                            src="/twitter.png"
                            alt="twitter logo"
                            />
                    </a>
                    </div>
                    <div className="mx-5">
                        <a href="https://www.linkedin.com/company/the-prosecution-project/" target="_blank">
                            <img
                            className="block h-10"
                            src="/linkedin.png"
                            alt="linkedin logo"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
  }
