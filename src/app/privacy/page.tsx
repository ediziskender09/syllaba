export const metadata = {
  title: "Privacy Policy",
  description: "How Syllaba collects, uses, and protects personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="shell py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
          Legal
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em] text-ink">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-ink-soft">Last updated: November 10, 2026</p>

        <div className="prose-learn mt-8">
          <p>
            This Privacy Policy explains how Syllaba (&quot;Syllaba,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;) collects, uses, shares, and protects information when you visit
            getsyllaba.com, browse lessons, create an account, make a purchase, or contact
            support. By using Syllaba, you agree to this policy.
          </p>

          <h2>1. Information we collect</h2>
          <p>We collect information in three ways: you provide it, we collect it automatically, and we receive it from service providers.</p>
          <h3>Information you provide</h3>
          <ul>
            <li>Account details such as name and email address when authentication is enabled</li>
            <li>Purchase and billing details needed to complete an order</li>
            <li>Messages you send through contact or support channels</li>
            <li>Lesson requests, feedback, or other content you voluntarily submit</li>
          </ul>
          <h3>Information collected automatically</h3>
          <ul>
            <li>Device and browser information, IP address, and general location derived from IP</li>
            <li>Pages visited, referring URLs, timestamps, and basic usage events</li>
            <li>Cookies or similar technologies used for session, preference, and analytics purposes</li>
          </ul>
          <h3>Information from providers</h3>
          <ul>
            <li>Payment confirmation and limited billing metadata from payment processors</li>
            <li>Authentication signals from identity providers if you sign in with a third-party login</li>
          </ul>

          <h2>2. How we use information</h2>
          <p>We use personal information to:</p>
          <ul>
            <li>Provide, operate, and improve the Syllaba website and lesson library</li>
            <li>Process purchases, deliver unlocks, and keep purchase records</li>
            <li>Create and manage accounts, sessions, and access permissions</li>
            <li>Respond to support requests and communicate about your orders</li>
            <li>Detect abuse, prevent fraud, and protect the security of the service</li>
            <li>Understand product usage and improve content quality and site performance</li>
            <li>Comply with legal obligations and enforce our Terms of Use</li>
          </ul>

          <h2>3. Payments</h2>
          <p>
            Payment card details are processed by our payment provider. Syllaba does not store
            full card numbers on its own servers. We may store purchase status, product
            unlocked, amount paid, currency, and a provider reference needed for support,
            refunds, and accounting.
          </p>

          <h2>4. Cookies and similar technologies</h2>
          <p>
            We may use essential cookies to keep you signed in and remember preferences.
            We may also use analytics cookies or similar tools to understand how the site is
            used. You can control cookies through your browser settings. Disabling some
            cookies may affect login, checkout, or personalization features.
          </p>

          <h2>5. How we share information</h2>
          <p>
            We do not sell personal information. We may share information with trusted
            service providers who help us operate Syllaba, such as hosting, analytics,
            email delivery, customer support tooling, and payment processing. These
            providers may only process information on our instructions and for the services
            they provide.
          </p>
          <p>We may also share information:</p>
          <ul>
            <li>If required by law, regulation, legal process, or governmental request</li>
            <li>To protect the rights, safety, or property of Syllaba, our users, or the public</li>
            <li>In connection with a merger, acquisition, financing, or sale of assets, subject to appropriate safeguards</li>
          </ul>

          <h2>6. Data retention</h2>
          <p>
            We keep personal information only as long as needed for the purposes described
            in this policy, including providing access to purchased lessons, maintaining
            business records, resolving disputes, and meeting legal requirements. When
            information is no longer needed, we delete or anonymize it where practical.
          </p>

          <h2>7. Security</h2>
          <p>
            We use reasonable administrative, technical, and organizational measures to
            protect personal information. No method of transmission or storage is completely
            secure, so we cannot guarantee absolute security. Please use a strong unique
            password for your account once authentication is enabled and notify us of any
            suspected unauthorized access.
          </p>

          <h2>8. Your choices and rights</h2>
          <p>
            Depending on where you live, you may have rights to access, correct, delete, or
            restrict certain personal information, or to object to certain processing. You
            may also have the right to data portability. To make a request, email
            support@getsyllaba.com. We may need to verify your identity before fulfilling a
            request.
          </p>
          <p>
            You can unsubscribe from marketing emails using the link in those emails. You
            will still receive transactional messages related to purchases, security, or
            account notices when needed.
          </p>

          <h2>9. Children</h2>
          <p>
            Syllaba is not directed to children under 16, and we do not knowingly collect
            personal information from children under 16. If you believe a child has provided
            personal information, contact us and we will take appropriate steps to delete it.
          </p>

          <h2>10. International transfers</h2>
          <p>
            Syllaba may be operated using servers and service providers in different countries.
            If your information is transferred across borders, we take steps designed to
            provide appropriate protection consistent with applicable law.
          </p>

          <h2>11. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date
            at the top will change when we do. Continued use of Syllaba after an update means
            you accept the revised policy. For material changes, we may provide additional
            notice on the site or by email when appropriate.
          </p>

          <h2>12. Contact</h2>
          <p>
            Questions about privacy can be sent to{" "}
            <a href="mailto:support@getsyllaba.com">support@getsyllaba.com</a>.
          </p>
          <p>
            This policy is written for Syllaba&apos;s current and planned operations, including
            upcoming authentication and payment integrations. Specific processor names and
            regional legal addenda may be added as those systems go live.
          </p>
        </div>
      </div>
    </div>
  );
}
