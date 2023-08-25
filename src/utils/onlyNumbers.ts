import { KeyboardEvent } from 'react'

export function onlyNumbers(e: KeyboardEvent<HTMLInputElement>) {
    const regex = /\d+/;

    if (
      !regex.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) {
      e.preventDefault();
    }
}