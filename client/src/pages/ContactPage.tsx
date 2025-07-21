import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import { HeaderAd, FooterAd } from '@/components/ads/AdSenseAd';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Clock, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - could integrate with email service
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact TokRecharge.com",
    "description": "Get in touch with the TokRecharge.com team for support, partnerships, or feedback about our TikTok coin calculator tools",
    "url": "https://tokrecharge.com/contact"
  };

  return (
    <>
      <SEOHead 
        title="Contact Us - TokRecharge.com | Get Support & Share Feedback"
        description="Contact the TokRecharge.com team for support with our TikTok coin calculators, report issues, suggest features, or explore partnership opportunities."
        keywords="contact tokrecharge, tiktok calculator support, feedback, partnership, help"
        canonical="https://tokrecharge.com/contact"
        schemaData={schemaData}
      />
      
      <Header />
      
      <HeaderAd pageType="contact" />
      
      <Breadcrumb items={[{ label: 'Contact Us', href: '/contact' }]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl mb-8 text-gray-600 max-w-3xl mx-auto">
              We're here to help! Reach out with questions, feedback, or suggestions about our TikTok monetization tools.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What's this about?"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    required
                    className="w-full"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Get in Touch</h2>
                <p className="text-lg text-gray-600 mb-8">
                  We'd love to hear from you! Whether you have questions, feedback, or need support with our tools, 
                  we're here to help make your TikTok monetization journey successful.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
                  <Mail className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Email Support</h3>
                    <p className="text-gray-600 mb-1">For general inquiries and support:</p>
                    <a href="mailto:support@tokrecharge.com" className="text-purple-600 hover:text-purple-700 font-medium">
                      support@tokrecharge.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <Clock className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Response Time</h3>
                    <p className="text-gray-600">We typically respond within 24-48 hours during business days.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                  <MapPin className="w-6 h-6 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Global Service</h3>
                    <p className="text-gray-600">
                      We serve creators worldwide with accurate TikTok coin pricing and calculations for all supported countries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-2">Are your coin calculations accurate?</h3>
              <p className="text-gray-600">
                Yes! We update our exchange rates regularly and provide accurate calculations based on official TikTok pricing for each country.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-2">Do you offer API access for developers?</h3>
              <p className="text-gray-600">
                We're currently working on API access for developers. Contact us to express interest and get early access when available.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-2">How can I report incorrect information?</h3>
              <p className="text-gray-600">
                Please use the contact form above to report any incorrect pricing or calculations. We'll investigate and update immediately.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-2">Can I suggest new features or tools?</h3>
              <p className="text-gray-600">
                Absolutely! We love hearing feature suggestions from our users. Send us your ideas and we'll consider them for future updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterAd pageType="contact" />
      
      <Footer />
    </>
  );
}