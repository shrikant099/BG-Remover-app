import logo from "./images/logo.png";
import ModelBgRemovePic from "./images/model-remove.png";
import ModelPic from "./images/model.jpg";
import ModelImg2 from "./images/modelimg2.jpg";
import Model3 from "./images/model3.png";

export const cards = [
  {
    step: 1,
    title: "Remove Background",
    description:
      "Instantly remove the background from your images in one click.",
  },
  {
    step: 2,
    title: "Select an Image",
    description:
      "Choose your photo (JPG or PNG) to start. Any size or dimension is supported.",
  },
  {
    step: 3,
    title: "Download Your Image",
    description:
      "Once done, simply download your image with the background removed.",
  },
];

// Rating

export const ratings = [
  {
    id: 1,
    title: "Exceptional AI Tool!",
    desc: "I was amazed at how accurately the background was removed. Perfect for my ecommerce store!",
    user: "emma.stone23@gmail.com",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    title: "Saves My Time",
    desc: "No more wasting hours in Photoshop. This tool does it in seconds, beautifully!",
    user: "jon.doe92@gmail.com",
    img: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 3,
    title: "Highly Recommended",
    desc: "Professional results with zero effort. Can't believe this is automated!",
    user: "lisa.martin87@gmail.com",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

// Pricing
export const pricingPlans = [
  {
    title: "Basic",
    price: "Free",
    desc: "Perfect for individuals trying out the service.",
    features: [
      "Only 5 Removals After Upgrade Credits to Buy Subscription",
      "Email Support",
      "Limited Access",
    ],
  },
  {
    title: "Pro",
    price: "$10/month",
    desc: "Ideal for freelancers and small businesses.",
    features: [
      "30 Removals",
      "Priority Support",
      "HD Output",
      "Access to All Tools",
    ],
  },
  {
    title: "Enterprise",
    price: "$20/month",
    desc: "Best for large teams with high-volume needs.",
    features: [
      "100 Removals",
      "Dedicated Manager",
      "24/7 Premium Support",
    ],
  },
];

export { logo, ModelBgRemovePic, ModelPic, ModelImg2, Model3 };
