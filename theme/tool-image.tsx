interface ToolImageProps {
  src: string;
  alt: string;
}

export function ToolImage({ src, alt }: ToolImageProps) {
  return (
    <img
      src={src}
      alt={alt} 
      className="nx-rounded-lg nx-shadow-xl nx-border-2 nx-border-gray-300 dark:nx-border-gray-200"
    />
  );
}
