import { useState, useEffect } from "react"
import HeaderSection from '../../../../Components/HeaderSection/HeaderSection'
import HeaderSectionLink from '../../../../Components/DesignSystem/HeaderSectionLink'
import ArticleBox from '../../../../Components/ArticleBox/ArticleBox'
import type { T_ArticlesData } from "../../../../Types/type"

function LatestArticles() {
  const [articles, setArticles] = useState<T_ArticlesData[] | null>(null)

  const getArticlesHandler = async () => {
    try {
      const articles = await (
        await fetch(`http://localhost:4000/v1/articles`)
      ).json();
      setArticles(articles)
    } 
    catch (error) {
      throw new Error(`${error}`)
    }
  }

  useEffect(() => {
    getArticlesHandler()
  }, [])

  return (
    <div className="pt-24 sm:pt-40">
        <HeaderSection subject='آخـــرین مقالات ما' title='مقاله های بروز برنامه نویسی و تکنولوژی'>
            <HeaderSectionLink label='همه مقالات' link='/category-articles/articles' />
        </HeaderSection>
        <div style={{gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"}} className="grid lg:gap-7 gap-6">
          {articles?.length && 
            articles.filter(article => article.publish).slice(0,4).map(article => <ArticleBox {...article} key={article._id} />)
          }
        </div>
    </div>
  )
}

export default LatestArticles