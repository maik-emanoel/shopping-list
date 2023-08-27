import {
  Apple,
  Beef,
  Carrot,
  ChevronDown,
  Milk,
  Plus,
  Sandwich,
} from "lucide-react";
import Select, { SingleValue, components } from "react-select";
import { onlyNumbers } from "../utils/onlyNumbers";
import { useState } from "react";
import { touchIsSupported } from "../utils/touchUtil";
import { Label } from "./Label";

export function Form() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

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

  function handleChange(
    selectedOption: SingleValue<{ value: string; label: string }>
  ) {
    console.log(selectedOption);
  }

  return (
    <form className="text-white flex items-center gap-3">
      <div className="flex flex-col gap-2 flex-1">
        <Label name="Item" htmlFor="itemInput" />
        <input
          type="text"
          id="itemInput"
          className="h-10 p-3 bg-gray-500 rounded-md border border-gray-300 outline-none focusInput"
        />
      </div>

      <div className="max-w-[150px] w-full flex flex-col gap-2">
        <Label name="Quantidade" htmlFor="quantity" />

        <div className="flex rounded-md h-10 divide-y-[1px] divide-gray-300 border border-gray-300">
          <input
            type="text"
            id="quantity"
            className="w-full h-10 rounded-l-md p-3 bg-gray-500 outline-none focus:border focus:border-purpleLight"
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
              container: () => "border border-gray-300",
              control: () =>
                "bg-gray-400 text-gray-200 flex items-center justify-between w-[72px] h-10 px-3 rounded-r-md text-xs uppercase",
              dropdownIndicator: () =>
                `${isSelectOpen ? "rotate-180" : "rotate-0"}`,
              option: () =>
                `p-3 bg-gray-500 text-sm tracking-[0.42px] ${
                  touchIsSupported ? "" : "hover:bg-gray-300"
                }`,
              menuList: () =>
                "divide-y-[1px] divide-gray-300 border border-gray-300 rounded-md mt-1",
            }}
            defaultValue={optionsQuantity[0]}
            onMenuOpen={() => setIsSelectOpen(true)}
            onMenuClose={() => setIsSelectOpen(false)}
          />
        </div>
      </div>

      <div className="max-w-[179px] w-full flex flex-col gap-2">
        <Label name="Categoria" htmlFor="category" isCategory />

        <div className="h-10">
          <Select
            unstyled
            options={optionsCategory}
            placeholder="Selecione"
            classNames={{
              control: () =>
                "bg-gray-400 text-gray-200 tracking-[0.42px] flex items-center justify-between h-full px-3 rounded-md text-xs",
              container: () => "h-full",
              dropdownIndicator: () =>
                `${isSelectOpen ? "rotate-180" : "rotate-0"}`,
              option: () =>
                `p-3 bg-gray-500 text-sm tracking-[0.42px] ${touchIsSupported ? "" : "hover:bg-gray-300"}`,
              menuList: () =>
                "divide-y-[1px] divide-gray-300 border border-gray-300 rounded-md mt-1",
            }}
            components={{ DropdownIndicator, Option }}
          />
        </div>
      </div>

      <button className="w-10 h-10 grid place-items-center bg-purpleNormal rounded-full flex-shrink-0 self-end">
        <Plus />
      </button>
    </form>
  );
}
