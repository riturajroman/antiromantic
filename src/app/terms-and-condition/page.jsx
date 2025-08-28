import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <>
      <Header textcolor="#28251F" />
      <section className="relative px-4 pt-[140px] md:px-10 bg-[url('/bg-img.png')] bg-no-repeat bg-cover pb-16 border-b border-[#D0C9BE]">
        <div className="container">
          {/* Page heading */}
          <h1 className="text-[#28251F] text-2xl font-light mb-8 pb-4 border-b border-[#D0C9BE]">
            Terms and Conditions
          </h1>

          {/* Body copy */}
          <article className="text-[#28251F] text-base leading-relaxed space-y-6">
            <div className="space-y-2">
              <p>
                This website is operated by ANTIROMANTIC, a partnership firm
                registered in India. Throughout the site, the terms “we,” “us,”
                and “our” refer to ANTIROMANTIC. By accessing or using our
                website&nbsp;
                <Link
                  href="https://www.shopantiromantic.com"
                  className="underline text-[#28251F]"
                >
                  shopantiromantic.com
                </Link>
                , you agree to be bound by the following Terms and Conditions
                (“Terms”, “Terms of Service”, or “Terms and Conditions”),
                including any additional terms, conditions, and policies
                referenced herein or available by hyperlink. These Terms apply
                to all users of the site, including browsers, customers,
                merchants, vendors, and content contributors.
              </p>
              <p>
                Please read these Terms carefully before using our site. If you
                do not agree to all the terms and conditions stated here, you
                may not access the website or use any services.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                1. Business Information
              </h2>
              <p>
                This website is owned and operated by ANTIROMANTIC, a
                partnership firm registered in India.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                2. Online Store Terms
              </h2>
              <p>
                By agreeing to these Terms, you confirm that you are at least
                the age of majority in your jurisdiction or that you have given
                us your consent to allow any of your minor dependents to use
                this site. You may not use our products for any illegal or
                unauthorized purpose, nor may you violate any laws in your
                jurisdiction in the use of the service (including but not
                limited to copyright laws). Any breach or violation of the Terms
                will result in an immediate termination of your services.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                3. Product Information & Accuracy
              </h2>
              <p>
                We strive to display as accurately as possible the colors,
                images, and descriptions of our products. However, we cannot
                guarantee that your device’s display will reflect the exact
                color. All product descriptions and pricing are subject to
                change at any time without notice. We reserve the right to
                discontinue any product at any time.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                4. Orders, Pricing & Billing
              </h2>
              <p>
                Prices for our products are subject to change without notice. We
                reserve the right to modify or discontinue any product or
                service at any time without liability. We reserve the right to
                refuse any order you place with us. We may, at our sole
                discretion, limit or cancel quantities purchased per person, per
                household, or per order. If we make a change to or cancel an
                order, we will attempt to notify you via the contact information
                provided at the time of purchase.
              </p>
              <p>
                You agree to provide current, complete, and accurate purchase
                and account information for all transactions made on our site.
                You also agree to promptly update your account and other
                details, including your email address and payment information,
                so that we can complete your transactions and contact you as
                needed.
              </p>
              <p>
                If your payment is declined or unauthorized, we may cancel the
                order without notice. We are not responsible for any additional
                charges levied by your bank or credit card issuer.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                5. Shipping & Delivery
              </h2>
              <p>
                Shipping timelines mentioned on the website are estimates and
                may vary based on availability, location, and external factors.
                Delays caused by courier companies, natural calamities, or
                unforeseen events are beyond our control. We are not liable for
                any direct or indirect loss due to such delays.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                6. Returns & Exchanges
              </h2>
              <p>
                We currently do not accept returns unless the product received
                is defective or incorrect. Requests for returns or exchanges
                must be raised within seven days of delivery by emailing us
                at&nbsp;
                <Link
                  href="mailto:x@shopantiromantic.com"
                  className="underline text-[#28251F]"
                >
                  x@shopantiromantic.com
                </Link>
                &nbsp;with images and order details. Products must be unused and
                in original condition. Please refer to our Returns & Exchange
                Policy for full details.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                7. Optional Tools
              </h2>
              <p>
                We may provide you with access to third-party tools over which
                we neither monitor nor have control. You acknowledge and agree
                that we provide access to such tools “as is” and “as available”
                without any warranties, representations, or conditions of any
                kind. We shall have no liability whatsoever arising from or
                relating to your use of optional third-party tools.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                8. Third-Party Links
              </h2>
              <p>
                Certain content or products on our site may include links to
                third-party websites. We are not responsible for the content,
                accuracy, or policies of such websites. Please review their
                terms before engaging in any transactions.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                9. Intellectual Property
              </h2>
              <p>
                All content on this website—including designs, graphics, product
                names, images, logos, and text—is the property of ANTIROMANTIC
                and is protected under applicable intellectual property laws.
                You may not use or reproduce any content without express written
                permission.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                10. User Comments and Submissions
              </h2>
              <p>
                If you send us creative ideas, feedback, proposals, or other
                materials (whether requested by us or not), you agree that we
                may, at any time and without restriction, edit, copy, publish,
                or use them in any medium. We are under no obligation to
                maintain comments in confidence, pay compensation, or respond.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                11. Prohibited Uses
              </h2>
              <p>
                You are prohibited from using the site or its content for any
                unlawful purpose, to violate any international or Indian laws,
                to infringe upon intellectual property rights, to harass others,
                to submit false or misleading information, or to interfere with
                the security features of the site. We reserve the right to
                terminate your access for breaching these terms.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                12. Disclaimer of Warranties & Limitation of Liability
              </h2>
              <p>
                We do not guarantee that your use of our service will be
                uninterrupted, timely, secure, or error-free. All products and
                services delivered through the site are provided "as is" and "as
                available" for your use, without any warranties, either express
                or implied. In no case shall ANTIROMANTIC, its partners,
                employees, or affiliates be liable for any injury, loss, or
                damages of any kind arising from the use of our site or
                products.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                13. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless ANTIROMANTIC and its
                partners, employees, contractors, and affiliates from any claim
                or demand arising out of your breach of these Terms or violation
                of any law or third-party rights.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                14. Governing Law
              </h2>
              <p>
                These Terms and any related transactions shall be governed by
                the laws of India. Any disputes shall be subject to the
                exclusive jurisdiction of the courts in Bangalore, Karnataka.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                15. Modifications to Terms
              </h2>
              <p>
                We reserve the right to modify, update, or replace any part of
                these Terms at our discretion by posting changes on this page.
                Your continued use of the website following such updates
                constitutes your acceptance of those changes.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                16. Contact Information
              </h2>
              <p>
                Questions about the Terms and Conditions can be sent to&nbsp;
                <Link
                  href="mailto:x@shopantiromantic.com"
                  className="underline text-[#28251F]"
                >
                  x@shopantiromantic.com
                </Link>
                .
              </p>
            </div>
          </article>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default page;
