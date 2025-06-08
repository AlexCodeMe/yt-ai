import { useQueryStates } from "nuqs";
import { filterSearchParams } from "../params";

export const useAgentsFilters = () => {
  return useQueryStates(filterSearchParams);
};
