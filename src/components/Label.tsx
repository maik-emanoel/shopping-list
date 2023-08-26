interface LabelProps {
  name: string;
  htmlFor: string;
  isCategory?: boolean;
}

export function Label({ name, htmlFor, isCategory }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      data-iscategory={isCategory}
      className="text-gray-200 text-xs leading-3 tracking-[0.36px] data-[iscategory=true]:text-gray-800"
    >
      {name}
    </label>
  );
}
