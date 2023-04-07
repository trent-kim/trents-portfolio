import React from "react"
import Head from 'next/head';

const Seo = () => {

  return (
    <Head>
      <title>Trent Kim</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta property="og:title" content="Trent Kim"/>
      <meta name="twitter:title" content="Trent Kim"/>
      <meta itemProp="name" content="Trent Kim"/>
      <meta name="application-name" content="Trent Kim"/>
      <meta name="og:site_name" content="Trent Kim"/> 
      <link rel="icon" type="image/png" href='https://trentkim.space/favicon.ico'/>
      <meta property="og:image" href="https://trentkim.space/share.png"/>
      <meta property="og:image:secure_url" content="https://trentkim.space/share.png" /> 
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="I'm web designer and developer currently based in my hometown, Pittsgrove, NJ." />
      <meta property="og:description" content="I'm web designer and developer currently based in my hometown, Pittsgrove, NJ."/>  
      <meta property="og:locale" content="en_US"/>
      <meta property="og:type" content="website"/>
      <meta property="og:url" content="https://trentkim.space"/> 
      <link rel="canonical" href="https://trentkim.space"/> 
      <meta name="theme-color" content="#F5F5F5"/> 
      <meta property="og:image:alt" content="Trent Kim"/> 
      <meta name="robots" content="index,follow"/>
    </Head>
  )

}

export default Seo