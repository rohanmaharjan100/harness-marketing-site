const iconUrls = {
    'Infrastructure as Code Management':
      'https://developer.harness.io/img/icon_iacm_s.svg',
    'Software Supply Chain Assurance':
      'https://developer.harness.io/img/icon_ssca_s.svg',
    'Supply Chain Security': 'https://developer.harness.io/img/icon_ssca_s.svg',
    'Continuous Error Tracking':
      'https://developer.harness.io/img/icon_cet_s.svg',
    'Open Source': 'https://developer.harness.io/img/icon_harness_s.svg',
    'Security Testing Orchestration':
      'https://developer.harness.io/img/icon_sto_s.svg',
    Platform: 'https://developer.harness.io/img/icon_ci_s.svg',
    'Internal Developer Portal':
      'https://developer.harness.io/img/icon_idp_s.svg',
    'Code Repository': 'https://developer.harness.io/img/icon_code_s.svg',
    'Continuous Integration': 'https://developer.harness.io/img/icon_ci_s.svg',
    'Database DevOps': 'https://developer.harness.io/img/icon_dbdevops_s.svg',
    'Continuous Delivery': 'https://developer.harness.io/img/icon_cd_s.svg',
    'Continuous Delivery & GitOps':
      'https://developer.harness.io/img/icon_cd_s.svg',
    'Harness Platform': 'https://developer.harness.io/img/icon_harness_s.svg',
    Armory: 'https://developer.harness.io/img/icon_armory_s.svg',
    'Feature Flags': 'https://developer.harness.io/img/icon_ff_s.svg',
    'Cloud Development Environments':
      'https://developer.harness.io/img/icon_cloud_development_environments_s.svg',
    'Service Reliability Management':
      'https://developer.harness.io/img/icon_srm_s.svg',
    'Cloud Cost Management': 'https://developer.harness.io/img/icon_ccm_s.svg',
    'Software Engineering Insights':
      'https://developer.harness.io/img/icon_sei_s.svg',
    'Chaos Engineering': 'https://developer.harness.io/img/icon_ce_s.svg',
    'AI Code Assistant': 'https://developer.harness.io/img/icon_sei_s.svg',
    'Chaos Engineering': 'https://developer.harness.io/img/icon_ce_s.svg',
    'Harness Intelligence':
      'https://cdn.prod.website-files.com/6222ca42ea87e1bd1aa1d10c/666730eaefeed82bad545d10_Subtract.svg',
    'AI Code Assistant':
      'https://cdn.prod.website-files.com/6222ca42ea87e1bd1aa1d10c/666730eaefeed82bad545d10_Subtract.svg',
    'Chaos Engineering': 'https://developer.harness.io/img/icon_ce_s.svg',
    'Feature Management & Experimentation':
      'https://cdn.prod.website-files.com/6222ca42ea87e1bd1aa1d10c/66e605fcc40e1bbd3f7b2604_FME%20icon%20color.svg',
    'Artifact Registry':
      'https://cdn.prod.website-files.com/6222ca42ea87e1bd1aa1d10c/66df6931514873567c9cdc3c_artifact-registry-logo-icon.svg',
  },
  color = {
    'Harness Platform': {
      border: '--mod-ci-200',
      backgroundColor: '--mod-ci-100',
    },
    'Infrastructure as Code Management': {
      border: '--mod-iacm-200',
      backgroundColor: '--mod-iacm-100',
    },
    'Software Supply Chain Assurance': {
      border: '--mod-ssca-200',
      backgroundColor: '--mod-ssca-100',
    },
    'Supply Chain Security': {
      border: '--mod-ssca-200',
      backgroundColor: '--mod-ssca-100',
    },
    'Continuous Error Tracking': {
      border: '--mod-ce-200',
      backgroundColor: '--mod-ce-100',
    },
    'Open Source': {
      border: '--mod-opensource-200',
      backgroundColor: '--mod-opensource-100',
    },
    'Security Testing Orchestration': {
      border: '--mod-sto-200',
      backgroundColor: '--mod-sto-100',
    },
    'Internal Developer Portal': {
      border: '--mod-idp-200',
      backgroundColor: '--mod-idp-100',
    },
    'Code Repository': {
      border: '--mod-code-200',
      backgroundColor: '--mod-code-100',
    },
    'Continuous Integration': {
      border: '--mod-ci-200',
      backgroundColor: '--mod-ci-100',
    },
    'Database DevOps': {
      border: '--mod-cde-200',
      backgroundColor: '--mod-cde-100',
    },
    'Continuous Delivery': {
      border: '--mod-cd-200',
      backgroundColor: '--mod-cd-100',
    },
    'Continuous Delivery & GitOps': {
      border: '--mod-cd-200',
      backgroundColor: '--mod-cd-100',
    },
    Armory: { border: '--mod-ci-200', backgroundColor: '--mod-ci-100' },
    'Feature Flags': {
      border: '--mod-ff-200',
      backgroundColor: '--mod-ff-100',
    },
    'Feature Management & Experimentation': {
      border: '--mod-ff-200',
      backgroundColor: '--mod-ff-100',
    },
    'Cloud Development Environments': {
      border: '--mod-cde-200',
      backgroundColor: '--mod-cde-100',
    },
    'Service Reliability Management': {
      border: '--mod-srm-200',
      backgroundColor: '--mod-srm-100',
    },
    'Cloud Cost Management': {
      border: '--mod-ccm-200',
      backgroundColor: '--mod-ccm-100',
    },
    'Software Engineering Insights': {
      border: '--mod-sei-200',
      backgroundColor: '--mod-sei-100',
    },
    'Chaos Engineering': {
      border: '--mod-ce-200',
      backgroundColor: '--mod-ce-100',
    },
    'Harness Intelligence': {
      border: '--mod-iacm-200',
      backgroundColor: '--mod-iacm-100',
    },
    'AI Code Assistant': {
      border: '--mod-iacm-200',
      backgroundColor: '--mod-iacm-100',
    },
  };
document.addEventListener('DOMContentLoaded', () => {
  setInterval(() => {
    document.querySelectorAll('atomic-facet').forEach((e) => {
      const o = e && e.shadowRoot;
      o &&
        o.querySelectorAll('span').forEach((e) => {
          if (e.querySelector('img')) return;
          const o = document.createElement('img');
          (o.style.display = 'inline-block'),
            (o.style.height = '16px'),
            (o.src = iconUrls[e.title] || ''),
            o.src && e.insertAdjacentElement('afterbegin', o);
        });
    });
  }, 500);
}),
  document.addEventListener('DOMContentLoaded', () => {
    const e = document.querySelectorAll('atomic-search-box')[1];
    e && (e.clearFilters = 'false');
  }),
  document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
      document.querySelectorAll('atomic-result-list').forEach((e) => {
        const o = e && e.shadowRoot;
        o &&
          o.querySelectorAll('atomic-result').forEach((e) => {
            const o = e && e.shadowRoot;
            o &&
              o.querySelectorAll('atomic-result-badge').forEach((e) => {
                e &&
                  e.shadowRoot &&
                  e
                    .querySelectorAll('atomic-result-multi-value-text')
                    .forEach((e) => {
                      const o = e && e.shadowRoot;
                      if (!o) return;
                      const r = o.querySelector('slot');
                      if (r.querySelector('img')) return;
                      const s = document.createElement('img');
                      (s.style.display = 'inline-block'),
                        iconUrls[r.textContent] && (s.style.width = '16px'),
                        (s.src = iconUrls[r.textContent] || '');
                      const t = r.parentElement.parentElement;
                      if (
                        ((r.style.display = 'flex'),
                        (r.style.alignItems = 'center'),
                        (r.style.gap = '4px'),
                        (r.style.color = '#FFFFFF'),
                        (r.style.fontWeight = '600'),
                        (r.style.fontSize = '10px'),
                        (r.style.lineHeight = '14px'),
                        (r.style.padding = '0'),
                        (t.style.padding = '0 8px'),
                        (t.style.borderRadius = '4px'),
                        (t.style.border = '1px solid #FFFFFF1B '),
                        (t.style.maxHeight = '24px '),
                        (t.style.minHeight = '24px '),
                        (t.style.display = 'flex'),
                        (t.style.alignItems = 'center'),
                        (t.style.justifyContent = 'center'),
                        (t.style.cursor = 'pointer'),
                        (t.style.backgroundColor = '#FFFFFF12'),
                        s.src)
                      ) {
                        r.insertAdjacentElement('afterbegin', s);
                        const e = r.textContent.trim(),
                          o = color[e];
                        o &&
                          ((t.style.borderColor = `var(${o.border})`),
                          (t.style.backgroundColor = '#FFFFFF0D'),
                          (r.style.color = '#FFFFFF'));
                      }
                    });
              });
          });
      });
    }, 100);
  });


