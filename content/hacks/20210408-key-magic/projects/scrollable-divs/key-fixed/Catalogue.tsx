import React from "react";
import cn from "clsx";
import classes from "./Catalogue.module.css";

interface CatalogueRowProps {
  id: number;
  activeId?: number;
  href?: string;
  onClick?: (id: number) => void;
  text: string;
}

const CatalogueRow: React.FC<CatalogueRowProps> = ({
  activeId,
  id,
  onClick,
  text,
  href
}: CatalogueRowProps) => {
  const handleClick = () => (onClick ? onClick(id) : undefined);

  return (
    <span>
      <a
        onClick={href ? undefined : handleClick}
        href={href}
        className={cn(classes.columnLink, {
          [classes.columnLinkActive]: activeId === id
        })}
      >
        {text}
      </a>
    </span>
  );
};

interface CatalogueColumn {
  items: Item[];
  onClick: (itemId: number) => void;
  activeId: number;
}

interface CatalogueProps {
  columns: CatalogueColumn[];
}

export interface Item {
  id: number;
  text: string;
  items?: Item[];
  href?: string;
}

const Catalogue: React.FC<CatalogueProps> = ({ columns }: CatalogueProps) => {
  return (
    <div className={cn(classes.container)}>
      {columns.map((column, i) => (
        <div key={columns[i - 1]?.activeId} className={cn(classes.column)}>
          {column.items.map((f) => (
            <CatalogueRow
              id={f.id}
              activeId={column.activeId}
              text={f.text}
              key={f.id}
              href={f.href}
              onClick={column.onClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Catalogue;
