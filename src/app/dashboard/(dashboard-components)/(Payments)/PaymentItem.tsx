//headlessui
import {Dialog, Popover, Transition} from '@headlessui/react';
//react
import React, {FC, Fragment, useState} from 'react';
//shared
import Badge from '@/shared/Badge';

const PaymentItem = () => {
  return (
    <div className="mt-2 grid grid-cols-1 gap-6 md:gap-7">
      <div className="flex items-center justify-between text-lime-700">
        <div className="flex items-center">
          <div className="payment-title">
            <div className="text-base font-semibold dark:text-slate-50 text-slate-500">
              Room #122
            </div>
          </div>
          <div className="payment-title ml-8">
            <div className="text-base text-lime-600 dark:text-slate-50">
              PKR 20,000
            </div>
          </div>
        </div>
        <div className="booking-actions flex items-center justify-end">
          <div className="booking-status">
            <div style={{maxWidth: '130px'}}>
              <Badge name="Room" color="yellow" />
            </div>
          </div>
          <Popover className="relative">
            {({open, close}) => (
              <>
                <Popover.Button className={`border-0 button-focus-outline-0`}>
                  <i className="las la-ellipsis-v text-2xl ml-3 translate-y-0.5"></i>
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
                        <p className="flex text-sm text-slate-500">
                          <i className="las la-wallet text-sm translate-y-0.5"></i>
                          &nbsp;Dispatch
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
export default PaymentItem;
