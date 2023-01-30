import InputWithLabel from "./InputWithLabel";

type SearchFormProps = {
  searchTerm: string;
  handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchForm = ({
  searchTerm,
  handleSearchSubmit,
  handleSearchInput,
}: SearchFormProps) => (
  <form onSubmit={handleSearchSubmit}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={handleSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>
    <button disabled={!searchTerm}>Submit</button>
  </form>
);

export default SearchForm;