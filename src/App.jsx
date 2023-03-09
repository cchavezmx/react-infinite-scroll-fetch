import reactLogo from './assets/react.svg'
import './App.css'
import useFetchScroll from './hooks/useFetchScroll'
const baseURL =
  'https://api.giphy.com/v1/stickers/trending?api_key=fYjUKYdERsEsRhWMLcads9tshmq9TePM&limit=10&rating=a'

function App () {
  const { data, fromRef: fetchRef, show: showFetch } = useFetchScroll(baseURL)
  console.log('🚀 ~ file: App.jsx:9 ~ App ~ showFetch:', { showFetch, data })

  return (
    <div className="App">
      <div style={{ height: '200px' }}>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {
        data.length > 0 && data.map((item, index) => {
          console.log('🚀 ~ file: App.jsx:21 ~ App ~ item', typeof item)
          return (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img src={item?.images.downsized_medium.url} alt="giphy" />
            </div>
          )
        })
      }
      <div id="lastElement" ref={fetchRef}>asdasd</div>
    </div>
  )
}

export default App
