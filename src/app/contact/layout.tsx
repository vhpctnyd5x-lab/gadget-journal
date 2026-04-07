import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ | Gadget Journal',
  description: 'Gadget Journalへのお問い合わせページです。ご質問・ご意見・取材・コラボレーションのご依頼など、お気軽にご連絡ください。',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
