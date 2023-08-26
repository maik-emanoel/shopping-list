import { ChevronDown, Plus } from "lucide-react";
import Select, { SingleValue, components } from "react-select";
import { onlyNumbers } from "../utils/onlyNumbers";
import { useState } from "react";
import { touchIsSupported } from "../utils/touchUtil";
import { Label } from "./Label";

export function Form() {
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const optionsQuantity = [
    { value: "unidade", label: "Un." },
    { value: "litro", label: "L" },
    { value: "kilograma", label: "Kg" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <ChevronDown size={16} />
      </components.DropdownIndicator>
    );
  };

  function handleChange(
    selectedOption: SingleValue<{ value: string; label: string }>
  ) {
    console.log(selectedOption);
  }

  return (
    <form className="text-white flex items-center">
      <div>
        <Label name="Item" htmlFor="itemInput" />
        <input type="text" id="itemInput" />
      </div>

      <div className="">
        <Label name="Quantidade" htmlFor="quantity" />

        <div className="flex rounded-md h-10">
          <input
            type="text"
            id="quantity"
            className="max-w-[79px] rounded-l-md p-3 bg-gray-500 focus:outline"
            autoComplete="off"
            maxLength={3}
            onKeyDown={(e) => onlyNumbers(e)}
          />
          <Select
            options={optionsQuantity}
            onChange={(e) => handleChange(e)}
            components={{ DropdownIndicator }}
            unstyled={true}
            classNames={{
              control: () => "bg-gray-400 text-gray-200 flex items-center justify-between w-[72px] h-full px-3 rounded-r-md text-xs uppercase",
              container: () => "cursor-pointer",
              dropdownIndicator: () => `${isSelectOpen ? "rotate-180" : "rotate-0"}`,
              option: () => `p-3 bg-gray-500 text-sm tracking-[0.42px] ${touchIsSupported ? '' : 'hover:bg-gray-300'}`,
              menuList: () => "divide-y-[1px] divide-gray-300 border border-gray-300 rounded-md mt-1"
            }}
            defaultValue={optionsQuantity[0]}
            onMenuOpen={() => setIsSelectOpen(true)}
            onMenuClose={() => setIsSelectOpen(false)}
          />
        </div>
      </div>

      <div>
        <Label name="Categoria" htmlFor="category" isCategory/>

        <div>
          <select name="" className="bg-transparent">
            <option value="" hidden>
              Selecione a categoria
            </option>
            <option value="litro">L</option>
            <option value="kilograma">Kg</option>
          </select>
        </div>
      </div>

      <button className="w-10 h-10 grid place-items-center bg-purpleNormal rounded-full">
        <Plus />
      </button>
    </form>
  );
}
