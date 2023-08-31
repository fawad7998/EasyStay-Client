'use client';
import React, {FC} from 'react';
import Input from '@/shared/Input';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Link from 'next/link';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginUser} from 'src/redux/slices/user';
import {useDispatch} from '@/redux/store';
import {useRouter} from 'next/navigation';

export interface PageAdminLoginProps {}

const PageAdminLogin: FC<PageAdminLoginProps> = ({}) => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const LoginAdminSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(8).max(20).required('Password is required'),
  });

  interface LoginTypes {
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginTypes>({
    resolver: yupResolver(LoginAdminSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const {email, password} = data;
      await dispatch(loginUser({email, password}));
      router.push('/dashboard');
    } catch (error) {
      console.log('Error While Login User');
    }
  };
  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="mt-20 mb-10 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Welcome Back to EasyStay Business
        </h2>
        <div className="max-w-xl mx-auto space-y-2">
          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              <div
                style={{width: '100%'}}
                className="m-1 grid grid-cols-1 gap-3"
              >
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
              <ButtonPrimary type="submit">Login</ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageAdminLogin;
