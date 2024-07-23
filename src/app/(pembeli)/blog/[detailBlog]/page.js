import React from 'react';
import DetailBlog from '@/components/page/DetailBlog';
import request from '@/utils/request';

export async function generateStaticParams() {
  const posts = await request.get(`/public/blog`).then((res) => res.data.data);
  return posts.map((post) => ({
    detailBlog: post.title.toString(),
  }));
}

const DetailBlogPage = ({ params }) => {
  const { detailBlog } = params;

  return (
    <>
      <DetailBlog params={detailBlog} />
    </>
  );
};

export default DetailBlogPage;
