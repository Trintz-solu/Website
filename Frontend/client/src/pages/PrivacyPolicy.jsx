import PageLayout from '@/components/layout/page-layout';

export default function PrivacyPolicy() {
  return (
    <PageLayout>
      <section className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-300 leading-relaxed mb-6">
          Trintz Solutions does not collect, store, or share any personal data, cookies, or analytics from users of this website.
        </p>
        <p className="text-gray-300 leading-relaxed">
          If we introduce any data collection in the future, this policy will be updated to clearly explain what data is collected and how it is used.
        </p>
      </section>
    </PageLayout>
  );
}


