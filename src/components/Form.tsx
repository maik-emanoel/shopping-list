export function Form() {
  return (
    <form className="text-white">
      <div>
        <label htmlFor="itemInput">Item</label>
        <input type="text" id="itemInput" />
      </div>

      <div>
        <label htmlFor="quantity">Quantidade</label>

        <div>
          <input type="number" id="quantity" />
          <select name="">
            <option value="unidade">Un.</option>
            <option value="litro">L</option>
            <option value="kilograma">Kg</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="category">Categoria</label>

        <div>
          <input type="number" id="category" />
          <select name="" className="bg-transparent">
            <option value="" hidden>Selecione a categoria</option>
            <option value="litro">L</option>
            <option value="kilograma">Kg</option>
          </select>
        </div>
      </div>
    </form>
  );
}
