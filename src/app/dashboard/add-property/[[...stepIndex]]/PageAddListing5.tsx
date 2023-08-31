import React, {FC} from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Input from '@/shared/Input';

export interface PageAddListing5Props {}

const PageAddListing5: FC<PageAddListing5Props> = () => {
  const renderRadio = (
    name: string,
    id: string,
    label: string,
    defaultChecked?: boolean
  ) => {
    return (
      <div className="flex items-center">
        <input
          defaultChecked={defaultChecked}
          id={id + name}
          name={name}
          type="radio"
          className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
        />
        <label
          htmlFor={id + name}
          className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      </div>
    );
  };

  const renderNoInclude = (text: string) => {
    return (
      <div className="flex items-center justify-between py-3">
        <span className="text-neutral-6000 dark:text-neutral-400 font-medium">
          {text}
        </span>
        <i className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"></i>
      </div>
    );
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">
          Set house rules for your guests{' '}
        </h2>
      </div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ----------- */}
        <div className=" border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flow-root">
          <div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
            {renderNoInclude('No smoking in common areas')}
            {renderNoInclude('Do not wear shoes/shoes in the house')}
            {renderNoInclude('No cooking in the bedroom')}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-5">
          <Input className="!h-full" placeholder="No smoking..." />
          <ButtonPrimary className="flex-shrink-0">
            <i className="text-xl las la-plus"></i>
            <span className="ml-3">Add tag</span>
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default PageAddListing5;
