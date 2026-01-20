document.addEventListener('DOMContentLoaded', function () {
  let factory = splitio.SplitFactory({
    core: {
      authorizationKey: 'btdqglkju8a9skmuc1u61pjjbff1vmfdpjj4',
      key: Date.now(),
    },
  });

  const client = factory.client();
  client.on(client.Event.SDK_READY, function () {
    const treatment = client.getTreatment('toggle_essential_card');
    console.log({ treatment });

    if (treatment == 'hide') {
      const card = document.querySelector('.pricing_corporate-content_block');
    //   const card = document.querySelector('.essential_card');
      console.log({ card });

      if (card) {
        card.style.display = 'none';
      }
    }
  });
});
