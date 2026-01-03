import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaShieldAlt, FaLock, FaUserShield, FaCookie, FaEnvelope } from 'react-icons/fa';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-24">
            <Helmet>
                <title>Privacy Policy - Ganesh Yeole Builders & Developers</title>
                <meta name="description" content="Privacy Policy for Ganesh Yeole Builders & Developers. Learn how we collect, use, and protect your personal information." />
                <meta name="robots" content="index, follow" />
            </Helmet>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
                        <FaShieldAlt className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Last Updated: January 4, 2026
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 space-y-8">

                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FaUserShield className="text-amber-600" />
                            Introduction
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Ganesh Yeole Builders & Developers ("we," "our," or "us") is committed to protecting your privacy.
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
                            visit our website or engage with our services. Please read this privacy policy carefully. If you do
                            not agree with the terms of this privacy policy, please do not access the site.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            1. Information We Collect
                        </h2>

                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
                            1.1 Personal Information
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            We may collect personal information that you voluntarily provide to us when you:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                            <li>Fill out contact forms or inquiry forms</li>
                            <li>Request property information or brochures</li>
                            <li>Schedule site visits or meetings</li>
                            <li>Subscribe to our newsletter or updates</li>
                            <li>Register for events or webinars</li>
                            <li>Communicate with us via email or phone</li>
                        </ul>

                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                            This information may include:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                            <li>Name and contact information (email address, phone number, mailing address)</li>
                            <li>Property preferences and requirements</li>
                            <li>Budget and financial information (if provided)</li>
                            <li>Any other information you choose to provide</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
                            1.2 Automatically Collected Information
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            When you visit our website, we may automatically collect certain information about your device, including:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                            <li>IP address and browser type</li>
                            <li>Operating system and device information</li>
                            <li>Pages visited and time spent on pages</li>
                            <li>Referring website addresses</li>
                            <li>Click patterns and navigation paths</li>
                        </ul>
                    </section>

                    {/* How We Use Your Information */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            2. How We Use Your Information
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            We use the information we collect for the following purposes:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                            <li>To respond to your inquiries and provide customer service</li>
                            <li>To send you property information, brochures, and updates</li>
                            <li>To schedule and coordinate site visits and meetings</li>
                            <li>To process and manage property bookings and transactions</li>
                            <li>To send marketing communications about our projects (with your consent)</li>
                            <li>To improve our website and services</li>
                            <li>To analyze website usage and trends</li>
                            <li>To comply with legal obligations and RERA regulations</li>
                            <li>To prevent fraud and ensure security</li>
                        </ul>
                    </section>

                    {/* Cookies and Tracking */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FaCookie className="text-amber-600" />
                            3. Cookies and Tracking Technologies
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are
                            small data files stored on your device. We use:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                            <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                            <li><strong>Analytics Cookies:</strong> To understand how visitors use our website (Google Analytics)</li>
                            <li><strong>Preference Cookies:</strong> To remember your settings and preferences</li>
                            <li><strong>Marketing Cookies:</strong> To deliver relevant advertisements (with your consent)</li>
                        </ul>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                            You can control cookies through your browser settings. However, disabling cookies may affect website functionality.
                        </p>
                    </section>

                    {/* Data Sharing */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            4. How We Share Your Information
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            We do not sell your personal information. We may share your information with:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                            <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our website and conducting our business (e.g., email service providers, analytics providers)</li>
                            <li><strong>Legal Authorities:</strong> When required by law or to protect our rights and safety</li>
                            <li><strong>Business Partners:</strong> With your explicit consent for specific purposes</li>
                            <li><strong>Financial Institutions:</strong> For processing property transactions (with your consent)</li>
                        </ul>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                            All third parties are required to maintain the confidentiality of your information and use it only for the purposes we specify.
                        </p>
                    </section>

                    {/* Data Security */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FaLock className="text-amber-600" />
                            5. Data Security
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We implement appropriate technical and organizational security measures to protect your personal information
                            against unauthorized access, alteration, disclosure, or destruction. These measures include:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-3">
                            <li>Encryption of data in transit and at rest</li>
                            <li>Regular security assessments and updates</li>
                            <li>Access controls and authentication</li>
                            <li>Secure data storage and backup systems</li>
                        </ul>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                            However, no method of transmission over the internet is 100% secure. While we strive to protect your
                            information, we cannot guarantee absolute security.
                        </p>
                    </section>

                    {/* Data Retention */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            6. Data Retention
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this
                            privacy policy, unless a longer retention period is required by law. Generally, we retain:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-3">
                            <li>Customer inquiry data: 3 years from last contact</li>
                            <li>Transaction records: 7 years (as per legal requirements)</li>
                            <li>Marketing communications: Until you unsubscribe</li>
                            <li>Website analytics: 26 months (Google Analytics default)</li>
                        </ul>
                    </section>

                    {/* Your Rights */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            7. Your Rights
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            Under applicable data protection laws, you have the following rights:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                            <li><strong>Access:</strong> Request a copy of your personal information</li>
                            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                            <li><strong>Objection:</strong> Object to processing of your personal information</li>
                            <li><strong>Restriction:</strong> Request restriction of processing</li>
                            <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                            <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications at any time</li>
                        </ul>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                            To exercise these rights, please contact us using the information provided below.
                        </p>
                    </section>

                    {/* Third-Party Links */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            8. Third-Party Websites
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Our website may contain links to third-party websites (e.g., social media platforms, RERA website,
                            Google Maps). We are not responsible for the privacy practices of these websites. We encourage you to
                            review their privacy policies before providing any personal information.
                        </p>
                    </section>

                    {/* Children's Privacy */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            9. Children's Privacy
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal
                            information from children. If you believe we have collected information from a child, please contact us
                            immediately.
                        </p>
                    </section>

                    {/* International Transfers */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            10. International Data Transfers
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Your information may be transferred to and processed in countries other than India, including countries
                            where our service providers are located. We ensure appropriate safeguards are in place to protect your
                            information in accordance with this privacy policy.
                        </p>
                    </section>

                    {/* Changes to Policy */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            11. Changes to This Privacy Policy
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We may update this privacy policy from time to time to reflect changes in our practices or legal requirements.
                            We will notify you of any material changes by posting the new privacy policy on this page and updating the
                            "Last Updated" date. We encourage you to review this policy periodically.
                        </p>
                    </section>

                    {/* Contact Information */}
                    <section className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FaEnvelope className="text-amber-600" />
                            12. Contact Us
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            If you have any questions, concerns, or requests regarding this privacy policy or our data practices,
                            please contact us:
                        </p>
                        <div className="space-y-2 text-gray-700 dark:text-gray-300">
                            <p><strong>Ganesh Yeole Builders & Developers</strong></p>
                            <p>P. No. 14, Sneh Prasad, Vighnaharta Colony</p>
                            <p>Khutwad Nagar, Nashik - 422008, Maharashtra, India</p>
                            <p>Email: <a href="mailto:ganeshyeolebuilders@gmail.com" className="text-amber-600 hover:text-amber-700">ganeshyeolebuilders@gmail.com</a></p>
                            <p>Phone: <a href="tel:+917030502111" className="text-amber-600 hover:text-amber-700">+91 70305 02111</a></p>
                        </div>
                    </section>

                    {/* Governing Law */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            13. Governing Law
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            This privacy policy is governed by and construed in accordance with the laws of India. Any disputes
                            arising from this policy shall be subject to the exclusive jurisdiction of the courts in Nashik, Maharashtra.
                        </p>
                    </section>

                    {/* Consent */}
                    <section className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            By using our website and services, you acknowledge that you have read and understood this privacy policy
                            and agree to the collection, use, and disclosure of your information as described herein.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
