import { Key, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import imgCover from "./assets/img-cover.png";
import { Form } from "./components/Form";
import { Item } from "./components/Item";
import {
  loadItemsFromLocalStorage,
  saveItemsToLocalStorage,
} from "./utils/saveItems";

export interface ItemsArrayProps {
  id: Key | null | undefined;
  name: string;
  quantity: number;
  typeOfQuantity: string;
  category: string;
  checked: boolean;
}

export function App() {
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemTypeOfQuantity, setItemTypeOfQuantity] = useState("unidade");
  const [itemCategory, setItemCategory] = useState("");

  const [items, setItems] = useState<ItemsArrayProps[]>(
    loadItemsFromLocalStorage()
  );
  const selectRef = useRef(null);

  function handleCreateItem() {
    if (itemName === "" || itemQuantity < 1 || itemCategory === "") {
      alert("Preencha todos os campos, por favor!");
      return;
    }

    const newItem = {
      id: uuidv4(),
      name: itemName,
      quantity: itemQuantity,
      typeOfQuantity: itemTypeOfQuantity,
      category: itemCategory,
      checked: false,
    };

    setItems([newItem, ...items]);
    setItemName("");
    setItemQuantity(1);
    setItemTypeOfQuantity((prevState) => prevState);
    setItemCategory("");

    selectRef.current.clearValue();
  }

  useEffect(() => {
    saveItemsToLocalStorage(items);
  }, [items]);

  function handleCheckChange(
    itemId: Key | null | undefined,
    newCheckedState: boolean
  ) {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          checked: newCheckedState,
        };
      }
      return item;
    });

    setItems(updatedItems);
  }

  function handleDeleteItem(itemId: Key | null | undefined) {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  }

  return (
    <>
      <img
        src={imgCover}
        alt=""
        className="w-full h-[185px] absolute top-0 md:object-cover md:object-left-top"
      />

      <main className="z-10 relative mx-auto max-w-[720px] py-20 w-[90%]">
        <header>
          <h1 className="text-gray-100 text-2xl font-bold tracking-[0.72px] mb-8">
            Lista de Compras
          </h1>
          <Form
            setItemName={setItemName}
            setItemQuantity={setItemQuantity}
            setItemTypeOfQuantity={setItemTypeOfQuantity}
            setItemCategory={setItemCategory}
            itemName={itemName}
            itemQuantity={itemQuantity}
            handleCreateItem={handleCreateItem}
            selectRef={selectRef}
          />
        </header>

        <div className="mt-8 flex flex-col gap-3">
          {items.length === 0 && (
            <p className="text-gray-200 text-center mx-auto text-sm w-[80%] max-w-[400px]">
              Você ainda não adicionou nenhum item à sua lista de compras. Que
              tal adicionar agora?
            </p>
          )}

          {items.map((item) => (
            <Item
              key={item.id}
              itemName={item.name}
              itemQuantity={item.quantity}
              itemTypeOfQuantity={item.typeOfQuantity}
              itemCategory={item.category}
              checked={item.checked}
              onCheckChange={(newCheckedState: boolean) =>
                handleCheckChange(item.id, newCheckedState)
              }
              handleDeleteItem={() => handleDeleteItem(item.id)}
            />
          ))}
        </div>
      </main>
    </>
  );
}
