import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface AccordionItemProps {
  items: { title: string; children: React.ReactNode }[];
}

const Accordion = ({ items }: AccordionItemProps) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-1">
      {items.map((item, index) => (
        <div key={index} className="border rounded-md overflow-hidden">
          <button
            onClick={() => toggleItem(index)}
            className={`bg-white flex w-full justify-between items-center px-2 py-1.5 text-sm transition-colors duration-200 ${expandedItems.includes(index) ? "border-b" : ""}`}>
            <span>{item.title}</span>

            {expandedItems.includes(index) ? (
              <ChevronUp className="text-gray-600 w-5 h-5" />
            ) : (
              <ChevronDown className="text-gray-600 w-5 h-5" />
            )}
          </button>

          {expandedItems.includes(index) && (
            <div className="px-2 py-1 bg-white">{item.children}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
