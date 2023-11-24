"use client";

import { fetchForYouClasses } from "@/lib/actions/class.action";
import { useQuery } from "@tanstack/react-query";

const useForYouClasses = (childId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [`classes:for-you-${childId}`, childId],
    queryFn: async () => {
      const { classes } = await fetchForYouClasses(childId);
      return { classes };
    },
  });
  return { data: data?.classes, isLoading };
};

export default useForYouClasses;
