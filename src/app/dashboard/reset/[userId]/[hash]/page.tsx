'use client';
import React, {FC} from 'react';
import Input from '@/shared/Input';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Link from 'next/link';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {resetPassword} from 'src/redux/slices/user';
import {useDispatch} from '@/redux/store';
import {useRouter} from 'next/navigation';

export interface PageAdminResetProps {
  children: any;
  params: any;
}

const PageAdminResetPassword: FC<PageAdminResetProps> = ({
  children,
  params,
}) => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const ResetAdminSchema = Yup.object({
    password: Yup.string().min(8).max(20).required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('password')],
        'Confirm password must be equal to Password'
      )
      .required('Please confirm your password'),
  });

  interface ResetAdminInputTypes {
    password: string;
    confirmPassword: string;
  }

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ResetAdminInputTypes>({
    resolver: yupResolver(ResetAdminSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await dispatch(
        resetPassword({
          userId: params.userId,
          hash: params.hash,
          password: data.password,
        })
      );
      router.push('/login');
    } catch (error) {
      console.log('Error Updating Password');
    }
  };
  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="mt-20 mb-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Please enter your new password
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
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Confirm Password
                  </span>
                  <Input
                    type="password"
                    {...register('confirmPassword')}
                    className="mt-1"
                    placeholder="e.g Lahore123@#"
                  />
                  <p className="form-field-error">
                    {errors?.confirmPassword?.message}
                  </p>
                </label>
              </div>
            </div>
            <div className="flex justify-end mt-8" style={{width: '100%'}}>
              <ButtonPrimary type="submit">Reset</ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageAdminResetPassword;
