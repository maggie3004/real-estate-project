import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <Helmet>
                <title>Privacy Policy - Ganesh Yeole Builders & Developers</title>
                <meta
                    name="description"
                    content="Privacy Policy for Ganesh Yeole Builders & Developers. Learn how we collect, use and protect your personal information."
                />
                <meta name="robots" content="noindex" />
            </Helmet>

            <div className="max-w-3xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                    Privacy Policy
                </h1>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Last updated: January 2026
                </p>

                <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-6">

                    {/* Introduction */}
                    <section>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            At Ganesh Yeole Builders & Developers (“we”, “our”, “us”), we respect your
                            privacy and are committed to protecting your personal information. This Privacy
                            Policy explains how we collect, use and safeguard information when you use our
                            website <strong>www.ganeshyeolebuilders.com</strong> or contact us regarding our
                            projects and services.
                        </p>
                    </section>

                    {/* What We Collect */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            1. Information We Collect
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            We may collect the following information when you submit an enquiry or contact us:
                        </p>
                        <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                            <li>Name</li>
                            <li>Phone number</li>
                            <li>Email address</li>
                            <li>Property requirements or message details</li>
                        </ul>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                            We may also collect basic technical data such as IP address, browser type and
                            pages visited for analytics and security purposes.
                        </p>
                    </section>

                    {/* How We Use It */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            2. How We Use Your Information
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            We use your information to:
                        </p>
                        <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                            <li>Respond to enquiries</li>
                            <li>Provide project details</li>
                            <li>Arrange site visits or calls</li>
                            <li>Send updates or offers (only with your consent)</li>
                            <li>Improve our website and services</li>
                        </ul>
                    </section>

                    {/* Sharing */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            3. Sharing of Information
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            We do not sell your personal data. Your information may be shared only with:
                        </p>
                        <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                            <li>Our internal sales team</li>
                            <li>Authorised channel partners</li>
                            <li>Service providers such as email or analytics tools</li>
                            <li>Government or legal authorities if required by law</li>
                        </ul>
                    </section>

                    {/* Cookies */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            4. Cookies and Analytics
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            Our website may use cookies or similar technologies to analyse website traffic and
                            improve user experience. You can control cookie permissions through your browser
                            settings.
                        </p>
                    </section>

                    {/* Data Retention */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            5. Data Retention
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            We retain your information only as long as needed for enquiry handling,
                            communication or legal compliance, after which it is securely deleted.
                        </p>
                    </section>

                    {/* Rights */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            6. Your Rights
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            You have the right to request access, correction or deletion of your personal data.
                            To exercise these rights, please contact us using the details below.
                        </p>
                    </section>

                    {/* Changes */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            7. Updates to this Policy
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            We may update this Privacy Policy from time to time. The updated version will be
                            posted on <strong>www.ganeshyeolebuilders.com</strong> with the revised date.
                        </p>
                    </section>

                    {/* Contact */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            8. Contact Us
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            For any privacy-related queries, please contact:
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                            <strong>Ganesh Yeole Builders & Developers</strong><br />
                            Website: <strong>www.ganeshyeolebuilders.com</strong><br />
                            Nashik, Maharashtra, India<br />
                            Email: <a href="mailto:ganeshyeolebuilders@gmail.com" className="text-amber-600">ganeshyeolebuilders@gmail.com</a><br />
                            Phone: <a href="tel:+917030502111" className="text-amber-600">+91 70305 02111</a>
                        </p>
                    </section>

                    {/* Law */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            9. Governing Law
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            This Privacy Policy is governed by the laws of India.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
