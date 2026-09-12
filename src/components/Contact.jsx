import Reveal from './Reveal'
import { Chevron, MailIcon } from './icons'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/SafwanS143' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/safwan-shiblee/' },
  { label: 'Résumé', href: '/resume.pdf' },
]

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="tone-light scroll-mt-[52px] py-32 text-center md:py-44">
      <div className="mx-auto max-w-[1080px] px-6">
        <Reveal>
          <h2 id="contact-title" className="t-display mx-auto max-w-[14ch] text-fg">
            Let's build something that <span className="text-gradient">stays up.</span>
          </h2>
          <p className="t-lead mx-auto mt-6 max-w-[34rem] text-fg-2">
            Co-op terms, SRE and platform work, or anything across the
            hardware/software boundary. My inbox is monitored 24/7.
          </p>
          <div className="mt-10 flex justify-center">
            <a href="mailto:sshiblee@uwaterloo.ca" className="btn-pill">
              <MailIcon size={17} />
              sshiblee@uwaterloo.ca
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8">
            {LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" className="link-chevron text-[1.0625rem]">
                  {label}
                  <Chevron size={11} />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
