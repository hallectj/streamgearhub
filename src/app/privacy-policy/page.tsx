import { Metadata } from 'next';
import MainLayout from '@/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | StreamGearHub',
  description: 'Our privacy policy explains how we handle information on StreamGearHub.',
};

export default function PrivacyPolicyPage() {
  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              Welcome to StreamGearHub ("we," "our," or "us"). This privacy policy explains how we handle information when you visit our website. 
              StreamGearHub is primarily an informational website that provides reviews, guides, and recommendations for streaming equipment and setups.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p>
              StreamGearHub does not directly collect personal information from visitors. We do have access to standard analytics 
              metadata that may include:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Geographic information (countries/regions where visitors are located)</li>
              <li>Pages accessed on our site</li>
              <li>Time spent on the site</li>
              <li>Referring websites</li>
              <li>Browser types and devices used</li>
            </ul>
            <p className="mt-4">
              This anonymous metadata helps us understand our audience and improve our content. We do not have the ability 
              to identify individual users through this information.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Affiliate Links</h2>
            <p>
              StreamGearHub is monetized through affiliate links. When you click on these links and make a purchase, 
              we may earn a commission at no additional cost to you. These affiliate relationships do not influence our 
              reviews or recommendations.
            </p>
            <p className="mt-2">
              When you click on affiliate links, you will be redirected to third-party websites (such as Amazon) 
              that have their own privacy policies and data collection practices. We encourage you to review the 
              privacy policies of these third-party sites.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Future Comment System</h2>
            <p>
              We plan to implement Disqus for comment functionality in the future. When this feature is added, 
              visitors who choose to leave comments will interact directly with Disqus, which will collect and 
              process information according to their own privacy policy. This will be the only way visitors can 
              voluntarily provide information on our site.
            </p>
            <p className="mt-2">
              We will update this privacy policy when the Disqus comment system is implemented.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
            <p>
              Our website contains links to external sites that are not operated by us. We have no control over the 
              content and practices of these sites and cannot accept responsibility for their respective privacy policies.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time, particularly when we implement new features. 
              We will notify you of any changes by posting the new Privacy Policy on this page and updating the 
              "Last updated" date.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:hallectj@gmail.com" className="text-primary hover:underline">hallectj@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}