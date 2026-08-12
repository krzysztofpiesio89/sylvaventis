import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import { useState } from 'react';

import SearchResults from './SearchResults.component';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? 'changeme',
  process.env.NEXT_PUBLIC_ALGOLIA_PUBLIC_API_KEY ?? 'changeme',
);

// https://www.algolia.com/doc/api-reference/widgets/instantsearch/react/

/**
 * Displays Algolia search for larger resolutions that do not show the mobile menu
 */
const AlgoliaSearchBox = () => {
  const [search, setSearch] = useState<string | null>(null);
  const [hasFocus, sethasFocus] = useState<boolean>(false);

  return (
    <div className="hidden mb-0.5 md:inline xl:inline">
      <div className="search-box-container">
        <InstantSearch
          indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? 'changeme'}
          searchClient={searchClient}
        >
          <SearchBox
            aria-label="Search collection"
            translations={{
              submitTitle: 'Search',
              resetTitle: 'Clear search',
              placeholder: 'Search our collection...',
            }}
            className="search-box-custom"
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              sethasFocus(true);
              setSearch(target.value);
            }}
            onKeyDown={(event) => {
              const target = event.target as HTMLInputElement;
              sethasFocus(true);
              setSearch(target.value);
            }}
            onReset={() => {
              setSearch(null);
            }}
          />
          <style jsx global>{`
            .search-box-custom .ais-SearchBox-input {
              background-color: rgba(255, 255, 255, 0.05) !important;
              border: 1px solid rgba(255, 255, 255, 0.1) !important;
              border-radius: 9999px !important;
              color: white !important;
              padding: 0.5rem 1.5rem !important;
              font-size: 0.75rem !important;
              width: 200px !important;
              transition: all 0.3s ease !important;
              outline: none !important;
              box-shadow: none !important;
            }
            .search-box-custom .ais-SearchBox-input:focus {
              background-color: rgba(255, 255, 255, 0.1) !important;
              border-color: #C5A059 !important;
              width: 280px !important;
            }
            .search-box-custom .ais-SearchBox-submit, 
            .search-box-custom .ais-SearchBox-reset {
              display: none;
            }
          `}</style>
          {search && (
            <div className="absolute z-50 bg-obsidian-alt border border-white/10 shadow-2xl rounded-xl mt-4 p-4 md:w-[24rem] right-0 overflow-hidden backdrop-blur-xl">
              <Hits hitComponent={SearchResults} />
            </div>
          )}
        </InstantSearch>
      </div>
    </div>
  );
};

export default AlgoliaSearchBox;
