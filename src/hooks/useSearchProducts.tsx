import useQueryConfig from "./useQueryConfig";
import { createSearchParams, useNavigate } from "react-router-dom";
import path from "src/constants/path";

export default function useSearchProducts() {
  const navigate = useNavigate();

  const onSubmitSearch = (data: string) => {
    const config = { keyword: data };
    navigate({
      pathname: path.search,
      search: createSearchParams(config).toString(),
    });
  };
  return { onSubmitSearch };
}

