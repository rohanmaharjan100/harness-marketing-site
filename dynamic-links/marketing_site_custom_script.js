const moduleMap = {
  'AI Test Automation': 'ai-test-automation',
  Armory: 'armory',
  'Artifact Registry': 'artifact-registry',
  'Chaos Engineering': 'chaos-engineering',
  'Cloud Cost Management': 'cloud-cost-management',
  'Cloud Development Environments': 'cloud-development-environments',
  'Code Repository': 'code-repository',
  'Continuous Delivery': 'continuous-delivery',
  'Continuous Delivery & GitOps': 'continuous-delivery',
  'Continuous Integration': 'continuous-integration',
  'Database DevOps': 'database-devops',
  'Feature Management & Experimentation': 'feature-management-experimentation',
  'Incident Response': 'incident-response',
  'Infrastructure as Code Management': 'infrastructure-as-code-management',
  'Internal Developer Portal': 'internal-developer-portal',
  'Security Testing Orchestration': 'security-testing-orchestration',
  'Software Engineering Insights': 'software-engineering-insights',
  'Supply Chain Security': 'supply-chain-security',
};

const shortFormMap = {
  'ai-test-automation': 'ata',
  armory: 'armory',
  'artifact-registry': 'ar',
  'chaos-engineering': 'ce',
  'cloud-cost-management': 'ccm',
  'cloud-development-environments': 'cde',
  'code-repository': 'cr',
  'continuous-delivery': 'cd',
  'continuous-integration': 'ci',
  'database-devops': 'dbdevops',
  'feature-management-experimentation': 'fme',
  'incident-response': 'ir',
  'infrastructure-as-code-management': 'iacm',
  'internal-developer-portal': 'idp',
  'security-testing-orchestration': 'sto',
  'software-engineering-insights': 'sei',
  'supply-chain-security': 'scs',
};

const browserUrl = window.location.href;
if (browserUrl.includes('/products/')) {
  const productLong = browserUrl.split('/products/')[1];
  const product = shortFormMap[productLong];
  if (product) {
    const anchors = document.querySelectorAll('a[href*="/company/contact-sales"]');
    const auths = document.querySelectorAll('a[href*="/app.harness.io/auth/"]');

    for (const anchor of anchors) {
      const footerParent = anchor.closest('footer');
      const url = new URL(anchor.href, window.location.origin);
      url.searchParams.set('utm_campaign', product);
      url.searchParams.set('utm_source', 'harness_io');
      url.searchParams.set('utm_medium', 'cta');

      if (footerParent) {
        url.searchParams.set('utm_content', 'footer');
      } else {
        url.searchParams.set('utm_content', 'main_nav');
      }
      anchor.href = url.toString();
    }
    for (const auth of auths) {
      const rawHref = auth.getAttribute('href');
      const [basePart, fragment] = rawHref.split('#');

      const [path, queryString] = fragment.split('?');
      const params = new URLSearchParams(queryString || '');
      params.set('utm_campaign', product);
      params.set('utm_source', 'harness_io');
      params.set('utm_medium', 'cta');
      params.set('utm_content', 'main_nav');
      const newFragment = path + '?' + params.toString();
      const finalHref = basePart + '#' + newFragment;
      auth.setAttribute('href', finalHref);
    }
  }
}

if (browserUrl.includes('/blog/')) {
  const module = document.querySelector('.ga-meta-module').textContent;

  const blogModule = shortFormMap[moduleMap[module]];
  if (blogModule) {
    const anchors = document.querySelectorAll('a[href*="/company/contact-sales"]');
    const auths = document.querySelectorAll('a[href*="/app.harness.io/auth/"]');

    for (const anchor of anchors) {
      const footerParent = anchor.closest('footer');
      const url = new URL(anchor.href, window.location.origin);
      url.searchParams.set('utm_campaign', blogModule);
      url.searchParams.set('utm_source', 'harness_io');
      url.searchParams.set('utm_medium', 'cta');

      if (footerParent) {
        url.searchParams.set('utm_content', 'footer');
      } else {
        url.searchParams.set('utm_content', 'main_nav');
      }
      anchor.href = url.toString();
    }
    for (const auth of auths) {
      const rawHref = auth.getAttribute('href');
      const [basePart, fragment] = rawHref.split('#');

      const [path, queryString] = fragment.split('?');
      const params = new URLSearchParams(queryString || '');
      params.set('utm_campaign', blogModule);
      params.set('utm_source', 'harness_io');
      params.set('utm_medium', 'cta');
      params.set('utm_content', 'main_nav');
      const newFragment = path + '?' + params.toString();
      const finalHref = basePart + '#' + newFragment;
      auth.setAttribute('href', finalHref);
    }
  }
}
