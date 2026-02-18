interface MenuItemProps {
  name: string
  price: number | string
  description: string
  dietaryTags?: string[]
  className?: string
}

export default function MenuItem({ name, price, description, dietaryTags, className = '' }: MenuItemProps) {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <div className="flex items-baseline justify-between w-full gap-4">
        <h3 className="font-sans text-lg sm:text-xl font-medium">
          {name}
          {dietaryTags && dietaryTags.length > 0 && (
            <span className="text-sm font-normal opacity-60 ml-2">
              {dietaryTags.map((tag) => `(${tag})`).join(' ')}
            </span>
          )}
        </h3>
        <span className="font-sans text-lg whitespace-nowrap">{price}</span>
      </div>
      {description && (
        <p className="text-sm opacity-70 max-w-prose">{description}</p>
      )}
      <div className="w-full h-px bg-current opacity-10 mt-2" />
    </div>
  )
}
