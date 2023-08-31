'use client';
import Image from 'next/image';
import CardCategoryBox1 from '@/components/CardCategoryBox1';
import Heading2 from '@/shared/Heading2';
import {Tab} from '@headlessui/react';
import CarCard from '@/components/CarCard';
import ExperiencesCard from '@/components/ExperiencesCard';
import StayCard from '@/components/StayCard2';
import {Dialog, Popover, Transition} from '@headlessui/react';

import {
  DEMO_CAR_LISTINGS,
  DEMO_EXPERIENCES_LISTINGS,
  DEMO_STAY_LISTINGS,
} from '@/data/listings';
import React, {FC, Fragment, useState} from 'react';
import ButtonSecondary from '@/shared/ButtonSecondary';
import Badge from '@/shared/Badge';
import BookingItem from './(dashboard-components)/(Bookings)/BookingItem';
import PaymentItem from './(dashboard-components)/(Payments)/PaymentItem';

const Dashboard = () => {
  let [categories] = useState(['Rooms', 'Tours', 'Sports & Adventures']);

  const renderSection1 = () => {
    return (
      <>
        <div className="listingSection__wrap mt-5">
          <div>
            <Tab.Group>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{`Bookings`}</h2>
                <Tab.List className="flex space-x-1 overflow-x-auto">
                  {categories.map((item) => (
                    <Tab key={item} as={Fragment}>
                      {({selected}) => (
                        <button
                          className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                            selected
                              ? 'bg-secondary-900 text-secondary-50 '
                              : 'text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          } `}
                        >
                          {item}
                        </button>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels>
                <Tab.Panel className="">
                  <div className="booking-items mt-8">
                    <BookingItem />
                    <BookingItem />
                  </div>
                  <div className="flex mt-11 justify-center items-center">
                    <ButtonSecondary>Show me more</ButtonSecondary>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="">
                  <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                    {DEMO_EXPERIENCES_LISTINGS.filter((_, i) => i < 4).map(
                      (stay) => (
                        <ExperiencesCard key={stay.id} data={stay} />
                      )
                    )}
                  </div>
                  <div className="flex mt-11 justify-center items-center">
                    <ButtonSecondary>Show me more</ButtonSecondary>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="">
                  <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                    {DEMO_CAR_LISTINGS.filter((_, i) => i < 4).map((stay) => (
                      <CarCard key={stay.id} data={stay} />
                    ))}
                  </div>
                  <div className="flex mt-11 justify-center items-center">
                    <ButtonSecondary>Show me more</ButtonSecondary>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </>
    );
  };

  const renderSection2 = () => {
    return (
      <>
        <div className="listingSection__wrap mt-5">
          <h2 className="text-2xl font-semibold">{`Payments`}</h2>
          <PaymentItem />
          <PaymentItem />
          <PaymentItem />
          <div style={{marginTop: '15px'}}></div>
          <div className="flex mt-11 justify-center items-center">
            <ButtonSecondary>Show me more</ButtonSecondary>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container">
        <div className="mt-5">
          <Heading2
            heading={'Dashboard'}
            subHeading={
              <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
                Welcome Back
                <span className="mx-2">·</span>
                Syed Ali
              </span>
            }
          />
        </div>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 md:gap-8 mb-5`}
          style={{marginTop: '-35px'}}
        >
          <CardCategoryBox1
            className="card1"
            taxonomy={{
              id: '1',
              href: '/',
              name: 'Rooms',
              taxonomy: 'category',
              count: 1882,
              subText: '0 vancat',
              thumbnail:
                'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}
          />
          <CardCategoryBox1
            className="card1"
            taxonomy={{
              id: '1',
              href: '/',
              name: 'Tours',
              subText: '14 Bookings',
              taxonomy: 'category',
              count: 1882,
              thumbnail:
                'https://images.pexels.com/photos/346832/pexels-photo-346832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}
          />
          <CardCategoryBox1
            className="card1"
            taxonomy={{
              id: '1',
              href: '/',
              name: 'Adventures',
              subText: '20 Bookings',
              taxonomy: 'category',
              count: 1882,
              thumbnail:
                'https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}
          />
          <CardCategoryBox1
            className="card1"
            taxonomy={{
              id: '1',
              href: '/',
              name: 'Payments',
              subText: 'PKR 12000',
              taxonomy: 'category',
              count: 1882,
              thumbnail:
                'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}
          />
        </div>
        <div className="lg:flex xl:flex gap-5 sm:gap-6 md:gap-8">
          <div className="lg:w-3/5 xl:w-3/5 sm:w-100">{renderSection1()}</div>
          <div className="lg:w-2/5 xl:w-2/5 sm:w-100">{renderSection2()}</div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
