'use client';
import CardAuthorBox2 from '@/components/CardAuthorBox2';
import Avatar from '@/shared/Avatar';
import ButtonPrimary from '@/shared/ButtonPrimary';
import {ArrowRightIcon} from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import React, {FC, useState} from 'react';
import {getCurrentUser, prepareUserDashboard} from '@/redux/slices/user';
import {useDispatch, useSelector} from '@/redux/store';
import {useRouter} from 'next/navigation';

export interface PageAdminLoginProps {}

const PageAdminLogin: FC<PageAdminLoginProps> = ({}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const dispatch: any = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const router = useRouter();

  const prepareDashboard = async () => {
    try {
      await dispatch(prepareUserDashboard({domains: selected}));
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="mt-20 mb-10 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Please choose your offerings
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-5">
          <div
            className={`nc-CardAuthorBox relative flex flex-col items-center justify-center text-center px-3 py-5 sm:px-6 sm:py-7 ${
              selected.includes('rooms')
                ? 'border-2 border-neutral-200 border-opacity-70 bg-neutral-50 rounded-3xl'
                : '[ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]'
            }`}
            onClick={() => setSelected((pre: string[]) => [...pre, 'rooms'])}
          >
            <Avatar
              sizeClass="w-20 h-20 text-2xl"
              radius="rounded-full"
              imgUrl={
                'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=600'
              }
              userName={'Rooms'}
            />
            <div className="mt-3">
              <h2 className={`text-base font-medium`}>
                <span className="line-clamp-1">{'Rooms'}</span>
              </h2>
            </div>
          </div>
          <div
            className={`nc-CardAuthorBox relative flex flex-col items-center justify-center text-center px-3 py-5 sm:px-6 sm:py-7  ${
              selected.includes('tours')
                ? 'border-2 border-neutral-200 border-opacity-70 bg-neutral-50 rounded-3xl'
                : '[ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]'
            }`}
            onClick={() => setSelected((pre: string[]) => [...pre, 'tours'])}
          >
            <Avatar
              sizeClass="w-20 h-20 text-2xl"
              radius="rounded-full"
              imgUrl={
                'https://images.pexels.com/photos/163168/mountains-summit-winter-snow-163168.jpeg?auto=compress&cs=tinysrgb&w=600'
              }
              userName={'Rooms'}
            />
            <div className="mt-3">
              <h2 className={`text-base font-medium`}>
                <span className="line-clamp-1">{'Tours'}</span>
              </h2>
            </div>
          </div>
          <div
            className={`nc-CardAuthorBox relative flex flex-col items-center justify-center text-center px-3 py-5 sm:px-6 sm:py-7  ${
              selected.includes('adventures')
                ? 'border-2 border-neutral-200 border-opacity-70 bg-neutral-50 rounded-3xl'
                : '[ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]'
            }`}
            onClick={() =>
              setSelected((pre: string[]) => [...pre, 'adventures'])
            }
          >
            <Avatar
              sizeClass="w-20 h-20 text-2xl"
              radius="rounded-full"
              imgUrl={
                'https://images.pexels.com/photos/11183380/pexels-photo-11183380.jpeg?auto=compress&cs=tinysrgb&w=600'
              }
              userName={'Rooms'}
            />
            <div className="mt-3">
              <h2 className={`text-base font-medium`}>
                <span className="line-clamp-1">{'Adventures'}</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="mt-5 float-right">
          <ButtonPrimary
            sizeClass="px-4 py-2 sm:px-5"
            onClick={() => prepareDashboard()}
          >
            Prepare Dashboard
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default PageAdminLogin;
