document.addEventListener('DOMContentLoaded', function () {
  let factory = splitio.SplitFactory({
    core: {
      authorizationKey: 'btdqglkju8a9skmuc1u61pjjbff1vmfdpjj4',
      key: Date.now(),
    },
  });

  let maxScrollPercent = 0;
  const client = factory.client();
  client.on(client.Event.SDK_READY, function () {
    const treatment = client.getTreatment('contact_sales_form_submission_ff');
    if (treatment === 'primary-view') {
      const split_block = document.querySelectorAll('.split_block');
      if (split_block.length > 0) {
        split_block.forEach((el) => {
          el.style.display = 'none';
        });
      }
    } else {
      window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScrollPercent = Math.round((scrollTop / docHeight) * 100);
        if (currentScrollPercent > maxScrollPercent) {
          maxScrollPercent = currentScrollPercent;
        }
      });
    }

    const contact_form = document.querySelector('#mktoForm_3513');
    if (contact_form) {
      contact_form.addEventListener('submit', function (e) {
        client.track('user', 'FORM_SUBMITTED');
        if (treatment === 'extended-view') {
          client.track('user', 'EXTENDED_VIEW_SCROLL_DEPTH', maxScrollPercent);
        }
      });
    }
  });
});
