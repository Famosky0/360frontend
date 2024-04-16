import { Key } from "react";

// Navigation Props
interface INavbar {
  id: Key | null | undefined;
  title: string;
  url: string;
  hasIcon: boolean;
}

// Platform Name
export const PlatformName: string = "Shotitz Photography";

// Navigation Information
export const NavBarData: INavbar[] = [
  {
    id: 1,
    title: "Home",
    url: "/",
    hasIcon: false,
  },
  {
    id: 2,
    title: "Gallery",
    url: "/gallery",
    hasIcon: false,
  },
  {
    id: 3,
    title: "About",
    url: "/about",
    hasIcon: false,
  },
  {
    id: 4,
    title: "Contact",
    url: "/contact",
    hasIcon: false,
  },
  {
    id: 5,
    title: "Book Now",
    url: "/pricing",
    hasIcon: true,
  },
];

//  Pricing data
export const PricingData: { [key: string]: any } = {
  monthly: [
    {
      id: 1,
      title: "Standard plan",
      button: "Free in Beta",
      price: "19",
      yearly: "150",
      features: [
        {
          id: 1,
          desc: "99 SEO optimized listing pages",
        },
        {
          id: 2,
          desc: "QR codes that never expires",
        },
        {
          id: 3,
          desc: "Unlimited Scans",
        },
        {
          id: 4,
          desc: "Unlimited scan and listing analytics",
        },
        {
          id: 5,
          desc: "1 Seat",
        },
        {
          id: 6,
          desc: "24/7 priority support",
        },
      ],
    },
    {
      id: 2,
      title: "Enterprise plan",
      button: "Contact for Demo",
      price: "49",
      features: [
        {
          id: 1,
          desc: "Everything in Standard",
        },
        {
          id: 2,
          desc: "Team colaboration",
        },
        {
          id: 3,
          desc: "API access",
        },
        {
          id: 4,
          desc: "24/7 priority support",
        },
      ],
    },
  ],
  yearly: [
    {
      id: 1,
      title: "Standard plan",
      price: "99",
      yearly: "300",
      button: "Free in Beta",
      features: [
        {
          id: 1,
          desc: "99 SEO optimized listing pages",
        },
        {
          id: 2,
          desc: "QR codes that never expires",
        },
        {
          id: 3,
          desc: "Unlimited Scans",
        },
        {
          id: 4,
          desc: "Unlimited scan and listing analytics",
        },
        {
          id: 5,
          desc: "1 Seat",
        },
        {
          id: 6,
          desc: "24/7 priority support",
        },
      ],
    },
    {
      id: 2,
      title: "Enterprise plan",
      button: "Contact for Demo",
      price: "120",
      features: [
        {
          id: 1,
          desc: "Everything in Standard",
        },
        {
          id: 2,
          desc: "Team colaboration",
        },
        {
          id: 3,
          desc: "API access",
        },
        {
          id: 4,
          desc: "24/7 priority support",
        },
      ],
    },
  ],
};

export default NavBarData;
