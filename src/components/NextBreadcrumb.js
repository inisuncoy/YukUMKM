'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const NextBreadcrumb = ({
  separator,
  listClasses,
  activeClasses,
  capitalizeLinks,
  divisionId,
}) => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);
  console.log(pathNames[pathNames.length - 1]);
  return (
    <div className="">
      <nav className="flex " aria-label="Breadcrumb">
        <ol className="flex items-center  text-sm font-medium md:">
          <li className="inline-flex items-center">
            <Link
              href="/beranda"
              className="inline-flex items-center text-[#FE6D00] md:text-[16px] text-[12px]"
            >
              Beranda
            </Link>
          </li>

          {pathNames.map((link, index) => {
            let itemLink = link;
            let href = `/${pathNames.slice(0, index + 1).join('/')}`;

            if (capitalizeLinks) {
              itemLink = link[0].toUpperCase() + link.slice(1);
            }

            return (
              <React.Fragment key={index}>
                {pathNames.length > 0 && separator}
                <li>
                  <div className="flex items-center">
                    <Link
                      href={href}
                      className={`ml-1 ${
                        pathNames[pathNames.length - 1].toUpperCase() ==
                        itemLink.toUpperCase()
                          ? 'text-black'
                          : 'text-[#FE6D00]'
                      } hover:text-primary-600 md:ml-2 md:text-[16px] text-[12px]`}
                    >
                      {decodeURIComponent(itemLink)}
                    </Link>
                  </div>
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default NextBreadcrumb;
