import { useState, useEffect } from 'react'

interface ImagePreviewProps {
  src: string
  alt: string
  className?: string
}

export function ImagePreview({ src, alt, className = '' }: ImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Mount first, then make visible
      setIsVisible(true)
    } else {
      // Hide first, then unmount
      setIsVisible(false)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    // Wait for animation to complete before unmounting
    setTimeout(() => setIsOpen(false), 300)
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${className} nx-cursor-pointer`}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <div 
          className={`nx-fixed nx-inset-0 nx-z-50 nx-flex nx-items-center nx-justify-center nx-transition-opacity nx-duration-300 ${
            isVisible ? 'nx-opacity-100' : 'nx-opacity-0'
          }`}
          onClick={handleClose}
        >
          <div className={`nx-absolute nx-inset-0 nx-bg-black/80 nx-transition-opacity nx-duration-300 ${
            isVisible ? 'nx-opacity-100' : 'nx-opacity-0'
          }`} />
          <div className={`nx-relative nx-max-w-[90vw] nx-max-h-[90vh] nx-transition-transform nx-duration-300 ${
            isVisible ? 'nx-scale-100' : 'nx-scale-95'
          }`}>
            <img
              src={src}
              alt={alt}
              className="nx-max-w-full nx-max-h-[90vh] nx-object-contain nx-rounded-lg nx-border-2 nx-border-gray-200 dark:nx-border-gray-500"
            />
            <button
              className="nx-absolute nx-top-4 nx-right-4 nx-text-white nx-text-xl nx-w-8 nx-h-8 nx-flex nx-items-center nx-justify-center nx-rounded-full nx-bg-black/50 hover:nx-bg-black/70 nx-transition-colors nx-duration-200"
              onClick={(e) => {
                e.stopPropagation()
                handleClose()
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  )
}
