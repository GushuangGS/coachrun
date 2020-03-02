const frequentListRouter = {
    path: '/render/member/account/traveller-info-list',
    name: 'FrequentList',
    meta: { title: "Frequent List" },
    component:()=>import('@/views/UserCenter/frequentTraveller/FrequentList')
  }
  
  export default frequentListRouter
  