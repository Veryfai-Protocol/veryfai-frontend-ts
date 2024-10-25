import Script from 'next/script';

const GoogleAnalytics = () => (
  <>
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-CGZDTB9YJF"
    ></Script>
    <Script id="google-analytics">
      {`
      window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-CGZDTB9YJF');
    `}
    </Script>
  </>
);
export default GoogleAnalytics;
