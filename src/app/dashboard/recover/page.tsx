'use client';
import React, {FC, useState} from 'react';
import Input from '@/shared/Input';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Link from 'next/link';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  findUser,
  getRecoverUser,
  sendRecoveryEmail,
} from 'src/redux/slices/user';
import {useDispatch, useSelector} from '@/redux/store';
import {useRouter} from 'next/navigation';
import CardCategoryBox1 from '@/components/CardCategoryBox1';

export interface PageAdminRecoverProps {}

const PageAdminRecover: FC<PageAdminRecoverProps> = ({}) => {
  const router = useRouter();
  const recoverUser = useSelector(getRecoverUser);
  const dispatch: any = useDispatch();
  const RecoverAdminSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
  });
  const [mailSent, setMailSent] = useState<boolean>(false);
  interface RecoverAdmin {
    email: string;
  }

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<RecoverAdmin>({
    resolver: yupResolver(RecoverAdminSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const {email} = data;
      await dispatch(findUser({email}));
    } catch (error) {
      console.log('Error While Finding User');
    }
  };

  const sendRecoverEmail = async () => {
    try {
      await dispatch(sendRecoveryEmail({email: recoverUser.email}));
      setMailSent(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="mt-20 mb-10 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Recover Account
        </h2>
        {recoverUser?.email ? (
          <>
            {!mailSent ? (
              <div className={`flex items-center flex-col justify-center`}>
                <div className="w-96">
                  <CardCategoryBox1
                    className="card1"
                    taxonomy={{
                      id: '1',
                      href: '/',
                      name: recoverUser?.name,
                      taxonomy: 'category',
                      count: null,
                      subText: recoverUser?.email,
                      thumbnail:
                        'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    }}
                  />
                </div>
                <div className="flex justify-between w-96 mt-5 ml-5 mr-5">
                  <div>Is that you ?</div>
                  <div className="flex justify-between">
                    <div onClick={() => sendRecoverEmail()}>
                      <i className="las la-check text-cyan-500"></i> Yes
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div>
                      <i className="las la-times text-rose-600"></i> No
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-center items-center">
                  <div className="animation-ctn">
                    <div className="icon icon--order-success svg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="154px"
                        height="154px"
                      >
                        <g fill="none" stroke="#22AE73" stroke-width="2">
                          <circle
                            cx="77"
                            cy="77"
                            r="72"
                            style={{
                              strokeDasharray: '480px, 480px',
                              strokeDashoffset: '960px',
                            }}
                          ></circle>
                          <circle
                            id="colored"
                            fill="#22AE73"
                            cx="77"
                            cy="77"
                            r="72"
                            style={{
                              strokeDasharray: '480px, 480px',
                              strokeDashoffset: '960px',
                            }}
                          ></circle>
                          <polyline
                            className="st0"
                            stroke="#fff"
                            stroke-width="10"
                            points="43.5,77.8 63.7,97.9 112.2,49.4 "
                            style={{
                              strokeDasharray: '100px, 100px',
                              strokeDashoffset: '200px',
                            }}
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>

                <h3 className="mt-10 mb-10 flex items-center text-md leading-[115%] md:text-md md:leading-[115%] text-neutral-900 dark:text-neutral-100 justify-center text-center">
                  Password reset link has been sent to your email, please check
                  inbox.
                </h3>
              </>
            )}
          </>
        ) : (
          <>
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
                        Enter Orgnization Email
                      </span>
                      <Input
                        type="email"
                        placeholder="e.g. example@example.com"
                        className="mt-1"
                        {...register('email')}
                      />
                      <p className="form-field-error">
                        {errors?.email?.message}
                      </p>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end mt-8" style={{width: '100%'}}>
                  <ButtonPrimary className={'w-full'} type="submit">
                    Find Account
                  </ButtonPrimary>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PageAdminRecover;
