const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('b7c7d4cd2d794d028ec7297b9eeedea6')
const merge = require('lodash').merge
const firebase = require('./src/firebase')
const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
let articles = []

function loadData (index) {
  newsapi.v2.topHeadlines({
    category: categories[index],
    language: 'en',
    country: 'au',
    sortBy: 'relevancy',
    pageSize: 20,
  }).then(response => {
    response.articles.forEach((article) => {
      article = merge(article, {category: categories[index]})

      articles.push(article)
    })
    index = index + 1
    if (index <= 6) {
      loadData(index)
    }
    if (index === 6) {
      const db = firebase.database()
      const parentRef = db.ref()
      parentRef.remove().then('error', function (error) {console.log(error)})
      const newsRef = db.ref('news')
      newsRef.remove().then('error', function (error) {console.log(error)})
      let promises = []
      articles.forEach((article) => {
        promises.push(newsRef.push(article))
      })
      Promise.all(promises).then((data) => {
        console.log('finished loading data')
      })
      const totalsRef = db.ref('totals')

      const totals = articles.reduce((tally, item) => {
        tally[item.category] = tally[item.category] ? tally[item.category] + 1 : 1

        return tally
      }, {})
      totalsRef.push(totals).then((data) => {
        totalsRef.off()
      })
    }
  });
}

loadData(0)
