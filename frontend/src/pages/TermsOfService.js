import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <Helmet>
                <title>Terms of Service - Ganesh Yeole Builders & Developers</title>
                <meta
                    name="description"
                    content="Terms of Service for www.ganeshyeolebuilders.com. Read the terms and conditions for using our website and services."
                />
                <meta name="robots" content="noindex" />
            </Helmet>

            <div className="max-w-3xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                    Terms of Service
                </h1>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Last updated: January 2026
                </p>

                <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-6">

                    {/* Intro */}
                    <section>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            These Terms of Service (“Terms”) govern your use of the website
                            <strong> www.ganeshyeolebuilders.com</strong> and any services or
                            information provided through it by Ganesh Yeole Builders & Developers (“we”,
                            “our”, “us”). By accessing or using this website, you agree to be bound by
                            these Terms. If you do not agree, please do not use the website.
                        </p>
                    </section>

                    {/* Eligibility */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            1. Eligibility
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            You must be at least 18 years old and legally competent to enter into a
                            binding agreement in order to use this website.
                        </p>
                    </section>

                    {/* Website Use */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            2. Use of Website
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            You agree to use this website only for lawful purposes, including:
                        </p>
                        <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-1">
                            <li>viewing project information</li>
                            <li>submitting enquiries</li>
                            <li>requesting site visits</li>
                            <li>downloading brochures or documents</li>
                        </ul>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                            You agree not to:
                        </p>
                        <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-1">
                            <li>engage in fraudulent or illegal activities</li>
                            <li>copy or misuse website content</li>
                            <li>attempt unauthorized access</li>
                            <li>introduce viruses or harmful code</li>
                            <li>use automated bots or scraping tools</li>
                        </ul>
                    </section>

                    {/* Information Disclaimer */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            3. Property Information & Disclaimer
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            All information on this website is provided for general guidance only and
                            does not constitute a legal offer or contract. Project details, images,
                            specifications, layouts, areas, and pricing are subject to change without
                            prior notice. Actual construction may vary from visuals.
                        </p>
                    </section>

                    {/* RERA */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            4. RERA Compliance
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            Wherever applicable, projects are registered under the Real Estate Regulatory
                            Authority (RERA). Buyers are advised to verify details independently through
                            official MahaRERA records before making any purchase decision.
                        </p>
                    </section>

                    {/* IP Rights */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            5. Intellectual Property
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            All content on this website, including text, images, graphics, logos,
                            layouts, and software, is the property of Ganesh Yeole Builders & Developers
                            and is protected under applicable copyright and trademark laws. You may not
                            reproduce, copy, or distribute any material without prior written consent.
                        </p>
                    </section>

                    {/* Third party links */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            6. Third-Party Links
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            This website may contain links to third-party websites such as payment
                            gateways, maps, social media or RERA portals. We do not control and are not
                            responsible for their content, policies or practices.
                        </p>
                    </section>

                    {/* Limitation */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            7. Limitation of Liability
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            To the maximum extent permitted by law, we shall not be liable for any loss,
                            damage, cost or expense arising from use of this website, including reliance
                            on information provided herein.
                        </p>
                    </section>

                    {/* Changes */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            8. Changes to Terms
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            We may update these Terms from time to time. Updated Terms will be published
                            on <strong>www.ganeshyeolebuilders.com</strong> with the revised date. Continued
                            use of the website constitutes acceptance of the updated Terms.
                        </p>
                    </section>

                    {/* Governing Law */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            9. Governing Law & Jurisdiction
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            These Terms are governed by the laws of India. Any disputes shall be subject
                            to the exclusive jurisdiction of courts in Nashik, Maharashtra.
                        </p>
                    </section>

                    {/* Contact */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            10. Contact Us
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            For questions regarding these Terms, contact:
                        </p>

                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                            <strong>Ganesh Yeole Builders & Developers</strong><br />
                            Website: <strong>www.ganeshyeolebuilders.com</strong><br />
                            Nashik, Maharashtra, India<br />
                            Email: <a href="mailto:ganeshyeolebuilders@gmail.com" className="text-amber-600">
                                ganeshyeolebuilders@gmail.com
                            </a><br />
                            Phone: <a href="tel:+917030502111" className="text-amber-600">
                                +91 70305 02111
                            </a>
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
