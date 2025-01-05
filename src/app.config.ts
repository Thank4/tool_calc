export default defineAppConfig({
 // entryPagePath: 'pages/navigation/index',
  entryPagePath: 'pages/mortgage/index',
  pages: [
    'pages/navigation/index',
    'pages/mortgage/index',
    'pages/home/index',
    'pages/index/index',
    'pages/result/index',
    'pages/combinationResult/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
