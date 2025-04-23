import { ImageResponse } from 'next/og'
import BlogSingleData from '@api/blog/BlogSingleData';
 

export const alt = ''
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'


export default async function Image({ params }) {
    const id= params.slug;
    const product = BlogSingleData.find(blog => blog.id === id);
   
    return new ImageResponse(
      (
       
<ImageResponse src={product.metaImage} alt="img"/>

      ),
      {
        ...size,
      }
    )
  }