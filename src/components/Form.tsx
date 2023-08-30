import {
  Apple,
  Beef,
  Carrot,
  ChevronDown,
  Milk,
  Plus,
  Sandwich,
} from "lucide-react";
import Select, { components } from "react-select";
import { onlyNumbers } from "../utils/onlyNumbers";
import { Dispatch, SetStateAction, useState } from "react";
import { touchIsSupported } from "../utils/touchUtil";
import { Label } from "./Label";

interface FormProps {
  setItemName: Dispatch<SetStateAction<string>>;
  setItemQuantity: Dispatch<SetStateAction<number>>;
  setItemTypeOfQuantity: Dispatch<SetStateAction<string>>;
  setItemCategory: Dispatch<SetStateAction<string>>;

  itemName: string;
  itemQuantity: number;
  selectRef: React.MutableRefObject<null>;
  handleCreateItem: () => void;
}

export function Form({
  setItemName,
  setItemQuantity,
  setItemTypeOfQuantity,
  setItemCategory,
  itemName,
  itemQuantity,
  selectRef,
  handleCreateItem,
}: FormProps) {
  const [isSelectQuantityOpen, setIsSelectQuantityOpen] = useState(false);
  const [isSelectCategoryOpen, setIsSelectCategoryOpen] = useState(false);

  const optionsQuantity = [
    { value: "unidade", label: "Un." },
    { value: "litro", label: "L" },
    { value: "kilograma", label: "Kg" },
  ];

  const optionsCategory = [
    {
      value: "padaria",
      label: "Padaria",
      icon: <Sandwich size={16} className="text-yellow" />,
    },
    {
      value: "legume",
      label: "Legume",
      icon: <Carrot size={16} className="text-green" />,
    },
    {
      value: "carne",
      label: "Carne",
      icon: <Beef size={16} className="text-pink" />,
    },
    {
      value: "fruta",
      label: "Fruta",
      icon: <Apple size={16} className="text-orange" />,
    },
    {
      value: "bebida",
      label: "Bebida",
      icon: <Milk size={16} className="text-blue" />,
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <ChevronDown size={16} />
      </components.DropdownIndicator>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Option = (props: any) => {
    return (
      <components.Option {...props}>
        <div className="flex items-center gap-2">
          {props.data.icon}
          <span>{props.data.label}</span>
        </div>
      </components.Option>
    );
  };

  return (
    <form className="text-white flex items-center gap-3 md:flex-col">
      <div className="group flex flex-col gap-2 w-full">
        <Label name="Item" htmlFor="itemNameInput" />
        <input
          type="text"
          id="itemNameInput"
          className="h-10 p-3 bg-gray-500 rounded-md border border-gray-300 outline-none focusInput"
          onChange={(e) => setItemName(e.target.value)}
          value={itemName}
        />
      </div>

      <div className="flex items-center gap-3 w-full">
        <div className="group max-w-[150px] w-full flex flex-col gap-2">
          <Label name="Quantidade" htmlFor="quantity" />

          <div className="flex rounded-md h-10 border border-gray-300">
            <input
              type="text"
              id="quantity"
              className="w-full h-10 rounded-l-md p-3 bg-gray-500 outline-none focus:border focus:border-purpleLight"
              autoComplete="off"
              maxLength={3}
              onKeyDown={(e) => onlyNumbers(e)}
              onChange={(e) => {
                if (e.target.value == "") {
                  setItemQuantity(Number(""));
                  return;
                }
                setItemQuantity(parseInt(e.target.value));
              }}
              value={itemQuantity}
            />
            <Select
              options={optionsQuantity}
              onChange={(e) => {
                if (e) {
                  setItemTypeOfQuantity(e.value);
                }
              }}
              components={{ DropdownIndicator }}
              unstyled={true}
              classNames={{
                control: () =>
                  "bg-gray-400 text-gray-200 flex items-center justify-between w-[72px] h-10 px-3 rounded-r-md text-xs uppercase border border-gray-300 focus-within:border-purpleLight",
                dropdownIndicator: () =>
                  `${
                    isSelectQuantityOpen
                      ? "rotate-180 text-purpleLight"
                      : "rotate-0"
                  }`,
                option: () =>
                  `p-3 bg-gray-500 text-sm tracking-[0.42px] ${
                    touchIsSupported ? "" : "hover:bg-gray-300"
                  }`,
                menuList: () =>
                  "divide-y-[1px] divide-gray-300 border border-gray-300 rounded-md mt-1",
                indicatorsContainer: () => "pointer-events-none",
              }}
              defaultValue={optionsQuantity[0]}
              onMenuOpen={() => setIsSelectQuantityOpen(true)}
              onMenuClose={() => setIsSelectQuantityOpen(false)}
            />
          </div>
        </div>

        <div className="group max-w-[179px] w-full flex flex-col gap-2 md:max-w-none">
          <Label name="Categoria" htmlFor="category" isCategory />

          <div className="h-10">
            <Select
              unstyled
              options={optionsCategory}
              onChange={(e) => {
                if (e) {
                  setItemCategory(e.value);
                }
              }}
              placeholder="Selecione"
              classNames={{
                control: () =>
                  "bg-gray-400 text-gray-200 tracking-[0.42px] flex items-center justify-between h-full px-3 rounded-md text-xs border border-gray-300 focus-within:border-purpleLight",
                container: () => "h-full",
                dropdownIndicator: () =>
                  `${
                    isSelectCategoryOpen
                      ? "rotate-180 text-purpleLight"
                      : "rotate-0"
                  }`,
                option: () =>
                  `p-3 bg-gray-500 text-sm tracking-[0.42px] ${
                    touchIsSupported ? "" : "hover:bg-gray-300"
                  }`,
                menuList: () =>
                  "divide-y-[1px] divide-gray-300 border border-gray-300 rounded-md mt-1",
              }}
              components={{ DropdownIndicator, Option }}
              ref={selectRef}
              onMenuOpen={() => setIsSelectCategoryOpen(true)}
              onMenuClose={() => setIsSelectCategoryOpen(false)}
            />
          </div>
        </div>

        <button
          data-istouchsupported={touchIsSupported}
          className="w-10 h-10 grid place-items-center bg-purpleNormal rounded-full flex-shrink-0 self-end data-[istouchsupported=false]:hover:bg-purpleDark transition-colors duration-300"
          onClick={(e) => {
            e.preventDefault();
            handleCreateItem();
          }}
        >
          <Plus />
        </button>
      </div>
    </form>
  );
}
