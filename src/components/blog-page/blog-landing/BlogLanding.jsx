import React from "react";
import '@styles/blog/BlogLanding.css'
import BlogLandingData from "@api/blog/BlogLandingData";
import BlogSingleData from "@api/blog/BlogSingleData";
import Link from "next/link";
import Image from "next/image";


export default function BlogLanding(){
    return(
        <main>
            <div className="blog-landing-page">
                <div className="blog-landing-container">

                    {BlogSingleData.slice(0,1).map((item,index)=>
                        <div className="blog-landing-banner" key={index}>
                            <div className="blog-landing-banner-image">
                                <Image src={item.image} alt={item.alt} />
                            </div>
                            <div className="blog-landing-banner-content">
                                <h1>{item.title}</h1>
                                <p>{item.metaDescription}</p>
                                <div className="blog-landing-banner-author">
                                    <p>By <strong>Suthersun</strong></p>
                                    <span>|</span>
                                    <p>{item.date}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="blog-landing-content">

                        {BlogSingleData.map((item,index)=>
                    
                        <div className="blog-landing-card" key={index}>
                            
                            <Link href={`/blogs/${item.id}`}  className="blog-landing-card-inner">
                            <div className="blog-landing-card-image" >
                                <Image src={item.image} alt={item.alt} height="max-content"/>
                            </div>
                            <div className="blog-landing-card-content">
                            {/* <div className="blog-landing-card-category">
                                <h1>{item.category}</h1>
                                <p>{item.read}</p>
                            </div> */}
                            <div className="blog-landing-card-heading">
                                <h1>{item.title}</h1>
                            </div>
                            <div className="blog-landing-card-description">
                            <p>
                            {item.metaDescription}
                            {/* {item.description.split(' ').slice(0, 15).join(' ')}{item.description.split(' ').length > 15 ? '...' : ''} */}
                            </p>
                            </div>
                            <div className="blog-landing-card-author">
                                <p>{item.author}</p>
                                <p>{item.date}</p>
                            </div>
                            </div>
                            </Link>
                        </div>
                        
                        )}
                    </div>    
                </div>
            </div>
        </main>
    )
}
