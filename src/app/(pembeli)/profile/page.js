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
import Cookies from 'js-cookie';

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
    .optional(),
});

const ProfilePage = () => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [description, setDescription] = useState();
  const [profileUri, setProfileUri] = useState(null);
  const [defaultProfileUri, setDefaultProfileUri] = useState();
  const [whatsapp, setWhatsapp] = useState();
  const [facebook, setFacebook] = useState();
  const [instagram, setInstagram] = useState();

  const [updatedProfile, setUpdatedProfile] = useState(false);
  const [alertLogout, setAlertLogout] = useState(false);

  const [loading, setLoading] = useState(false);
  const [validations, setValidations] = useState([]);
  const [menuActive, setMenuActive] = useState(false);

  const router = useRouter();

  const onUpdate = async (e) => {
    setValidations([]);
    setLoading(true);
    toast.loading('Saving data...');
    e.preventDefault();

    // Inisialisasi objek data dengan title dan content
    let data = {};

    // Tambahkan imageUri ke data jika imageUri tidak null atau undefined
    if (name != null || name != '') {
      data.name = name;
    }
    if (address != null || address != '') {
      data.address = address;
    }
    if (profileUri != null || profileUri != '') {
      data.profileUri = profileUri;
    }

    // Buat validasi hanya jika profileUri tidak null atau undefined
    if (
      profileUri != null ||
      name != null ||
      address != null ||
      name != '' ||
      address != '' ||
      profileUri != ''
    ) {
      const validation = formSchema.safeParse(data);
      console.log(validation);
      if (!validation.success) {
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

    // Lakukan request patch hanya jika validasi berhasil atau jika tidak ada imageUri
    request
      .patch(`/auth/profile`, data)
      .then(function (response) {
        if (response.data?.code === 200 || response.data?.code === 201) {
          toast.dismiss();
          toast.success('Success Update Profile');

          setUpdatedProfile(true);
          setProfileUri(null);
          setMenuActive(false);
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

  const fetchusers = useCallback(async () => {
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
    fetchusers();
  }, [fetchusers]);

  useEffect(() => {
    if (updatedProfile) {
      fetchusers();
      setUpdatedProfile(false);
    }
  }, [fetchusers, updatedProfile]);
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
                    {defaultProfileUri ? (
                      <img
                        width={0}
                        height={0}
                        alt="profile"
                        src={
                          profileUri
                            ? URL.createObjectURL(profileUri)
                            : defaultProfileUri
                            ? process.env.NEXT_PUBLIC_HOST + defaultProfileUri
                            : defaultProfile
                        }
                        className="w-[127px] h-[127px] "
                      />
                    ) : (
                      <Image
                        width={0}
                        height={0}
                        alt="profile"
                        src={defaultProfile}
                        className="w-[127px] h-[127px] "
                      />
                    )}

                    {profileUri && (
                      <GiCancel
                        className="absolute top-0 right-0 text-red-500 text-lg cursor-pointer"
                        onClick={() => setProfileUri(null)}
                      />
                    )}
                  </div>
                  {validations &&
                    validations.map(
                      (validation, index) =>
                        validation.name === 'profileUri' && (
                          <p key={index} className="text-sm text-red-500 mt-2">
                            {validation.message}
                          </p>
                        )
                    )}
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
                  <h1 className="text-[13px] font-bold">Nama</h1>
                  <p className="text-[13px] font-normal">{name}</p>
                </div>
                <div>
                  <h1 className="text-[13px] font-bold">Alamat</h1>
                  <p className="text-[13px] font-normal">
                    {address ?? 'Wajib ditulis'}
                  </p>
                </div>
                <button
                  onClick={() => setMenuActive(!menuActive)}
                  className="bg-[#6366F1] text-[16px] font-bold text-white py-[10px] w-full  rounded-lg"
                >
                  Ubah Biodata
                </button>
                <button
                  onClick={() => setAlertLogout(!alertLogout)}
                  className="bg-[#FF3D00] text-[16px] font-bold text-white py-[10px] w-full  rounded-lg"
                >
                  Keluar Akun
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setMenuActive(!menuActive), setUpdatedProfile(true);
        }}
        className={`fixed w-full h-screen backdrop-blur-sm bg-black/20  top-0 left-0 z-50 flex justify-center items-center ${
          menuActive ? '' : 'hidden'
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
                Profile
              </h1>
            </div>
          </div>
          <form onSubmit={onUpdate}>
            <div className=" w-full bg-white rounded-lg relative p-[20px] flex flex-col gap-[43px]">
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
          alertLogout ? '' : 'hidden'
        }`}
        onClick={() => {
          setAlertLogout(!alertLogout);
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

export default ProfilePage;
