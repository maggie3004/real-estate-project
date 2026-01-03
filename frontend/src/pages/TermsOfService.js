import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaFileContract, FaGavel, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-24">
            <Helmet>
                <title>Terms of Service - Ganesh Yeole Builders & Developers</title>
                <meta name="description" content="Terms of Service for Ganesh Yeole Builders & Developers. Read our terms and conditions for using our website and services." />
                <meta name="robots" content="index, follow" />
            </Helmet>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
                        <FaFileContract className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Last Updated: January 4, 2026
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 space-y-8">

                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Introduction
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Welcome to Ganesh Yeole Builders & Developers. These Terms of Service ("Terms") govern your access to
                            and use of our website, services, and any related applications (collectively, the "Services"). By accessing
                            or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please
                            do not use our Services.
                        </p>
                    </section>

                    {/* Acceptance of Terms */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            By accessing or using our website and services, you acknowledge that you have read, understood, and agree
                            to be bound by these Terms and our Privacy Policy. These Terms constitute a legally binding agreement
                            between you and Ganesh Yeole Builders & Developers.
                        </p>
                    </section>

                    {/* Eligibility */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            2. Eligibility
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            You must be at least 18 years old and legally capable of entering into binding contracts to use our Services.
                            By using our Services, you represent and warrant that you meet these eligibility requirements.
                        </p>
                    </section>

                    {/* Use of Services */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            3. Use of Services
                        </h2>

                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
                            3.1 Permitted Use
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            You may use our Services for lawful purposes only, including:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                            <li>Browsing property listings and project information</li>
                            <li>Requesting information about properties</li>
                            <li>Scheduling site visits and meetings</li>
                            <li>Downloading brochures and marketing materials</li>
                            <li>Contacting us for inquiries</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
                            3.2 Prohibited Use
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            You agree not to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                            <li>Use the Services for any unlawful purpose or in violation of any applicable laws</li>
                            <li>Impersonate any person or entity or misrepresent your affiliation</li>
                            <li>Interfere with or disrupt the Services or servers</li>
                            <li>Attempt to gain unauthorized access to any part of the Services</li>
                            <li>Use automated systems (bots, scrapers) to access the Services</li>
                            <li>Transmit viruses, malware, or other harmful code</li>
                            <li>Collect or harvest personal information of other users</li>
                            <li>Use the Services for commercial purposes without our written consent</li>
                            <li>Reproduce, duplicate, or copy any content without authorization</li>
                        </ul>
                    </section>

                    {/* Property Information */}
                    <section className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FaExclamationTriangle className="text-amber-600" />
                            4. Property Information and Disclaimers
                        </h2>

                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                            4.1 Accuracy of Information
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            While we strive to provide accurate and up-to-date information about our properties and projects, we make
                            no representations or warranties regarding the completeness, accuracy, or reliability of any information
                            on our website. Property details, prices, specifications, and availability are subject to change without notice.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
                            4.2 Images and Representations
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            All images, renderings, floor plans, and visual representations are for illustrative purposes only and may
                            not reflect the actual property. Actual construction may vary from the images shown. Furniture, fixtures,
                            and fittings shown in images are for representation only and may not be included in the actual property.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
                            4.3 Pricing and Availability
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            All prices mentioned are indicative and subject to change. Final prices will be determined at the time of
                            booking and may include additional charges such as taxes, registration fees, maintenance charges, and other
                            statutory dues. Property availability is subject to prior sale.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
                            4.4 Project Timelines
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Project completion dates and timelines are estimates only and may be subject to delays due to various
                            factors including but not limited to regulatory approvals, weather conditions, force majeure events, and
                            other unforeseen circumstances. We shall not be liable for any delays in project completion.
                        </p>
                    </section>

                    {/* RERA Compliance */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FaCheckCircle className="text-green-600" />
                            5. RERA Compliance
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            All our projects are registered with the Real Estate Regulatory Authority (RERA) as required under the
                            Real Estate (Regulation and Development) Act, 2016. RERA registration numbers are displayed on respective
                            project pages.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            We strongly recommend that you:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                            <li>Verify RERA registration details independently on the MahaRERA website</li>
                            <li>Review the approved plans and documents available on the RERA website</li>
                            <li>Understand your rights and obligations under RERA</li>
                            <li>Consult legal and financial advisors before making any property purchase decision</li>
                        </ul>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                            For more information, visit: <a href="https://maharerait.mahaonline.gov.in" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 underline">https://maharerait.mahaonline.gov.in</a>
                        </p>
                    </section>

                    {/* Intellectual Property */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            6. Intellectual Property Rights
                        </h2>

                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                            6.1 Ownership
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            All content on our website, including but not limited to text, graphics, logos, images, videos, audio clips,
                            digital downloads, data compilations, and software, is the property of Ganesh Yeole Builders & Developers
                            or its content suppliers and is protected by Indian and international copyright laws.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
                            6.2 Trademarks
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            "Ganesh Yeole Builders & Developers" and our logo are trademarks of our company. All project names and
                            branding are also our trademarks. You may not use these trademarks without our prior written permission.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
                            6.3 Limited License
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We grant you a limited, non-exclusive, non-transferable license to access and use our Services for personal,
                            non-commercial purposes. You may download and print materials from our website for your personal use, provided
                            you do not modify the materials and retain all copyright and proprietary notices.
                        </p>
                    </section>

                    {/* User Content */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            7. User-Generated Content
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            If you submit any content to our website (such as reviews, testimonials, or comments), you grant us a
                            worldwide, royalty-free, perpetual, irrevocable license to use, reproduce, modify, publish, and distribute
                            such content in any media. You represent that you own or have the necessary rights to such content and that
                            it does not violate any third-party rights.
                        </p>
                    </section>

                    {/* Third-Party Links */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            8. Third-Party Links and Services
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Our website may contain links to third-party websites or services (such as Google Maps, social media platforms,
                            payment gateways, or RERA website). We do not control and are not responsible for the content, privacy policies,
                            or practices of any third-party websites. Your use of third-party websites is at your own risk.
                        </p>
                    </section>

                    {/* Limitation of Liability */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FaGavel className="text-amber-600" />
                            9. Limitation of Liability
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            To the fullest extent permitted by law, Ganesh Yeole Builders & Developers shall not be liable for any:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                            <li>Indirect, incidental, special, consequential, or punitive damages</li>
                            <li>Loss of profits, revenue, data, or business opportunities</li>
                            <li>Damages arising from your use or inability to use our Services</li>
                            <li>Errors or omissions in any content or information</li>
                            <li>Unauthorized access to or alteration of your transmissions or data</li>
                            <li>Statements or conduct of any third party on the Services</li>
                        </ul>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                            Our total liability to you for any claims arising from your use of the Services shall not exceed the amount
                            you paid to us, if any, in the twelve (12) months preceding the claim.
                        </p>
                    </section>

                    {/* Indemnification */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            10. Indemnification
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            You agree to indemnify, defend, and hold harmless Ganesh Yeole Builders & Developers, its officers, directors,
                            employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, or expenses
                            (including reasonable attorneys' fees) arising out of or in connection with:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-3">
                            <li>Your use of the Services</li>
                            <li>Your violation of these Terms</li>
                            <li>Your violation of any rights of another party</li>
                            <li>Any content you submit or transmit through the Services</li>
                        </ul>
                    </section>

                    {/* Dispute Resolution */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            11. Dispute Resolution and Governing Law
                        </h2>

                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                            11.1 Governing Law
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its
                            conflict of law provisions.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
                            11.2 Jurisdiction
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            Any disputes arising out of or relating to these Terms or the Services shall be subject to the exclusive
                            jurisdiction of the courts located in Nashik, Maharashtra, India.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
                            11.3 Arbitration
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Any dispute, controversy, or claim arising out of or relating to these Terms shall first be attempted to be
                            resolved through good faith negotiations. If not resolved within 30 days, the dispute may be referred to
                            arbitration in accordance with the Arbitration and Conciliation Act, 1996, with the seat of arbitration being
                            Nashik, Maharashtra.
                        </p>
                    </section>

                    {/* Modifications */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            12. Modifications to Terms
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting
                            the new Terms on this page and updating the "Last Updated" date. Your continued use of the Services after any
                            such changes constitutes your acceptance of the new Terms.
                        </p>
                    </section>

                    {/* Termination */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            13. Termination
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We may terminate or suspend your access to our Services immediately, without prior notice or liability, for
                            any reason, including if you breach these Terms. Upon termination, your right to use the Services will
                            immediately cease. All provisions of these Terms that by their nature should survive termination shall survive,
                            including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                        </p>
                    </section>

                    {/* Severability */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            14. Severability
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or
                            eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
                        </p>
                    </section>

                    {/* Entire Agreement */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            15. Entire Agreement
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            These Terms, together with our Privacy Policy, constitute the entire agreement between you and Ganesh Yeole
                            Builders & Developers regarding the use of our Services and supersede all prior agreements and understandings.
                        </p>
                    </section>

                    {/* Waiver */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            16. Waiver
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                            Any waiver of any provision of these Terms will be effective only if in writing and signed by us.
                        </p>
                    </section>

                    {/* Contact Information */}
                    <section className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            17. Contact Information
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            If you have any questions about these Terms, please contact us:
                        </p>
                        <div className="space-y-2 text-gray-700 dark:text-gray-300">
                            <p><strong>Ganesh Yeole Builders & Developers</strong></p>
                            <p>P. No. 14, Sneh Prasad, Vighnaharta Colony</p>
                            <p>Khutwad Nagar, Nashik - 422008, Maharashtra, India</p>
                            <p>Email: <a href="mailto:ganeshyeolebuilders@gmail.com" className="text-amber-600 hover:text-amber-700">ganeshyeolebuilders@gmail.com</a></p>
                            <p>Phone: <a href="tel:+917030502111" className="text-amber-600 hover:text-amber-700">+91 70305 02111</a></p>
                        </div>
                    </section>

                    {/* Acknowledgment */}
                    <section className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                            By using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms
                            of Service.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
