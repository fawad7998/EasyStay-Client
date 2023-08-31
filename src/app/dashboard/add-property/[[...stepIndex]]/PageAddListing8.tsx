import React, {FC} from 'react';
import Input from '@/shared/Input';
import Select from '@/shared/Select';
import FormItem from '../FormItem';

export interface PageAddListing8Props {}

const PageAddListing8: FC<PageAddListing8Props> = () => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Price your space</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {` The host's revenue is directly dependent on the setting of rates and
            regulations on the number of guests, the number of nights, and the
            cancellation policy.`}
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem label="Frequency">
          <Select>
            <option value="USD">Per Day</option>
            <option value="PKR">Per Week</option>
            <option value="PKR">Per Month</option>
          </Select>
        </FormItem>
        <FormItem label="Currency">
          <Select>
            <option value="USD">USD</option>
            <option value="PKR">PKR</option>
          </Select>
        </FormItem>
        <FormItem label="Starting price (Min Amount)">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <Input className="!pl-8 !pr-10" placeholder="0.00" />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">PKR</span>
            </div>
          </div>
        </FormItem>
        {/* ----- */}
        <FormItem label="Ending price (Max Amount)">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <Input className="!pl-8 !pr-10" placeholder="0.00" />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">PKR</span>
            </div>
          </div>
        </FormItem>
        {/* ----- */}
      </div>
    </>
  );
};

export default PageAddListing8;
