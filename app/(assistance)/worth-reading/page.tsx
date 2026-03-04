'use client'

import WorthReadingList from "@/components/assistance/worth-reading/List";
import { WorthReadingCategory } from "@/components/assistance/worth-reading/data";
import { useSearchParams } from "next/navigation";

const supportedCategories: WorthReadingCategory[] = ['casino', 'crypto', 'fun-zone', 'games']

function WorthReadingPage() {
  const searchParams = useSearchParams();
  const nameQuery = searchParams.get('name');
  const category = supportedCategories.includes(nameQuery as WorthReadingCategory)
    ? (nameQuery as WorthReadingCategory)
    : undefined

  return (
    <div>
      <WorthReadingList category={category} />
    </div>
  );
}

export default WorthReadingPage;
