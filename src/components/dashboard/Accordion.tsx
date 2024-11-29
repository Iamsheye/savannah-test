import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface AccordionItemProps {
  items: { title: string; children: React.ReactNode }[];
}

const Accordion = ({ items }: AccordionItemProps) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-1">
      {items.map((item, index) => (
        <div key={index} className="overflow-hidden rounded-md border">
          <button
            onClick={() => toggleItem(index)}
            className={`flex w-full items-center justify-between bg-white px-2 py-1.5 text-sm transition-colors duration-200 ${expandedItems.includes(index) ? "border-b" : ""}`}
          >
            <span>{item.title}</span>

            {expandedItems.includes(index) ? (
              <ChevronUp className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {expandedItems.includes(index) && (
            <div className="bg-white px-2 py-1">{item.children}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
