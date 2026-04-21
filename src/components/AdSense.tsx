import Script from 'next/script';

interface AdSenseProps {
  slot?: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
}

export function AdSenseDisplay({ slot = '', format = 'auto', responsive = true, style }: AdSenseProps) {
  return (
    <>
      <div
        className="my-6"
        style={style}
      >
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            ...(responsive ? { width: '100%', height: 'auto' } : {}),
          }}
          data-ad-client="ca-pub-2381870019821878"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
      <Script id={`adsbygoogle-${slot}`} strategy="lazyOnload">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </>
  );
}

export function AdSenseArticle() {
  return <AdSenseDisplay slot="7392841562" format="auto" />;
}

export function AdSenseInArticle() {
  return <AdSenseDisplay slot="9528462318" format="auto" />;
}

export function AdSenseSidebar() {
  return <AdSenseDisplay slot="2847563014" format="vertical" />;
}
