import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import { HeaderAd, FooterAd } from '@/components/ads/AdSenseAd';
import { Shield, Eye, Lock, Database, UserCheck, Globe } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - TokRecharge.com",
    "description": "Privacy policy for TokRecharge.com - Learn how we protect your data while using our TikTok coin calculator tools",
    "url": "https://tokrecharge.com/privacy"
  };

  return (
    <>
      <SEOHead 
        title="Privacy Policy - TokRecharge.com | Your Data Protection"
        description="Read TokRecharge.com's privacy policy to understand how we collect, use, and protect your information when using our TikTok coin calculator tools."
        keywords="privacy policy, data protection, tokrecharge privacy, user data, security"
        canonical="https://tokrecharge.com/privacy"
        schemaData={schemaData}
      />
      
      <Header />
      
      <HeaderAd pageType="legal" />
      
      <Breadcrumb items={[{ label: 'Privacy Policy', href: '/privacy' }]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 text-purple-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl mb-8 text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500">Last updated: January 2025</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Overview */}
          <div className="mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <Eye className="w-8 h-8 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Overview</h2>
                <p className="text-gray-600 leading-relaxed">
                  TokRecharge.com ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                  explains how we collect, use, disclose, and safeguard your information when you visit our website 
                  and use our TikTok coin calculator tools.
                </p>
              </div>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Database className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white border-l-4 border-purple-500 p-6 rounded-r-xl shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-3">Information You Provide</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Contact information when you reach out to us (name, email)</li>
                  <li>• Calculator inputs (coin amounts, country selections) - used only for calculations</li>
                  <li>• Feedback and suggestions you submit</li>
                </ul>
              </div>

              <div className="bg-white border-l-4 border-blue-500 p-6 rounded-r-xl shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-3">Automatically Collected Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Device information (browser type, operating system)</li>
                  <li>• Usage data (pages visited, time spent, features used)</li>
                  <li>• IP address and location data (country/region level only)</li>
                  <li>• Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <UserCheck className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg border">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Service Provision</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Provide accurate coin calculations</li>
                    <li>• Deliver country-specific pricing</li>
                    <li>• Maintain and improve our tools</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Communication</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Respond to your inquiries</li>
                    <li>• Send important service updates</li>
                    <li>• Provide customer support</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Analytics</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Analyze website usage patterns</li>
                    <li>• Improve user experience</li>
                    <li>• Optimize our tools and features</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Legal Compliance</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Comply with applicable laws</li>
                    <li>• Protect against fraud</li>
                    <li>• Enforce our terms of service</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Data Sharing */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-800">Information Sharing</h2>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 border border-orange-200">
              <p className="text-gray-700 mb-4 font-medium">We do not sell, trade, or rent your personal information to third parties. We may share information only in these limited circumstances:</p>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Service Providers:</strong> Trusted third parties who help us operate our website (hosting, analytics)</li>
                <li>• <strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li>• <strong>Business Transfers:</strong> In the event of a merger or acquisition</li>
                <li>• <strong>Consent:</strong> When you explicitly agree to share information</li>
              </ul>
            </div>
          </div>

          {/* Data Security */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-800">Data Security</h2>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg border">
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational security measures to protect your information:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-semibold text-gray-800">Technical Measures:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• SSL/TLS encryption</li>
                    <li>• Secure data transmission</li>
                    <li>• Regular security updates</li>
                    <li>• Access controls</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-800">Organizational Measures:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Employee training</li>
                    <li>• Privacy by design</li>
                    <li>• Incident response procedures</li>
                    <li>• Regular security audits</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Cookies and Tracking</h2>
            <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your experience. These include:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Essential Cookies:</strong> Required for basic website functionality</li>
                <li>• <strong>Analytics Cookies:</strong> Help us understand how you use our site</li>
                <li>• <strong>Preference Cookies:</strong> Remember your settings and choices</li>
              </ul>
              <p className="text-gray-600 mt-4 text-sm">
                You can control cookies through your browser settings, though some features may not work properly if disabled.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Privacy Rights</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <h3 className="font-bold text-lg text-gray-800 mb-3">Access & Portability</h3>
                <p className="text-gray-600 text-sm">
                  Request a copy of your personal data and receive it in a structured format.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <h3 className="font-bold text-lg text-gray-800 mb-3">Correction</h3>
                <p className="text-gray-600 text-sm">
                  Request correction of inaccurate or incomplete personal information.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <h3 className="font-bold text-lg text-gray-800 mb-3">Deletion</h3>
                <p className="text-gray-600 text-sm">
                  Request deletion of your personal data, subject to legal requirements.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <h3 className="font-bold text-lg text-gray-800 mb-3">Opt-Out</h3>
                <p className="text-gray-600 text-sm">
                  Opt out of certain data processing activities and marketing communications.
                </p>
              </div>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="mb-12 bg-yellow-50 rounded-xl p-8 border border-yellow-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Children's Privacy</h2>
            <p className="text-gray-700">
              Our services are not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If you believe we have collected information from 
              a child under 13, please contact us immediately.
            </p>
          </div>

          {/* International Users */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">International Data Transfers</h2>
            <p className="text-gray-600 mb-4">
              If you are accessing our services from outside the United States, your information may be 
              transferred to, stored, and processed in the United States or other countries where our 
              service providers operate.
            </p>
            <p className="text-gray-600">
              We ensure appropriate safeguards are in place to protect your information in accordance 
              with applicable privacy laws.
            </p>
          </div>

          {/* Changes to Policy */}
          <div className="mb-12 bg-purple-50 rounded-xl p-8 border border-purple-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any material 
              changes by posting the new Privacy Policy on this page and updating the "Last updated" date. 
              Your continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us About Privacy</h2>
            <p className="mb-4 opacity-90">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> privacy@tokrecharge.com</p>
              <p><strong>Subject:</strong> Privacy Policy Inquiry</p>
            </div>
          </div>

        </div>
      </section>

      <FooterAd pageType="legal" />
      
      <Footer />
    </>
  );
}