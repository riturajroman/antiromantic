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
            Returns and Exchange Policy
          </h1>

          {/* Body copy */}
          <article className="text-[#28251F] text-base leading-relaxed space-y-6">
            <div className="space-y-2">
              <p>
                At ANTIROMANTIC, each piece is made in limited quantities and
                packed with care. Since we produce in small batches, we follow a
                strict return and exchange policy — but we understand that
                sizing can sometimes be tricky. Please read the details below
                carefully before making a return request.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                1. Do you accept returns?
              </h2>
              <p>Returns will be considered under the following conditions:</p>
              <ul className="list-disc pl-5">
                <li>
                  You received a damaged, defective, or incorrect item, or
                </li>
                <li>The size does not fit you</li>
              </ul>
              <p>
                All return requests are subject to approval and must meet our
                quality check criteria. Additionally, only one return request is
                accepted per order. Subsequent requests for the same order will
                not be accepted.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                2. What is your return outcome policy?
              </h2>
              <p>
                All approved returns will result in an exchange only. You may
                exchange the item for:
              </p>
              <ul className="list-disc pl-5">
                <li>The same item in a different size, if available</li>
                <li>
                  A replacement of the same ordered item, in case of defect or
                  incorrect delivery
                </li>
              </ul>
              <p>
                We will issue a refund only if an exchange is not possible due
                to the required size or product being out of stock. Refunds,
                when issued, will be processed back to your original payment
                method within 10–14 working days.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                3. What’s the process for reporting a defective or wrong item?
              </h2>
              <p>
                You must email us at&nbsp;
                <Link
                  href="mailto:x@shopantiromantic.com"
                  className="underline text-[#28251F]"
                >
                  x@shopantiromantic.com
                </Link>
                &nbsp;within seven days of delivery. The email must include:
              </p>
              <ul className="list-disc pl-5">
                <li>Your order number</li>
                <li>
                  Clear, unedited photographs of the item, packaging, and
                  invoice
                </li>
                <li>A brief explanation of the issue</li>
              </ul>
              <p>
                Requests sent beyond the seven day window will not be considered
                under any circumstances.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                4. Will you arrange reverse pickup or cover shipping for
                returns?
              </h2>
              <p>
                Yes. If your return request is approved, we will arrange a
                reverse pickup at no extra cost to you. If your address is not
                serviceable for reverse pickup, you will be asked to courier the
                product back to us — and we will reimburse a capped shipping fee
                once the item is received and verified.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                5. What items are strictly non-returnable?
              </h2>
              <p>
                The following are not eligible for return or refund under any
                condition:
              </p>
              <ul className="list-disc pl-5">
                <li>
                  Items purchased during sale, discount, or promotion periods
                </li>
                <li>Altered items</li>
                <li>
                  Items showing signs of being worn, washed, damaged, or used
                </li>
                <li>Items returned without original tags and packaging</li>
              </ul>
              <p>
                ANTIROMANTIC retains full discretion to determine whether a
                product qualifies for return or exchange based on photos,
                details, and condition.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                6. Can I cancel my order once placed?
              </h2>
              <p>
                Orders cannot be cancelled once confirmed. If a cancellation
                request is made within 2 hours of order placement and before
                dispatch, we may — at our sole discretion — accept it.
                Contact&nbsp;
                <Link
                  href="mailto:x@shopantiromantic.com"
                  className="underline text-[#28251F]"
                >
                  x@shopantiromantic.com
                </Link>
                &nbsp;immediately with your order number.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                7. What if my package is marked delivered but I didn’t receive
                it?
              </h2>
              <p>
                In such cases, please notify us within 24 hours of the delivery
                update. We will coordinate with our shipping partners to
                investigate. However, ANTIROMANTIC is not liable for packages
                lost or stolen after marked delivery.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="mt-8 mb-2 text-[#28251F] text-2xl">
                8. Final Note
              </h2>
              <p>
                We are a small, independent label and every piece is produced
                with intent and care. We encourage you to reach out to us before
                placing your order if you have sizing or product queries. By
                shopping with us, you acknowledge and agree to the terms
                outlined above.
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
