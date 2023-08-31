//headlessui
import {Dialog, Popover, Transition} from '@headlessui/react';
//react
import React, {FC, Fragment, useState} from 'react';
//shared
import Badge from '@/shared/Badge';

const BookingItem = () => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-6 md:gap-7">
      <div className="flex items-center justify-between text-lime-700">
        <div className="flex items-center">
          <img
            src={
              'https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
            }
            alt=""
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '5px',
            }}
            width={100}
            height={60}
          />
          <div className="booking-title ml-3">
            <div className="text-base dark:text-slate-50">
              Syed Hussanin Daniyal
            </div>
            <div className="text-xs mt-1 dark:text-slate-50">
              Room #107 - 01/05/2023
            </div>
          </div>
        </div>
        <div className="booking-status">
          <div style={{width: '130px'}}>
            <Badge name="In-Queue" color="indigo" />
          </div>
        </div>
        <div className="booking-actions flex items-center">
          <button className="xs:hidden bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 text-sm rounded">
            Details <i className="las la-angle-double-right"></i>
          </button>
          <Popover className="relative">
            {({open, close}) => (
              <>
                <Popover.Button className={`border-0 button-focus-outline-0`}>
                  <i className="las la-ellipsis-v text-2xl ml-3"></i>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 w-200 max-w-sm px-4 mt-3 right-0 sm:px-0">
                    <div className="overflow-hidden rounded shadow-base bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                      <div className="p-2 dark:bg-neutral-900 dark:border-t dark:border-neutral-800">
                        <p className="flex text-base text-rose-500">
                          <i className="las la-times-circle text-xl translate-y-0.5"></i>
                          &nbsp;Reject
                        </p>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
    </div>
  );
};
export default BookingItem;
