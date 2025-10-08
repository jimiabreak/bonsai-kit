interface MenuItemProps {
  name: string;
  price: number | string;
  description: string;
  className?: string;
}

export default function MenuItem({ name, price, description, className = '' }: MenuItemProps) {
  return (
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      {/* Title and Price Row */}
      <div className="flex items-center justify-between w-full">
        <h3 className="font-sans text-menu-item-title text-cream">
          {name}
        </h3>
        <span className="font-sans text-menu-item-title text-cream whitespace-nowrap">
          {price}
        </span>
      </div>

      {/* Description */}
      <p className="font-sans text-menu-item-description text-cream max-w-[822px]">
        {description}
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-cream opacity-30 mt-3" />
    </div>
  );
}
