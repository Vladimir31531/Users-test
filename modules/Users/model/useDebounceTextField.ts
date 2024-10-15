import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useDebounceTextField(
  searchString: string,
  searchParams: ReadonlyURLSearchParams
): void {
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchString) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: searchString,
        });

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["search"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchString]);
}
