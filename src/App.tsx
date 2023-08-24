import imgCover from './assets/img-cover.png'
import { Form } from './components/Form';

export function App() {
  return (
    <>
      <img src={imgCover} alt="" className='w-full h-[185px] absolute top-0 md:object-cover md:object-left-top' />

      <main className='z-10 relative'>
        <header>
          <h1>Lista de Compras</h1>
          <Form />
        </header>
      </main>
    </>
  );
}
