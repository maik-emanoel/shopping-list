import {
  Apple,
  Beef,
  Carrot,
  Check,
  Milk,
  MoreVertical,
  Sandwich,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { touchIsSupported } from "../utils/touchUtil";

export interface ItemProps {
  itemName: string;
  itemQuantity: number;
  itemTypeOfQuantity: string;
  itemCategory: string;
  checked: boolean;
  onCheckChange: (newCheckedState: boolean) => void;
  handleDeleteItem: () => void;
}

export function Item({
  itemName,
  itemQuantity,
  itemTypeOfQuantity,
  itemCategory,
  checked,
  onCheckChange,
  handleDeleteItem,
}: ItemProps) {
  const [isChecked, setIsChecked] = useState(checked);
  const [optionsIsVisible, setOPtionsIsVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const optionsContainerRef = useRef<any>(null)

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

  function handleClickOutside(event: MouseEvent) {
    if (optionsContainerRef.current && !optionsContainerRef.current.contains(event.target)) {
      setOPtionsIsVisible(false);
    }
  }

  useEffect(() => {
    if (optionsIsVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [optionsIsVisible]);

  return (
    <div
      className="p-4 bg-gray-400 border-[1px] border-gray-300 rounded-lg flex items-center justify-between data-[ischecked=true]:bg-gray-500 data-[ischecked]:border-gray-400 animate-appear"
      data-ischecked={isChecked}
    >
      <div className="flex items-center gap-4 overflow-hidden">
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

      <div className="flex items-center gap-3 select-none">
        <div
          className={`flex items-center gap-1 py-2 px-4 sm:py-1 sm:px-2 rounded-full data-[ischecked=true]:brightness-75 ${textColor} ${bgDarkColor}`}
          data-ischecked={isChecked}
        >
          {icon}
          <span className="font-semibold text-xs">{itemCategory}</span>
        </div>

        <div
          className="relative"
          onClick={() => {
            setOPtionsIsVisible((prevState) => !prevState);
          }}
          ref={optionsContainerRef}
        >
          <MoreVertical className="text-purpleLight cursor-pointer active:scale-95" />
          {optionsIsVisible && (
            <div
              className="flex flex-col gap-1 absolute text-gray-100 bg-gray-500 border border-gray-400 rounded-md overflow-hidden right-0 top-[110%] shadow-sm shadow-gray-400"
              onClick={(e) => e.stopPropagation()}
            >
              <span
                className="flex items-center gap-2 text-sm p-3 cursor-pointer border border-gray-400 animate-[appear_.3s_backwards]
                data-[istouchsupported=false]:hover:bg-gray-300 
                data-[istouchsupported=false]:hover:border-gray-300
                "
                onClick={handleDeleteItem}
                data-istouchsupported={touchIsSupported}
              >
                <Trash2 size={16} />
                Excluir
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
