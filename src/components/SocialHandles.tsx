import React from "react";
import Link from "next/link";

//=> React Icons
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

//=> Icons Style
const Icon_settings = {
  fontSize: "1.8em",
  color: "#FFF5DD",
};

const SocialHandles = () => {
  return (
    <div className="w-auto flex flex-row flex-wrap gap-6">
      <Link href="https://instagram.com/shotitz_photography" target="_blank">
        <BsInstagram style={Icon_settings} />
      </Link>

      <Link href="mailto:shotitz_photography@gmail.com" target="_blank">
        <FaLinkedin style={Icon_settings} />
      </Link>

      <Link href="https://yelp.to/shotitz_photography" target="_blank">
        <FaYoutube style={Icon_settings} />
      </Link>

      <Link
        href="https://www.facebook.com/profile.php?id=100091890403123&mibextid=9R9pXO"
        target="_blank"
      >
        <FaFacebookF style={Icon_settings} />
      </Link>

      <Link href="https://twitter.com/shotitz_photography" target="_blank">
        <FaTwitter style={Icon_settings} />
      </Link>
    </div>
  );
};

export default SocialHandles;
