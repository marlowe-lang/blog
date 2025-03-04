import { ImagePreview } from '../theme/image-preview'

interface ToolImageProps {
  src: string;
  alt: string;
}

export function ToolImage({ src, alt }: ToolImageProps) {
  return (
    <ImagePreview
      src={src}
      alt={alt}
      className="nx-tool-image nx-rounded-lg nx-shadow-xl nx-border-2 nx-border-gray-200 dark:nx-border-gray-500"
    />
  );
}
