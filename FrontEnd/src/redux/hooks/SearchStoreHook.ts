import { useAppDispatch, useAppSelector } from "../store";
import { RootState } from "../store";
import { getAllSerchData, setSearchData } from "../slices/SearchSlice";

export const SearchStoreHook = () => {
  const dispatch = useAppDispatch();
  const { bookData } = useAppSelector((state: RootState) => state.SearchData);

  const getAllSerchData = () => {
    return bookData;
  };

  const setBookSearchData = (data: any) => {
    dispatch(setSearchData(data));
  };

  return {
    getAllSerchData,
    setBookSearchData,
  };
};
