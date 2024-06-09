import React, { useRef } from "react";
import cn from "clsx";
import classes from "./Catalogue.module.css";

interface CatalogueRowProps {
  id: number;
  activeId?: number;
  href?: string;
  onClick?: (id: number) => void;
  onClicked: () => void;
  text: string;
}

const CatalogueRow: React.FC<CatalogueRowProps> = ({
  activeId,
  id,
  onClick,
  onClicked,
  text,
  href
}: CatalogueRowProps) => {
  const handleClick = () => {
    onClick && onClick(id);
    onClicked();
  };

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
  const columnRefs = Array.from({length: columns.length}, (x, i) => useRef<HTMLDivElement>(null));
  const handleClicked = () => {
    for (const columnRef of columnRefs) {
      if (!columnRef.current) {
        return;
      }
      columnRef.current.scrollTop = 0;
    }
  };
  return (
    <div className={cn(classes.container)}>
      {columns.map((column, i) => (
        <div key={i} ref={columnRefs[i]} className={cn(classes.column)}>
          {column.items.map((f) => (
            <CatalogueRow
              id={f.id}
              activeId={column.activeId}
              text={f.text}
              key={f.id}
              href={f.href}
              onClicked={handleClicked}
              onClick={column.onClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Catalogue;
