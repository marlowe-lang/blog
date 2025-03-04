import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactElement, ReactNode } from 'react'
import { BasicLayout } from './basic-layout'
import { useBlogContext } from './blog-context'
import { collectPostsAndNavs } from './utils/collect'
import getTags from './utils/get-tags'

export function PostsLayout({
  children
}: {
  children: ReactNode
}): ReactElement {
  const { config, opts } = useBlogContext()
  const { posts } = collectPostsAndNavs({ config, opts })
  const router = useRouter()
  const { type } = opts.frontMatter
  const tagName = type === 'tag' ? router.query.tag : null

  const postList = posts.map(post => {
    if (tagName) {
      const tags = getTags(post)
      if (!Array.isArray(tagName) && !tags.includes(tagName)) {
        return null
      }
    } else if (type === 'tag') {
      return null
    }

    const postTitle = post.frontMatter?.title || post.name
    const date: Date | null = post.frontMatter?.date
      ? new Date(post.frontMatter.date)
      : null
    const description = post.frontMatter?.description

    return (
      <div key={post.route} className="post-item nx-mb-14 max-md:nx-mb-10">
        <h2 className="nx-mt-0 nx-mb-3 nx-text-xl md:nx-text-2xl">
          <Link href={post.route} passHref legacyBehavior>
            <a className="!nx-no-underline nx-font-bold">{postTitle}</a>
          </Link>
        </h2>
        {description && (
          <p className="nx-mb-2 dark:nx-text-gray-400 nx-text-gray-600 nx-italic">
            {description}
            {config.readMore && (
              <Link href={post.route} passHref legacyBehavior>
                <a className="nx-text-gray-900 dark:nx-text-gray-200 nx-underline hover:nx-text-black dark:hover:nx-text-white nx-ml-2 nx-not-italic">{config.readMore}</a>
              </Link>
            )}
          </p>
        )}
        <div className="nx-not-prose nx-flex nx-flex-wrap nx-items-center nx-text-sm dark:nx-text-gray-400 nx-text-gray-600">
          <div className="nx-flex nx-items-center nx-gap-1">
            {post.frontMatter?.author}
            {post.frontMatter?.author && date && ','}
            {date && (
              <time
                dateTime={date.toISOString()}
              >
                {date.toDateString()}
              </time>
            )}
          </div>
        </div>
      </div>
    )
  })
  return (
    <BasicLayout wrapInArticle={false}>
      {postList}
    </BasicLayout>
  )
}
