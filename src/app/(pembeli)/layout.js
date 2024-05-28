'use client';
import Link from 'next/link';
import React, { useState } from 'react';

import { FaUser } from 'react-icons/fa6';

const PembeliLayout = ({ children }) => {
  const [navBtn, setNavBtn] = useState(false);
  return (
    <div>
      <nav className="bg-[#1D1D1D] border-gray-200 fixed w-full top-0">
        <div className="max-w-full flex flex-wrap items-center justify-between  py-4 px-[26px]">
          <Link
            href="/beranda"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <svg
              width="39"
              height="23"
              viewBox="0 0 39 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0H2.03591L3.99627 3.70243H4.08022L6.04058 0H8.07649L4.94076 5.55784V8.59702H3.13573V5.55784L0 0Z"
                fill="white"
              />
              <path
                d="M12.6972 5.85168V2.14925H14.4854V8.59702H12.7685V7.42584H12.7014C12.5559 7.80364 12.3138 8.10728 11.9752 8.33675C11.6393 8.56623 11.2294 8.68097 10.7452 8.68097C10.3142 8.68097 9.93505 8.58302 9.60763 8.38713C9.2802 8.19123 9.02414 7.91278 8.83944 7.55177C8.65753 7.19077 8.56518 6.7584 8.56238 6.25466V2.14925H10.3506V5.93563C10.3534 6.31623 10.4556 6.61707 10.6571 6.83815C10.8586 7.05924 11.1286 7.16978 11.4672 7.16978C11.6827 7.16978 11.8842 7.1208 12.0717 7.02285C12.2592 6.92211 12.4103 6.77379 12.5251 6.57789C12.6426 6.382 12.7 6.13993 12.6972 5.85168Z"
                fill="white"
              />
              <path
                d="M17.5361 6.7416L17.5403 4.59655H17.8006L19.8659 2.14925H21.9186L19.1439 5.38993H18.7199L17.5361 6.7416ZM15.9158 8.59702V0H17.7041V8.59702H15.9158ZM19.9457 8.59702L18.0483 5.78871L19.2404 4.52519L22.0403 8.59702H19.9457Z"
                fill="white"
              />
              <path
                d="M24.9326 0L24.7689 6.01959H23.2325L23.0646 0H24.9326ZM24.0007 8.70616C23.7236 8.70616 23.4858 8.60821 23.2871 8.41231C23.0884 8.21362 22.9904 7.97575 22.9932 7.69869C22.9904 7.42444 23.0884 7.18937 23.2871 6.99347C23.4858 6.79757 23.7236 6.69963 24.0007 6.69963C24.2666 6.69963 24.5002 6.79757 24.7017 6.99347C24.9032 7.18937 25.0054 7.42444 25.0082 7.69869C25.0054 7.8834 24.9564 8.05271 24.8612 8.20662C24.7689 8.35774 24.6472 8.47948 24.496 8.57183C24.3449 8.66138 24.1798 8.70616 24.0007 8.70616Z"
                fill="white"
              />
              <path
                d="M5.8139 14.2836H7.63153V19.8666C7.63153 20.4935 7.48181 21.042 7.18237 21.5121C6.88573 21.9823 6.47015 22.3489 5.93563 22.6119C5.40112 22.8722 4.77845 23.0023 4.06763 23.0023C3.35401 23.0023 2.72994 22.8722 2.19543 22.6119C1.66091 22.3489 1.24534 21.9823 0.948694 21.5121C0.652052 21.042 0.503731 20.4935 0.503731 19.8666V14.2836H2.32136V19.7113C2.32136 20.0387 2.39272 20.3298 2.53545 20.5844C2.68097 20.8391 2.88526 21.0392 3.14832 21.1847C3.41138 21.3302 3.71782 21.403 4.06763 21.403C4.42024 21.403 4.72668 21.3302 4.98694 21.1847C5.25 21.0392 5.45289 20.8391 5.59562 20.5844C5.74114 20.3298 5.8139 20.0387 5.8139 19.7113V14.2836Z"
                fill="white"
              />
              <path
                d="M9.12698 14.2836H11.3686L13.7361 20.0597H13.8369L16.2044 14.2836H18.446V22.8806H16.683V17.285H16.6116L14.3868 22.8386H13.1862L10.9614 17.264H10.89V22.8806H9.12698V14.2836Z"
                fill="white"
              />
              <path
                d="M19.9436 22.8806V14.2836H21.7612V18.0742H21.8745L24.9683 14.2836H27.1469L23.9566 18.1329L27.1847 22.8806H25.0103L22.6553 19.3461L21.7612 20.4375V22.8806H19.9436Z"
                fill="white"
              />
              <path
                d="M28.0935 14.2836H30.3351L32.7027 20.0597H32.8034L35.1709 14.2836H37.4125V22.8806H35.6495V17.285H35.5781L33.3533 22.8386H32.1528L29.9279 17.264H29.8566V22.8806H28.0935V14.2836Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M33.9528 0.549467L37.8709 4.46758C38.1114 4.70801 38.1114 5.09783 37.8709 5.33827L33.9528 9.25638C33.7124 9.49681 33.3226 9.49681 33.0821 9.25638C32.8417 9.01594 32.8417 8.62612 33.0821 8.38569L35.9492 5.51859H29.8013V4.28725H35.9492L33.0821 1.42016C32.8417 1.17972 32.8417 0.789901 33.0821 0.549467C33.3226 0.309032 33.7124 0.309032 33.9528 0.549467Z"
                fill="#FE6D00"
              />
            </svg>
          </Link>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            onClick={() => setNavBtn(!navBtn)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              navBtn ? 'block' : 'hidden'
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg  md:flex-row md:items-center md:gap-[69px]  md:mt-0 md:border-0 ">
              <li>
                <Link
                  href="/beranda"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 "
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/toko"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 "
                >
                  Toko
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 "
                >
                  Blog
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="hidden  py-2 px-3 text-white rounded hover:bg-gray-100 md:block md:hover:bg-transparent md:border-0 md:p-0 "
                >
                  <FaUser className="text-[#FE6D00]" />
                </button>
                <Link
                  href="/login"
                  className="block w-full py-2 px-3 text-white bg-[#FE6D00] rounded md:hidden"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div>
        <div className="mt-[94px] md:mt-[78px]" />
        <div className="px-[189px]">{React.cloneElement(children)}</div>
      </div>
    </div>
  );
};

export default PembeliLayout;
