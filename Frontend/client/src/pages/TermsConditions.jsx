import PageLayout from '@/components/layout/page-layout';

export default function TermsConditions() {
  return (
    <PageLayout>
      <section className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Terms & Conditions</h1>
        <ul className="space-y-4 text-gray-300 leading-relaxed list-disc pl-6">
          <li>All website content (text, logos, images) belongs to Trintz Solutions.</li>
          <li>Users are not allowed to copy or misuse content without permission.</li>
          <li>Trintz Solutions is not responsible for misuse of the information available on the site.</li>
          <li>This website is provided for informational purposes only.</li>
          <li>
            We also build interactive and AI-driven solutions designed to automate work and reduce
            repetitive tasks. Our goal is to provide optimized and humanized applications that make
            processes easier and more efficient for our clients.
          </li>
        </ul>
      </section>
    </PageLayout>
  );
}


