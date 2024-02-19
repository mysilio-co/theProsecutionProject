export default function CitationContents({}) {
  return (
    <div className='my-2 mx-4 text-start'>
      <p className='text-sm text-gray-500'>
        This work is licensed under the Creative Commons
        Attribution-NonCommercial-ShareAlike 4.0 International License. To view
        a copy of this license, visit{' '}
        <a
          href='http://creativecommons.org/licenses/by-nc-sa/4.0/'
          target='_blank'
        >
          http://creativecommons.org/licenses/by-nc-sa/4.0/
        </a>{' '}
        or send a letter to Creative Commons, PO Box 1866, Mountain View, CA
        94042, USA.
      </p>
      <p className='text-sm text-gray-500 font-bold'>
        When using this dataset, all information sourced must be cited as
        follows, including any modifications users make to tPP data for
        published analysis:
      </p>
      <p className='my-3 text-sm text-gray-500'>
        Loadenthal, Michael, Lauren Donahoe, Madison Weaver, Sara Godfrey,
        Kathryn Blowers, et. al. “The Prosecution Project Dataset,”{' '}
        <span className='italic'>the Prosecution Project</span>, 2023 [dataset].
        https://theprosecutionproject.org/
      </p>
      <p className='my-3 text-sm text-gray-500'>
        We ask all users to read the user agreement carefully, as there are
        specific limitations on the use of tPP. These restrictions apply to both
        individual researchers and organizational users. The intent of these
        restrictions is not only to ensure that the intellectual property in tPP
        is appropriately protected, but also to ensure that the data is only
        used for the purposes of better understanding the American criminal
        justice system.
      </p>
    </div>
  );
}
