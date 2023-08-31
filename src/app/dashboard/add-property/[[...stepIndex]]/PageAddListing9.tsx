'use client';

import DatePickerCustomDay from '@/components/DatePickerCustomDay';
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth';
import NcInputNumber from '@/components/NcInputNumber';
import React, {FC, useState} from 'react';
import DatePicker from 'react-datepicker';

export interface PageAddListing9Props {}

const PageAddListing9: FC<PageAddListing9Props> = () => {
  const [dates, setDates] = useState<number[]>([
    new Date('2023/02/06').getTime(),
    new Date('2023/02/09').getTime(),
    new Date('2023/02/15').getTime(),
  ]);

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">How long can guests stay?</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {`Minimum & Maximum stay after one charge.`}
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-7">
        {/* ITEM */}
        <NcInputNumber label="Nights min" defaultValue={1} />
        <NcInputNumber label="Nights max" defaultValue={99} />
      </div>
    </>
  );
};

export default PageAddListing9;
