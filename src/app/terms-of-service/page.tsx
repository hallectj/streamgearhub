import { Metadata } from 'next';
import MainLayout from '@/layouts/MainLayout';
import { SITE_URL } from '@/config/api';

export const metadata: Metadata = {
  title: 'Terms of Service | StreamGearHub',
  description: 'Terms and conditions for using the StreamGearHub website.',
};

export default function TermsOfServicePage() {
  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to StreamGearHub. These Terms of Service govern your use of our website located at 
              {SITE_URL.replace(/^https?:\/\//, '')} (the "Service") and any related services provided by StreamGearHub.
            </p>
            <p className="mt-2">
              By accessing our website, you agree to abide by these Terms of Service and to comply with all applicable 
              laws and regulations. If you do not agree with these Terms of Service, you are prohibited from using or 
              accessing this website or using any other services provided by StreamGearHub.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Content and Intellectual Property</h2>
            <p>
              Unless otherwise noted, all materials including without limitation, articles, reviews, guides, logos, 
              images, illustrations, designs, photographs, video clips, and written and other materials that appear 
              as part of our Service are copyrights, trademarks, service marks, trade dress and/or other intellectual 
              property owned, controlled or licensed by StreamGearHub.
            </p>
            <p className="mt-2">
              Our website name, logo, and all related names, logos, product and service names, designs, and slogans 
              are trademarks of StreamGearHub or its affiliates or licensors. You must not use such marks without the 
              prior written permission of StreamGearHub.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Conduct</h2>
            <p>
              By using our Service, you agree not to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Use our Service in any way that violates any applicable national or international law or regulation.</li>
              <li>Use our Service for the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
              <li>Transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
              <li>Impersonate or attempt to impersonate StreamGearHub, a StreamGearHub employee, another user, or any other person or entity.</li>
              <li>Engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm StreamGearHub or users of the Service or expose them to liability.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. User Comments</h2>
            <p>
              When we implement the Disqus comment system, you may post, upload, publish, submit, or transmit content 
              through the comment section ("User Content"). By providing User Content, you grant us and our affiliates 
              a nonexclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, 
              modify, adapt, publish, translate, create derivative works from, distribute, and display such content 
              throughout the world in any media.
            </p>
            <p className="mt-2">
              You represent and warrant that: (i) you own the content or have the right to use it and grant us the 
              rights and license as provided in these Terms, and (ii) the posting of your User Content does not 
              violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Affiliate Links</h2>
            <p>
              StreamGearHub is a participant in affiliate advertising programs designed to provide a means for sites 
              to earn advertising fees by advertising and linking to retail websites. This means that we may earn a 
              commission if you click on or purchase products through our affiliate links at no additional cost to you.
            </p>
            <p className="mt-2">
              We make every effort to ensure that our recommendations are honest and based on our genuine opinions. 
              However, we are not responsible for the quality of products or services provided by third-party retailers 
              or manufacturers.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Disclaimer of Warranties</h2>
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. StreamGearHub expressly disclaims all 
              warranties of any kind, whether express or implied, including but not limited to the implied warranties 
              of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
            <p className="mt-2">
              StreamGearHub makes no warranty that: (i) the Service will meet your requirements, (ii) the Service will 
              be uninterrupted, timely, secure, or error-free, (iii) the results that may be obtained from the use of 
              the Service will be accurate or reliable, or (iv) the quality of any products, services, information, or 
              other material purchased or obtained by you through the Service will meet your expectations.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p>
              In no event shall StreamGearHub, nor its directors, employees, partners, agents, suppliers, or affiliates, 
              be liable for any indirect, incidental, special, consequential or punitive damages, including without 
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your 
              access to or use of or inability to access or use the Service; (ii) any conduct or content of any third 
              party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or 
              alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) 
              or any other legal theory, whether or not we have been informed of the possibility of such damage.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
              is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What 
              constitutes a material change will be determined at our sole discretion.
            </p>
            <p className="mt-2">
              By continuing to access or use our Service after those revisions become effective, you agree to be bound 
              by the revised terms. If you do not agree to the new terms, please stop using the Service.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the United States, without 
              regard to its conflict of law provisions.
            </p>
            <p className="mt-2">
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those 
              rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining 
              provisions of these Terms will remain in effect.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at: <a href="mailto:hallectj@gmail.com" className="text-primary hover:underline">hallectj@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}