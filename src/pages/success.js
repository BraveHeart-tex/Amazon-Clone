import Header from '../components/Header';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

function Success() {
  const router = useRouter();
  return (
    <div className='bg-gray-100 h-screen flex flex-col'>
      <Header />
      <main className='max-w-screen-lg mx-auto mt-10'>
        <div className='flex flex-col p-10 bg-white'>
          <div className='flex items-center space-x-2 mb-5'>
            <CheckCircleIcon className='text-green-500 h-10' />
            <h1 className='text-3xl'>
              Thank you for your purchase. Your order has been confirmed!
            </h1>
          </div>
          <p>
            Thank you for shopping with us. We'll send you a confirmation once
            your item(s) has shipped. If you would like to check the status of
            your order(s) please press the link below.{' '}
          </p>
          <button
            className='button mt-8'
            onClick={() => router.push('/orders')}
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
}
export default Success;
