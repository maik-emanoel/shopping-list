import {
  Apple,
  Beef,
  Carrot,
  Check,
  Milk,
  MoreVertical,
  Sandwich,
} from "lucide-react";
import { useState } from "react";
import { touchIsSupported } from "../utils/touchUtil";

export interface ItemProps {
  itemName: string;
  itemQuantity: number;
  itemTypeOfQuantity: string;
  itemCategory: string;
  checked: boolean,
  onCheckChange: (newCheckedState: boolean) => void;
}

export function Item({
  itemName,
  itemQuantity,
  itemTypeOfQuantity,
  itemCategory,
  checked,
  onCheckChange
}: ItemProps) {
  const [isChecked, setIsChecked] = useState(checked);

  function handleChange() {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onCheckChange(newCheckedState);
  }

  let icon;
  let textColor;
  let bgDarkColor;

  switch (itemCategory) {
    case "padaria":
      icon = <Sandwich size={16} className="text-yellow" />;
      textColor = "text-yellow";
      bgDarkColor = "bg-yellowDark";
      break;
    case "legume":
      icon = <Carrot size={16} className="text-green" />;
      textColor = "text-green";
      bgDarkColor = "bg-greenDark";
      break;
    case "carne":
      icon = <Beef size={16} className="text-pink" />;
      textColor = "text-pink";
      bgDarkColor = "bg-pinkDark";
      break;
    case "fruta":
      icon = <Apple size={16} className="text-orange" />;
      textColor = "text-orange";
      bgDarkColor = "bg-orangeDark";
      break;
    case "bebida":
      icon = <Milk size={16} className="text-blue" />;
      textColor = "text-blue";
      bgDarkColor = "bg-blueDark";
      break;
    default:
      icon = <Apple size={16} className="text-orange" />;
      textColor = "text-orange";
      bgDarkColor = "bg-orangeDark";
      break;
  }

  return (
    <div
      className="p-4 bg-gray-400 border-[1px] border-gray-300 rounded-lg flex items-center justify-between data-[ischecked=true]:brightness-75"
      data-ischecked={isChecked}
    >
      <div className="flex items-center gap-4">
        <span className="relative">
          <input
            type="checkbox"
            id="checkbox"
            data-istouchsupported={touchIsSupported}
            className="appearance-none w-4 h-4 border-[2px] border-purpleNormal rounded-sm checked:border-success checked:bg-success active:scale-95 transition-colors duration-100
            data-[istouchsupported=false]:hover:bg-purpleDark 
            data-[istouchsupported=false]:hover:checked:bg-successLight 
            data-[istouchsupported=false]:hover:checked:border-successLight
            "
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
          <span
            className="text-gray-100 font-bold leading-5 text-sm data-[ischecked=true]:line-through data-[ischecked=true]:font-normal"
            data-ischecked={isChecked}
          >
            {itemName}
          </span>
          <p className="text-gray-200 text-xs">
            <span>{itemQuantity} </span>
            <span>
              {itemQuantity > 1 ? itemTypeOfQuantity + "s" : itemTypeOfQuantity}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-1 py-2 px-4 rounded-full ${textColor} ${bgDarkColor}`}
        >
          {icon}
          <span className="font-semibold text-xs">{itemCategory}</span>
        </div>

        <MoreVertical className="text-purpleLight" />
      </div>
    </div>
  );
}
