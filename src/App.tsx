import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import NewsPage from './pages/NewsPage'
import NewsDetailPage from './pages/NewsDetailPage'
import CareerPage from './pages/CareerPage'
import ContactPage from './pages/ContactPage'
import Header from './components/Header'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import WhatsAppButton from './components/WhatsAppButton'
import type { Product } from './data/products'
import type { Article } from './data/articles'

export type Page = 'home' | 'about' | 'products' | 'product-detail' | 'news' | 'news-detail' | 'career' | 'contact'
export type Lang = 'ID' | 'EN'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [lang, setLang] = useState<Lang>('ID')
  const [scrolled, setScrolled] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [inquiryType, setInquiryType] = useState('')

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [page])

  const navigate = (p: Page) => setPage(p)

  const openProduct = (product: Product) => {
    setSelectedProduct(product)
    setPage('product-detail')
  }

  const openArticle = (article: Article) => {
    setSelectedArticle(article)
    setPage('news-detail')
  }

  const openContact = (type = '') => {
    setInquiryType(type)
    setPage('contact')
  }

  const mainPage = page !== 'product-detail' && page !== 'news-detail' ? page : selectedProduct ? 'products' : 'news'

  return (
    <>
      <Preloader loaded={loaded} />
      <div className="min-h-screen bg-white overflow-x-hidden">
        <Header scrolled={scrolled} page={mainPage as Page} navigate={navigate} lang={lang} setLang={setLang} />
        {page === 'home' && <HomePage navigate={navigate} lang={lang} openProduct={openProduct} openArticle={openArticle} />}
        {page === 'about' && <AboutPage lang={lang} navigate={navigate} openContact={openContact} />}
        {page === 'products' && <ProductsPage lang={lang} navigate={navigate} openProduct={openProduct} openContact={openContact} />}
        {page === 'product-detail' && selectedProduct && (
          <ProductDetailPage product={selectedProduct} lang={lang} navigate={navigate} openContact={openContact} openProduct={openProduct} />
        )}
        {page === 'news' && <NewsPage lang={lang} openArticle={openArticle} />}
        {page === 'news-detail' && selectedArticle && (
          <NewsDetailPage article={selectedArticle} lang={lang} navigate={navigate} openArticle={openArticle} />
        )}
        {page === 'career' && <CareerPage lang={lang} navigate={navigate} openContact={openContact} />}
        {page === 'contact' && <ContactPage lang={lang} inquiryType={inquiryType} />}
        <Footer navigate={navigate} lang={lang} />
        <WhatsAppButton />
      </div>
    </>
  )
}
