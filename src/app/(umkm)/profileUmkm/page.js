/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import defaultProfile from '../../../../public/assets/icon/defaultProfile.png';
import InputField from '@/components/forms/InputField';
import request from '@/utils/request';
import { GiCancel } from 'react-icons/gi';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import TextareaField from '@/components/forms/TextareaField';
import Cookies from 'js-cookie';
import { FaWhatsapp } from 'react-icons/fa6';
import LineChart from '@/components/chart/lineChart';
import moment from 'moment';

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name must be at least 3 characters long' })
    .max(30, { message: 'Name must be at most 30 characters long.' })
    .optional(),
  address: z
    .string()
    .min(1, { message: 'Address must be at least 3 characters long' })
    .max(255, { message: 'Address must be at most 255 characters long.' })
    .optional(),
  profileUri: z
    .any()
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      `The maximum file size that can be uploaded is 2MB`
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  description: z
    .string()
    .min(1, { message: 'Description must be at least 3 characters long' })
    .max(255, { message: 'Description must be at most 255 characters long.' })
    .optional(),
});

const formSchemaKeuangan = z.object({
  // balance: z.number().int({ message: 'Price must be a number' }),
  dateTime: z.string().datetime({ message: 'Date must be a date time' }),
});

const ProfileUmkmPage = () => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [description, setDescription] = useState();
  const [profileUri, setProfileUri] = useState(null);
  const [defaultProfileUri, setDefaultProfileUri] = useState();
  const [whatsapp, setWhatsapp] = useState();
  const [facebook, setFacebook] = useState();
  const [instagram, setInstagram] = useState();

  const [financeType, setFinanceType] = useState();
  const [balance, setBalance] = useState();
  const [dateTime, setDateTime] = useState();
  const [year, setYear] = useState(new Date());

  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  const [updatedProfile, setUpdatedProfile] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);
  const [modalFormKeuangan, setModalFormKeuangan] = useState(false);
  const [modalFormProfile, setModalFormProfile] = useState(false);

  const [loading, setLoading] = useState(false);
  const [validations, setValidations] = useState([]);
  const [isAction, setIsAction] = useState(false);

  const router = useRouter();

  const onUpdate = async (e) => {
    setValidations([]);
    setLoading(true);
    toast.loading('Saving data...');
    e.preventDefault();

    // Inisialisasi objek data
    let data = {};

    // Tambahkan field ke data hanya jika field tidak kosong
    if (name !== '') {
      data.name = name;
    }
    if (address !== '') {
      data.address = address;
    }
    if (description !== '') {
      data.description = description;
    }
    if (profileUri !== '') {
      data.profileUri = profileUri;
    }
    if (whatsapp !== '') {
      data.whatsapp = whatsapp;
    }
    if (instagram !== '') {
      data.instagram = instagram;
    }
    if (facebook !== '') {
      data.facebook = facebook;
    }

    // Jika hanya profileUri yang diisi, maka hapus field lainnya dari data
    if (Object.keys(data).length > 1 && data.profileUri !== undefined) {
      Object.keys(data).forEach((key) => {
        if (key !== 'profileUri' && data[key] === '') {
          delete data[key];
        }
      });
    }

    // Buat validasi hanya jika ada field yang diisi
    if (Object.keys(data).length > 0) {
      const validation = formSchema.safeParse(data);
      console.log(validation);
      if (!validation) {
        validation.error.errors.map((validation) => {
          const key = [
            {
              name: validation.path[0],
              message: validation.message,
            },
          ];
          setValidations((validations) => [...validations, ...key]);
        });
        setLoading(false);
        toast.dismiss();
        toast.error('Invalid Input.');

        return;
      }
    }

    // Lakukan request patch
    request
      .patch(`/auth/profile`, data)
      .then(function (response) {
        if (response.data?.code === 200 || response.data?.code === 201) {
          toast.dismiss();
          toast.success('Success Update Profile');
          router.push('/profileUmkm');
          setUpdatedProfile(true);
          setProfileUri('');
          setModalFormProfile(false);
        }
        setLoading(false);
      })
      .catch(function (error) {
        if (
          (error.response?.data?.code === 400 ||
            error.response?.data?.code === 422) &&
          error.response?.data.status == 'VALIDATION_ERROR'
        ) {
          setValidations(error.response?.data.error?.validation);
          toast.dismiss();
          toast.error(error.response?.data.error?.message);
          setProfileUri('');
        } else if (
          error.response?.data?.code === 404 &&
          error.response?.data.status == 'NOT_FOUND'
        ) {
          toast.dismiss();
          toast.error(error.response?.data.error?.message);
        } else if (error.response?.data?.code === 500) {
          toast.dismiss();
          toast.error(error.response?.data.error.message);
        }
        setLoading(false);
      });
  };

  const onSubmit = async (e) => {
    setValidations([]);
    setLoading(true);
    toast.loading('Saving data...');
    e.preventDefault();

    // const validation = formSchemaKeuangan.safeParse({
    //   // balance: balance,
    //   dateTime: dateTime,
    // });

    // if (!validation.success) {
    //   validation.error.errors.map((validation) => {
    //     const key = [
    //       {
    //         name: validation.path[0],
    //         message: validation.message,
    //       },
    //     ];
    //     setValidations((validations) => [...validations, ...key]);
    //   });
    //   setLoading(false);
    //   toast.dismiss();
    //   toast.error('Invalid Input.');

    //   return;
    // }
    let data = {
      financeType: financeType,
      balance: balance,
      datetime: `${moment(dateTime).format('DD-MM-YYYY hh:mm:ss')}`,
    };

    request
      .post('/cms/finance', data)
      .then(function (response) {
        if (response.data?.code === 200 || response.data?.code === 201) {
          toast.dismiss();
          toast.success(
            `${
              financeType == 'INCOME'
                ? 'Success Menambah Pendapatan'
                : 'Success Menambah Pengeluaran'
            }`
          );
          setModalFormKeuangan(false);
          setIsAction(true);
        }
        setLoading(false);
        setDateTime('');
        setBalance('');
      })
      .catch(function (error) {
        if (
          (error.response?.data?.code === 400 ||
            error.response?.data?.code === 422) &&
          error.response?.data.status == 'VALIDATION_ERROR'
        ) {
          setValidations(error.response?.data.error?.validation);
          toast.dismiss();
          toast.error(error.response?.data.error?.message);
        } else if (
          error.response?.data?.code === 404 &&
          error.response?.data.status == 'NOT_FOUND'
        ) {
          toast.dismiss();
          toast.error(error.response?.data.error?.message);
        } else if (error.response?.data?.code === 500) {
          toast.dismiss();
          toast.error(error.response?.data.error.message);
        }
        setLoading(false);
      });
  };

  const fetchChart = useCallback(async () => {
    let payload = {
      year: `${moment(year).format('YYYY')}`,
    };
    await request
      .get(`/cms/finance/chart`, payload)
      .then(function (response) {
        setIncome(response.data.data.data.INCOME.map((item) => item.total));
        setExpense(response.data.data.data.EXPENSE.map((item) => item.total));
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, [year]);

  useEffect(() => {
    if (isAction) {
      fetchChart();
    }
    setIsAction(false);
  }, [fetchChart, isAction]);

  useEffect(() => {
    fetchChart();
  }, [fetchChart]);

  const fetchUsers = useCallback(async () => {
    await request
      .get(`/auth/profile`)
      .then(function (response) {
        setName(response.data.data.name);
        setDefaultProfileUri(response.data.data.profile_uri);
        setAddress(response.data.data.address);
        setDescription(response.data.data.detail_seller.description);
        setWhatsapp(response.data.data.detail_seller.whatsapp);
        setFacebook(response.data.data.detail_seller.facebook);
        setInstagram(response.data.data.detail_seller.instagram);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (updatedProfile) {
      fetchUsers();
      setUpdatedProfile(false);
    }
  }, [fetchUsers, updatedProfile]);
  return (
    <>
      <div className="flex flex-col gap-[30px]">
        <div className=" w-full bg-white rounded-lg relative">
          <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
            <span className="border-2 rounded-full border-[#FE6D00]"></span>
            <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
              Profile
            </h1>
          </div>
        </div>
        <div className="xl:px-[200px]">
          <div className="bg-white p-[20px] rounded-lg flex flex-col gap-[21px]">
            <div className="flex gap-[27px] lg:flex-row flex-col">
              <form onSubmit={onUpdate}>
                <div className="py-[20px] px-[40px] rounded-lg shadow-xl flex flex-col gap-[20px]">
                  <div className="relative lg:w-[185px]  flex justify-center items-center ">
                    <div className="relative w-[127px] h-[127px] flex-shrink-0 ">
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        loading="lazy"
                        alt="main-product-img"
                        src={
                          profileUri
                            ? URL.createObjectURL(profileUri)
                            : defaultProfileUri
                            ? process.env.NEXT_PUBLIC_HOST + defaultProfileUri
                            : defaultProfile
                        }
                        className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
                      />
                    </div>
                    {validations &&
                      validations.map(
                        (validation, index) =>
                          validation.name === 'profileUri' && (
                            <p
                              key={index}
                              className="text-sm text-red-500 mt-2"
                            >
                              {validation.message}
                            </p>
                          )
                      )}
                    {profileUri && (
                      <GiCancel
                        className="absolute top-0 right-0 text-red-500 text-lg cursor-pointer"
                        onClick={() => {
                          setProfileUri(null);
                          document.getElementById(`profileUri`).value = '';
                        }}
                      />
                    )}
                  </div>

                  <label
                    htmlFor="profileUri"
                    className="cursor-pointer rounded-lg flex justify-center items-center px-[55px] py-[10px] text-white font-bold text-[16px] bg-[#6366F1]"
                  >
                    Pilih Foto
                  </label>
                  {profileUri && (
                    <button
                      type="submit"
                      className="cursor-pointer rounded-lg flex justify-center items-center px-[55px] py-[10px] text-white font-bold text-[16px] bg-[#FE6D00]"
                    >
                      Update
                    </button>
                  )}
                  <input
                    type="file"
                    id="profileUri"
                    name="profileUri"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const img = e.target.files[0];
                        setProfileUri(img);
                      }
                    }}
                    className="hidden"
                  />
                </div>
              </form>
              <div className="w-full flex flex-col gap-[21px] pr-3">
                <div className="flex gap-[17px] bg-white rounded-[8px]">
                  <span className="border-2 rounded-full border-[#FE6D00]"></span>
                  <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
                    Biodata Diri
                  </h1>
                </div>
                <div>
                  <h1 className="text-[13px] font-bold">Nama Toko</h1>
                  <p className="text-[13px] font-normal">{name}</p>
                </div>
                <div>
                  <h1 className="text-[13px] font-bold">Alamat Toko</h1>
                  <p className="text-[13px] font-normal">
                    {address ? address : 'Wajib ditulis'}
                  </p>
                </div>
                <div>
                  <h1 className="text-[13px] font-bold">WhatsApp</h1>
                  <p className="text-[13px] font-normal">
                    {whatsapp ? whatsapp : 'Wajib ditulis'}
                  </p>
                </div>
                <div>
                  <h1 className="text-[13px] font-bold">Facebook</h1>
                  <p className="text-[13px] font-normal">
                    {facebook ? facebook : 'Wajib ditulis'}
                  </p>
                </div>
                <div>
                  <h1 className="text-[13px] font-bold">Instagram</h1>
                  <p className="text-[13px] font-normal">
                    {instagram ? '@' + instagram : 'Wajib ditulis'}
                  </p>
                </div>
                <div>
                  <h1 className="text-[13px] font-bold">Keterangan Toko</h1>
                  <p className="text-[13px] font-normal">
                    {description ? description : 'Wajib ditulis'}
                  </p>
                </div>

                <button
                  onClick={() => setModalFormProfile(!modalFormProfile)}
                  className="bg-[#6366F1] text-[16px] font-bold text-white py-[10px] w-full  rounded-lg"
                >
                  Ubah Biodata
                </button>
                <button
                  onClick={() => setModalLogout(!modalLogout)}
                  className="bg-[#FF3D00] text-[16px] font-bold text-white py-[10px] w-full  rounded-lg"
                >
                  Keluar Akun
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white p-[20px] rounded-lg flex flex-col gap-[21px] mt-[40px]">
            <div className="flex gap-[27px] lg:flex-row flex-col">
              <div className="w-full flex flex-col gap-[21px] pr-3">
                <div className="flex gap-[17px] bg-white rounded-[8px]">
                  <span className="border-2 rounded-full border-[#FE6D00]"></span>
                  <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
                    Laporan Keuangan
                  </h1>
                </div>
                <div className="flex gap-5">
                  <button
                    onClick={() => {
                      setModalFormKeuangan(!modalFormKeuangan);
                      setFinanceType('INCOME');
                    }}
                    className="bg-[#6366F1] text-[16px] font-bold text-white py-[10px] w-full  rounded-lg"
                  >
                    Tambah Pendapatan
                  </button>
                  <button
                    onClick={() => {
                      setModalFormKeuangan(!modalFormKeuangan);
                      setFinanceType('EXPENSE');
                    }}
                    className="bg-[#FF3D00] text-[16px] font-bold text-white py-[10px] w-full  rounded-lg"
                  >
                    Tambah Pengeluaran
                  </button>
                </div>
                <LineChart income={income} expense={expense} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*   MODAL VIEW */}

      <div
        onClick={() => {
          setModalFormProfile(!modalFormProfile);
          setUpdatedProfile(true);
          setName('');
          setAddress('');
          setWhatsapp('');
          setInstagram('');
          setFacebook('');
          setDescription('');
        }}
        className={`fixed w-full h-screen backdrop-blur-sm bg-black/20 top-0 left-0 z-[70] flex justify-center items-center ${
          modalFormProfile ? '' : 'hidden'
        }`}
      >
        <div
          className="w-[694px] flex flex-col gap-[14px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full bg-white rounded-lg relative">
            <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
              <span className="border-2 rounded-full border-[#FE6D00]"></span>
              <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
                Profile
              </h1>
            </div>
          </div>
          <form onSubmit={onUpdate}>
            <div
              className="w-full bg-white rounded-lg relative p-[20px] flex flex-col gap-[43px] overflow-auto"
              style={{ maxHeight: '80vh' }}
            >
              <div className="grid grid-cols-1 gap-[32px]">
                <InputField
                  id={'name'}
                  name={'name'}
                  value={name}
                  label={'Nama Toko'}
                  placeholder={'Nama toko'}
                  type={'text'}
                  onChange={(e) => setName(e.target.value)}
                  validations={validations}
                />
                <InputField
                  id={'address'}
                  name={'address'}
                  value={address}
                  label={'Alamat Toko'}
                  placeholder={'Alamat toko'}
                  type={'text'}
                  onChange={(e) => setAddress(e.target.value)}
                  validations={validations}
                />
                <InputField
                  id={'whatsapp'}
                  name={'whatsapp'}
                  value={whatsapp}
                  label={'WhatsApp'}
                  placeholder={'0812345678'}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  validations={validations}
                  type={'text'}
                />
                <InputField
                  id={'facebook'}
                  name={'facebook'}
                  value={facebook}
                  label={'Facebook'}
                  placeholder={'Facebook'}
                  onChange={(e) => setFacebook(e.target.value)}
                  validations={validations}
                  type={'text'}
                />
                <InputField
                  id={'instagram'}
                  name={'instagram'}
                  value={instagram}
                  label={'Instagram'}
                  placeholder={'Instagram'}
                  onChange={(e) => setInstagram(e.target.value)}
                  validations={validations}
                  type={'text'}
                />
                <TextareaField
                  id={'description'}
                  name={'description'}
                  value={description}
                  label={'Keterangan Toko'}
                  placeholder={'Keterangan toko'}
                  onChange={(e) => setDescription(e.target.value)}
                  validations={validations}
                />
              </div>
              <button className="bg-[#4DBB8D] text-[16px] font-bold text-white py-[10px] w-full rounded-lg">
                Konfirmasil
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        onClick={() => {
          setModalFormKeuangan(!modalFormKeuangan);
          setDateTime('');
          setBalance('');
        }}
        className={`fixed w-full h-screen backdrop-blur-sm bg-black/20  top-0 left-0 z-50 flex justify-center items-center ${
          modalFormKeuangan ? '' : 'hidden'
        }`}
      >
        <div
          className="w-[694px] flex flex-col gap-[14px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className=" w-full bg-white rounded-lg relative">
            <div className="px-[22px] py-[18px] flex gap-[17px] bg-white rounded-[8px]">
              <span className="border-2 rounded-full border-[#FE6D00]"></span>
              <h1 className="md:text-[20px] text-[16px] font-semibold items-center flex gap-5">
                {financeType == 'INCOME'
                  ? 'Penambahan Pendapatan'
                  : 'Penambahan Pengeluaran'}
              </h1>
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <div className=" w-full bg-white rounded-lg relative p-[20px] flex flex-col gap-[43px]">
              <div className="grid grid-cols-1 gap-[32px]">
                <InputField
                  id={'datetime'}
                  name={'datetime'}
                  value={dateTime}
                  label={'Bulan'}
                  placeholder={'Bulan'}
                  type={'date'}
                  onChange={(e) => setDateTime(e.target.value)}
                  validations={validations}
                />
                <InputField
                  id={'balance'}
                  name={'balance'}
                  value={balance}
                  label={'Jumlah Pemasukan'}
                  placeholder={'Rp. 10.000'}
                  type={'number'}
                  onChange={(e) => {
                    setBalance(e.target.value);
                  }}
                  validations={validations}
                />
              </div>
              <button className="bg-[#4DBB8D] text-[16px] font-bold text-white py-[10px] w-full rounded-lg">
                Konfirmasil
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className={`fixed w-full h-full overflow-y-scroll backdrop-blur-sm bg-black/20  top-0 left-0 z-50 flex justify-center  ${
          modalLogout ? '' : 'hidden'
        }`}
        onClick={() => {
          setModalLogout(!modalLogout);
        }}
      >
        <div
          className="rounded-lg w-[694px] h-[279px] flex flex-col justify-center items-center gap-[14px] bg-white m-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-center text-[26px]">
            Apakah anda yakin ingin
            <br />
            <span className="text-red-500 font-semibold">“Keluar”</span> dari
            akun ini?
          </p>
          <button
            onClick={() => {
              Cookies.remove('token');
              router.push('/login');
            }}
            className="w-[120px] text-[23px] font-semibold text-white bg-red-500 py-2 text-center rounded-lg"
          >
            Keluar
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileUmkmPage;
