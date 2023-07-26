/* eslint-disable no-undef */

jest.mock('../src/api', () => ({
  getHeadlines: jest.fn().mockReturnValue(
    Promise.resolve({
      status: 'ok',
      totalResults: 32,
      articles: [
        {
          source: {
            id: null,
            name: 'Deadline',
          },
          author: "Anthony D'Alessandro",
          title:
            'How ‘Barbie’ Went Outside The Box On Her Long Journey To Become A Blockbuster: Global Opening Now At $344M – Box Office - Deadline',
          description:
            'When it comes to the road to blockbuster glory, some projects are willed, some happen instantaneously, while others go through a long development hell. That’s just what happens when you&#8217…',
          url: 'https://deadline.com/2023/07/barbie-box-office-success-margot-robbie-greta-gerwig-1235446062/',
          urlToImage: 'https://deadline.com/wp-content/uploads/2023/07/rev-1-BAR-FP-0129r_High_Res_JPEG.jpeg?w=1024',
          publishedAt: '2023-07-24T20:03:00Z',
          content:
            'When it comes to the road to blockbuster glory, some projects are willed, some happen instantaneously, while others go through a long development hell. That’s just what happens when you’re perfecting… [+11145 chars]',
        },
      ],
    }),
  ),
}));

jest.mock('vuetify/components', () => ({
  VImg: { template: '<img/>' },
  VBtn: { template: '<button><slot/></button>' },
  VDialog: { template: '<div><slot/></div>' },
  VCard: { template: '<div><slot/></div>' },
  VCardTitle: { template: '<div><slot/></div>' },
  VRadio: { template: '<input/>' },
  VRadioGroup: { template: '<div><slot/></div>' },
  VCardSubtitle: { template: '<div><slot/></div>' },
  VIcon: { template: '<div><slot/></div>' },
  VTextField: { template: '<input/>' },
  VChip: { template: '<div><slot/></div>' },
}));
