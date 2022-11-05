import React from "react"
import { socials } from "./resources"
import logocompleto from "../../../static/logomirkommerce.png"
import "./index.scss"

export const Footer = () => (
  <footer className="footer flex flex-col md:flex-row items-center justify-between flex-wrap w-full p-3 lg:px-36 xl:px-48 py-10">
    <div className="footer__section">
      <img
        src={logocompleto}
        alt="brisa sonora logo"
        className={"footer__section__logo"}
      />
      <address className="mt-4">
        Via Ten Garozzo 2 Aci Sant'antonio, Catania
      </address>
      <a
        href="https://www.iubenda.com/privacy-policy/10563366"
        title="Privacy Policy "
      >
        Privacy Policy
      </a>
    </div>
    <div className="footer__section flex justify-between">
      {socials.map(({ src, href }, index) => (
        <a href={href} key={src.split(".")[0]}>
          <img
            src={src}
            alt={href.slice(12, 20)}
            className={"footer__section__social " + (index !== 0 ? "ml-3" : "")}
          />
        </a>
      ))}
    </div>
    <div className="footer__section mt-20 md:mt-0">
      Developed by
      <a href="https://www.linkedin.com/in/mirko-torrisi/"> Mirko Torrisi</a>
    </div>
  </footer>
)
