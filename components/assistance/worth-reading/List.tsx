'use client'

import { useMemo, useState } from 'react'
import {
  worthReadingArticles,
  worthReadingCategoryLabels,
  WorthReadingCategory,
  type WorthReadingArticle

} from './data'

const GRID_PAGE_SIZE = 8

function WorthReadingList({ category }: { category?: WorthReadingCategory }) {
  const [search, setSearch] = useState('')
  const [visibleCount, setVisibleCount] = useState(GRID_PAGE_SIZE)

  const filteredArticles = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    return worthReadingArticles.filter((article) => {
      const categoryMatched = category ? article.categories.includes(category) : true
      if (!categoryMatched) return false
      if (!keyword) return true

      return (
        article.title.toLowerCase().includes(keyword) ||
        article.excerpt.toLowerCase().includes(keyword)
      )
    })
  }, [category, search])

  const featured = filteredArticles[0]
  const gridArticles = filteredArticles.slice(1)
  const visibleArticles = gridArticles.slice(0, visibleCount)
  const canLoadMore = visibleCount < gridArticles.length
  const searchPlaceholder = category
    ? `Search in the ${worthReadingCategoryLabels[category]} Category`
    : 'Search in All Articles'

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="bg-image-clip-text text-[2.5rem]">Worth Reading</h1>
        <div className="relative w-full md:w-[330px]">
          <input
            className="w-full h-[42px] rounded-md border border-[#ccced0] bg-[#eceef0] px-4 pr-10 text-[16px] outline-none"
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setVisibleCount(GRID_PAGE_SIZE)
            }}
            placeholder={searchPlaceholder}
          />
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64676b]"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {featured ? (
        <div className="space-y-8">
          <WorthReadingArticle article={featured} background={'#dadbdc'} />


          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
            {visibleArticles.map((article) => (

              <WorthReadingArticle key={article.id} article={article} background={'transparent'} />
            ))}
          </div>

          {canLoadMore && (
            <div className="flex justify-center pt-4">
              <button
                className="border-2 border-[#43474c] rounded-md h-[52px] px-10 font-semibold text-[#363a3f] text-[1.6rem]"
                onClick={() => setVisibleCount((count) => count + GRID_PAGE_SIZE)}
              >
                Load More +
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-[1.6rem] text-[#4b4f54]">No articles found.</p>
      )}
    </section>
  )
}

function WorthReadingArticle({ article, background }: { article: WorthReadingArticle, background: string }) {
  return (
    <article className="space-y-3 text-[#343637]  rounded-md" style={{ background: background }}>
      <a href={article.href}>
        <img className="w-full rounded-md" src={article.image} alt={article.title} />
      </a>
      <div className='px-4 pb-8'>
        <h2 className="text-[1.25rem] leading-9 font-bold ">{article.title}</h2>
        <p className="mt-3">{article.excerpt}</p>
      </div>
    </article>
  )
}

export default WorthReadingList
