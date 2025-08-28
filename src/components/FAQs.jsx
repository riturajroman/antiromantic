"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

function AccordionItem({ title, description, isActive, onClick }) {
  return (
    <div className="border-b border-[#D0C9BE] cursor-pointer">
      <button
        className={`flex w-full justify-between items-center py-6 text-left transition-colors cursor-pointer ${
          isActive ? "font-bold text-[#817C73]" : "text-[#656056]"
        }`}
        onClick={onClick}
      >
        <span className="text-lg leading-relaxed">{title}</span>
        {isActive ? (
          <Minus className="w-5 h-5 text-[#656056] flex-shrink-0 ml-4" />
        ) : (
          <Plus className="w-5 h-5 text-[#656056] flex-shrink-0 ml-4" />
        )}
      </button>
      {isActive && description && (
        <div className="pb-6 pr-8">
          <p className="text-[#28251F] text-base leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0); // First item open by default
  const [itemsToShow, setItemsToShow] = useState(10); // Show 10 items by default

  // 20 FAQ items for testing the "view more" functionality
  const allItems = [
    {
      title: "how do i know what size to order?",
      description:
        "we provide detailed sizing charts and model references on every product page. if you're unsure, our style advisors are available via live chat to help you find your perfect fit.",
    },
    {
      title: "can i return or exchange items?",
      description:
        "yes, we offer hassle-free returns and exchanges within 30 days of purchase. items must be in original condition with tags attached.",
    },
    {
      title: "how long will it take to receive my order?",
      description:
        "standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. international orders may take 7-14 business days.",
    },
    {
      title: "are your collections limited?",
      description:
        "yes, our collections are produced in limited quantities to maintain exclusivity and quality. we recommend ordering early to avoid disappointment.",
    },
    {
      title: "do you offer gift packaging?",
      description:
        "absolutely! we offer complimentary gift packaging for all orders. you can select this option during checkout.",
    },
    {
      title: "how can i get early access to new collections?",
      description:
        "join our vip list to get exclusive early access to new collections, special discounts, and styling tips delivered to your inbox.",
    },
    {
      title: "is it safe to shop on your site?",
      description:
        "yes, our website uses advanced ssl encryption and secure payment processing. we never store your payment information.",
    },
    {
      title: "do you offer international shipping?",
      description:
        "yes, we ship worldwide! shipping costs and delivery times vary by location. check our shipping page for specific details to your country.",
    },
    {
      title: "what payment methods do you accept?",
      description:
        "we accept all major credit cards, paypal, apple pay, google pay, and buy now pay later options like afterpay and klarna.",
    },
    {
      title: "how do i track my order?",
      description:
        "once your order ships, you'll receive a tracking number via email. you can also track your order by logging into your account on our website.",
    },
    {
      title: "can i modify or cancel my order?",
      description:
        "you can modify or cancel your order within 1 hour of placing it. after that, please contact our customer service team for assistance.",
    },
    {
      title: "do you have a loyalty program?",
      description:
        "yes! our loyalty program rewards you with points for every purchase, which can be redeemed for discounts on future orders.",
    },
    {
      title: "what materials do you use?",
      description:
        "we use only premium, sustainable materials including organic cotton, recycled polyester, and ethically sourced leather.",
    },
    {
      title: "how should i care for my items?",
      description:
        "care instructions are included with each item. generally, we recommend gentle washing in cold water and air drying to maintain quality.",
    },
    {
      title: "do you offer alterations?",
      description:
        "we partner with local tailors in major cities to offer alteration services. contact us for more information about availability in your area.",
    },
    {
      title: "what is your environmental policy?",
      description:
        "we're committed to sustainability through eco-friendly materials, carbon-neutral shipping, and partnerships with environmental organizations.",
    },
    {
      title: "do you have physical stores?",
      description:
        "we have flagship stores in new york, los angeles, and london. visit our store locator to find the nearest location and hours.",
    },
    {
      title: "how can i become a brand ambassador?",
      description:
        "we're always looking for authentic brand advocates! apply through our website or reach out on social media with your portfolio.",
    },
    {
      title: "do you offer student discounts?",
      description:
        "yes! students can get 15% off their orders by verifying their student status through our partner verification service.",
    },
    {
      title: "what if an item is out of stock?",
      description:
        "you can join the waitlist for out-of-stock items. we'll notify you as soon as they're back in stock and hold your size for 24 hours.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleViewMore = () => {
    if (itemsToShow < allItems.length) {
      setItemsToShow((prev) => Math.min(prev + 10, allItems.length));
    }
  };

  const hasMoreItems = itemsToShow < allItems.length;

  return (
    <section className="relative px-4 pt-[140px] md:px-10 bg-[url('/bg-img.png')] bg-no-repeat bg-cover pb-16 border-b border-[#D0C9BE]">
      <div className="container">
        <h2 className="mb-2 text-[#656056] text-2xl font-light tracking-wide border-b border-[#D0C9BE] pb-4">
          frequently asked questions
        </h2>

        <div className="space-y-0">
          {allItems.slice(0, itemsToShow).map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              description={item.description}
              isActive={activeIndex === index}
              onClick={() => toggleAccordion(index)}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            className={`text-lg underline underline-offset-2 transition-colors ${
              hasMoreItems
                ? "text-[#656056] hover:text-[#817C73] cursor-pointer"
                : "text-gray-400 cursor-not-allowed"
            }`}
            onClick={handleViewMore}
            disabled={!hasMoreItems}
          >
            view more
          </button>
        </div>
      </div>
    </section>
  );
}
