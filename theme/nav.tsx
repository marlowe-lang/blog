import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useState } from 'react'
import { useBlogContext } from './blog-context'
import ThemeSwitch from './theme-switch'
import { collectPostsAndNavs } from './utils/collect'

export default function Nav(): ReactElement {
  const { opts, config } = useBlogContext()
  const { navPages } = collectPostsAndNavs({ opts, config })
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const router = useRouter()
  const path = router.asPath

  // Function to determine if a path is active
  const isActive = (checkPath: string): boolean => {
    if (checkPath === '/') {
      return path === '/'
    }
    if (checkPath === '/blog') {
      return path.startsWith('/blog')
    }
    return false
  }

  const linkClass = (checkPath: string) => 
    `nx-text-gray-600 hover:nx-text-gray-800 dark:nx-text-gray-300 dark:hover:nx-text-gray-150 ${
      isActive(checkPath) ? 'nx-font-bold dark:nx-text-gray-100 nx-text-black' : ''
    }`

  const navItems = (
    <>
      <a
        href="https://docs.marlowe-lang.org" 
        target="_blank" 
        rel="noopener noreferrer"
        className="nx-text-gray-600 hover:nx-text-gray-800 dark:nx-text-gray-400 dark:hover:nx-text-gray-200"
      >
        Documentation
      </a>

      <a
        href="/"
        className={linkClass('/')}
      >
        Tools
      </a>

      <Link href="/blog" className={linkClass('/blog')}>
        Blog
      </Link>

      {config.navs?.map(nav => (
        <Link key={nav.url} href={nav.url} passHref legacyBehavior>
          <a className="nx-text-gray-600 hover:nx-text-gray-800 dark:nx-text-gray-400 dark:hover:nx-text-gray-200">
            {nav.name}
          </a>
        </Link>
      ))}
    </>
  )

  return (
    <div className="nx-flex nx-items-center nx-gap-3">
      <div className="nx-flex nx-grow nx-flex-wrap nx-items-center nx-justify-end nx-gap-6">
        {/* Mobile menu button */}
        <button
          className="md:nx-hidden nx-p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="nx-h-6 nx-w-6 nx-text-gray-600 dark:nx-text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:nx-hidden nx-fixed nx-inset-0 nx-z-50 nx-bg-white dark:nx-bg-gray-800">
            <div className="nx-flex nx-flex-col nx-items-center nx-justify-center nx-h-full nx-gap-6">
              {navItems}
              {config.darkMode && <ThemeSwitch />}
            </div>
          </div>
        )}

        {/* Desktop menu */}
        <div className="nx-hidden md:nx-flex nx-items-center nx-gap-6">
          {navItems}
          {config.darkMode && <ThemeSwitch />}
        </div>
      </div>
    </div>
  )
}
