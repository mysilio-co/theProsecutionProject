

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ErrorMessage() {
    return (
      <div className="container mx-auto w-5/6 md:w-1/2 bg-gray-800 py-6 my-6 rounded-lg">
        <h2 className="text-xl text-center text-white p-3">An error occurred!</h2>
        <p className="text-md text-center text-white p-3">Something went wrong! Try refreshing the page, changing the tab, or resetting the search. If that doesn't work, you can reach out to us directly through our email or socials below.</p>
      </div>
    );
  }