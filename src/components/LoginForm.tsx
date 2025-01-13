import Form from './Form';

export function LoginForm() {
  return (
    <div className='flex w-full h-screen'>
      <div className='w-full flex items-center justify-center lg:w-1/2'>
        <Form />
      </div>
      <div className='hidden w-1/2 lg:flex items-center justify-center h-full bg-gray-200'>
        <div className="animate-pulse flex items-center justify-center h-screen">
          <div className="relative w-32 h-32 rounded-full bg-red-500 overflow-hidden border-4 border-black">
            {/* Bottom White Half */}
            <div className="absolute bottom-0 w-full h-1/2 bg-white"></div>
            {/* Black Line in the Middle */}
            <div className="absolute top-1/2 w-full h-2 bg-black -translate-y-1/2"></div>
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white rounded-full border-4 border-black -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-black rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}