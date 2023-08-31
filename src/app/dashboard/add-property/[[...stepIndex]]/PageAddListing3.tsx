import Input from '@/shared/Input';
import React, {FC} from 'react';
import Select from '@/shared/Select';
import FormItem from '../FormItem';

export interface PageAddListing3Props {}

const PageAddListing3: FC<PageAddListing3Props> = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Size of your location</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem label="Unit">
          <Select>
            <option value="Marlas">Marlas</option>
            <option value="Kanals">Kanals</option>
            <option value="Acres">Acres</option>
          </Select>
        </FormItem>
        <FormItem label="Area in Numbers" desc="e.g. 10, 50, 100">
          <Input />
        </FormItem>
      </div>
    </>
  );
};

export default PageAddListing3;
