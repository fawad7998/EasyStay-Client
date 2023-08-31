import CardCategoryBox1 from '@/components/CardCategoryBox1';
import Heading from '@/shared/Heading';
import {TaxonomyType} from '@/data/types';
import React from 'react';

export interface SectionGridCategoryBoxProps {
  categories?: TaxonomyType[];
  headingCenter?: boolean;
  categoryCardType?: 'card1';
  className?: string;
  gridClassName?: string;
}

const DEMO_CATS: TaxonomyType[] = [
  {
    id: '1',
    href: '/',
    name: 'New Yourk',
    taxonomy: 'category',
    count: 1882,
    thumbnail:
      'https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    subText: '',
  },
];

const SectionGridCategoryBox: React.FC<SectionGridCategoryBoxProps> = ({
  categories = DEMO_CATS,
  categoryCardType = 'card1',
  headingCenter = true,
  className = '',
  gridClassName = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}) => {
  let CardComponentName = CardCategoryBox1;
  switch (categoryCardType) {
    case 'card1':
      CardComponentName = CardCategoryBox1;
      break;

    default:
      CardComponentName = CardCategoryBox1;
  }

  return (
    <div className={`nc-SectionGridCategoryBox relative ${className}`}>
      <Heading
        desc="Discover great places near where you live"
        isCenter={headingCenter}
      >
        Explore nearby
      </Heading>
      <div className={`grid ${gridClassName} gap-5 sm:gap-6 md:gap-8`}>
        {categories.map((item, i) => (
          <CardComponentName key={i} taxonomy={item} />
        ))}
      </div>
    </div>
  );
};

export default SectionGridCategoryBox;
