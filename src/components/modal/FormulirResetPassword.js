import request from '@/utils/request';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import Loading from '../Loading';
import InputField from '../forms/InputField';

const FormulirResetPassword = ({ length = 6, setModalResetPassword }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputs = useRef([]);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalOtp, setModalOtp] = useState(false);
  const [formResetPassword, setFormResetPassword] = useState(false);
  const [token, setToken] = useState('');

  const [validations, setValidations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modalOtp) {
      inputs.current[0].focus();
    }
  }, [modalOtp]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    // Only allow single digit input
    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (index < length - 1) {
        inputs.current[index + 1].focus();
      }
    }

    // Move focus to previous input on backspace
    if (value === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      // Hapus nilai dari input saat ini
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);

      // Pindahkan fokus ke input sebelumnya jika ada
      if (index > 0) {
        setTimeout(() => {
          inputs.current[index - 1].focus();
        }, 0);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
      inputs.current[5].focus();
    }
  };

  const handleSubmit = (e) => {
    setValidations([]);
    setLoading(true);
    toast.loading('Loading...');
    e.preventDefault();

    let data = new FormData();
    data.append('password', newPassword);
    data.append('passwordConfirmation', confirmPassword);

    request
      .post('/auth/reset-password', data)
      .then(function (response) {
        if (response.data?.code === 200 || response.data?.code === 201) {
          toast.dismiss();
          setToken(response.data.data.token);
          toast.success('Success Verifikasi');
          setLoading(false);
          setModalResetPassword(false);
        }
      })
      .catch(function (error) {
        if (
          error.response?.data?.code === 400 ||
          (error.response?.data?.code === 422 &&
            error.response?.data.status == 'VALIDATION_ERROR')
        ) {
          setValidations(error.response?.data.error?.validation);
          toast.dismiss();
          toast.error(error.response?.data.error?.validation?.message);
        } else if (
          error.response?.data?.code === 401 &&
          error.response?.data.status == 'UNAUTHORIZED'
        ) {
          toast.dismiss();
          toast.error(error.response?.data.error?.message);
        } else if (
          error.response?.data?.code === 404 &&
          error.response?.data.status == 'NOT_FOUND'
        ) {
          toast.dismiss();
          toast.error(error.response?.data.error?.message);
        } else if (error.response?.data?.code === 500) {
          console.error('INTERNAL_SERVER_ERROR');
          toast.dismiss();
          toast.error(error.response?.data.error.message);
        }
        setLoading(false);
      });
  };

  const handleVerifikasiOtp = (e) => {
    setValidations([]);
    setLoading(true);
    toast.loading('Loading...');
    e.preventDefault();

    let data = new FormData();
    data.append('email', email);
    data.append('otp', parseInt(otp.join('')));

    request
      .post('/auth/forgot-password', data)
      .then(function (response) {
        if (response.data?.code === 200 || response.data?.code === 201) {
          toast.dismiss();
          Cookies.set('token', response.data.data.token);
          toast.success('Success Verifikasi');
          setLoading(false);
          setModalOtp(false);
          setFormResetPassword(true);
        }
      })
      .catch(function (error) {
        if (
          error.response?.data?.code === 400 ||
          (error.response?.data?.code === 422 &&
            error.response?.data.status == 'VALIDATION_ERROR')
        ) {
          toast.dismiss();
          toast.error(error.response?.data.error?.validation?.message);
        } else if (
          error.response?.data?.code === 401 &&
          error.response?.data.status == 'UNAUTHORIZED'
        ) {
          toast.dismiss();
          toast.error(error.response?.data.error?.message);
        } else if (
          error.response?.data?.code === 404 &&
          error.response?.data.status == 'NOT_FOUND'
        ) {
          toast.dismiss();
          toast.error(error.response?.data.error?.message);
        } else if (error.response?.data?.code === 500) {
          console.error('INTERNAL_SERVER_ERROR');
          toast.dismiss();
          toast.error(error.response?.data.error.message);
        }
        setLoading(false);
      });
  };
  const handleResend = (e) => {
    setValidations([]);
    toast.loading('Loading...');
    e.preventDefault();

    let data = new FormData();
    data.append('email', email);

    request
      .post('/auth/send-otp', data)
      .then(function (response) {
        if (response.data?.code === 200 || response.data?.code === 201) {
          toast.dismiss();
          toast.success('Success Resend OTP');
          setModalOtp(true);
        }
      })
      .catch(function (error) {
        if (
          error.response?.data?.code === 400 ||
          (error.response?.data?.code === 422 &&
            error.response?.data.status == 'VALIDATION_ERROR')
        ) {
          setValidations(error.response?.data.error?.validation);
          toast.dismiss();
          toast.error(error.response?.data.error?.validation?.message);
        } else if (
          error.response?.data?.code === 401 &&
          error.response?.data.status == 'UNAUTHORIZED'
        ) {
          toast.dismiss();
          toast.error(error.response?.data.error?.message);
        } else if (
          error.response?.data?.code === 404 &&
          error.response?.data.status == 'NOT_FOUND'
        ) {
          toast.dismiss();
          toast.error(error.response?.data.error?.message);
        } else if (error.response?.data?.code === 500) {
          console.error('INTERNAL_SERVER_ERROR');
          toast.dismiss();
          toast.error(error.response?.data.error.message);
        }
        toast.dismiss();
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="px-[30px] pt-[33px] pb-[48px] h-full  bg-white rounded-[8px]">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              {formResetPassword ? 'Change Password' : 'Forget Password?'}
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?
              <span
                onClick={() => setModalResetPassword(false)}
                className="text-[#FE6D00] decoration-2 hover:underline font-medium cursor-pointer"
              >
                Login here
              </span>
            </p>
          </div>

          <div className="pt-[45px] ">
            {formResetPassword ? (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  <div className="grid grid-cols-1 gap-[32px]">
                    <InputField
                      id={'newPassword'}
                      name={'newPassword'}
                      value={newPassword}
                      label={'New Password'}
                      placeholder={''}
                      type={'password'}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      validations={validations}
                    />
                    <InputField
                      id={'passwordConfirmation'}
                      name={'passwordConfirmation'}
                      value={confirmPassword}
                      label={'Confirm Password'}
                      placeholder={''}
                      type={'text'}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      validations={validations}
                    />
                  </div>
                  <button className="w-full text-center bg-gray-800 text-white py-[13px] text-[24px] font-bold rounded-[17px] mt-[30px]">
                    Submit
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResend}>
                <div className="grid gap-y-4">
                  <div>
                    <InputField
                      id={'email'}
                      name={'email'}
                      value={email}
                      label={'Email'}
                      placeholder={'Email'}
                      type={'email'}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      validations={validations}
                    />
                  </div>
                  <button className="w-full text-center bg-gray-800 text-white py-[13px] text-[24px] font-bold rounded-[17px] mt-[30px]">
                    Send OTP
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {modalOtp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
            <header className="mb-8">
              <h1 className="text-2xl font-bold mb-1">
                Verifikasi dengan Email
              </h1>
              <p className="text-[15px] text-slate-500">
                Silahkan masukkan 6 digit kode yang sudah dikirim melalui email
                Anda
              </p>
            </header>
            <form id="otp-form" onSubmit={handleVerifikasiOtp}>
              <div className="flex items-center justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputs.current[index] = el)}
                    onFocus={(e) => e.target.select()}
                    onPaste={handlePaste}
                  />
                ))}
              </div>
              <div className="max-w-[260px] mx-auto mt-4">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-black px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                >
                  Confirm
                </button>
              </div>
            </form>
            <div className="text-sm text-slate-500 mt-4">
              Didnt receive code?{' '}
              <button
                onClick={(e) => handleResend(e)}
                className="font-medium text-[#FE6D00] "
              >
                Resend
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormulirResetPassword;
