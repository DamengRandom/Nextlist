import { render, screen, fireEvent } from "@testing-library/react";
import AnimeFilters from "../components/Anime/AnimeFilters";

const mockProps = {
  type: "ANIME",
  searchInput: "Naruto",
  setSearchInput: jest.fn(),
  onSearch: jest.fn(),
  onClear: jest.fn(),
  onBack: jest.fn(),
  pageInput: "1",
  setPageInput: jest.fn(),
  onUpdatePage: jest.fn(),
  onPrev: jest.fn(),
  onNext: jest.fn(),
  page: 1,
  hasNextPage: true,
  handlePageChange: jest.fn(),
  reset: jest.fn(),
};

describe("AnimeFilters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders heading and search input", () => {
    render(<AnimeFilters {...mockProps} />);
    expect(screen.getByRole("heading", { name: /anime list/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
  });

  it("calls setSearchInput on input change", () => {
    render(<AnimeFilters {...mockProps} />);
    const input = screen.getByPlaceholderText(/search by name/i);
    fireEvent.change(input, { target: { value: "One Piece" } });
    expect(mockProps.setSearchInput).toHaveBeenCalledWith("One Piece");
  });

  it("calls onSearch when Search button is clicked", () => {
    render(<AnimeFilters {...mockProps} />);
    fireEvent.click(screen.getByLabelText("Apply search and page"));
    expect(mockProps.onSearch).toHaveBeenCalled();
  });

  it("calls onClear when Clear button is clicked", () => {
    render(<AnimeFilters {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: /clear/i }));
    expect(mockProps.onClear).toHaveBeenCalled();
  });

  it("calls onPrev and onNext when pagination buttons are clicked", () => {
    render(<AnimeFilters {...mockProps} page={2} />);
    fireEvent.click(screen.getByRole("button", { name: /go to previous page/i }));
    expect(mockProps.onPrev).toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /go to next page/i }));
    expect(mockProps.onNext).toHaveBeenCalled();
  });

  it("disables Prev button on first page", () => {
    render(<AnimeFilters {...mockProps} page={1} />);
    expect(screen.getByRole("button", { name: /go to previous page/i })).toBeDisabled();
  });

  it("disables Next button if hasNextPage is false", () => {
    render(<AnimeFilters {...mockProps} hasNextPage={false} />);
    expect(screen.getByRole("button", { name: /go to next page/i })).toBeDisabled();
  });
});