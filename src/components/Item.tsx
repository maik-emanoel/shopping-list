import { Apple, Check, MoreVertical } from "lucide-react";
import { useState } from "react";

export interface ItemProps {
  itemName: string
  itemQuantity: number
  itemTypeOfQuantity: string
  itemCategory: string
}

export function Item({itemName, itemQuantity, itemTypeOfQuantity, itemCategory}: ItemProps) {
  const [isChecked, setIsChecked] = useState(false);

  function handleChange() {
    setIsChecked((prevState) => !prevState);
  }

  return (
    <div className="p-4 bg-gray-400 border-[1px] border-gray-300 rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="relative">
          <input
            type="checkbox"
            id="checkbox"
            className="appearance-none w-4 h-4 border-[2px] border-purpleNormal rounded-sm checked:border-green checked:bg-green"
            onChange={handleChange}
            checked={isChecked}
          />
          {isChecked && (
            <Check
              size={12}
              color="white"
              className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-55%] pointer-events-none"
            />
          )}
        </span>

        <div className="flex flex-col">
          <span className="text-gray-100 font-bold leading-5 text-sm">{itemName}</span>
          <p className="text-gray-200 text-xs">
            <span>{itemQuantity} </span>
            <span>{itemTypeOfQuantity}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 py-2 px-4 rounded-full text-orange bg-orangeDark">
          <Apple size={16} />
          <span className="font-semibold text-xs">{itemCategory}</span>
        </div>

        <MoreVertical className="text-purpleLight"/>
      </div>
    </div>
  );
}
