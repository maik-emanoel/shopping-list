import imgCover from './assets/img-cover.png'
import { Form } from './components/Form';

export function App() {
  return (
    <>
      <img src={imgCover} alt="" className='w-full h-[185px] absolute top-0 md:object-cover md:object-left-top' />

      <main className='z-10 relative mx-auto max-w-[720px] my-20 w-[90%]'>
        <header>
          <h1 className='text-gray-100 text-2xl font-bold tracking-[0.72px] mb-8'>Lista de Compras</h1>
          <Form />
        </header>
      </main>
    </>
  );
}
