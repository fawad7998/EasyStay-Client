'use client';
import React, {FC} from 'react';
import Input from '@/shared/Input';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Link from 'next/link';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {registerUser} from 'src/redux/slices/user';
import {useDispatch} from '@/redux/store';
import {useRouter} from 'next/navigation';

export interface PageAdminLoginProps {}

const PageAdminLogin: FC<PageAdminLoginProps> = ({}) => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const RegisterAdminSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(8).max(20).required('Password is required'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(11, 'Phone number must be exactly 11 digits')
      .max(11, 'Phone number must be exactly 11 digits'),
    city: Yup.string().required('City is required'),
    organizationName: Yup.string().required('Organization name is required'),
  });

  interface RegisterInputTypes {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    city: string;
    organizationName: string;
  }

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterInputTypes>({
    resolver: yupResolver(RegisterAdminSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      data.isAdmin = true;
      await dispatch(registerUser(data));
      router.push('/dashboard/domains');
    } catch (error) {
      console.log('Error Registering User');
    }
  };
  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="mt-20 mb-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Welcome to EasyStay Business
        </h2>
        <div className="max-w-2xl mx-auto space-y-2">
          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              <div
                style={{width: '50%'}}
                className="m-1 grid grid-cols-1 gap-3"
              >
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Name
                  </span>
                  <Input
                    type="text"
                    placeholder="e.g. Syed Ali"
                    className="mt-1"
                    {...register('name')}
                  />
                  <p className="form-field-error">{errors?.name?.message}</p>
                </label>
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Organization Name
                  </span>
                  <Input
                    type="text"
                    placeholder="e.g. EasyStay"
                    className="mt-1"
                    {...register('organizationName')}
                  />
                  <p className="form-field-error">
                    {errors?.organizationName?.message}
                  </p>
                </label>
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Orgnization Email
                  </span>
                  <Input
                    type="email"
                    placeholder="e.g. example@example.com"
                    className="mt-1"
                    {...register('email')}
                  />
                  <p className="form-field-error">{errors?.email?.message}</p>
                </label>
              </div>
              <div
                style={{width: '50%'}}
                className="m-1 grid grid-cols-1 gap-3"
              >
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Organization Contact No.
                  </span>
                  <Input
                    type="text"
                    placeholder="e.g. 03001234567"
                    className="mt-1"
                    {...register('phoneNumber')}
                  />
                  <p className="form-field-error">
                    {errors?.phoneNumber?.message}
                  </p>
                </label>
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    City
                  </span>
                  <Input
                    type="text"
                    placeholder="e.g. Lahore"
                    className="mt-1"
                    {...register('city')}
                  />
                  <p className="form-field-error">{errors?.city?.message}</p>
                </label>
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Password
                  </span>
                  <Input
                    type="password"
                    {...register('password')}
                    className="mt-1"
                    placeholder="e.g Lahore123@#"
                  />
                  <p className="form-field-error">
                    {errors?.password?.message}
                  </p>
                </label>
              </div>
            </div>
            <div className="flex justify-end mt-8" style={{width: '100%'}}>
              <ButtonPrimary type="submit">Register</ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageAdminLogin;
