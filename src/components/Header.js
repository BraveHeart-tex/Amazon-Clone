import Image from 'next/image';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from 'next-auth/react';

function Header() {
  return (
    <header>
      {/* Top nav */}
      <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2 sm:flex-grow-0'>
        <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
          <Image
            src='https://links.papareact.com/f90'
            width={150}
            height={40}
            objectFit='contain'
            className='cursor-pointer'
          />
        </div>
        {/* Search */}
        <div className='hidden sm:flex bg-yellow-400 hover:bg-yellow-500 transition-all  items-center h-10 rounded-md flex-grow cursor-pointer mr-3'>
          <input
            type='text'
            className='p-2 h-full w-6 flex-grow rounded-l-md flex-shrink focus:outline-none px-4'
          />
          <MagnifyingGlassIcon className='h-12 p-4' />
        </div>
        {/* Right */}
        <div className='text-white flex items-center text-xs space-x-6 whitespace-nowrap'>
          <div className='link' onClick={signIn}>
            <p>Hello Bora Karaca</p>
            <p className='font-extrabold md:text-sm'>Account & Lists</p>
          </div>

          <div className='link'>
            <p>Returns</p>
            <p className='font-extrabold md:text-sm'>& Orders</p>
          </div>

          <div className='relative link flex items-center'>
            <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>
              0
            </span>
            <ShoppingCartIcon className='h-10' />

            <p className='hidden md:inline font-extrabold md:text-sm mt-2'>
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className='flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm'>
        <p className='link flex items-center'>
          <Bars3Icon className='h-6 mr-1' />
          All
        </p>
        <p className='link'>Prime Video</p>
        <p className='link'>Amazon Business</p>
        <p className='link'>Today's Deals</p>
        <p className='link hidden lg:inline-flex'>Electronics</p>
        <p className='link hidden lg:inline-flex'>Food & Grocery</p>
        <p className='link hidden lg:inline-flex'>Prime</p>
        <p className='link hidden lg:inline-flex'>Buy Again</p>
        <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
        <p className='link hidden lg:inline-flex'>Health & Personal Care</p>
      </div>
    </header>
  );
}
export default Header;
