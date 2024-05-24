// src/components/AuthLayout.tsx
import React from 'react';
import {Card, CardHeader,CardBody,Image} from '@nextui-org/react';
import logo from '@/assets/africoda.png'

const AuthLayout: React.FC<{ children: React.ReactNode, header:string }> = ({ children,header }) => {
    return (
      <div className='main-light w-full h-full bg-gradient-to-tr from-blue-400 to-pink-400 flex justify-center min-h-screen bg-gray-50  flex-col items-center px-8 py-8 md:px-6 sm:px-6 lg:px-8'>
        <Card className="max-w-[400px] w-full">
          <CardHeader className='flex  flex-col'>
                <Image
                    alt='logo'
                    radius='md'
                    width={100}
                    height={100}
                    src={logo}
                />
                <div>
                  <p className='text-lg font-sans font-semibold'>{header}</p>
                </div>
            </CardHeader>
            <CardBody>
                {children}
            </CardBody>
        </Card>
      </div>
    );
};

export default AuthLayout;
