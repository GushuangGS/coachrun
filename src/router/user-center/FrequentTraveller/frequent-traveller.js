const frequentListRouter = {
    path: '/render/member/account/traveller-info-list',
    name: 'FrequentList',
    meta: { title: "Frequent Traveler Info" },
    component:()=>import('@/views/UserCenter/frequentTraveller/FrequentList')
  }
  
  export default frequentListRouter
  