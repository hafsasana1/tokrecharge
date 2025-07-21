import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import { HeaderAd, FooterAd } from '@/components/ads/AdSenseAd';
import { FileText, AlertTriangle, CheckCircle, XCircle, Scale } from 'lucide-react';

export default function TermsOfServicePage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service - TokRecharge.com",
    "description": "Terms of service for TokRecharge.com - Legal terms and conditions for using our TikTok coin calculator tools",
    "url": "https://tokrecharge.com/terms"
  };

  return (
    <>
      <SEOHead 
        title="Terms of Service - TokRecharge.com | Legal Terms & Conditions"
        description="Read the terms of service for TokRecharge.com. Legal terms and conditions governing the use of our TikTok coin calculator tools and website."
        keywords="terms of service, legal terms, conditions, tokrecharge terms, user agreement"
        canonical="https://tokrecharge.com/terms"
        schemaData={schemaData}
      />
      
      <Header />
      
      <HeaderAd pageType="legal" />
      
      <Breadcrumb items={[{ label: 'Terms of Service', href: '/terms' }]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <FileText className="w-16 h-16 text-purple-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-xl mb-8 text-gray-600 max-w-3xl mx-auto">
              Please read these terms carefully before using our TikTok coin calculator tools and services.
            </p>
            <p className="text-sm text-gray-500">Last updated: January 2025</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Acceptance */}
          <div className="mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-8 h-8 text-green-600 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Acceptance of Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing and using TokRecharge.com ("Service"), you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>
            </div>
          </div>

          {/* Service Description */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <Scale className="w-6 h-6 text-purple-600 mr-3" />
              Service Description
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-lg border">
              <p className="text-gray-600 mb-4">
                TokRecharge.com provides free online calculators and tools for TikTok-related calculations, including but not limited to:
              </p>
              <ul className="grid md:grid-cols-2 gap-2 text-gray-600 mb-6">
                <li>• TikTok coin value calculations</li>
                <li>• Gift value estimations</li>
                <li>• Creator earnings calculators</li>
                <li>• Recharge price comparisons</li>
                <li>• Country-specific pricing information</li>
                <li>• Educational content and guides</li>
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Important Disclaimer</p>
                    <p className="text-yellow-700 text-sm mt-1">
                      TokRecharge.com is not affiliated with, endorsed by, or sponsored by TikTok or ByteDance Ltd. 
                      We provide independent calculation tools based on publicly available information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Obligations */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">User Obligations</h2>
            <div className="space-y-6">
              <div className="bg-white border-l-4 border-green-500 p-6 rounded-r-xl shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Acceptable Use
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Use the service for lawful purposes only</li>
                  <li>• Provide accurate information when using calculators</li>
                  <li>• Respect intellectual property rights</li>
                  <li>• Do not attempt to reverse engineer our tools</li>
                  <li>• Use reasonable judgment when relying on calculations</li>
                </ul>
              </div>

              <div className="bg-white border-l-4 border-red-500 p-6 rounded-r-xl shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                  <XCircle className="w-5 h-5 text-red-600 mr-2" />
                  Prohibited Activities
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Attempting to hack, disrupt, or damage the service</li>
                  <li>• Using automated tools to scrape data</li>
                  <li>• Impersonating TokRecharge.com or its representatives</li>
                  <li>• Spreading malware or harmful content</li>
                  <li>• Violating any applicable laws or regulations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Accuracy and Disclaimers */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Accuracy and Disclaimers</h2>
            <div className="bg-orange-50 rounded-xl p-8 border border-orange-200">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-8 h-8 text-orange-600 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-4">Information Accuracy</h3>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      While we strive to provide accurate and up-to-date information, TokRecharge.com makes no warranties 
                      about the completeness, reliability, and accuracy of this information.
                    </p>
                    <ul className="space-y-2 pl-4">
                      <li>• Exchange rates and pricing may fluctuate</li>
                      <li>• TikTok may change their policies without notice</li>
                      <li>• Regional variations may apply</li>
                      <li>• Calculations are estimates, not guarantees</li>
                    </ul>
                    <p>
                      <strong>Important:</strong> Always verify critical financial decisions with official TikTok sources.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Limitation of Liability</h2>
            <div className="bg-white rounded-xl p-8 shadow-lg border">
              <p className="text-gray-600 mb-4">
                To the fullest extent permitted by applicable law, TokRecharge.com shall not be liable for any 
                indirect, incidental, special, or consequential damages arising from:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <ul className="space-y-2 text-gray-600">
                  <li>• Use of our calculators and tools</li>
                  <li>• Reliance on provided information</li>
                  <li>• Service interruptions or downtime</li>
                  <li>• Data loss or corruption</li>
                </ul>
                <ul className="space-y-2 text-gray-600">
                  <li>• Third-party actions or services</li>
                  <li>• Financial losses or missed opportunities</li>
                  <li>• Technical errors or malfunctions</li>
                  <li>• Unauthorized access to user data</li>
                </ul>
              </div>
              <p className="text-gray-600 font-medium">
                Our total liability, if any, shall not exceed the amount you paid to use our services (which is currently zero, as our services are free).
              </p>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Intellectual Property Rights</h2>
            <div className="bg-purple-50 rounded-xl p-8 border border-purple-200">
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Our Content:</strong> All content, features, and functionality on TokRecharge.com, including but not limited to 
                  text, graphics, logos, button icons, images, audio clips, data compilations, and software, are owned by 
                  TokRecharge.com or its licensors and are protected by copyright and other intellectual property laws.
                </p>
                <p>
                  <strong>Your Content:</strong> You retain ownership of any content you submit through our contact forms or feedback systems. 
                  By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, modify, and 
                  display such content for the purpose of providing and improving our services.
                </p>
                <p>
                  <strong>Third-Party Trademarks:</strong> TikTok, ByteDance, and related trademarks are owned by their respective companies. 
                  We use these marks solely for descriptive and informational purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Privacy and Data Protection</h2>
            <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our collection, use, and protection of your personal information 
                is governed by our Privacy Policy, which is incorporated into these Terms of Service by reference.
              </p>
              <p className="text-gray-700">
                By using our service, you consent to the collection and use of information in accordance with our 
                <a href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium ml-1">Privacy Policy</a>.
              </p>
            </div>
          </div>

          {/* Service Availability */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Service Availability</h2>
            <div className="bg-white rounded-xl p-8 shadow-lg border">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Service Uptime</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    We strive to maintain high service availability but do not guarantee uninterrupted access.
                  </p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Scheduled maintenance may cause temporary downtime</li>
                    <li>• Third-party service dependencies may affect availability</li>
                    <li>• Force majeure events may disrupt service</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Service Modifications</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    We reserve the right to modify, suspend, or discontinue any part of our service at any time.
                  </p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• New features may be added</li>
                    <li>• Existing features may be modified or removed</li>
                    <li>• We will provide reasonable notice when possible</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Termination */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Termination</h2>
            <div className="bg-red-50 rounded-xl p-8 border border-red-200">
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your access to our service immediately, without prior notice or liability, 
                for any reason, including breach of these Terms of Service.
              </p>
              <p className="text-gray-700">
                Upon termination, your right to use the service will cease immediately. All provisions of these terms 
                that should survive termination shall survive, including intellectual property rights, warranty disclaimers, 
                and limitation of liability.
              </p>
            </div>
          </div>

          {/* Governing Law */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Governing Law and Jurisdiction</h2>
            <div className="bg-white rounded-xl p-8 shadow-lg border">
              <p className="text-gray-600 mb-4">
                These Terms of Service shall be governed by and construed in accordance with the laws of the United States, 
                without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-600">
                Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction 
                of the courts located in the United States.
              </p>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className="mb-12 bg-yellow-50 rounded-xl p-8 border border-yellow-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these terms at any time. Changes will be posted on this page with an 
              updated revision date. Your continued use of the service after changes are posted constitutes acceptance 
              of the modified terms.
            </p>
            <p className="text-gray-700">
              We encourage you to review these terms periodically for any changes.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
            <p className="mb-4 opacity-90">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> legal@tokrecharge.com</p>
              <p><strong>Subject:</strong> Terms of Service Inquiry</p>
            </div>
          </div>

        </div>
      </section>

      <FooterAd pageType="legal" />
      
      <Footer />
    </>
  );
}