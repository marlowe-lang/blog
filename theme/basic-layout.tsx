import Head from 'next/head'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { useBlogContext } from './blog-context'
import { HeadingContext } from './mdx-theme'

import Image from 'next/image'
import Nav from './nav'

interface BasicLayoutProps {
  children: ReactNode
  wrapInArticle?: boolean
}

export const BasicLayout = ({ children, wrapInArticle = true }: BasicLayoutProps) => {
  const { config, opts } = useBlogContext()
  const title = `${config?.title?.prefix || ''}${opts.title}${config?.title?.suffix || ''}`
  const ref = useRef<HTMLHeadingElement>(null)

  const content = wrapInArticle ? (
    <article className="nx-prose max-md:nx-prose-sm dark:nx-prose-dark nx-pt-10 nx-max-w-4xl nx-max-w-6xl nx-pb-2" dir="ltr">
      <HeadingContext.Provider value={ref}>
        {children}
      </HeadingContext.Provider>
    </article>
  ) : (
    <div className="max-md:nx-pt-5 nx-pt-7">
      {children}
    </div>
  )
  return (
    <section className="nx-mx-auto nx-max-w-4xl nx-px-4 sm:px-6 xl:nx-max-w-6xl xl:nx-px-0">
      <div className="nx-flex nx-h-screen nx-flex-col nx-justify-between nx-font-sans">
        <header className="nx-flex nx-items-center nx-justify-between nx-py-1 nx-border-b nx-border-gray-300 dark:nx-border-gray-500">
          <div>
            <a aria-label="MARLOWE" href="/">
              <div className="nx-flex nx-items-center nx-justify-between">
                <div className="nx-mr-6 nx-h-12 nx-w-36 nx-relative">
                  {/* CSS is more reliable than theme checking like `if (theme === "dark") { logoUrl =.. } */}
                  <Image src={ config.logos.dark } alt="MARLOWE" fill className="nx-hidden dark:nx-block" />
                  <Image src={ config.logos.light } alt="MARLOWE" fill className="nx-block dark:nx-hidden" />
                </div>
              </div>
            </a>
          </div>
          <Nav />
        </header>
        <main className="nx-mb-auto">
          <Head>
            <title>{title}</title>
            {config.head?.({ title, meta: opts.frontMatter })}
          </Head>
          {content}
        </main>
        <footer>
          <div className="nx-mt-16 nx-flex nx-flex-col nx-items-center">
            <div className="nx-mb-3 flex space-x-4">
            {config.footer}
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
